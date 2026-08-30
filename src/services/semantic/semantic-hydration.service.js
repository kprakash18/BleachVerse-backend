import prisma from "../../database/prisma.js";

export class SemanticHydrationService {
  /**
   * Hydrates candidate vector search records with full relational data from PostgreSQL.
   * - Groups candidates by entityType.
   * - Executes at most 7 parallel batch Prisma queries.
   * - Strictly preserves the original vector ranking order.
   * - Gracefully handles deleted/missing entities without throwing errors.
   * @param {Array<{ entityId: string, entityType: string, similarity: number, metadata: Object }>} candidates
   * @returns {Promise<Array<{ entityId: string, entityType: string, similarity: number, metadata: Object, entity: Object | null }>>}
   */
  async hydrateCandidates(candidates) {
    if (!Array.isArray(candidates) || candidates.length === 0) {
      return [];
    }

    const idsByType = {
      CHARACTER: [],
      FIGHT: [],
      QUOTE: [],
      ARC: [],
      ORGANIZATION: [],
      POWER: [],
      TRANSFORMATION: [],
    };

    for (const c of candidates) {
      const type = c.entityType?.toUpperCase();
      if (idsByType[type]) {
        idsByType[type].push(c.entityId);
      }
    }

    // Execute batch queries in parallel
    const [characters, fights, quotes, arcs, orgs, powers, transformations] =
      await Promise.all([
        idsByType.CHARACTER.length > 0
          ? prisma.character.findMany({
              where: { id: { in: idsByType.CHARACTER } },
              include: {
                aliases: true,
                races: { include: { race: true } },
                zanpakutos: true,
              },
            })
          : [],
        idsByType.FIGHT.length > 0
          ? prisma.fight.findMany({
              where: { id: { in: idsByType.FIGHT } },
              include: {
                arc: true,
                location: true,
                winner: true,
                episode: true,
                participants: { include: { character: true } },
              },
            })
          : [],
        idsByType.QUOTE.length > 0
          ? prisma.quote.findMany({
              where: { id: { in: idsByType.QUOTE } },
              include: {
                character: true,
                arc: true,
                episode: true,
              },
            })
          : [],
        idsByType.ARC.length > 0
          ? prisma.arc.findMany({
              where: { id: { in: idsByType.ARC } },
            })
          : [],
        idsByType.ORGANIZATION.length > 0
          ? prisma.organization.findMany({
              where: { id: { in: idsByType.ORGANIZATION } },
              include: {
                parent: true,
                children: true,
              },
            })
          : [],
        idsByType.POWER.length > 0
          ? prisma.power.findMany({
              where: { id: { in: idsByType.POWER } },
              include: {
                character: true,
                transformation: true,
              },
            })
          : [],
        idsByType.TRANSFORMATION.length > 0
          ? prisma.transformation.findMany({
              where: { id: { in: idsByType.TRANSFORMATION } },
              include: {
                character: true,
                zanpakuto: true,
              },
            })
          : [],
      ]);

    // Build map keyed by `entityType:entityId`
    const entityMap = new Map();
    characters.forEach((e) => entityMap.set(`CHARACTER:${e.id}`, e));
    fights.forEach((e) => entityMap.set(`FIGHT:${e.id}`, e));
    quotes.forEach((e) => entityMap.set(`QUOTE:${e.id}`, e));
    arcs.forEach((e) => entityMap.set(`ARC:${e.id}`, e));
    orgs.forEach((e) => entityMap.set(`ORGANIZATION:${e.id}`, e));
    powers.forEach((e) => entityMap.set(`POWER:${e.id}`, e));
    transformations.forEach((e) => entityMap.set(`TRANSFORMATION:${e.id}`, e));

    // Reconstruct candidates preserving exact similarity ranking
    return candidates.map((c) => {
      const type = c.entityType?.toUpperCase();
      const entity = entityMap.get(`${type}:${c.entityId}`) || null;
      return {
        entityId: c.entityId,
        entityType: c.entityType,
        similarity: c.similarity,
        metadata: c.metadata || {},
        entity,
      };
    });
  }
}

export const semanticHydrationService = new SemanticHydrationService();
