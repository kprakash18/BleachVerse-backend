import * as fightRepository from "./fight.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
import { calculatePaginationParams, buildPaginatedResponse } from "../../common/utils/pagination.js";
import { normalizeSlug } from "../../common/utils/slug.js";

const formatFightDetail = (fight) => ({
  title: fight.title,
  slug: fight.slug,
  type: fight.type,
  summary: fight.summary,
  winner: fight.winner,
  arc: fight.arc,
  location: fight.location,
  episode: fight.episode
    ? {
        title: fight.episode.title,
        slug: fight.episode.slug,
        episodeNumber: fight.episode.number,
      }
    : null,
  participants: fight.participants.map((p) => ({
    outcome: p.outcome,
    character: p.character,
  })),
});

export const getFights = async (query) => {
  const {
    search,
    type,
    winnerSlug,
    arcSlug,
    locationSlug,
    sortBy = "title",
    sortOrder = "asc",
  } = query;
  const { page, limit, skip } = calculatePaginationParams(query);

  const where = {};

  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (type) {
    where.type = type.toUpperCase();
  }

  if (winnerSlug) {
    where.winner = {
      slug: winnerSlug,
    };
  }

  if (arcSlug) {
    where.arc = {
      slug: arcSlug,
    };
  }

  if (locationSlug) {
    where.location = {
      slug: locationSlug,
    };
  }

  const orderBy = {
    [sortBy]: sortOrder,
  };

  const [fights, totalItems] = await Promise.all([
    fightRepository.findFights({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    fightRepository.countFights(where),
  ]);

  return buildPaginatedResponse({
    data: fights,
    totalItems,
    page,
    limit,
  });
};

export const getFightBySlug = async (slug) => {
  const normalizedSlug = normalizeSlug(slug);

  const fight = await fightRepository.findFightBySlug(normalizedSlug);

  if (!fight) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Fight not found",
    );
  }

  return formatFightDetail(fight);
};
