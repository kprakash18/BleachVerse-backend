import { describe, it, expect, beforeEach } from "vitest";
import { EmbeddingCacheService } from "../../../src/services/semantic/embedding-cache.service.js";

describe("EmbeddingCacheService", () => {
  let cache;

  beforeEach(() => {
    cache = new EmbeddingCacheService({ maxSize: 3, ttlMs: 1000 });
  });

  it("should normalize queries (case, trim, multi-spaces) to the same cache key", () => {
    const vector = [0.1, 0.2, 0.3];
    cache.set("  Ichigo   Powers  ", vector);

    expect(cache.get("ichigo powers")).toEqual(vector);
    expect(cache.get("ICHIGO POWERS")).toEqual(vector);
    expect(cache.get("  ichigo powers ")).toEqual(vector);
  });

  it("should return null on cache miss and record statistics", () => {
    expect(cache.get("unknown query")).toBeNull();
    const stats = cache.getStats();
    expect(stats.hits).toBe(0);
    expect(stats.misses).toBe(1);
    expect(stats.size).toBe(0);
  });

  it("should evict least-recently-used entry when capacity is exceeded", () => {
    cache.set("query 1", [1]);
    cache.set("query 2", [2]);
    cache.set("query 3", [3]);

    // Access query 1 so query 2 becomes least recently used
    cache.get("query 1");

    // Insert 4th item -> should evict query 2
    cache.set("query 4", [4]);

    expect(cache.get("query 1")).toEqual([1]);
    expect(cache.get("query 2")).toBeNull();
    expect(cache.get("query 3")).toEqual([3]);
    expect(cache.get("query 4")).toEqual([4]);
  });

  it("should expire items after TTL", async () => {
    const shortTtlCache = new EmbeddingCacheService({ maxSize: 10, ttlMs: 20 });
    shortTtlCache.set("test", [0.5]);
    expect(shortTtlCache.get("test")).toEqual([0.5]);

    await new Promise((resolve) => setTimeout(resolve, 30));
    expect(shortTtlCache.get("test")).toBeNull();
  });

  it("should clear cache and reset statistics", () => {
    cache.set("q1", [1]);
    cache.get("q1");
    expect(cache.getStats().hits).toBe(1);

    cache.clear();
    const stats = cache.getStats();
    expect(stats.size).toBe(0);
    expect(stats.hits).toBe(0);
    expect(stats.misses).toBe(0);
  });
});
