import { queueReindexEntity, queueDeleteEntity } from "../../queues/semantic-index.queue.js";

export class SemanticIndexService {
  /**
   * Asynchronously triggers re-indexing for an entity via the BullMQ background queue.
   * Does NOT block HTTP response.
   * @param {string} entityType CHARACTER | FIGHT | QUOTE | ARC | ORGANIZATION | POWER | TRANSFORMATION
   * @param {string} entityId Primary UUID of the entity
   */
  async reindexEntity(entityType, entityId) {
    if (!entityType || !entityId) return;

    try {
      await queueReindexEntity(entityType, entityId);
    } catch (err) {
      console.warn(`[SemanticIndexService] Failed to dispatch reindex job for ${entityType} (${entityId}):`, err.message);
    }
  }

  /**
   * Asynchronously triggers vector deletion for an entity via the BullMQ background queue.
   * Does NOT block HTTP response.
   * @param {string} entityType
   * @param {string} entityId
   */
  async deleteEntityEmbedding(entityType, entityId) {
    if (!entityType || !entityId) return;

    try {
      await queueDeleteEntity(entityType, entityId);
    } catch (err) {
      console.warn(`[SemanticIndexService] Failed to dispatch delete job for ${entityType} (${entityId}):`, err.message);
    }
  }
}

export const semanticIndexService = new SemanticIndexService();
