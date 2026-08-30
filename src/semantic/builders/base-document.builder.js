export class BaseDocumentBuilder {
  /**
   * Transforms a hydrated database entity into a semantic document.
   * @param {Object} entity
   * @returns {{ entityType: string, entityId: string, content: string, metadata: Object }}
   */
  build(entity) {
    throw new Error("build() must be implemented by subclass builder");
  }

  /**
   * Helper to construct a standardized semantic document payload.
   * @param {Object} params
   * @param {string} params.entityType
   * @param {string} params.entityId
   * @param {string} params.content
   * @param {Object} [params.metadata]
   * @returns {{ entityType: string, entityId: string, content: string, metadata: Object }}
   */
  createDocument({ entityType, entityId, content, metadata = {} }) {
    if (!entityType || typeof entityType !== "string") {
      throw new Error("entityType is required and must be a string");
    }
    if (!entityId || typeof entityId !== "string") {
      throw new Error("entityId is required and must be a string");
    }
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      throw new Error("content is required and must be a non-empty string");
    }

    return {
      entityType,
      entityId,
      content: content.trim(),
      metadata,
    };
  }
}
