import { MockEmbeddingProvider } from "./mock-embedding.provider.js";
import { GeminiEmbeddingProvider } from "./gemini-embedding.provider.js";
import { MAX_TEXT_LENGTH } from "./embedding.constant.js";

export class EmbeddingService {
  /**
   * @param {Object} [options]
   * @param {import("./embedding-provider.interface.js").EmbeddingProvider} [options.provider]
   */
  constructor(options = {}) {
    if (options.provider) {
      this.provider = options.provider;
    } else {
      const providerType = (process.env.EMBEDDING_PROVIDER || "").toLowerCase();
      if (providerType === "gemini") {
        this.provider = new GeminiEmbeddingProvider();
      } else if (providerType === "mock") {
        this.provider = new MockEmbeddingProvider();
      } else if (process.env.NODE_ENV === "test" && !process.env.USE_LIVE_GEMINI) {
        // Default to deterministic Mock provider for fast, reliable unit/integration test runs
        this.provider = new MockEmbeddingProvider();
      } else {
        // Default to Gemini if GEMINI_API_KEY exists; otherwise default to Mock
        this.provider = process.env.GEMINI_API_KEY
          ? new GeminiEmbeddingProvider()
          : new MockEmbeddingProvider();
      }
    }
  }

  /**
   * Generates a 768-dimensional embedding vector for a single text.
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
    return this.provider.generateEmbedding(sanitized, options);
  }

  /**
   * Generates 768-dimensional embedding vectors for an array of texts.
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

    return this.provider.generateEmbeddings(sanitizedTexts, options);
  }
}

// Default export singleton instance
export const embeddingService = new EmbeddingService();
