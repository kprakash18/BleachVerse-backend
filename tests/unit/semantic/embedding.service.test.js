import { describe, it, expect, vi } from "vitest";
import { EmbeddingService } from "../../../src/services/embeddings/embedding.service.js";
import { MockEmbeddingProvider } from "../../../src/services/embeddings/mock-embedding.provider.js";
import { GeminiEmbeddingProvider } from "../../../src/services/embeddings/gemini-embedding.provider.js";
import { TransformersEmbeddingProvider } from "../../../src/services/embeddings/transformers-embedding.provider.js";
import { EMBEDDING_DIMENSIONS } from "../../../src/services/embeddings/embedding.constant.js";

describe("GeminiEmbeddingProvider", () => {
  it("should throw error if apiKey is missing", async () => {
    const provider = new GeminiEmbeddingProvider({ apiKey: "" });
    await expect(provider.generateEmbedding("test")).rejects.toThrow(
      "GEMINI_API_KEY is required for GeminiEmbeddingProvider"
    );
  });

  it("should successfully call batchEmbedContents and normalize configured-dimension vectors", async () => {
    const mockValues = new Array(EMBEDDING_DIMENSIONS).fill(0.1);

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        embeddings: [{ values: mockValues }],
      }),
    });

    const provider = new GeminiEmbeddingProvider({
      apiKey: "gemini-test-key",
      fetchFn: mockFetch,
    });

    const vector = await provider.generateEmbedding("Bankai Tensa Zangetsu");
    expect(vector).toHaveLength(EMBEDDING_DIMENSIONS);

    // Verify L2 normalization
    const sumSquares = vector.reduce((acc, val) => acc + val * val, 0);
    expect(Math.sqrt(sumSquares)).toBeCloseTo(1.0, 5);
  });

  it("should retry on 429 rate limit and succeed when subsequent call succeeds", async () => {
    const mockValues = new Array(EMBEDDING_DIMENSIONS).fill(0.05);

    let calls = 0;
    const mockFetch = vi.fn().mockImplementation(async () => {
      calls++;
      if (calls === 1) {
        return {
          ok: false,
          status: 429,
          json: async () => ({ error: { message: "Resource exhausted" } }),
        };
      }
      return {
        ok: true,
        json: async () => ({
          embeddings: [{ values: mockValues }],
        }),
      };
    });

    const provider = new GeminiEmbeddingProvider({
      apiKey: "gemini-key",
      initialDelayMs: 10,
      fetchFn: mockFetch,
    });

    const result = await provider.generateEmbedding("Aizen");
    expect(result).toHaveLength(EMBEDDING_DIMENSIONS);
    expect(calls).toBe(2);
  });

  it("should NOT retry on 400 Bad Request or 403 Forbidden", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({ error: { message: "API key expired" } }),
    });

    const provider = new GeminiEmbeddingProvider({
      apiKey: "expired-key",
      initialDelayMs: 10,
      fetchFn: mockFetch,
    });

    await expect(provider.generateEmbedding("Ichigo")).rejects.toThrow(
      "Gemini API: API key expired"
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});

describe("TransformersEmbeddingProvider", () => {
  it("should use Transformers.js feature extraction and return normalized vectors", async () => {
    const mockVector = new Array(EMBEDDING_DIMENSIONS).fill(0.1);
    const extractor = vi.fn().mockResolvedValue({
      tolist: () => [mockVector, mockVector],
    });
    const pipelineFn = vi.fn().mockResolvedValue(extractor);
    const provider = new TransformersEmbeddingProvider({ pipelineFn });

    const vectors = await provider.generateEmbeddings(["Ichigo", "Rukia"]);

    expect(pipelineFn).toHaveBeenCalledWith("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    expect(extractor).toHaveBeenCalledWith(["Ichigo", "Rukia"], {
      pooling: "mean",
      normalize: true,
    });
    expect(vectors).toHaveLength(2);
    expect(vectors[0]).toHaveLength(EMBEDDING_DIMENSIONS);

    const sumSquares = vectors[0].reduce((acc, val) => acc + val * val, 0);
    expect(Math.sqrt(sumSquares)).toBeCloseTo(1.0, 5);
  });
});

describe("EmbeddingService", () => {
  it("should use MockEmbeddingProvider by default or when injected", async () => {
    const mockProvider = new MockEmbeddingProvider();
    const service = new EmbeddingService({ provider: mockProvider });

    const vector = await service.generateEmbedding("Zangetsu");
    expect(vector).toHaveLength(EMBEDDING_DIMENSIONS);
  });

  it("should validate input string length", async () => {
    const service = new EmbeddingService({ provider: new MockEmbeddingProvider() });
    const hugeText = "a".repeat(8001);

    await expect(service.generateEmbedding(hugeText)).rejects.toThrow(
      "Input text exceeds maximum allowed length of 8000 characters"
    );
  });

  it("should process batch embeddings", async () => {
    const service = new EmbeddingService({ provider: new MockEmbeddingProvider() });
    const vectors = await service.generateEmbeddings(["Aizen", "Kisuke"]);
    expect(vectors).toHaveLength(2);
    expect(vectors[0]).toHaveLength(EMBEDDING_DIMENSIONS);
    expect(vectors[1]).toHaveLength(EMBEDDING_DIMENSIONS);
  });

  it("should not silently fall back to mock embeddings unless explicitly enabled", async () => {
    const failingProvider = {
      generateEmbedding: vi.fn().mockRejectedValue(new Error("provider unavailable")),
    };
    const service = new EmbeddingService({ provider: failingProvider });

    await expect(service.generateEmbedding("Zangetsu")).rejects.toThrow("provider unavailable");
  });
});
