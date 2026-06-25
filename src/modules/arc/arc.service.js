import * as arcRepository from "./arc.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";

// List arcs: filter by search/type, sort, paginate; add episodeCount when both episode bounds exist
export const getArcs = async ({
  page,
  limit,
  search,
  type,
  sortBy,
  sortOrder,
}) => {
  const where = {};

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        slug: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (type) {
    where.type = type;
  }

  const skip = (page - 1) * limit;

  const orderBy = {
    [sortBy]: sortOrder,
  };

  const [arcs, totalItems] = await Promise.all([
    arcRepository.findMany({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    arcRepository.count(where),
  ]);

  const data = arcs.map((arc) => {
    const response = {
      name: arc.name,
      slug: arc.slug,
      type: arc.type,
      description: arc.description,
    };

    if (arc.startEpisodeNumber != null && arc.endEpisodeNumber != null) {
      response.episodeCount = arc.endEpisodeNumber - arc.startEpisodeNumber + 1;
    }

    return response;
  });

  return {
    data,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

// Get one arc by slug with anime/manga coverage; 404 if not found
export const getArcBySlug = async (slug) => {
  const arc = await arcRepository.findBySlug(slug);

  if (!arc) {
    throw new ApiError(404, errorCodes.RESOURCE_NOT_FOUND, "Arc not found");
  }

  const response = {
    name: arc.name,
    slug: arc.slug,
    type: arc.type,
    description: arc.description,
    coverage: {},
  };

  if (arc.startEpisodeNumber != null && arc.endEpisodeNumber != null) {
    response.coverage.anime = {
      startEpisode: arc.startEpisodeNumber,
      endEpisode: arc.endEpisodeNumber,
      episodeCount: arc.endEpisodeNumber - arc.startEpisodeNumber + 1,
    };
  }

  if (arc.startChapter != null && arc.endChapter != null) {
    response.coverage.manga = {
      startChapter: arc.startChapter,
      endChapter: arc.endChapter,
      chapterCount: arc.endChapter - arc.startChapter + 1,
    };
  }

  return response;
};

// Child nodes of Arc: Retrieve paginated episodes associated with a parent Arc (identified by slug)
export const getEpisodesByArcSlug = async ({ slug, page, limit }) => {
  const arc = await arcRepository.findIdBySlug(slug);

  if (!arc) {
    throw new ApiError(404, errorCodes.RESOURCE_NOT_FOUND, "Arc not found");
  }

  const skip = (page - 1) * limit;

  const [episodes, totalItems] = await Promise.all([
    arcRepository.findEpisodesByArcId({
      arcId: arc.id,
      skip,
      take: limit,
    }),
    arcRepository.countEpisodesByArcId(arc.id),
  ]);

  return {
    data: episodes,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

// Child nodes of Arc: Retrieve paginated fights associated with a parent Arc (identified by slug)
export const getFightsByArcSlug = async ({ slug, page, limit }) => {
  const arc = await arcRepository.findIdBySlug(slug);

  if (!arc) {
    throw new ApiError(404, errorCodes.RESOURCE_NOT_FOUND, "Arc not found");
  }

  const skip = (page - 1) * limit;

  const [fights, totalItems] = await Promise.all([
    arcRepository.findFightsByArcId({
      arcId: arc.id,
      skip,
      take: limit,
    }),
    arcRepository.countFightsByArcId(arc.id),
  ]);

  return {
    data: fights,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

// Child nodes of Arc: Retrieve paginated events associated with a parent Arc (identified by slug)
export const getEventsByArcSlug = async ({ slug, page, limit }) => {
  const arc = await arcRepository.findIdBySlug(slug);

  if (!arc) {
    throw new ApiError(404, errorCodes.RESOURCE_NOT_FOUND, "Arc not found");
  }

  const skip = (page - 1) * limit;

  const [events, totalItems] = await Promise.all([
    arcRepository.findEventsByArcId({
      arcId: arc.id,
      skip,
      take: limit,
    }),
    arcRepository.countEventsByArcId(arc.id),
  ]);

  return {
    data: events,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

// Child nodes of Arc: Retrieve paginated distinct characters associated with a parent Arc (identified by slug)
export const getCharactersByArcSlug = async ({ slug, page, limit }) => {
  const arc = await arcRepository.findIdBySlug(slug);

  if (!arc) {
    throw new ApiError(404, errorCodes.RESOURCE_NOT_FOUND, "Arc not found");
  }

  const skip = (page - 1) * limit;

  const [characters, totalItems] = await Promise.all([
    arcRepository.findDistinctCharactersByArcId({
      arcId: arc.id,
      skip,
      take: limit,
    }),
    arcRepository.countDistinctCharactersByArcId(arc.id),
  ]);

  return {
    data: characters,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

