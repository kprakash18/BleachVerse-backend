import { describe, it, expect } from "vitest";
import { searchRankingService } from "../../../src/services/search/search-ranking.service.js";

describe("SearchRankingService", () => {
  it("should rank candidates in INTERSECTION mode with graph confirmation boost", () => {
    const candidates = [
      {
        entityId: "1",
        entityType: "CHARACTER",
        scores: { semantic: 0.8, graph: 1.0 },
      },
      {
        entityId: "2",
        entityType: "CHARACTER",
        scores: { semantic: 0.85, graph: null },
      },
    ];

    const ranked = searchRankingService.rank(candidates, "INTERSECTION");
    expect(ranked[0].entityId).toBe("1"); // 0.8 + 0.1 = 0.90 beats 0.85
    expect(ranked[0].scores.final).toBe(0.9);
    expect(ranked[1].scores.final).toBe(0.85);
  });

  it("should rank candidates in UNION mode with weighted blend", () => {
    const candidates = [
      {
        entityId: "1",
        entityType: "CHARACTER",
        scores: { semantic: 1.0, graph: null },
      },
      {
        entityId: "2",
        entityType: "CHARACTER",
        scores: { semantic: null, graph: 1.0 },
      },
    ];

    const ranked = searchRankingService.rank(candidates, "UNION");
    expect(ranked[0].entityId).toBe("1"); // 1.0 * 0.75 = 0.75
    expect(ranked[0].scores.final).toBe(0.75);
    expect(ranked[1].scores.final).toBe(0.25); // 1.0 * 0.25 = 0.25
  });

  it("should include structured score when present", () => {
    const candidates = [
      {
        entityId: "1",
        entityType: "CHARACTER",
        scores: { semantic: 0.7, graph: 1.0, structured: 1.0 },
      },
      {
        entityId: "2",
        entityType: "CHARACTER",
        scores: { semantic: 0.8, graph: null, structured: null },
      },
    ];

    const ranked = searchRankingService.rank(candidates, "UNION");
    expect(ranked[0].entityId).toBe("1");
    expect(ranked[0].scores.final).toBe(0.805);
  });
});
