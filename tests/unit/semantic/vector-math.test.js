import { describe, it, expect, beforeAll, afterAll } from "vitest";
import prisma from "../../../src/database/prisma.js";
import { EMBEDDING_DIMENSIONS } from "../../../src/services/embeddings/embedding.constants.js";

// Helper to create a 768-dimensional unit vector
const createVector = (nonZeroIndex, value = 1.0) => {
  const vec = new Array(EMBEDDING_DIMENSIONS).fill(0);
  if (Array.isArray(nonZeroIndex)) {
    for (const [idx, val] of nonZeroIndex) {
      vec[idx] = val;
    }
  } else {
    vec[nonZeroIndex] = value;
  }
  return `[${vec.join(",")}]`;
};

describe("pgvector Cosine Distance Mathematical Verification", () => {
  const testIds = {
    A: "00000000-0000-0000-0000-000000000001",
    B: "00000000-0000-0000-0000-000000000002",
    C: "00000000-0000-0000-0000-000000000003",
    D: "00000000-0000-0000-0000-000000000004",
  };

  const vectorA = createVector(0, 1.0); // Unit vector in dimension 0
  const vectorB = createVector(0, 1.0); // Identical to A
  const vectorC = createVector(1, 1.0); // Orthogonal to A (dimension 1)
  const vectorD = createVector([[0, 0.70710678], [1, 0.70710678]]); // 45-deg angle to A

  beforeAll(async () => {
    // Clean up any existing test records
    await prisma.$executeRaw`
      DELETE FROM semantic_documents WHERE entity_type = 'TEST_ENTITY';
    `;

    const testRows = [
      { id: testIds.A, label: "A", vec: vectorA, name: "Test Vector A" },
      { id: testIds.B, label: "B", vec: vectorB, name: "Test Vector B" },
      { id: testIds.C, label: "C", vec: vectorC, name: "Test Vector C" },
      { id: testIds.D, label: "D", vec: vectorD, name: "Test Vector D" },
    ];

    for (const row of testRows) {
      await prisma.$executeRaw`
        INSERT INTO semantic_documents (id, entity_type, entity_id, content, embedding, metadata)
        VALUES (gen_random_uuid()::text, 'TEST_ENTITY', ${row.id}, ${row.name}, ${row.vec}::vector, ${JSON.stringify({ label: row.label })}::jsonb)
        ON CONFLICT (entity_type, entity_id) DO UPDATE 
        SET embedding = EXCLUDED.embedding, content = EXCLUDED.content;
      `;
    }
  });

  afterAll(async () => {
    await prisma.$executeRaw`
      DELETE FROM semantic_documents WHERE entity_type = 'TEST_ENTITY';
    `;
  });

  it("should calculate exact cosine distance (0.0) and similarity (1.0) for identical vectors (A ↔ A & A ↔ B)", async () => {
    const results = await prisma.$queryRaw`
      SELECT 
        entity_id,
        (embedding <=> ${vectorA}::vector) AS distance,
        1 - (embedding <=> ${vectorA}::vector) AS similarity
      FROM semantic_documents
      WHERE entity_type = 'TEST_ENTITY' AND entity_id IN (${testIds.A}, ${testIds.B})
      ORDER BY distance ASC;
    `;

    expect(results.length).toBe(2);
    for (const row of results) {
      expect(Number(row.distance)).toBeCloseTo(0.0, 4);
      expect(Number(row.similarity)).toBeCloseTo(1.0, 4);
    }
  });

  it("should calculate exact cosine distance (1.0) and similarity (0.0) for orthogonal vectors (A ↔ C)", async () => {
    const results = await prisma.$queryRaw`
      SELECT 
        entity_id,
        (embedding <=> ${vectorA}::vector) AS distance,
        1 - (embedding <=> ${vectorA}::vector) AS similarity
      FROM semantic_documents
      WHERE entity_type = 'TEST_ENTITY' AND entity_id = ${testIds.C};
    `;

    expect(results.length).toBe(1);
    expect(Number(results[0].distance)).toBeCloseTo(1.0, 4);
    expect(Number(results[0].similarity)).toBeCloseTo(0.0, 4);
  });

  it("should calculate intermediate cosine distance and similarity for 45-degree vector (A ↔ D)", async () => {
    const results = await prisma.$queryRaw`
      SELECT 
        entity_id,
        (embedding <=> ${vectorA}::vector) AS distance,
        1 - (embedding <=> ${vectorA}::vector) AS similarity
      FROM semantic_documents
      WHERE entity_type = 'TEST_ENTITY' AND entity_id = ${testIds.D};
    `;

    expect(results.length).toBe(1);
    // cos(45 deg) ≈ 0.70710678
    expect(Number(results[0].similarity)).toBeCloseTo(0.7071, 3);
    expect(Number(results[0].distance)).toBeCloseTo(1 - 0.7071, 3);
  });

  it("should correctly rank results by cosine distance in ascending order", async () => {
    const results = await prisma.$queryRaw`
      SELECT 
        entity_id,
        1 - (embedding <=> ${vectorA}::vector) AS similarity
      FROM semantic_documents
      WHERE entity_type = 'TEST_ENTITY'
      ORDER BY (embedding <=> ${vectorA}::vector) ASC;
    `;

    expect(results.length).toBe(4);
    // Expected order: A & B (similarity 1.0) -> D (similarity ~0.707) -> C (similarity 0.0)
    expect(Number(results[0].similarity)).toBeCloseTo(1.0, 4);
    expect(Number(results[1].similarity)).toBeCloseTo(1.0, 4);
    expect(Number(results[2].similarity)).toBeCloseTo(0.7071, 3);
    expect(Number(results[3].similarity)).toBeCloseTo(0.0, 4);
  });

  it("should filter candidates by similarity threshold (maxDistance = 1 - threshold)", async () => {
    const similarityThreshold = 0.7; // Only A, B, and D should pass (sim >= 0.7)
    const maxDistance = 1 - similarityThreshold;

    const results = await prisma.$queryRaw`
      SELECT 
        entity_id,
        1 - (embedding <=> ${vectorA}::vector) AS similarity
      FROM semantic_documents
      WHERE entity_type = 'TEST_ENTITY'
        AND (embedding <=> ${vectorA}::vector) <= ${maxDistance}
      ORDER BY (embedding <=> ${vectorA}::vector) ASC;
    `;

    expect(results.length).toBe(3);
    const returnedIds = results.map((r) => r.entity_id);
    expect(returnedIds).toContain(testIds.A);
    expect(returnedIds).toContain(testIds.B);
    expect(returnedIds).toContain(testIds.D);
    expect(returnedIds).not.toContain(testIds.C); // Orthogonal vector correctly filtered out
  });
});
