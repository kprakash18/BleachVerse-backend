import prisma from "../../database/prisma.js";

export const findQuotes = async ({ where, skip, take, orderBy }) => {
  return prisma.quote.findMany({
    where,
    skip,
    take,
    orderBy,
    select: {
      id: true,
      text: true,
      category: true,
      isCanonical: true,
      character: {
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
      arc: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
};

export const countQuotes = async (where = {}) => {
  return prisma.quote.count({ where });
};

export const findQuoteById = async (id) => {
  return prisma.quote.findUnique({
    where: { id },
    select: {
      id: true,
      text: true,
      category: true,
      isCanonical: true,
      sourceMaterial: true,
      character: {
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
      arc: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
};

export const findQuotesByCharacterSlug = async ({ characterSlug, skip, take }) => {
  return prisma.quote.findMany({
    where: {
      character: {
        slug: characterSlug,
      },
    },
    skip,
    take,
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      text: true,
      category: true,
      isCanonical: true,
      character: {
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
      arc: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
};

export const countQuotesByCharacterSlug = async (characterSlug) => {
  return prisma.quote.count({
    where: {
      character: {
        slug: characterSlug,
      },
    },
  });
};
