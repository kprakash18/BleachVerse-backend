import { MockEmbeddingProvider } from "./mock-embedding.provider.js";
import { GeminiEmbeddingProvider } from "./gemini-embedding.provider.js";
import { TransformersEmbeddingProvider } from "./transformers-embedding.provider.js";
import { MAX_TEXT_LENGTH } from "./embedding.constant.js";

export class EmbeddingService {
  /**
   * @param {Object} [options]
   * @param {import("./embedding-provider.interface.js").EmbeddingProvider} [options.provider]
   */
  constructor(options = {}) {
    this.fallbackProvider = new MockEmbeddingProvider();
    if (options.provider) {
      this.provider = options.provider;
    } else {
      const providerType = (process.env.EMBEDDING_PROVIDER || "").toLowerCase();
      if (providerType === "gemini") {
        this.provider = new GeminiEmbeddingProvider();
      } else if (["transformers", "local", "minilm"].includes(providerType)) {
        this.provider = new TransformersEmbeddingProvider();
      } else if (providerType === "mock") {
        this.provider = new MockEmbeddingProvider();
      } else if (process.env.NODE_ENV === "test" && !process.env.USE_LIVE_GEMINI) {
        // Default to deterministic Mock provider for fast, reliable unit/integration test runs
        this.provider = new MockEmbeddingProvider();
      } else {
        // Default to Mock unless a real provider is explicitly configured.
        this.provider = new MockEmbeddingProvider();
      }
    }
    this.allowMockFallback = process.env.EMBEDDING_ALLOW_MOCK_FALLBACK === "true";
  }

  /**
   * Generates an embedding vector for a single text.
   * @param {string} text
   * @param {Object} [options]
   * @returns {Promise<number[]>}
   */
  async generateEmbedding(text, options = {}) {
    if (typeof text !== "string" || text.trim().length === 0) {
      throw new Error("Input text must be a non-empty string");
    }
    const sanitized = text.trim();
    if (sanitized.length > MAX_TEXT_LENGTH) {
      throw new Error(
        `Input text exceeds maximum allowed length of ${MAX_TEXT_LENGTH} characters`
      );
    }
    try {
      return await this.provider.generateEmbedding(sanitized, options);
    } catch (err) {
      if (this.allowMockFallback && this.provider !== this.fallbackProvider) {
        console.warn(
          `[EmbeddingService] Primary embedding provider failed (${err.message}). Falling back to Mock provider.`
        );
        return this.fallbackProvider.generateEmbedding(sanitized, options);
      }
      throw err;
    }
  }

  /**
   * Generates embedding vectors for an array of texts.
   * @param {string[]} texts
   * @param {Object} [options]
   * @returns {Promise<number[][]>}
   */
  async generateEmbeddings(texts, options = {}) {
    if (!Array.isArray(texts) || texts.length === 0) {
      throw new Error("Input texts must be a non-empty array of strings");
    }

    const sanitizedTexts = texts.map((t, idx) => {
      if (typeof t !== "string" || t.trim().length === 0) {
        throw new Error(`Input text at index ${idx} must be a non-empty string`);
      }
      const sanitized = t.trim();
      if (sanitized.length > MAX_TEXT_LENGTH) {
        throw new Error(
          `Input text at index ${idx} exceeds maximum allowed length of ${MAX_TEXT_LENGTH} characters`
        );
      }
      return sanitized;
    });

    try {
      return await this.provider.generateEmbeddings(sanitizedTexts, options);
    } catch (err) {
      if (this.allowMockFallback && this.provider !== this.fallbackProvider) {
        console.warn(
          `[EmbeddingService] Primary embedding provider failed (${err.message}). Falling back to Mock provider.`
        );
        return this.fallbackProvider.generateEmbeddings(sanitizedTexts, options);
      }
      throw err;
    }
  }
}

// Default export singleton instance
export const embeddingService = new EmbeddingService();
