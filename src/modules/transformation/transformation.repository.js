import prisma from "../../database/prisma.js";

export const findTransformations = async ({ where, skip, take, orderBy }) => {
  return prisma.transformation.findMany({
    where,
    skip,
    take,
    orderBy,
    select: {
      id: true,
      name: true,
      type: true,
      description: true,
      character: {
        select: {
          name: true,
          slug: true,
        },
      },
      zanpakuto: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
};

export const countTransformations = async (where = {}) => {
  return prisma.transformation.count({ where });
};

export const findTransformationById = async (id) => {
  return prisma.transformation.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      type: true,
      description: true,
      isCanonical: true,
      sourceMaterial: true,
      character: {
        select: {
          name: true,
          slug: true,
        },
      },
      zanpakuto: {
        select: {
          name: true,
          slug: true,
        },
      },
      firstEpisode: {
        select: {
          title: true,
          slug: true,
          number: true,
        },
      },
      firstFight: {
        select: {
          title: true,
          slug: true,
          type: true,
        },
      },
      powers: {
        select: {
          name: true,
          type: true,
          description: true,
        },
      },
    },
  });
};
