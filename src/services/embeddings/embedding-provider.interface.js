export class EmbeddingProvider {
  /**
   * Generates a 1536-dimensional embedding vector for a single text.
   * @param {string} text
   * @returns {Promise<number[]>}
   */
  async generateEmbedding(text) {
    throw new Error("generateEmbedding() must be implemented by provider");
  }

  /**
   * Generates 1536-dimensional embedding vectors for an array of texts.
   * @param {string[]} texts
   * @returns {Promise<number[][]>}
   */
  async generateEmbeddings(texts) {
    throw new Error("generateEmbeddings() must be implemented by provider");
  }
}
