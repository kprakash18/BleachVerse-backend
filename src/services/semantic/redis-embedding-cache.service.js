import crypto from "crypto";
import { getRedisClient } from "../../config/redis.js";
import { normalizeQuery } from "./query-normalizer.service.js";
import { embeddingCacheService } from "./embedding-cache.service.js";

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
   * Retrieves a cached embedding vector.
   * Checks Redis first; falls back to in-memory cache if Redis is cold/offline.
   * @param {string} query
   * @returns {Promise<number[] | null>}
   */
  async get(query) {
    const normalized = normalizeQuery(query);
    if (!normalized) return null;

    // 1. Try Redis
    try {
      const client = getRedisClient();
      const key = this.getCacheKey(normalized);
      const raw = await client.get(key);
      if (raw) {
        const cached = JSON.parse(raw);
        if (cached && Array.isArray(cached.embedding)) {
          // Also populate local in-memory cache for fast hot-path retrieval
          embeddingCacheService.set(normalized, cached.embedding);
          return cached.embedding;
        }
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
   * @returns {Promise<void>}
   */
  async set(query, vector) {
    const normalized = normalizeQuery(query);
    if (!normalized || !Array.isArray(vector) || vector.length === 0) return;

    // Always store in local in-memory cache
    embeddingCacheService.set(normalized, vector);

    // Store in distributed Redis
    try {
      const client = getRedisClient();
      const key = this.getCacheKey(normalized);
      await client.set(
        key,
        JSON.stringify({ embedding: vector }),
        "EX",
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
      const client = getRedisClient();
      const key = this.getCacheKey(normalized);
      await client.del(key);
    } catch {
      // Non-blocking
    }
  }
}

export const redisEmbeddingCacheService = new RedisEmbeddingCacheService();
