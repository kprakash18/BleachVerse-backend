import * as arcRepository from "./arc.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
import { calculatePaginationParams, buildPaginatedResponse } from "../../common/utils/pagination.js";

// List arcs: filter by search/type, sort, paginate; add episodeCount when both episode bounds exist
export const getArcs = async (query = {}) => {
  const { search, type, sortBy = "startEpisodeNumber", sortOrder = "asc" } = query;
  const { page, limit, skip } = calculatePaginationParams(query);
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

  return buildPaginatedResponse({
    data,
    totalItems,
    page,
    limit,
  });
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

// Child nodes of Arc: Retrieve paginated (or all) episodes associated with a parent Arc (identified by slug)
export const getEpisodesByArcSlug = async (query) => {
  const { slug, all } = query;
  const { page, limit, skip } = calculatePaginationParams(query);
  const arc = await arcRepository.findIdBySlug(slug);

  if (!arc) {
    throw new ApiError(404, errorCodes.RESOURCE_NOT_FOUND, "Arc not found");
  }

  if (all) {
    const episodes = await arcRepository.findEpisodesByArcId({
      arcId: arc.id,
    });

    return {
      data: episodes.map((ep) => ({
        title: ep.title,
        slug: ep.slug,
        episodeNumber: ep.number,
      })),
      pagination: {
        page: 1,
        limit: episodes.length,
        totalItems: episodes.length,
        totalPages: 1,
      },
    };
  }

  const [episodes, totalItems] = await Promise.all([
    arcRepository.findEpisodesByArcId({
      arcId: arc.id,
      skip,
      take: limit,
    }),
    arcRepository.countEpisodesByArcId(arc.id),
  ]);

  const data = episodes.map((ep) => ({
    title: ep.title,
    slug: ep.slug,
    episodeNumber: ep.number,
  }));

  return buildPaginatedResponse({
    data,
    totalItems,
    page,
    limit,
  });
};

// Child nodes of Arc: Retrieve paginated fights associated with a parent Arc (identified by slug)
export const getFightsByArcSlug = async (query) => {
  const { slug } = query;
  const { page, limit, skip } = calculatePaginationParams(query);
  const arc = await arcRepository.findIdBySlug(slug);

  if (!arc) {
    throw new ApiError(404, errorCodes.RESOURCE_NOT_FOUND, "Arc not found");
  }

  const [fights, totalItems] = await Promise.all([
    arcRepository.findFightsByArcId({
      arcId: arc.id,
      skip,
      take: limit,
    }),
    arcRepository.countFightsByArcId(arc.id),
  ]);

  return buildPaginatedResponse({
    data: fights,
    totalItems,
    page,
    limit,
  });
};

// Child nodes of Arc: Retrieve paginated events associated with a parent Arc (identified by slug)
export const getEventsByArcSlug = async (query) => {
  const { slug } = query;
  const { page, limit, skip } = calculatePaginationParams(query);
  const arc = await arcRepository.findIdBySlug(slug);

  if (!arc) {
    throw new ApiError(404, errorCodes.RESOURCE_NOT_FOUND, "Arc not found");
  }

  const [events, totalItems] = await Promise.all([
    arcRepository.findEventsByArcId({
      arcId: arc.id,
      skip,
      take: limit,
    }),
    arcRepository.countEventsByArcId(arc.id),
  ]);

  return buildPaginatedResponse({
    data: events,
    totalItems,
    page,
    limit,
  });
};

// Child nodes of Arc: Retrieve paginated distinct characters associated with a parent Arc (identified by slug)
export const getCharactersByArcSlug = async (query) => {
  const { slug } = query;
  const { page, limit, skip } = calculatePaginationParams(query);
  const arc = await arcRepository.findIdBySlug(slug);

  if (!arc) {
    throw new ApiError(404, errorCodes.RESOURCE_NOT_FOUND, "Arc not found");
  }

  const [characters, totalItems] = await Promise.all([
    arcRepository.findDistinctCharactersByArcId({
      arcId: arc.id,
      skip,
      take: limit,
    }),
    arcRepository.countDistinctCharactersByArcId(arc.id),
  ]);

  return buildPaginatedResponse({
    data: characters,
    totalItems,
    page,
    limit,
  });
};

