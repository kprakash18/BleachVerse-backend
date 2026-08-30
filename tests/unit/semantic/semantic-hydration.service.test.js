import { describe, it, expect } from "vitest";
import { semanticHydrationService } from "../../../src/services/semantic/semantic-hydration.service.js";
import prisma from "../../../src/database/prisma.js";

describe("SemanticHydrationService", () => {
  it("should return empty array when candidates is empty or not an array", async () => {
    expect(await semanticHydrationService.hydrateCandidates([])).toEqual([]);
    expect(await semanticHydrationService.hydrateCandidates(null)).toEqual([]);
  });

  it("should hydrate character candidates and preserve exact vector similarity ranking", async () => {
    // Fetch 2 real character records to test hydration
    const sampleChars = await prisma.character.findMany({ take: 2 });
    if (sampleChars.length < 2) return;

    const charA = sampleChars[0];
    const charB = sampleChars[1];

    // Mock candidate array in specific ranked order (charB first, then charA)
    const candidates = [
      {
        entityId: charB.id,
        entityType: "CHARACTER",
        similarity: 0.95,
        metadata: { name: charB.name },
      },
      {
        entityId: charA.id,
        entityType: "CHARACTER",
        similarity: 0.72,
        metadata: { name: charA.name },
      },
    ];

    const hydrated = await semanticHydrationService.hydrateCandidates(candidates);

    expect(hydrated).toHaveLength(2);
    // Preserves rank 1 (charB)
    expect(hydrated[0].entityId).toBe(charB.id);
    expect(hydrated[0].similarity).toBe(0.95);
    expect(hydrated[0].entity).not.toBeNull();
    expect(hydrated[0].entity.name).toBe(charB.name);

    // Preserves rank 2 (charA)
    expect(hydrated[1].entityId).toBe(charA.id);
    expect(hydrated[1].similarity).toBe(0.72);
    expect(hydrated[1].entity).not.toBeNull();
    expect(hydrated[1].entity.name).toBe(charA.name);
  });

  it("should gracefully return entity: null when an entityId does not exist in DB", async () => {
    const fakeUuid = "00000000-0000-4000-8000-000000000000";
    const candidates = [
      {
        entityId: fakeUuid,
        entityType: "CHARACTER",
        similarity: 0.88,
        metadata: { name: "NonExistent" },
      },
    ];

    const hydrated = await semanticHydrationService.hydrateCandidates(candidates);
    expect(hydrated).toHaveLength(1);
    expect(hydrated[0].entityId).toBe(fakeUuid);
    expect(hydrated[0].similarity).toBe(0.88);
    expect(hydrated[0].entity).toBeNull();
  });
});
