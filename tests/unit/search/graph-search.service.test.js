import { describe, it, expect, vi, beforeEach } from "vitest";
import neo4j from "neo4j-driver";

const runCypher = vi.fn();

vi.mock("../../../src/database/neo4j.js", () => ({
  runCypher,
}));

const { graphSearchService } = await import("../../../src/services/search/graph-search.service.js");
const { GRAPH_RELATIONSHIPS } = await import("../../../src/services/search/query-classifier.service.js");

describe("GraphSearchService", () => {
  beforeEach(() => {
    runCypher.mockReset();
  });

  it("should pass Neo4j integer limits to Cypher queries", async () => {
    runCypher.mockResolvedValue({ records: [] });

    await graphSearchService.searchGraphCandidates({
      graphConstraints: [{ relationship: GRAPH_RELATIONSHIPS.FOUGHT, targetSlug: "kenpachi-zaraki" }],
      limit: 5,
    });

    expect(runCypher).toHaveBeenCalledWith(
      expect.stringContaining("LIMIT $limit"),
      expect.objectContaining({
        targetSlug: "kenpachi-zaraki",
        limit: expect.objectContaining({ low: 5 }),
      }),
    );
    expect(neo4j.isInt(runCypher.mock.calls[0][1].limit)).toBe(true);
  });

  it("requires candidates to satisfy every graph constraint", async () => {
    const record = (entityId) => ({
      get: (field) => field === "entityId" ? entityId : "CHARACTER",
    });
    runCypher
      .mockResolvedValueOnce({ records: [record("shared"), record("fight-only")] })
      .mockResolvedValueOnce({ records: [record("shared"), record("training-only")] });

    const results = await graphSearchService.searchGraphCandidates({
      graphConstraints: [
        { relationship: GRAPH_RELATIONSHIPS.FOUGHT, targetSlug: "ichigo-kurosaki" },
        { relationship: GRAPH_RELATIONSHIPS.TRAINED_BY, targetSlug: "kisuke-urahara" },
      ],
      limit: 10,
    });

    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({
      entityId: "shared",
      graphMetadata: {
        hops: 2,
        constraints: [
          { relationship: "FOUGHT", targetSlug: "ichigo-kurosaki", hops: 1 },
          { relationship: "TRAINED_BY", targetSlug: "kisuke-urahara", hops: 1 },
        ],
      },
    });
  });

  it("returns no candidates when any requested graph constraint fails", async () => {
    const record = { get: (field) => field === "entityId" ? "shared" : "CHARACTER" };
    runCypher
      .mockResolvedValueOnce({ records: [record] })
      .mockRejectedValueOnce(new Error("Neo4j unavailable"));

    const results = await graphSearchService.searchGraphCandidates({
      graphConstraints: [
        { relationship: GRAPH_RELATIONSHIPS.FOUGHT, targetSlug: "ichigo-kurosaki" },
        { relationship: GRAPH_RELATIONSHIPS.TRAINED_BY, targetSlug: "kisuke-urahara" },
      ],
    });

    expect(results).toEqual([]);
  });
});
