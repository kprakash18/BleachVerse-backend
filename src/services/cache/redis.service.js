import { getRedisClient } from "../../config/redis.js";

export class RedisService {
  constructor() {
    this.client = getRedisClient();
    this.isConnected = false;
    this._initConnection();
  }

  async _initConnection() {
    try {
      if (this.client.status === "wait" || this.client.status === "close") {
        await this.client.connect();
        this.isConnected = true;
      }
    } catch {
      this.isConnected = false;
    }
  }

  /**
   * Retrieves a parsed JSON value from Redis by key.
   * Returns null if key does not exist or if Redis is unreachable.
   * @param {string} key
   * @returns {Promise<any | null>}
   */
  async get(key) {
    if (!key) return null;
    try {
      const raw = await this.client.get(key);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  /**
   * Stores a JSON-serializable value in Redis with optional TTL in seconds.
   * @param {string} key
   * @param {any} value
   * @param {number} [ttlSeconds]
   * @returns {Promise<boolean>}
   */
  async set(key, value, ttlSeconds = null) {
    if (!key || value === undefined) return false;
    try {
      const serialized = JSON.stringify(value);
      if (ttlSeconds && ttlSeconds > 0) {
        await this.client.set(key, serialized, "EX", Math.ceil(ttlSeconds));
      } else {
        await this.client.set(key, serialized);
      }
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Deletes one or more keys from Redis.
   * @param {string | string[]} keys
   * @returns {Promise<number>}
   */
  async del(keys) {
    if (!keys || (Array.isArray(keys) && keys.length === 0)) return 0;
    try {
      const keysArray = Array.isArray(keys) ? keys : [keys];
      return await this.client.del(...keysArray);
    } catch {
      return 0;
    }
  }

  /**
   * Checks if a key exists in Redis.
   * @param {string} key
   * @returns {Promise<boolean>}
   */
  async exists(key) {
    if (!key) return false;
    try {
      const count = await this.client.exists(key);
      return count > 0;
    } catch {
      return false;
    }
  }

  /**
   * Returns remaining TTL of a key in seconds.
   * @param {string} key
   * @returns {Promise<number>}
   */
  async ttl(key) {
    if (!key) return -2;
    try {
      return await this.client.ttl(key);
    } catch {
      return -2;
    }
  }

  /**
   * Performs ping check.
   * @returns {Promise<boolean>}
   */
  async ping() {
    try {
      const pong = await this.client.ping();
      return pong === "PONG";
    } catch {
      return false;
    }
  }
}

export const redisService = new RedisService();
