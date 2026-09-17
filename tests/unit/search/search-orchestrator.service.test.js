import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  classify: vi.fn(),
  searchSemantic: vi.fn(),
  searchGraphCandidates: vi.fn(),
  searchStructuredCandidates: vi.fn(),
  aggregate: vi.fn(),
  rank: vi.fn(),
  hydrateCandidates: vi.fn(),
}));

vi.mock("../../../src/services/search/query-classifier.service.js", () => ({
  queryClassifierService: {
    classify: mocks.classify,
  },
}));

vi.mock("../../../src/services/semantic/semantic-search.service.js", () => ({
  semanticSearchService: {
    searchSemantic: mocks.searchSemantic,
  },
}));

vi.mock("../../../src/services/search/graph-search.service.js", () => ({
  graphSearchService: {
    searchGraphCandidates: mocks.searchGraphCandidates,
  },
}));

vi.mock("../../../src/services/search/structured-search.service.js", () => ({
  structuredSearchService: {
    searchStructuredCandidates: mocks.searchStructuredCandidates,
  },
}));

vi.mock("../../../src/services/search/candidate-aggregator.service.js", () => ({
  candidateAggregatorService: {
    aggregate: mocks.aggregate,
  },
}));

vi.mock("../../../src/services/search/search-ranking.service.js", () => ({
  searchRankingService: {
    rank: mocks.rank,
  },
}));

vi.mock("../../../src/services/semantic/semantic-hydration.service.js", () => ({
  semanticHydrationService: {
    hydrateCandidates: mocks.hydrateCandidates,
  },
}));

const { searchOrchestratorService } = await import("../../../src/services/search/search-orchestrator.service.js");

const intent = (overrides = {}) => ({
  mode: "SEMANTIC",
  intents: { semantic: true, graph: false, structured: false },
  graphConstraints: [],
  structuredFilters: {},
  semanticQuery: "substitute soul reaper",
  aggregationMode: "UNION",
  ...overrides,
});

const rankedCandidate = {
  entityId: "character-1",
  entityType: "CHARACTER",
  metadata: {},
  scores: { semantic: 0.8, graph: null, structured: null, final: 0.8 },
  matchedBy: ["SEMANTIC"],
};

