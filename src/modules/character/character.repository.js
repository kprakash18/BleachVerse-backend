import prisma from "../../database/prisma.js";

export const findMany = async ({ where, orderBy, skip, take }) => {
  return prisma.character.findMany({
    where,
    orderBy,
    skip,
    take,
  });
};

export const count = async (where) => {
  return prisma.character.count({
    where,
  });
};

// get character by slug, including aliases, races, and organization data
export const findCharacterDetailsBySlug = async (slug) => {
  return prisma.character.findUnique({
    where: {
      slug,
    },
    include: {
      aliases: true,

      races: {
        include: {
          race: true,
        },
      },

      organizations: {
        include: {
          organization: true,
        },
      },
    },
  });
};
