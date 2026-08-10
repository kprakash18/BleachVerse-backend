import prisma from "../../database/prisma.js";

export const findOrganizations = async ({ where, skip, take, orderBy }) => {
  return prisma.organization.findMany({
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

export const countOrganizations = async (where = {}) => {
  return prisma.organization.count({ where });
};

export const findOrganizationBySlug = async (slug) => {
  return prisma.organization.findUnique({
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
        select: {
          name: true,
          slug: true,
          type: true,
        },
      },
      members: {
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
