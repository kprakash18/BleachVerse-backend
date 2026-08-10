import prisma from "../../database/prisma.js";

export const findPowers = async ({ where, skip, take, orderBy }) => {
  return prisma.power.findMany({
    where,
    skip,
    take,
    orderBy,
    select: {
      id: true,
      name: true,
      type: true,
      source: true,
      description: true,
      character: {
        select: {
          name: true,
          slug: true,
        },
      },
      transformation: {
        select: {
          name: true,
          type: true,
        },
      },
    },
  });
};

export const countPowers = async (where = {}) => {
  return prisma.power.count({ where });
};

export const findPowerById = async (id) => {
  return prisma.power.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      type: true,
      source: true,
      description: true,
      isCanonical: true,
      sourceMaterial: true,
      character: {
        select: {
          name: true,
          slug: true,
        },
      },
      transformation: {
        select: {
          name: true,
          type: true,
          description: true,
        },
      },
    },
  });
};
