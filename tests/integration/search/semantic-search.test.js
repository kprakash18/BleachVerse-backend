import { describe, it, expect, beforeEach } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { embeddingCacheService } from "../../../src/services/semantic/embedding-cache.service.js";
import { redisEmbeddingCacheService } from "../../../src/services/semantic/redis-embedding-cache.service.js";
import { embeddingCircuitBreaker } from "../../../src/services/embeddings/circuit-breaker.js";
import { redisCircuitBreaker } from "../../../src/services/embeddings/redis-circuit-breaker.js";

describe("Semantic Search API — GET /api/v1/search/semantic", () => {
  beforeEach(async () => {
    embeddingCacheService.clear();
    await redisEmbeddingCacheService.del("substitute soul reaper");
    await redisEmbeddingCacheService.del("captain");
    await redisEmbeddingCacheService.del("bankai getsuga tensho");
    await redisEmbeddingCacheService.del("ichigo");
    await redisEmbeddingCacheService.del("randomquerytext");
    embeddingCircuitBreaker.reset();
    await redisCircuitBreaker.resetCircuit();
  });

  it("should return 400 VALIDATION_ERROR when query parameter 'q' is missing", async () => {
    const res = await request(app).get("/api/v1/search/semantic");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR when query is less than 2 characters", async () => {
    const res = await request(app).get("/api/v1/search/semantic?q=a");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR when type is not a valid entity enum", async () => {
    const res = await request(app).get("/api/v1/search/semantic?q=ichigo&type=INVALID_ENTITY");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR when threshold is outside 0.0 - 1.0", async () => {
    const res = await request(app).get("/api/v1/search/semantic?q=ichigo&threshold=1.5");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should execute semantic search and return structured results envelope", async () => {
    const q = "substitute soul reaper debut test";
    await redisEmbeddingCacheService.del(q);
    const res = await request(app).get(`/api/v1/search/semantic?q=${encodeURIComponent(q)}&threshold=0.3&limit=5`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("query", q);
    expect(res.body.data).toHaveProperty("count");
    expect(res.body.data).toHaveProperty("threshold", 0.3);
    expect(res.body.data).toHaveProperty("cached", false);
    expect(Array.isArray(res.body.data.results)).toBe(true);

    if (res.body.data.results.length > 0) {
      const first = res.body.data.results[0];
      expect(first).toHaveProperty("entityType");
      expect(first).toHaveProperty("entityId");
      expect(first).toHaveProperty("similarity");
      expect(typeof first.similarity).toBe("number");
      expect(first.similarity).toBeGreaterThanOrEqual(0.3);
      expect(first).toHaveProperty("metadata");
    }
  });

  it("should filter results by entity type when type parameter is specified", async () => {
    const res = await request(app).get("/api/v1/search/semantic?q=captain&type=CHARACTER&threshold=0.3&limit=5");
    expect(res.status).toBe(200);
    for (const item of res.body.data.results) {
      expect(item.entityType).toBe("CHARACTER");
    }
  });

  it("should return cached response flag on identical subsequent queries", async () => {
    const query = "bankai getsuga tensho";
    const res1 = await request(app).get(`/api/v1/search/semantic?q=${encodeURIComponent(query)}&threshold=0.3`);
    expect(res1.status).toBe(200);
    expect(res1.body.data.cached).toBe(false);

    // Second call with different casing/spacing should hit the normalized LRU cache
    const res2 = await request(app).get(`/api/v1/search/semantic?q=${encodeURIComponent("  Bankai   Getsuga Tensho  ")}&threshold=0.3`);
    expect(res2.status).toBe(200);
    expect(res2.body.data.cached).toBe(true);
  });

  it("should respect hydrate=false and return lightweight results without full entity load", async () => {
    const res = await request(app).get("/api/v1/search/semantic?q=ichigo&hydrate=false&threshold=0.3&limit=2");
    expect(res.status).toBe(200);
    if (res.body.data.results.length > 0) {
      expect(res.body.data.results[0]).not.toHaveProperty("entity");
    }
  });

  it("should respect threshold cutoff and return empty results for impossibly high threshold", async () => {
    const res = await request(app).get("/api/v1/search/semantic?q=randomquerytext&threshold=0.999");
    expect(res.status).toBe(200);
    expect(res.body.data.count).toBe(0);
    expect(res.body.data.results).toEqual([]);
  });
});
