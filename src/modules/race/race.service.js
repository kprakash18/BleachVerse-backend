import * as raceRepository from "./race.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";

const formatRaceDetail = (race) => ({
  name: race.name,
  category: race.category,
  description: race.description,
  characters: race.characters.map((cr) => cr.character),
});

export const getRaces = async (query) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    sortBy = "name",
    sortOrder = "asc",
  } = query;

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

  const skip = (page - 1) * limit;

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

  return {
    data: races,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
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
