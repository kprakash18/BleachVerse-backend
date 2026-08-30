import prisma from "../database/prisma.js";

export class SemanticDocumentRepository {
  /**
   * Performs vector similarity search against the semantic_documents store.
   * @param {Object} params
   * @param {number[]} params.vector 768-dimensional query vector
   * @param {string} [params.entityType] Optional entity type filter
   * @param {number} [params.threshold=0.5] Minimum similarity score (0.0 to 1.0)
   * @param {number} [params.limit=10] Maximum results to return
   * @returns {Promise<Array<{ entityId: string, entityType: string, similarity: number, metadata: Object }>>}
   */
  async searchSimilar({ vector, entityType = null, threshold = 0.5, limit = 10 }) {
    if (!Array.isArray(vector) || vector.length === 0) {
      return [];
    }

    const vectorSql = `[${vector.join(",")}]`;
    const targetType = entityType ? entityType.toUpperCase() : null;
    const similarityThreshold = Number(threshold) || 0.5;
    const resultLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);

    const rows = await prisma.$queryRaw`
      SELECT 
        id,
        "entityId",
        "entityType",
        metadata,
        ROUND(similarity::numeric, 4) AS similarity,
        distance
      FROM (
        SELECT 
          id,
          entity_id AS "entityId",
          entity_type AS "entityType",
          metadata,
          1 - (embedding <=> ${vectorSql}::vector) AS similarity,
          embedding <=> ${vectorSql}::vector AS distance
        FROM semantic_documents
        WHERE (${targetType}::varchar IS NULL OR entity_type = ${targetType})
      ) candidates
      WHERE similarity >= ${similarityThreshold}
      ORDER BY distance ASC
      LIMIT ${resultLimit};
    `;

    return rows.map((r) => ({
      entityId: r.entityId,
      entityType: r.entityType,
      similarity: Number(r.similarity),
      metadata: r.metadata || {},
    }));
  }

  /**
   * Upserts a semantic document with its embedding vector.
   * @param {Object} params
   * @param {string} params.entityType
   * @param {string} params.entityId
   * @param {string} params.content
   * @param {number[]} params.vector
   * @param {Object} [params.metadata]
   */
  async upsertDocument({ entityType, entityId, content, vector, metadata = {} }) {
    const vectorSql = `[${vector.join(",")}]`;

    await prisma.$executeRaw`
      INSERT INTO semantic_documents (id, entity_type, entity_id, content, embedding, metadata, updated_at)
      VALUES (
        gen_random_uuid()::text,
        ${entityType},
        ${entityId},
        ${content},
        ${vectorSql}::vector,
        ${JSON.stringify(metadata)}::jsonb,
        NOW()
      )
      ON CONFLICT (entity_type, entity_id) DO UPDATE 
      SET content = EXCLUDED.content,
          embedding = EXCLUDED.embedding,
          metadata = EXCLUDED.metadata,
          updated_at = NOW();
    `;
  }

  /**
   * Deletes a semantic document by entity type and ID.
   * @param {string} entityType
   * @param {string} entityId
   */
  async deleteDocument(entityType, entityId) {
    await prisma.$executeRaw`
      DELETE FROM semantic_documents 
      WHERE entity_type = ${entityType} AND entity_id = ${entityId};
    `;
  }
}

export const semanticDocumentRepository = new SemanticDocumentRepository();
