import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const client = new Client({ connectionString });

async function createHnswIndex() {
  console.log("Connecting to PostgreSQL...");
  await client.connect();

  try {
    console.log("Creating HNSW index on semantic_documents(embedding vector_cosine_ops)...");
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_semantic_documents_embedding 
      ON semantic_documents 
      USING hnsw (embedding vector_cosine_ops);
    `);

    const indexRes = await client.query(`
      SELECT indexname, indexdef 
      FROM pg_indexes 
      WHERE tablename = 'semantic_documents';
    `);

    console.log("Verified semantic_documents indexes:");
    console.table(indexRes.rows);

    console.log("(HNSW Index Creation) completed successfully!");
  } catch (err) {
    console.error("Failed to create HNSW index:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

createHnswIndex();
