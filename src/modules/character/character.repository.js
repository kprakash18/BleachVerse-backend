import { OrganizationType } from "@prisma/client";
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

    select: {
      name: true,
      sex: true,
      status: true,
      description: true,

      aliases: {
        select: {
          alias: true,
        },
      },

      races: {
        select: {
          race: {
            select: {
              name: true,
            },
          },
        },
      },

      organizations: {
        select: {
          role: true,

          organization: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
    },
  });
};
