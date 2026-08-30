import "dotenv/config";
import prisma from "../src/database/prisma.js";
import { embeddingService } from "../src/services/embeddings/embedding.service.js";
import { buildSemanticDocument, BUILDERS_MAP } from "../src/semantic/builders/index.js";

const BATCH_SIZE = 50;

/**
 * Fetches fully hydrated entities from PostgreSQL with all required relations.
 */
async function fetchHydratedEntities(entityType) {
  switch (entityType) {
    case "CHARACTER":
      return prisma.character.findMany({
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
      return prisma.fight.findMany({
        include: {
          arc: true,
          location: true,
          winner: true,
          episode: true,
          participants: { include: { character: true } },
        },
      });

    case "QUOTE":
      return prisma.quote.findMany({
        include: {
          character: true,
          arc: true,
          episode: true,
        },
      });

    case "ARC":
      return prisma.arc.findMany({
        include: {
          fights: { select: { title: true } },
        },
      });

    case "ORGANIZATION":
      return prisma.organization.findMany({
        include: {
          parent: true,
          children: true,
          members: { include: { character: true } },
        },
      });

    case "POWER":
      return prisma.power.findMany({
        include: {
          character: true,
          transformation: true,
        },
      });

    case "TRANSFORMATION":
      return prisma.transformation.findMany({
        include: {
          character: true,
          zanpakuto: true,
          powers: true,
          firstEpisode: true,
          firstFight: true,
        },
      });

    default:
      throw new Error(`Unsupported entity type: ${entityType}`);
  }
}

/**
 * Bulk indexes all entities of a given type into semantic_documents.
 */
async function indexEntityType(entityType) {
  console.log(`\n========================================`);
  console.log(`[Indexing ${entityType}] Fetching entities from database...`);

  const entities = await fetchHydratedEntities(entityType);
  const total = entities.length;
  console.log(`Found ${total} ${entityType} records to process.`);

  if (total === 0) {
    return { indexed: 0, failed: 0 };
  }

  let indexedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < total; i += BATCH_SIZE) {
    const chunk = entities.slice(i, i + BATCH_SIZE);
    const validDocs = [];

    // 1. Build document representations
    for (const entity of chunk) {
      try {
        const doc = buildSemanticDocument(entityType, entity);
        validDocs.push(doc);
      } catch (err) {
        console.error(`  ⚠️ Failed to build document for ${entityType} (ID: ${entity.id}):`, err.message);
        failedCount++;
      }
    }

    if (validDocs.length === 0) continue;

    // 2. Generate embeddings in batch
    let embeddings = [];
    try {
      const texts = validDocs.map((d) => d.content);
      embeddings = await embeddingService.generateEmbeddings(texts);
    } catch (err) {
      console.error(`  ❌ Failed to generate embeddings for batch ${i / BATCH_SIZE + 1}:`, err.message);
      failedCount += validDocs.length;
      continue;
    }

    // 3. Upsert into semantic_documents
    for (let j = 0; j < validDocs.length; j++) {
      const doc = validDocs[j];
      const vector = embeddings[j];
      const vectorSql = `[${vector.join(",")}]`;

      try {
        await prisma.$executeRaw`
          INSERT INTO semantic_documents (id, entity_type, entity_id, content, embedding, metadata, updated_at)
          VALUES (
            gen_random_uuid()::text,
            ${doc.entityType},
            ${doc.entityId},
            ${doc.content},
            ${vectorSql}::vector,
            ${JSON.stringify(doc.metadata)}::jsonb,
            NOW()
          )
          ON CONFLICT (entity_type, entity_id) DO UPDATE 
          SET content = EXCLUDED.content,
              embedding = EXCLUDED.embedding,
              metadata = EXCLUDED.metadata,
              updated_at = NOW();
        `;
        indexedCount++;
      } catch (err) {
        console.error(`  ⚠️ Failed to upsert ${doc.entityType} ${doc.entityId}:`, err.message);
        failedCount++;
      }
    }

    console.log(`  Progress: ${Math.min(i + BATCH_SIZE, total)} / ${total} ${entityType} records processed.`);
    // Small inter-batch delay to stay well within free tier rate limits
    if (i + BATCH_SIZE < total) {
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  }

  console.log(`[${entityType}] Complete: ${indexedCount} indexed, ${failedCount} failed.`);
  return { indexed: indexedCount, failed: failedCount };
}

/**
 * Main execution pipeline for all semantic entities.
 */
async function runSemanticIndexingPipeline() {
  const startTime = Date.now();
  console.log(`\n🚀 Starting BleachVerse Bulk Semantic Indexing Pipeline...`);

  const entityTypes = Object.keys(BUILDERS_MAP);
  const summary = {};

  try {
    for (const entityType of entityTypes) {
      const result = await indexEntityType(entityType);
      summary[entityType] = result;
    }

    const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n========================================`);
    console.log(`🎉 Semantic Indexing Pipeline Finished in ${elapsedSec}s!`);
    console.table(summary);

    // Verify row count in database
    const totalDocs = await prisma.$queryRaw`
      SELECT entity_type, count(*)::int as count 
      FROM semantic_documents 
      GROUP BY entity_type;
    `;
    console.log(`\n📊 Active Semantic Documents in PostgreSQL:`);
    console.table(totalDocs);
  } catch (err) {
    console.error("Fatal error during semantic indexing pipeline:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runSemanticIndexingPipeline();
