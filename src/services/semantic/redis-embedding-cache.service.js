import crypto from "crypto";
import { redisService } from "../cache/redis.service.js";
import { normalizeQuery } from "./query-normalizer.js";
import { embeddingCacheService } from "./embedding-cache.service.js";
import { GEMINI_EMBEDDING_MODEL, EMBEDDING_DIMENSIONS } from "../embeddings/embedding.constants.js";

const KEY_PREFIX = "semantic:embedding:v1:";
const DEFAULT_TTL_SECONDS = 24 * 60 * 60; // 24 hours

export class RedisEmbeddingCacheService {
  /**
   * Hashes a normalized query to a fixed-length SHA-256 key.
   * @param {string} normalizedQuery
   * @returns {string}
   */
  getCacheKey(normalizedQuery) {
    const hash = crypto.createHash("sha256").update(normalizedQuery).digest("hex");
    return `${KEY_PREFIX}${hash}`;
  }

  /**
   * Retrieves a cached 768-dimensional embedding vector.
   * Checks Redis first; falls back to in-memory cache if Redis is cold/offline.
   * @param {string} query
   * @returns {Promise<number[] | null>}
   */
  async get(query) {
    const normalized = normalizeQuery(query);
    if (!normalized) return null;

    // 1. Try Redis
    try {
      const key = this.getCacheKey(normalized);
      const cached = await redisService.get(key);
      if (cached && Array.isArray(cached.embedding)) {
        // Also populate local in-memory cache for fast hot-path retrieval
        embeddingCacheService.set(normalized, cached.embedding);
        return cached.embedding;
      }
    } catch {
      // Fallback to local memory
    }

    // 2. Fallback to in-memory cache
    return embeddingCacheService.get(normalized);
  }

  /**
   * Stores an embedding vector in Redis (and local in-memory cache) with a 24h TTL.
   * @param {string} query
   * @param {number[]} vector
   * @param {string} [model]
   * @returns {Promise<void>}
   */
  async set(query, vector, model = GEMINI_EMBEDDING_MODEL) {
    const normalized = normalizeQuery(query);
    if (!normalized || !Array.isArray(vector) || vector.length === 0) return;

    // Always store in local in-memory cache
    embeddingCacheService.set(normalized, vector);

    // Store in distributed Redis
    try {
      const key = this.getCacheKey(normalized);
      await redisService.set(
        key,
        {
          model,
          dimensions: vector.length || EMBEDDING_DIMENSIONS,
          embedding: vector,
          cachedAt: new Date().toISOString(),
        },
        DEFAULT_TTL_SECONDS
      );
    } catch {
      // Non-blocking
    }
  }

  /**
   * Invalidates a query embedding cache key in Redis and memory.
   * @param {string} query
   * @returns {Promise<void>}
   */
  async del(query) {
    const normalized = normalizeQuery(query);
    if (!normalized) return;

    // Delete from in-memory cache
    embeddingCacheService.delete(normalized);

    // Delete from distributed Redis
    try {
      const key = this.getCacheKey(normalized);
      await redisService.del(key);
    } catch {
      // Non-blocking
    }
  }
}

export const redisEmbeddingCacheService = new RedisEmbeddingCacheService();
