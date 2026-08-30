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
});
