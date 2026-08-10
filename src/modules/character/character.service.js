import * as characterRepository from "./character.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
import { calculatePaginationParams, buildPaginatedResponse } from "../../common/utils/pagination.js";
import { normalizeSlug } from "../../common/utils/slug.js";

// List characters: build Prisma filters from the query, then fetch the page and total in parallel
export const getCharacters = async (query) => {
  const { search, status, sex, sortBy, sortOrder } = query;
  const { page, limit, skip } = calculatePaginationParams(query);

  // build the Prisma `where` filter from the optional query params
  const where = {};
  if (status) {
    where.status = status;
  }

  if (sex) {
    where.sex = sex;
  }

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  const orderBy = {
    [sortBy]: sortOrder,
  };

  const [characters, totalItems] = await Promise.all([
    characterRepository.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),

    characterRepository.count(where),
  ]);

  return buildPaginatedResponse({
    data: characters,
    totalItems,
    page,
    limit,
  });
};

// Get a character's details by slug; 404 if it doesn't exist
export const getCharacterBySlug = async (slug) => {
  const normalizedSlug = normalizeSlug(slug);

  const character =
    await characterRepository.findCharacterDetailsBySlug(normalizedSlug);

  if (!character) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Character not found",
    );
  }

  return character;
};
