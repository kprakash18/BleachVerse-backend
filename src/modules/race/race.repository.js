import prisma from "../../database/prisma.js";

export const findRaces = async ({ where, skip, take, orderBy }) => {
  return prisma.race.findMany({
    where,
    skip,
    take,
    orderBy,
    select: {
      name: true,
      category: true,
      description: true,
    },
  });
};

export const countRaces = async (where = {}) => {
  return prisma.race.count({ where });
};

export const findRaceByName = async (name) => {
  return prisma.race.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
      category: true,
      description: true,
      characters: {
        take: 100,
        select: {
          character: {
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
