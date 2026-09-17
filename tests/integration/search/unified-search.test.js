import { describe, it, expect, beforeEach } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { embeddingCacheService } from "../../../src/services/semantic/embedding-cache.service.js";
import { redisEmbeddingCacheService } from "../../../src/services/semantic/redis-embedding-cache.service.js";
import { embeddingCircuitBreaker } from "../../../src/services/embeddings/circuit-breaker.service.js";
import { redisCircuitBreaker } from "../../../src/services/embeddings/redis-circuit-breaker.service.js";

describe("Unified Search API — GET /api/v1/search (Hybrid Engine)", () => {
  beforeEach(async () => {
    embeddingCacheService.clear();
    await redisEmbeddingCacheService.del("bankai getsuga tensho");
    await redisEmbeddingCacheService.del("substitute soul reaper");
    await redisEmbeddingCacheService.del("who fought kenpachi");
    await redisEmbeddingCacheService.del("espada brutal");
    await redisEmbeddingCacheService.del("espada who fought ichigo");
    await redisEmbeddingCacheService.del("espada who fought ichigo and are brutal");
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

  it("should route pure semantic queries only to pgvector", async () => {
    const res = await request(app).get("/api/v1/search?q=bankai+getsuga+tensho&mode=AUTO&limit=5");

    expect(res.status).toBe(200);
    expect(res.body.data.execution).toMatchObject({
      mode: "SEMANTIC",
      semanticUsed: true,
      graphUsed: false,
      structuredUsed: false,
      aggregationMode: "UNION",
      sourcesUsed: ["PGVECTOR"],
    });
    expect(res.body.data.count).toBeGreaterThan(0);

    for (const item of res.body.data.results) {
      expect(item.entityId).toEqual(expect.any(String));
      expect(item.entityType).toEqual(expect.any(String));
      expect(item.matchedBy).toEqual(["SEMANTIC"]);
      expect(item.scores.semantic).toEqual(expect.any(Number));
      expect(item.scores.graph).toBeNull();
      expect(item.scores.structured).toBeNull();
      expect(item.scores.final).toEqual(expect.any(Number));
    }
  });

  it("should report semantic plus structured domain filters as hybrid", async () => {
    const res = await request(app).get("/api/v1/search?q=substitute+soul+reaper&mode=AUTO&limit=5");

    expect(res.status).toBe(200);
    expect(res.body.data.execution).toMatchObject({
      mode: "HYBRID",
      semanticUsed: true,
      graphUsed: false,
      structuredUsed: true,
      aggregationMode: "UNION",
      sourcesUsed: ["PGVECTOR", "POSTGRES"],
    });
    expect(res.body.data.execution.detected.structuredFilters).toEqual({ race: "SHINIGAMI" });
    expect(res.body.data.count).toBeGreaterThan(0);

    const matchedBy = res.body.data.results.flatMap((item) => item.matchedBy);
    expect(matchedBy).toContain("SEMANTIC");
    expect(matchedBy).toContain("STRUCTURED");
  });

  it("should route relationship-only queries only to Neo4j graph search", async () => {
    const res = await request(app).get("/api/v1/search?q=who+fought+kenpachi&mode=AUTO&limit=5");

    expect(res.status).toBe(200);
    expect(res.body.data.execution).toMatchObject({
      mode: "GRAPH",
      semanticUsed: false,
      graphUsed: true,
      structuredUsed: false,
      aggregationMode: "INTERSECTION",
      sourcesUsed: ["NEO4J"],
    });
    expect(res.body.data.count).toBeGreaterThan(0);
    expect(res.body.data.results.map((item) => item.entity?.slug)).toContain("ichigo-kurosaki");

    for (const item of res.body.data.results) {
      expect(item.matchedBy).toEqual(["GRAPH"]);
      expect(item.metadata).toMatchObject({
        relationship: "FOUGHT",
        targetSlug: "kenpachi-zaraki",
        hops: 1,
      });
      expect(item.scores).toMatchObject({
        semantic: null,
        graph: 1,
        structured: null,
      });
    }
  });

  it("should intersect graph and structured filters without adding semantic search when no semantic residue exists", async () => {
    const res = await request(app).get("/api/v1/search?q=espada+who+fought+ichigo&mode=AUTO&limit=5");

    expect(res.status).toBe(200);
    expect(res.body.data.execution).toMatchObject({
      mode: "HYBRID",
      semanticUsed: false,
      graphUsed: true,
      structuredUsed: true,
      aggregationMode: "INTERSECTION",
      sourcesUsed: ["NEO4J", "POSTGRES"],
    });
    expect(res.body.data.count).toBe(1);
    expect(res.body.data.results).toHaveLength(1);

    const [result] = res.body.data.results;
    expect(result.entity?.slug).toBe("grimmjow-jaegerjaquez");
    expect(result.matchedBy).toEqual(["GRAPH", "STRUCTURED"]);
    expect(result.metadata).toMatchObject({
      relationship: "FOUGHT",
      targetSlug: "ichigo-kurosaki",
      race: "Arrancar",
      organization: "Espada",
      slug: "grimmjow-jaegerjaquez",
    });
    expect(result.scores).toMatchObject({
      semantic: null,
      graph: 1,
      structured: 1,
    });
  });

  it("should require semantic, graph, and structured agreement for descriptive hybrid queries", async () => {
    const res = await request(app).get("/api/v1/search?q=espada+who+fought+ichigo+and+are+brutal&mode=AUTO&limit=5");

    expect(res.status).toBe(200);
    expect(res.body.data.execution).toMatchObject({
      mode: "HYBRID",
      semanticUsed: true,
      graphUsed: true,
      structuredUsed: true,
      aggregationMode: "INTERSECTION",
      sourcesUsed: ["PGVECTOR", "NEO4J", "POSTGRES"],
    });
    expect(res.body.data.count).toBe(1);

    const [result] = res.body.data.results;
    expect(result.entity?.slug).toBe("grimmjow-jaegerjaquez");
    expect(result.matchedBy).toEqual(["SEMANTIC", "GRAPH", "STRUCTURED"]);
    expect(result.scores.semantic).toEqual(expect.any(Number));
    expect(result.scores.semantic).toBeGreaterThanOrEqual(0.4);
    expect(result.scores.graph).toBe(1);
    expect(result.scores.structured).toBe(1);
  });

  it("should respect hydrate=false and return unhydrated results", async () => {
    const res = await request(app).get("/api/v1/search?q=ichigo&hydrate=false&limit=2");
    expect(res.status).toBe(200);
    expect(res.body.data.count).toBeGreaterThan(0);

    for (const item of res.body.data.results) {
      expect(item).not.toHaveProperty("entity");
    }
  });
});
