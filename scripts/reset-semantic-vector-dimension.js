import "dotenv/config";
import prisma from "../src/database/prisma.js";
import { EMBEDDING_DIMENSIONS } from "../src/services/embeddings/embedding.constant.js";

async function main() {
  console.log(`Resetting semantic_documents.embedding to vector(${EMBEDDING_DIMENSIONS})...`);

  await prisma.$executeRawUnsafe(`
    DROP INDEX IF EXISTS idx_semantic_documents_embedding;
  `);

  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE semantic_documents;
  `);

  await prisma.$executeRawUnsafe(`
    ALTER TABLE semantic_documents
    DROP COLUMN IF EXISTS embedding;
  `);

  await prisma.$executeRawUnsafe(`
    ALTER TABLE semantic_documents
    ADD COLUMN embedding vector(${EMBEDDING_DIMENSIONS}) NOT NULL;
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS idx_semantic_documents_embedding
    ON semantic_documents
    USING hnsw (embedding vector_cosine_ops);
  `);

  console.log("Semantic vector column reset complete. Re-run npm run semantic:index next.");
}

main()
  .catch((err) => {
    console.error("Failed to reset semantic vector dimension:", err.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
