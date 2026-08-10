import prisma from "../../database/prisma.js";

export const findZanpakutos = async ({ where, skip, take, orderBy }) => {
  return prisma.zanpakuto.findMany({
    where,
    skip,
    take,
    orderBy,
    select: {
      name: true,
      slug: true,
      type: true,
      releaseCommand: true,
      spiritName: true,
      character: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
};

export const countZanpakutos = async (where = {}) => {
  return prisma.zanpakuto.count({ where });
};

export const findZanpakutoBySlug = async (slug) => {
  return prisma.zanpakuto.findUnique({
    where: { slug },
    select: {
      name: true,
      slug: true,
      type: true,
      releaseCommand: true,
      spiritName: true,
      description: true,
      character: {
        select: {
          name: true,
          slug: true,
        },
      },
      aliases: {
        select: {
          alias: true,
        },
      },
      transformations: {
        select: {
          name: true,
          type: true,
          description: true,
        },
      },
    },
  });
};
