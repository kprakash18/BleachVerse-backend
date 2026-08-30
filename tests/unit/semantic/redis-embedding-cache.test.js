import { describe, it, expect, beforeEach } from "vitest";
import { redisEmbeddingCacheService } from "../../../src/services/semantic/redis-embedding-cache.service.js";
import { redisService } from "../../../src/services/cache/redis.service.js";

describe("RedisEmbeddingCacheService", () => {
  beforeEach(async () => {
    // Clear test keys
    await redisEmbeddingCacheService.del("ichigo powers");
    await redisEmbeddingCacheService.del("bankai getsuga");
  });

  it("should generate deterministic SHA-256 hashed cache keys", () => {
    const key1 = redisEmbeddingCacheService.getCacheKey("ichigo bankai");
    const key2 = redisEmbeddingCacheService.getCacheKey("ichigo bankai");
    const key3 = redisEmbeddingCacheService.getCacheKey("aizen kyouka");

    expect(key1).toBe(key2);
    expect(key1).toMatch(/^semantic:embedding:v1:[a-f0-9]{64}$/);
    expect(key1).not.toBe(key3);
  });

  it("should set and retrieve embedding vector from Redis cache", async () => {
    const sampleVector = [0.123, -0.456, 0.789];
    await redisEmbeddingCacheService.set("Ichigo Powers", sampleVector);

    // Retrieve using different casing / spacing
    const cached = await redisEmbeddingCacheService.get("  ichigo   powers ");
    expect(cached).toEqual(sampleVector);
  });

  it("should return null for non-existent cache keys", async () => {
    const cached = await redisEmbeddingCacheService.get("completely unknown query 12345");
    expect(cached).toBeNull();
  });

  it("should delete cached embeddings", async () => {
    const vector = [0.5, 0.5];
    await redisEmbeddingCacheService.set("bankai getsuga", vector);
    expect(await redisEmbeddingCacheService.get("bankai getsuga")).toEqual(vector);

    await redisEmbeddingCacheService.del("bankai getsuga");
    expect(await redisEmbeddingCacheService.get("bankai getsuga")).toBeNull();
  });
});
