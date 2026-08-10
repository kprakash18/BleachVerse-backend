import prisma from "../../database/prisma.js";

export const findEvents = async ({ where, skip, take, orderBy }) => {
  return prisma.event.findMany({
    where,
    skip,
    take,
    orderBy,
    select: {
      title: true,
      slug: true,
      type: true,
      description: true,
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

export const countEvents = async (where = {}) => {
  return prisma.event.count({ where });
};

export const findEventBySlug = async (slug) => {
  return prisma.event.findUnique({
    where: { slug },
    select: {
      title: true,
      slug: true,
      type: true,
      description: true,
      isCanonical: true,
      sourceMaterial: true,
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
          role: true,
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
