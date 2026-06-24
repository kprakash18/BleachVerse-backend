import * as arcRepository from "./arc.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";

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
