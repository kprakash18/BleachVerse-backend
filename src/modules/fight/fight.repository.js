import prisma from "../../database/prisma.js";

export const findFights = async ({ where, skip, take, orderBy }) => {
  return prisma.fight.findMany({
    where,
    skip,
    take,
    orderBy,
    select: {
      title: true,
      slug: true,
      type: true,
      winner: {
        select: {
          name: true,
          slug: true,
        },
      },
      arc: {
        select: {
          name: true,
          slug: true,
        },
      },
      location: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
};

export const countFights = async (where = {}) => {
  return prisma.fight.count({ where });
};

export const findFightBySlug = async (slug) => {
  return prisma.fight.findUnique({
    where: { slug },
    select: {
      title: true,
      slug: true,
      type: true,
      summary: true,
      winner: {
        select: {
          name: true,
          slug: true,
        },
      },
      arc: {
        select: {
          name: true,
          slug: true,
        },
      },
      location: {
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
      participants: {
        select: {
          outcome: true,
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
