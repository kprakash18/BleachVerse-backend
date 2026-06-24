import prisma from "../../database/prisma.js";

export const findMany = async ({ where, skip, take, orderBy }) => {
  return prisma.arc.findMany({
    where,
    skip,
    take,
    orderBy,
    select: {
      name: true,
      slug: true,
      type: true,
      description: true,
      startEpisodeNumber: true,
      endEpisodeNumber: true,
    },
  });
};

export const count = async (where) => {
  return prisma.arc.count({
    where,
  });
};

// find by slug
export const findBySlug = async (slug) => {
  return prisma.arc.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      slug: true,
      type: true,
      description: true,

      startEpisodeNumber: true,
      endEpisodeNumber: true,

      startChapter: true,
      endChapter: true,
    },
  });
};
