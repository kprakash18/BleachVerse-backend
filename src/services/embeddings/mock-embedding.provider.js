import { EMBEDDING_DIMENSIONS } from "./embedding.constant.js";

/**
 * 32-bit FNV-1a hash function for strings
 */
function hashString(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Seeded Mulberry32 pseudo-random number generator
 */
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class MockEmbeddingProvider {
  /**
   * Generates a deterministic, L2-normalized 768-dimensional embedding vector based on input text.
   * @param {string} text
   * @returns {Promise<number[]>}
   */
  async generateEmbedding(text) {
    const [vector] = await this.generateEmbeddings([text]);
    return vector;
  }

  /**
   * Generates deterministic embeddings for multiple texts.
   * @param {string[]} texts
   * @returns {Promise<number[][]>}
   */
  async generateEmbeddings(texts) {
    if (!Array.isArray(texts)) {
      throw new Error("Input texts must be an array");
    }
    return Promise.all(
      texts.map(async (text) => {
        if (typeof text !== "string" || text.trim().length === 0) {
          throw new Error("Input text must be a non-empty string");
        }

        const seed = hashString(text.trim());
        const rng = mulberry32(seed);

        const rawVector = new Array(EMBEDDING_DIMENSIONS);
        let sumSquares = 0;

        for (let i = 0; i < EMBEDDING_DIMENSIONS; i++) {
          const val = rng() * 2 - 1;
          rawVector[i] = val;
          sumSquares += val * val;
        }

        const magnitude = Math.sqrt(sumSquares);
        return rawVector.map((val) => val / magnitude);
      })
    );
  }
}
