import prisma from "../../database/prisma.js";

export const findLocations = async ({ where, skip, take, orderBy }) => {
  return prisma.location.findMany({
    where,
    skip,
    take,
    orderBy,
    select: {
      name: true,
      slug: true,
      type: true,
      description: true,
    },
  });
};

export const countLocations = async (where = {}) => {
  return prisma.location.count({ where });
};

export const findLocationBySlug = async (slug) => {
  return prisma.location.findUnique({
    where: { slug },
    select: {
      name: true,
      slug: true,
      type: true,
      description: true,
      parent: {
        select: {
          name: true,
          slug: true,
        },
      },
      children: {
        take: 100,
        select: {
          name: true,
          slug: true,
          type: true,
        },
      },
      fights: {
        take: 100,
        select: {
          title: true,
          slug: true,
          type: true,
        },
      },
    },
  });
};
