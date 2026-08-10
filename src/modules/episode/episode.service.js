import * as episodeRepository from "./episode.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
import { calculatePaginationParams, buildPaginatedResponse } from "../../common/utils/pagination.js";
import { normalizeSlug } from "../../common/utils/slug.js";

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
  const { arcSlug, type } = query;
  const { page, limit, skip } = calculatePaginationParams(query);

  const where = {};

  if (type) {
    where.type = type.toUpperCase();
  }

  if (arcSlug) {
    where.arc = {
      slug: arcSlug,
    };
  }

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

  return buildPaginatedResponse({
    data,
    totalItems,
    page,
    limit,
  });
};

export const getEpisodeBySlug = async (slug) => {
  const normalizedSlug = normalizeSlug(slug);

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
