-- CreateExtension
CREATE EXTENSION IF NOT EXISTS vector;

-- CreateTable
CREATE TABLE IF NOT EXISTS "semantic_documents" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "entity_type" VARCHAR(50) NOT NULL,
    "entity_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "embedding" vector(384) NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "semantic_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "semantic_documents_entity_type_entity_id_key" ON "semantic_documents"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "semantic_documents_entity_type_idx" ON "semantic_documents"("entity_type");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "idx_semantic_documents_embedding" ON "semantic_documents" USING hnsw ("embedding" vector_cosine_ops);
