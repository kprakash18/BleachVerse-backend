import { describe, it, expect } from "vitest";
import { semanticDocumentRepository } from "../../../src/repositories/semantic-document.repository.js";

describe("SemanticDocumentRepository", () => {
  it("should return empty array when query vector is empty or not an array", async () => {
    const results = await semanticDocumentRepository.searchSimilar({ vector: [] });
    expect(results).toEqual([]);

    const resultsNull = await semanticDocumentRepository.searchSimilar({ vector: null });
    expect(resultsNull).toEqual([]);
  });

  it("should execute searchSimilar and return structured candidate objects", async () => {
    // Generate sample 768-dimensional unit vector
    const vector = new Array(768).fill(0).map((_, i) => (i === 0 ? 1.0 : 0.0));

    const candidates = await semanticDocumentRepository.searchSimilar({
      vector,
      threshold: 0.0,
      limit: 5,
    });

    expect(Array.isArray(candidates)).toBe(true);
    if (candidates.length > 0) {
      const first = candidates[0];
      expect(first).toHaveProperty("entityId");
      expect(first).toHaveProperty("entityType");
      expect(first).toHaveProperty("similarity");
      expect(typeof first.similarity).toBe("number");
      expect(first).toHaveProperty("metadata");
    }
  });

  it("should filter candidates by entityType", async () => {
    const vector = new Array(768).fill(0).map((_, i) => (i === 0 ? 1.0 : 0.0));

    const candidates = await semanticDocumentRepository.searchSimilar({
      vector,
      entityType: "CHARACTER",
      threshold: 0.0,
      limit: 5,
    });

    for (const c of candidates) {
      expect(c.entityType).toBe("CHARACTER");
    }
  });
});
