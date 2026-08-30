import { Queue } from "bullmq";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

let semanticIndexQueue = null;

export function getSemanticIndexQueue() {
  if (!semanticIndexQueue) {
    // Parse Redis URL for BullMQ connection options
    const url = new URL(REDIS_URL);
    const connection = {
      host: url.hostname || "localhost",
      port: Number(url.port) || 6379,
      password: url.password || undefined,
      maxRetriesPerRequest: null, // Required by BullMQ
      enableReadyCheck: false,
    };

    semanticIndexQueue = new Queue("semantic-reindex", {
      connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
        removeOnComplete: {
          count: 100, // Keep last 100 successful jobs
          age: 3600,  // Or 1 hour
        },
        removeOnFail: {
          count: 200, // Keep last 200 failed jobs for auditing
        },
      },
    });
  }

  return semanticIndexQueue;
}

/**
 * Enqueues an entity re-indexing job.
 * @param {string} entityType
 * @param {string} entityId
 * @returns {Promise<any>}
 */
export async function queueReindexEntity(entityType, entityId) {
  if (!entityType || !entityId) return null;
  try {
    const queue = getSemanticIndexQueue();
    return await queue.add(
      "reindex-entity",
      { entityType: entityType.toUpperCase(), entityId },
      {
        jobId: `reindex:${entityType.toUpperCase()}:${entityId}`, // Deduplicates rapid duplicate updates
      }
    );
  } catch (err) {
    console.warn(`[BullMQ] Failed to enqueue reindex job for ${entityType} (${entityId}):`, err.message);
    return null;
  }
}

/**
 * Enqueues an entity deletion job.
 * @param {string} entityType
 * @param {string} entityId
 * @returns {Promise<any>}
 */
export async function queueDeleteEntity(entityType, entityId) {
  if (!entityType || !entityId) return null;
  try {
    const queue = getSemanticIndexQueue();
    return await queue.add(
      "delete-entity",
      {
        entityType: entityType.toUpperCase(),
        entityId,
      },
      {
        jobId: `delete:${entityType.toUpperCase()}:${entityId}`,
      }
    );
  } catch (err) {
    console.warn(`[BullMQ] Failed to enqueue delete job for ${entityType} (${entityId}):`, err.message);
    return null;
  }
}
