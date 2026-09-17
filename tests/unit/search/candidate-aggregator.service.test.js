import { describe, it, expect } from "vitest";
import { candidateAggregatorService } from "../../../src/services/search/candidate-aggregator.service.js";

describe("CandidateAggregatorService", () => {
  it("should aggregate candidates via INTERSECTION correctly", () => {
    const semantic = [
      { entityId: "1", entityType: "CHARACTER", similarity: 0.85 },
      { entityId: "2", entityType: "CHARACTER", similarity: 0.80 },
      { entityId: "3", entityType: "CHARACTER", similarity: 0.75 },
    ];

    const graph = [
      { entityId: "2", entityType: "CHARACTER", graphScore: 1.0 },
      { entityId: "3", entityType: "CHARACTER", graphScore: 1.0 },
      { entityId: "4", entityType: "CHARACTER", graphScore: 1.0 },
    ];

    const aggregated = candidateAggregatorService.aggregate({
      semanticCandidates: semantic,
      graphCandidates: graph,
      aggregationMode: "INTERSECTION",
    });

    expect(aggregated).toHaveLength(2);
    expect(aggregated.map((c) => c.entityId).sort()).toEqual(["2", "3"]);
    expect(aggregated[0].matchedBy).toContain("SEMANTIC");
    expect(aggregated[0].matchedBy).toContain("GRAPH");
  });

  it("should aggregate candidates via UNION correctly", () => {
    const semantic = [
      { entityId: "1", entityType: "CHARACTER", similarity: 0.85 },
    ];
    const graph = [
      { entityId: "2", entityType: "CHARACTER", graphScore: 1.0 },
    ];

    const aggregated = candidateAggregatorService.aggregate({
      semanticCandidates: semantic,
      graphCandidates: graph,
      aggregationMode: "UNION",
    });

    expect(aggregated).toHaveLength(2);
    expect(aggregated.map((c) => c.entityId).sort()).toEqual(["1", "2"]);
  });

  it("should intersect semantic, graph, and structured candidates when requested", () => {
    const semantic = [
      { entityId: "1", entityType: "CHARACTER", similarity: 0.85 },
      { entityId: "2", entityType: "CHARACTER", similarity: 0.80 },
    ];
    const graph = [
      { entityId: "2", entityType: "CHARACTER", graphScore: 1.0 },
      { entityId: "3", entityType: "CHARACTER", graphScore: 1.0 },
    ];
    const structured = [
      { entityId: "2", entityType: "CHARACTER", structuredScore: 1.0 },
      { entityId: "4", entityType: "CHARACTER", structuredScore: 1.0 },
    ];

    const aggregated = candidateAggregatorService.aggregate({
      semanticCandidates: semantic,
      graphCandidates: graph,
      structuredCandidates: structured,
      aggregationMode: "INTERSECTION",
    });

    expect(aggregated).toHaveLength(1);
    expect(aggregated[0].entityId).toBe("2");
    expect(aggregated[0].matchedBy).toEqual(["SEMANTIC", "GRAPH", "STRUCTURED"]);
  });

  it("should return no intersection when an intentionally queried source is empty", () => {
    const aggregated = candidateAggregatorService.aggregate({
      semanticCandidates: [
        { entityId: "1", entityType: "CHARACTER", similarity: 0.85 },
      ],
      graphCandidates: [],
      structuredCandidates: [
        { entityId: "1", entityType: "CHARACTER", structuredScore: 1.0 },
      ],
      aggregationMode: "INTERSECTION",
      activeSources: ["SEMANTIC", "GRAPH", "STRUCTURED"],
    });

    expect(aggregated).toEqual([]);
  });
});
