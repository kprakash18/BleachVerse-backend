import prisma from "../../database/prisma.js";

export const findEpisodes = async ({ where, skip, take, orderBy }) => {
  return prisma.episode.findMany({
    where,
    skip,
    take,
    orderBy,
    select: {
      title: true,
      slug: true,
      number: true,
      type: true,
    },
  });
};

export const countEpisodes = async (where = {}) => {
  return prisma.episode.count({ where });
};

export const findEpisodeBySlug = async (slug) => {
  return prisma.episode.findUnique({
    where: { slug },
    select: {
      title: true,
      slug: true,
      number: true,
      type: true,
      synopsis: true,
      airDate: true,
      arc: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
};

export const findEpisodeByNumber = async (number) => {
  return prisma.episode.findUnique({
    where: { number },
    select: {
      title: true,
      slug: true,
      number: true,
      type: true,
      synopsis: true,
      airDate: true,
      arc: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
};