import {
  EMBEDDING_DIMENSIONS,
  GEMINI_EMBEDDING_MODEL,
  MAX_BATCH_SIZE,
} from "./embedding.constant.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";

const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);

/**
 * Normalizes a numeric vector to unit length (L2 norm = 1.0) and verifies exact dimensions.
 */
function normalizeVector(values, targetDimensions = EMBEDDING_DIMENSIONS) {
  if (!Array.isArray(values) || values.length !== targetDimensions) {
    throw new Error(
      `Vector dimension mismatch: expected ${targetDimensions}, got ${values?.length}`
    );
  }

  const sumSquares = values.reduce((acc, val) => acc + val * val, 0);
  const magnitude = Math.sqrt(sumSquares) || 1;
  return values.map((val) => val / magnitude);
}

export class GeminiEmbeddingProvider {
  /**
   * @param {Object} [options]
   * @param {string} [options.apiKey]
   * @param {string} [options.model]
   * @param {number} [options.dimensions]
   * @param {number} [options.maxRetries]
   * @param {number} [options.initialDelayMs]
   * @param {Function} [options.fetchFn] Optional custom fetch for unit testing
   */
  constructor(options = {}) {
    this.apiKey = options.apiKey || process.env.GEMINI_API_KEY;
    this.model = options.model || process.env.GEMINI_EMBEDDING_MODEL || GEMINI_EMBEDDING_MODEL;
    this.dimensions =
      Number(options.dimensions || process.env.EMBEDDING_DIMENSIONS) ||
      EMBEDDING_DIMENSIONS;
    this.maxRetries = options.maxRetries ?? 5;
    this.initialDelayMs = options.initialDelayMs ?? 1000;
    this.fetch = options.fetchFn || globalThis.fetch;
  }

  /**
   * Generates an embedding vector for a single text.
   * @param {string} text
   * @param {Object} [options]
   * @param {boolean} [options.isInteractive=false] Fast failure on 429 without long sleeps
   * @returns {Promise<number[]>}
   */
  async generateEmbedding(text, options = {}) {
    if (typeof text !== "string" || text.trim().length === 0) {
      throw new Error("Input text must be a non-empty string");
    }
    const [vector] = await this.generateEmbeddings([text], options);
    return vector;
  }

  /**
   * Generates embedding vectors for an array of texts in batches.
   * @param {string[]} texts
   * @param {Object} [options]
   * @param {boolean} [options.isInteractive=false] Fast failure on 429 without long sleeps
   * @returns {Promise<number[][]>}
   */
  async generateEmbeddings(texts, options = {}) {
    if (!Array.isArray(texts) || texts.length === 0) {
      throw new Error("Input texts must be a non-empty array of strings");
    }

    for (let i = 0; i < texts.length; i++) {
      if (typeof texts[i] !== "string" || texts[i].trim().length === 0) {
        throw new Error(`Input text at index ${i} must be a non-empty string`);
      }
    }

    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY is required for GeminiEmbeddingProvider");
    }

    const isInteractive = Boolean(options.isInteractive);
    const allVectors = [];

    // Process in batches of MAX_BATCH_SIZE
    for (let i = 0; i < texts.length; i += MAX_BATCH_SIZE) {
      const batchTexts = texts.slice(i, i + MAX_BATCH_SIZE).map((t) => t.trim());
      const batchVectors = await this._fetchBatchWithRetry(batchTexts, isInteractive);
      allVectors.push(...batchVectors);
    }

    return allVectors;
  }

  /**
   * @private
   * Executes a batch request to Gemini's batchEmbedContents endpoint.
   */
  async _fetchBatchWithRetry(batchTexts, isInteractive = false) {
    let attempt = 0;
    let delay = this.initialDelayMs;
    const maxRetries = isInteractive ? 0 : this.maxRetries;

    const formattedModel = this.model.startsWith("models/") ? this.model : `models/${this.model}`;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/${formattedModel}:batchEmbedContents?key=${this.apiKey}`;

    const requests = batchTexts.map((text) => ({
      model: formattedModel,
      content: {
        parts: [{ text }],
      },
      outputDimensionality: this.dimensions,
    }));

    while (attempt <= maxRetries) {
      let isExplicitNonRetryable = false;
      try {
        const response = await this.fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requests }),
        });

        if (!response.ok) {
          const status = response.status;
          let errorMessage = `Google Gemini Embeddings API error (status ${status})`;
          try {
            const errBody = await response.json();
            if (errBody?.error?.message) {
              errorMessage = `Gemini API: ${errBody.error.message}`;
            }
          } catch {
            // Ignore JSON parse error
          }

          // If interactive user request hits 429, fast fail immediately with 503 ApiError
          if (status === 429 && isInteractive) {
            throw new ApiError(
              503,
              errorCodes.SERVICE_UNAVAILABLE || "SEMANTIC_SEARCH_UNAVAILABLE",
              "Semantic search is temporarily unavailable. Please try again shortly."
            );
          }

          if (RETRYABLE_STATUS_CODES.has(status) && attempt < maxRetries) {
            attempt++;
            const retryMatch = errorMessage.match(/Please retry in ([\d\.]+)s/i);
            const waitTimeMs = retryMatch
              ? Math.ceil(parseFloat(retryMatch[1]) + 1) * 1000
              : delay;

            console.warn(`  [Gemini Rate Limit] Cooldown: waiting ${(waitTimeMs / 1000).toFixed(1)}s before retry ${attempt}/${maxRetries}...`);
            await new Promise((resolve) => setTimeout(resolve, waitTimeMs));
            delay *= 2;
            continue;
          }

          isExplicitNonRetryable = true;
          throw new Error(errorMessage);
        }

        const data = await response.json();

        if (!data?.embeddings || !Array.isArray(data.embeddings)) {
          throw new Error("Malformed response received from Google Gemini Embeddings API");
        }

        if (data.embeddings.length !== batchTexts.length) {
          throw new Error(
            `Gemini returned ${data.embeddings.length} vectors, expected ${batchTexts.length}`
          );
        }

        const vectors = data.embeddings.map((item, idx) => {
          if (!item?.values || !Array.isArray(item.values)) {
            throw new Error(`Embedding values at index ${idx} is missing or not an array`);
          }
          return normalizeVector(item.values, this.dimensions);
        });

        return vectors;
      } catch (err) {
        if (err instanceof ApiError || isExplicitNonRetryable) {
          throw err;
        }
        if (attempt < maxRetries) {
          attempt++;
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
          continue;
        }
        throw err;
      }
    }
  }
}