describe("SearchOrchestratorService", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.searchSemantic.mockResolvedValue({
      results: [{ entityId: "character-1", entityType: "CHARACTER", similarity: 0.8 }],
    });
    mocks.searchGraphCandidates.mockResolvedValue([
      { entityId: "character-1", entityType: "CHARACTER", graphScore: 1 },
    ]);
    mocks.searchStructuredCandidates.mockResolvedValue([
      { entityId: "character-1", entityType: "CHARACTER", structuredScore: 1 },
    ]);
    mocks.aggregate.mockReturnValue([rankedCandidate]);
    mocks.rank.mockReturnValue([rankedCandidate]);
    mocks.hydrateCandidates.mockResolvedValue([{ entity: { id: "character-1", slug: "test-character" } }]);
  });

  it("should route pure semantic AUTO queries only to semantic search", async () => {
    mocks.classify.mockReturnValue(intent());

    const result = await searchOrchestratorService.search({
      query: "substitute soul reaper",
      mode: "AUTO",
      limit: 5,
      hydrate: false,
    });

    expect(mocks.searchSemantic).toHaveBeenCalledWith({
      query: "substitute soul reaper",
      limit: 10,
      threshold: 0.4,
      hydrate: false,
    });
    expect(mocks.searchGraphCandidates).not.toHaveBeenCalled();
    expect(mocks.searchStructuredCandidates).not.toHaveBeenCalled();
    expect(mocks.aggregate).toHaveBeenCalledWith(expect.objectContaining({
      activeSources: ["SEMANTIC"],
      aggregationMode: "UNION",
    }));
    expect(result.execution).toMatchObject({
      mode: "SEMANTIC",
      semanticUsed: true,
      graphUsed: false,
      structuredUsed: false,
      sourcesUsed: ["PGVECTOR"],
    });
  });

  it("should route graph-only AUTO queries only to Neo4j", async () => {
    const graphConstraints = [{ relationship: "FOUGHT", targetSlug: "kenpachi-zaraki" }];
    mocks.classify.mockReturnValue(intent({
      mode: "GRAPH",
      intents: { semantic: false, graph: true, structured: false },
      graphConstraints,
      semanticQuery: "who fought kenpachi",
      aggregationMode: "INTERSECTION",
    }));

    const result = await searchOrchestratorService.search({
      query: "who fought kenpachi",
      mode: "AUTO",
      limit: 5,
      hydrate: false,
    });

    expect(mocks.searchSemantic).not.toHaveBeenCalled();
    expect(mocks.searchGraphCandidates).toHaveBeenCalledWith({
      graphConstraints,
      limit: 10,
    });
    expect(mocks.searchStructuredCandidates).not.toHaveBeenCalled();
    expect(mocks.aggregate).toHaveBeenCalledWith(expect.objectContaining({
      activeSources: ["GRAPH"],
      aggregationMode: "INTERSECTION",
    }));
    expect(result.execution).toMatchObject({
      mode: "GRAPH",
      semanticUsed: false,
      graphUsed: true,
      structuredUsed: false,
      sourcesUsed: ["NEO4J"],
    });
  });

  it("should not run semantic search for graph and structured queries without semantic residue", async () => {
    const graphConstraints = [{ relationship: "FOUGHT", targetSlug: "ichigo-kurosaki" }];
    const structuredFilters = { faction: "ESPADA", race: "ARRANCAR" };
    mocks.classify.mockReturnValue(intent({
      mode: "HYBRID",
      intents: { semantic: false, graph: true, structured: true },
      graphConstraints,
      structuredFilters,
      semanticQuery: "espada who fought ichigo",
      aggregationMode: "INTERSECTION",
    }));

    const result = await searchOrchestratorService.search({
      query: "espada who fought ichigo",
      mode: "AUTO",
      limit: 5,
      hydrate: false,
    });

    expect(mocks.searchSemantic).not.toHaveBeenCalled();
    expect(mocks.searchGraphCandidates).toHaveBeenCalledWith({
      graphConstraints,
      limit: 10,
    });
    expect(mocks.searchStructuredCandidates).toHaveBeenCalledWith({
      structuredFilters,
      limit: 10,
    });
    expect(mocks.aggregate).toHaveBeenCalledWith(expect.objectContaining({
      activeSources: ["GRAPH", "STRUCTURED"],
      aggregationMode: "INTERSECTION",
    }));
    expect(result.execution).toMatchObject({
      mode: "HYBRID",
      semanticUsed: false,
      graphUsed: true,
      structuredUsed: true,
      sourcesUsed: ["NEO4J", "POSTGRES"],
    });
  });

  it("should widen semantic recall for descriptive hybrid queries and require all active sources", async () => {
    const graphConstraints = [{ relationship: "FOUGHT", targetSlug: "ichigo-kurosaki" }];
    const structuredFilters = { faction: "ESPADA", race: "ARRANCAR" };
    mocks.classify.mockReturnValue(intent({
      mode: "HYBRID",
      intents: { semantic: true, graph: true, structured: true },
      graphConstraints,
      structuredFilters,
      semanticQuery: "espada brutal",
      aggregationMode: "INTERSECTION",
    }));

    const result = await searchOrchestratorService.search({
      query: "espada who fought ichigo and are brutal",
      mode: "AUTO",
      limit: 5,
      hydrate: false,
    });

    expect(mocks.searchSemantic).toHaveBeenCalledWith({
      query: "espada brutal",
      limit: 50,
      threshold: 0.4,
      hydrate: false,
    });
    expect(mocks.searchGraphCandidates).toHaveBeenCalledWith({
      graphConstraints,
      limit: 10,
    });
    expect(mocks.searchStructuredCandidates).toHaveBeenCalledWith({
      structuredFilters,
      limit: 10,
    });
    expect(mocks.aggregate).toHaveBeenCalledWith(expect.objectContaining({
      activeSources: ["SEMANTIC", "GRAPH", "STRUCTURED"],
      aggregationMode: "INTERSECTION",
    }));
    expect(result.execution).toMatchObject({
      semanticUsed: true,
      graphUsed: true,
      structuredUsed: true,
      sourcesUsed: ["PGVECTOR", "NEO4J", "POSTGRES"],
    });
  });

  it("should hydrate ranked candidates by default and preserve ranking metadata", async () => {
    mocks.classify.mockReturnValue(intent());

    const result = await searchOrchestratorService.search({
      query: "substitute soul reaper",
      mode: "AUTO",
      limit: 5,
    });

    expect(mocks.hydrateCandidates).toHaveBeenCalledWith([
      {
        entityId: "character-1",
        entityType: "CHARACTER",
        similarity: 0.8,
        metadata: {},
      },
    ]);
    expect(result.results[0]).toMatchObject({
      entityId: "character-1",
      matchedBy: ["SEMANTIC"],
      entity: { id: "character-1", slug: "test-character" },
    });
  });
});
