import { Worker } from "bullmq";
import prisma from "../database/prisma.js";
import { embeddingService } from "../services/embeddings/embedding.service.js";
import { buildSemanticDocument } from "../semantic/builders/index.js";
import { semanticDocumentRepository } from "../repositories/semantic-document.repository.js";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

let semanticWorker = null;

/**
 * Fetches single hydrated entity from Prisma for semantic document building.
 */
async function fetchEntityForIndexing(entityType, id) {
  switch (entityType.toUpperCase()) {
    case "CHARACTER":
      return prisma.character.findUnique({
        where: { id },
        include: {
          aliases: true,
          races: { include: { race: true } },
          organizations: { include: { organization: true } },
          zanpakutos: true,
          powers: true,
          transformations: true,
        },
      });

    case "FIGHT":
      return prisma.fight.findUnique({
        where: { id },
        include: {
          arc: true,
          location: true,
          winner: true,
          episode: true,
          participants: { include: { character: true } },
        },
      });

    case "QUOTE":
      return prisma.quote.findUnique({
        where: { id },
        include: {
          character: true,
          arc: true,
          episode: true,
        },
      });

    case "ARC":
      return prisma.arc.findUnique({
        where: { id },
        include: {
          fights: { select: { title: true } },
        },
      });

    case "ORGANIZATION":
      return prisma.organization.findUnique({
        where: { id },
        include: {
          parent: true,
          children: true,
          members: { include: { character: true } },
        },
      });

    case "POWER":
      return prisma.power.findUnique({
        where: { id },
        include: {
          character: true,
          transformation: true,
        },
      });

    case "TRANSFORMATION":
      return prisma.transformation.findUnique({
        where: { id },
        include: {
          character: true,
          zanpakuto: true,
          powers: true,
          firstEpisode: true,
          firstFight: true,
        },
      });

    default:
      return null;
  }
}

/**
 * Starts the BullMQ worker for asynchronous semantic re-indexing.
 * @returns {Worker}
 */
export function startSemanticIndexWorker() {
  if (semanticWorker) return semanticWorker;

  const url = new URL(REDIS_URL);
  const connection = {
    host: url.hostname || "localhost",
    port: Number(url.port) || 6379,
    password: url.password || undefined,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  };

  semanticWorker = new Worker(
    "semantic-reindex",
    async (job) => {
      const { entityType, entityId } = job.data;

      if (job.name === "reindex-entity") {
        const entity = await fetchEntityForIndexing(entityType, entityId);
        if (!entity) {
          // If entity is no longer in database, clean up any existing vector
          await semanticDocumentRepository.deleteDocument(entityType, entityId);
          return { status: "deleted_stale" };
        }

        const doc = buildSemanticDocument(entityType, entity);
        const vector = await embeddingService.generateEmbedding(doc.content);

        await semanticDocumentRepository.upsertDocument({
          entityType: doc.entityType,
          entityId: doc.entityId,
          content: doc.content,
          vector,
          metadata: doc.metadata,
        });

        return { status: "indexed", entityType, entityId };
      }

      if (job.name === "delete-entity") {
        await semanticDocumentRepository.deleteDocument(entityType, entityId);
        return { status: "deleted", entityType, entityId };
      }

      console.warn(`[BullMQ Worker] Unrecognized job name: ${job.name}, skipping`);
      return { status: "skipped_unknown" };
    },
    {
      connection,
      concurrency: 2, // Up to 2 concurrent background jobs
    }
  );

  semanticWorker.on("completed", (job) => {
    if (process.env.NODE_ENV !== "test") {
      console.log(`[BullMQ Worker] Completed job ${job.id} (${job.name})`);
    }
  });

  semanticWorker.on("failed", (job, err) => {
    console.error(`[BullMQ Worker] Failed job ${job?.id} (${job?.name}): ${err.message}`);
  });

  return semanticWorker;
}

export async function closeSemanticIndexWorker() {
  if (semanticWorker) {
    await semanticWorker.close();
    semanticWorker = null;
  }
}
