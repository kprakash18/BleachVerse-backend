import { describe, it, expect, beforeEach } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { embeddingCacheService } from "../../../src/services/semantic/embedding-cache.service.js";
import { redisEmbeddingCacheService } from "../../../src/services/semantic/redis-embedding-cache.service.js";
import { embeddingCircuitBreaker } from "../../../src/services/embeddings/circuit-breaker.js";
import { redisCircuitBreaker } from "../../../src/services/embeddings/redis-circuit-breaker.js";

describe("Unified Search API — GET /api/v1/search (Hybrid Engine)", () => {
  beforeEach(async () => {
    embeddingCacheService.clear();
    await redisEmbeddingCacheService.del("substitute soul reaper");
    await redisEmbeddingCacheService.del("who fought kenpachi");
    await redisEmbeddingCacheService.del("espada who fought kenpachi and are brutal");
    embeddingCircuitBreaker.reset();
    await redisCircuitBreaker.resetCircuit();
  });

  it("should return 400 VALIDATION_ERROR when query parameter 'q' is missing", async () => {
    const res = await request(app).get("/api/v1/search");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR when query is less than 2 characters", async () => {
    const res = await request(app).get("/api/v1/search?q=a");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR when mode is invalid", async () => {
    const res = await request(app).get("/api/v1/search?q=ichigo&mode=INVALID_MODE");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should execute unified search and return structured execution metadata", async () => {
    const res = await request(app).get("/api/v1/search?q=substitute+soul+reaper&mode=AUTO&limit=5");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("query", "substitute soul reaper");
    expect(res.body.data).toHaveProperty("execution");
    expect(res.body.data.execution).toHaveProperty("mode");
    expect(res.body.data.execution).toHaveProperty("semanticUsed", true);
    expect(res.body.data.execution).toHaveProperty("aggregationMode");
    expect(res.body.data).toHaveProperty("count");
    expect(Array.isArray(res.body.data.results)).toBe(true);

    if (res.body.data.results.length > 0) {
      const first = res.body.data.results[0];
      expect(first).toHaveProperty("entityId");
      expect(first).toHaveProperty("entityType");
      expect(first).toHaveProperty("scores");
      expect(first.scores).toHaveProperty("final");
      expect(first).toHaveProperty("matchedBy");
      expect(Array.isArray(first.matchedBy)).toBe(true);
    }
  });

  it("should execute hybrid search query for relationship constraints", async () => {
    const res = await request(app).get("/api/v1/search?q=espada+who+fought+kenpachi+and+are+brutal&mode=HYBRID&limit=5");
    expect(res.status).toBe(200);
    expect(res.body.data.execution.mode).toBe("HYBRID");
    expect(res.body.data.execution.semanticUsed).toBe(true);
    expect(res.body.data.execution.graphUsed).toBe(true);
  });

  it("should respect hydrate=false and return unhydrated results", async () => {
    const res = await request(app).get("/api/v1/search?q=ichigo&hydrate=false&limit=2");
    expect(res.status).toBe(200);
    if (res.body.data.results.length > 0) {
      expect(res.body.data.results[0]).not.toHaveProperty("entity");
    }
  });
});
