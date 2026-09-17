import {
  EMBEDDING_DIMENSIONS,
  MAX_BATCH_SIZE,
  TRANSFORMERS_EMBEDDING_MODEL,
} from "./embedding.constant.js";
import { pipeline } from "@huggingface/transformers";

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

function toVectorArray(output) {
  const raw = typeof output?.tolist === "function"
    ? output.tolist()
    : Array.isArray(output)
      ? output
      : Array.from(output?.data || []);

  if (!Array.isArray(raw)) {
    throw new Error("Malformed response received from Transformers.js embedding pipeline");
  }

  if (Array.isArray(raw[0])) {
    return raw;
  }

  return [raw];
}

export class TransformersEmbeddingProvider {
  /**
   * @param {Object} [options]
   * @param {string} [options.model]
   * @param {number} [options.dimensions]
   * @param {Function} [options.pipelineFn] Optional custom pipeline factory for tests
   */
  constructor(options = {}) {
    this.model = options.model || process.env.TRANSFORMERS_EMBEDDING_MODEL || TRANSFORMERS_EMBEDDING_MODEL;
    this.dimensions =
      Number(options.dimensions || process.env.EMBEDDING_DIMENSIONS) ||
      EMBEDDING_DIMENSIONS;
    this.pipelineFn = options.pipelineFn || pipeline;
    this.extractorPromise = null;
  }

  async getExtractor() {
    if (!this.extractorPromise) {
      this.extractorPromise = this.pipelineFn("feature-extraction", this.model);
    }
    return this.extractorPromise;
  }

  async generateEmbedding(text) {
    const [vector] = await this.generateEmbeddings([text]);
    return vector;
  }

  async generateEmbeddings(texts) {
    if (!Array.isArray(texts) || texts.length === 0) {
      throw new Error("Input texts must be a non-empty array of strings");
    }

    const allVectors = [];
    const extractor = await this.getExtractor();

    for (let i = 0; i < texts.length; i += MAX_BATCH_SIZE) {
      const batchTexts = texts.slice(i, i + MAX_BATCH_SIZE).map((text, idx) => {
        if (typeof text !== "string" || text.trim().length === 0) {
          throw new Error(`Input text at index ${i + idx} must be a non-empty string`);
        }
        return text.trim();
      });

      const output = await extractor(batchTexts, {
        pooling: "mean",
        normalize: true,
      });
      const vectors = toVectorArray(output).map((vector) =>
        normalizeVector(vector, this.dimensions)
      );

      if (vectors.length !== batchTexts.length) {
        throw new Error(
          `Transformers.js returned ${vectors.length} vectors, expected ${batchTexts.length}`
        );
      }

      allVectors.push(...vectors);
    }

    return allVectors;
  }
}
