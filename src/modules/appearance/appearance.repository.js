import prisma from "../../database/prisma.js";

export const findAppearances = async ({ where, skip, take }) => {
  return prisma.characterAppearance.findMany({
    where,
    skip,
    take,
    orderBy: {
      episode: {
        number: "asc",
      },
    },
    select: {
      id: true,
      isFirstAppearance: true,
      character: {
        select: {
          name: true,
          slug: true,
        },
      },
      episode: {
        select: {
          title: true,
          slug: true,
          number: true,
        },
      },
    },
  });
};

export const countAppearances = async (where = {}) => {
  return prisma.characterAppearance.count({ where });
};

export const findAppearanceById = async (id) => {
  return prisma.characterAppearance.findUnique({
    where: { id },
    select: {
      id: true,
      isFirstAppearance: true,
      character: {
        select: {
          name: true,
          slug: true,
        },
      },
      episode: {
        select: {
          title: true,
          slug: true,
          number: true,
          synopsis: true,
          airDate: true,
          arc: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });
};
