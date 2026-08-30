import "dotenv/config";
import pg from "pg";

const { Client } = pg;

// Use DIRECT_URL for schema migrations / extension creation
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

const client = new Client({ connectionString });

async function initPgVector() {
  console.log("Connecting to PostgreSQL...");
  await client.connect();

  try {
    console.log("Enabling pgvector extension...");
    await client.query(`CREATE EXTENSION IF NOT EXISTS vector;`);

    const extRes = await client.query(`
      SELECT extname, extversion 
      FROM pg_extension 
      WHERE extname = 'vector';
    `);
    console.log("Verified pgvector extension:", extRes.rows[0]);

    console.log("Creating semantic_documents table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS semantic_documents (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        entity_type VARCHAR(50) NOT NULL,
        entity_id TEXT NOT NULL,
        content TEXT NOT NULL,
        embedding vector(768) NOT NULL,
        metadata JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT uq_entity_document UNIQUE (entity_type, entity_id)
      );

      CREATE INDEX IF NOT EXISTS idx_semantic_documents_entity 
      ON semantic_documents(entity_type, entity_id);
    `);

    const tableRes = await client.query(`
      SELECT column_name, data_type, udt_name 
      FROM information_schema.columns 
      WHERE table_name = 'semantic_documents';
    `);
    console.log("Verified semantic_documents columns:");
    console.table(tableRes.rows);

    console.log("completed successfully!");
  } catch (err) {
    console.error("Failed to initialize pgvector:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

initPgVector();
