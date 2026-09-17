import { normalizeQuery } from "./query-normalizer.service.js";

const DEFAULT_MAX_SIZE = 500;
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export class EmbeddingCacheService {
  /**
   * @param {Object} [options]
   * @param {number} [options.maxSize] Maximum number of cached query embeddings (default: 500)
   * @param {number} [options.ttlMs] Time-to-live per cache entry in milliseconds (default: 24h)
   */
  constructor(options = {}) {
    this.maxSize = options.maxSize ?? DEFAULT_MAX_SIZE;
    this.ttlMs = options.ttlMs ?? DEFAULT_TTL_MS;
    this.cache = new Map();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Retrieves a cached embedding vector for a query.
   * @param {string} query
   * @returns {number[] | null}
   */
  get(query) {
    const key = normalizeQuery(query);
    if (!key || !this.cache.has(key)) {
      this.misses++;
      return null;
    }

    const entry = this.cache.get(key);

    // Check expiration
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.misses++;
      return null;
    }

    // Refresh LRU order (delete and re-insert at tail)
    this.cache.delete(key);
    this.cache.set(key, entry);

    this.hits++;
    return entry.vector;
  }

  /**
   * Stores an embedding vector in the LRU cache.
   * @param {string} query
   * @param {number[]} vector
   */
  set(query, vector) {
    const key = normalizeQuery(query);
    if (!key || !Array.isArray(vector) || vector.length === 0) {
      return;
    }

    // If key exists, delete first to refresh position
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Evict least-recently-used (first key in map iterator)
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      vector,
      expiresAt: Date.now() + this.ttlMs,
    });
  }

  /**
   * Deletes a specific query key from in-memory cache.
   * @param {string} query
   */
  delete(query) {
    const key = normalizeQuery(query);
    if (key) {
      this.cache.delete(key);
    }
  }

  /**
   * Clears all cached embeddings and resets statistics.
   */
  clear() {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Returns current cache statistics.
   * @returns {{ size: number, maxSize: number, hits: number, misses: number, hitRatio: number }}
   */
  getStats() {
    const total = this.hits + this.misses;
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hits: this.hits,
      misses: this.misses,
      hitRatio: total > 0 ? Number((this.hits / total).toFixed(4)) : 0,
    };
  }
}

// Global singleton instance
export const embeddingCacheService = new EmbeddingCacheService();
