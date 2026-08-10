import * as episodeRepository from "./episode.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";

const toEpisodeResponse = (episode) => ({
  title: episode.title,
  slug: episode.slug,
  episodeNumber: episode.number,
  type: episode.type,
  synopsis: episode.synopsis,
  airDate: episode.airDate,
  arc: episode.arc,
});

export const getEpisodes = async (query) => {
  const { page = 1, limit = 10, arcSlug, type } = query;

  const where = {};

  if (type) {
    where.type = type.toUpperCase();
  }

  if (arcSlug) {
    where.arc = {
      slug: arcSlug,
    };
  }

  const skip = (page - 1) * limit;

  const [episodes, totalItems] = await Promise.all([
    episodeRepository.findEpisodes({
      where,
      skip,
      take: limit,
      orderBy: { number: "asc" },
    }),
    episodeRepository.countEpisodes(where),
  ]);

  const data = episodes.map((episode) => ({
    title: episode.title,
    slug: episode.slug,
    episodeNumber: episode.number,
    type: episode.type,
  }));

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

export const getEpisodeBySlug = async (slug) => {
  const normalizedSlug = slug.trim().toLowerCase();

  const episode = await episodeRepository.findEpisodeBySlug(normalizedSlug);

  if (!episode) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Episode not found",
    );
  }

  return toEpisodeResponse(episode);
};

export const getEpisodeByNumber = async (number) => {
  const episodeNumber = Number(number);

  const episode = await episodeRepository.findEpisodeByNumber(episodeNumber);

  if (!episode) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Episode not found",
    );
  }

  return toEpisodeResponse(episode);
};
