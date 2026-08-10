import * as appearanceRepository from "./appearance.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
import { calculatePaginationParams, buildPaginatedResponse } from "../../common/utils/pagination.js";

const formatAppearanceDetail = (appearance) => ({
  id: appearance.id,
  isFirstAppearance: appearance.isFirstAppearance,
  character: appearance.character,
  episode: appearance.episode
    ? {
        title: appearance.episode.title,
        slug: appearance.episode.slug,
        episodeNumber: appearance.episode.number,
        synopsis: appearance.episode.synopsis,
        airDate: appearance.episode.airDate,
        arc: appearance.episode.arc,
      }
    : null,
});

export const getAppearances = async (query) => {
  const {
    characterSlug,
    episodeSlug,
    isFirstAppearance,
  } = query;
  const { page, limit, skip } = calculatePaginationParams(query);

  const where = {};

  if (characterSlug) {
    where.character = {
      slug: characterSlug,
    };
  }

  if (episodeSlug) {
    where.episode = {
      slug: episodeSlug,
    };
  }

  if (typeof isFirstAppearance === "boolean") {
    where.isFirstAppearance = isFirstAppearance;
  }

  const [appearances, totalItems] = await Promise.all([
    appearanceRepository.findAppearances({
      where,
      skip,
      take: limit,
    }),
    appearanceRepository.countAppearances(where),
  ]);

  const data = appearances.map((a) => ({
    id: a.id,
    isFirstAppearance: a.isFirstAppearance,
    character: a.character,
    episode: a.episode
      ? {
          title: a.episode.title,
          slug: a.episode.slug,
          episodeNumber: a.episode.number,
        }
      : null,
  }));

  return buildPaginatedResponse({
    data,
    totalItems,
    page,
    limit,
  });
};

export const getAppearanceById = async (id) => {
  const appearance = await appearanceRepository.findAppearanceById(id);

  if (!appearance) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Appearance record not found",
    );
  }

  return formatAppearanceDetail(appearance);
};
