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
// Lightweight lookup returning the arc id (child endpoints need it to query relations)
export const findIdBySlug = async (slug) => {
  return prisma.arc.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      slug: true,
      name: true,
    },
  });
};

// Child node helper: Fetch a paginated list of episodes belonging to a specific parent Arc ID
export const findEpisodesByArcId = async ({ arcId, skip, take }) => {
  return prisma.episode.findMany({
    where: {
      arcId,
    },
    skip,
    take,
    orderBy: {
      number: "asc",
    },
    select: {
      title: true,
      number: true,
    },
  });
};

// Child node helper: Count the total number of episodes belonging to a specific parent Arc ID
export const countEpisodesByArcId = async (arcId) => {
  return prisma.episode.count({
    where: {
      arcId,
    },
  });
};

// Child node helper: Fetch a paginated list of fights belonging to a specific parent Arc ID, ordered by title ASC
export const findFightsByArcId = async ({ arcId, skip, take }) => {
  return prisma.fight.findMany({
    where: {
      arcId,
    },
    skip,
    take,
    orderBy: {
      title: "asc",
    },
    select: {
      title: true,
      slug: true,
      type: true,
    },
  });
};

// Child node helper: Count the total number of fights belonging to a specific parent Arc ID
export const countFightsByArcId = async (arcId) => {
  return prisma.fight.count({
    where: {
      arcId,
    },
  });
};

// Child node helper: Fetch a paginated list of events belonging to a specific parent Arc ID, ordered by title ASC
export const findEventsByArcId = async ({ arcId, skip, take }) => {
  return prisma.event.findMany({
    where: {
      arcId,
    },
    skip,
    take,
    orderBy: {
      title: "asc",
    },
    select: {
      title: true,
      slug: true,
      type: true,
    },
  });
};

// Child node helper: Count the total number of events belonging to a specific parent Arc ID
export const countEventsByArcId = async (arcId) => {
  return prisma.event.count({
    where: {
      arcId,
    },
  });
};

// Child node helper: Fetch a paginated list of distinct characters appearing in episodes belonging to a specific parent Arc ID, ordered by name ASC
export const findDistinctCharactersByArcId = async ({ arcId, skip, take }) => {
  return prisma.character.findMany({
    where: {
      appearances: {
        some: {
          episode: {
            arcId,
          },
        },
      },
    },
    skip,
    take,
    orderBy: {
      name: "asc",
    },
    select: {
      name: true,
      slug: true,
    },
  });
};

// Child node helper: Count the total number of distinct characters appearing in episodes belonging to a specific parent Arc ID
export const countDistinctCharactersByArcId = async (arcId) => {
  return prisma.character.count({
    where: {
      appearances: {
        some: {
          episode: {
            arcId,
          },
        },
      },
    },
  });
};

