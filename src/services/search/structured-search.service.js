import prisma from "../../database/prisma.js";

const RACE_NAMES = {
  ARRANCAR: "Arrancar",
  QUINCY: "Quincy",
  SHINIGAMI: "Soul Reaper",
  HOLLOW: "Hollow",
  VISORED: "Visored",
};

const ORGANIZATION_NAMES = {
  ESPADA: "Espada",
};

const ROLE_TERMS = {
  CAPTAIN: "Captain",
  LIEUTENANT: "Lieutenant",
};

export class StructuredSearchService {
  /**
   * Converts classifier filters into PostgreSQL character candidates.
   * @param {Object} params
   * @param {Object} params.structuredFilters
   * @param {number} [params.limit=20]
   * @returns {Promise<Array<{ entityId: string, entityType: string, structuredScore: number, structuredMetadata: Object }>>}
   */
  async searchStructuredCandidates({ structuredFilters = {}, limit = 20 }) {
    const clauses = [];
    const metadata = {};

    const raceKey = structuredFilters.race || structuredFilters.group;
    const raceName = RACE_NAMES[raceKey];
    if (raceName) {
      clauses.push({
        races: {
          some: {
            race: {
              name: {
                equals: raceName,
                mode: "insensitive",
              },
            },
          },
        },
      });
      metadata.race = raceName;
    }

    const organizationName = ORGANIZATION_NAMES[structuredFilters.faction];
    if (organizationName) {
      clauses.push({
        organizations: {
          some: {
            organization: {
              name: {
                equals: organizationName,
                mode: "insensitive",
              },
            },
          },
        },
      });
      metadata.organization = organizationName;
    }

    const roleTerm = ROLE_TERMS[structuredFilters.role];
    if (roleTerm) {
      clauses.push({
        organizations: {
          some: {
            role: {
              contains: roleTerm,
              mode: "insensitive",
            },
          },
        },
      });
      metadata.role = roleTerm;
    }

    if (clauses.length === 0) {
      return [];
    }

    const resultLimit = Math.min(Math.max(Number(limit) || 20, 1), 50);
    const characters = await prisma.character.findMany({
      where: {
        AND: clauses,
      },
      select: {
        id: true,
        slug: true,
        name: true,
      },
      take: resultLimit,
      orderBy: {
        name: "asc",
      },
    });

    return characters.map((character) => ({
      entityId: character.id,
      entityType: "CHARACTER",
      structuredScore: 1.0,
      structuredMetadata: {
        ...metadata,
        slug: character.slug,
        name: character.name,
      },
    }));
  }
}

export const structuredSearchService = new StructuredSearchService();
