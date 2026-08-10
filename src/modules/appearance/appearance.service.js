import * as appearanceRepository from "./appearance.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";

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
    page = 1,
    limit = 10,
    characterSlug,
    episodeSlug,
    isFirstAppearance,
  } = query;

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

  const skip = (page - 1) * limit;

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
