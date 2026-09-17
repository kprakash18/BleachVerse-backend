import { describe, it, expect } from "vitest";
import { MockEmbeddingProvider } from "../../../src/services/embeddings/mock-embedding.provider.js";
import { EMBEDDING_DIMENSIONS } from "../../../src/services/embeddings/embedding.constant.js";

describe("MockEmbeddingProvider", () => {
  const provider = new MockEmbeddingProvider();

  it("should generate a vector with the configured embedding dimensions", async () => {
    const vector = await provider.generateEmbedding("Ichigo Kurosaki");
    expect(vector).toHaveLength(EMBEDDING_DIMENSIONS);
  });

  it("should be deterministic (same input produces identical vector)", async () => {
    const vec1 = await provider.generateEmbedding("Bankai Tensa Zangetsu");
    const vec2 = await provider.generateEmbedding("Bankai Tensa Zangetsu");
    expect(vec1).toEqual(vec2);
  });

  it("should generate different vectors for different text inputs", async () => {
    const vec1 = await provider.generateEmbedding("Ichigo Kurosaki");
    const vec2 = await provider.generateEmbedding("Sosuke Aizen");
    expect(vec1).not.toEqual(vec2);
  });

  it("should produce an L2-normalized vector with magnitude close to 1.0", async () => {
    const vector = await provider.generateEmbedding("Rukia Kuchiki");
    const sumSquares = vector.reduce((acc, val) => acc + val * val, 0);
    const magnitude = Math.sqrt(sumSquares);
    expect(magnitude).toBeCloseTo(1.0, 5);
  });

  it("should reject empty strings and whitespace-only inputs", async () => {
    await expect(provider.generateEmbedding("")).rejects.toThrow("Input text must be a non-empty string");
    await expect(provider.generateEmbedding("   ")).rejects.toThrow("Input text must be a non-empty string");
    await expect(provider.generateEmbedding(null)).rejects.toThrow("Input text must be a non-empty string");
  });

  it("should handle batch embedding generation in identical order", async () => {
    const texts = ["Ichigo", "Rukia", "Chad", "Orihime"];
    const vectors = await provider.generateEmbeddings(texts);
    expect(vectors).toHaveLength(4);

    for (let i = 0; i < texts.length; i++) {
      expect(vectors[i]).toHaveLength(EMBEDDING_DIMENSIONS);
      const single = await provider.generateEmbedding(texts[i]);
      expect(vectors[i]).toEqual(single);
    }
  });
});
