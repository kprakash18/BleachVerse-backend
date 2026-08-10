import * as raceRepository from "./race.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
import { calculatePaginationParams, buildPaginatedResponse } from "../../common/utils/pagination.js";

const formatRaceDetail = (race) => ({
  name: race.name,
  category: race.category,
  description: race.description,
  characters: race.characters.map((cr) => cr.character),
});

export const getRaces = async (query) => {
  const {
    search,
    category,
    sortBy = "name",
    sortOrder = "asc",
  } = query;
  const { page, limit, skip } = calculatePaginationParams(query);

  const where = {};

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (category) {
    where.category = category.toUpperCase();
  }

  const orderBy = {
    [sortBy]: sortOrder,
  };

  const [races, totalItems] = await Promise.all([
    raceRepository.findRaces({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    raceRepository.countRaces(where),
  ]);

  return buildPaginatedResponse({
    data: races,
    totalItems,
    page,
    limit,
  });
};

export const getRaceByName = async (name) => {
  const decodedName = decodeURIComponent(name).trim().replace(/-/g, " ");

  const race = await raceRepository.findRaceByName(decodedName);

  if (!race) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Race not found",
    );
  }

  return formatRaceDetail(race);
};
