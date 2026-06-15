import * as characterRepository from "./character.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
export const getCharacters = async (query) => {
  const { page, limit, search, status, sex, sortBy, sortOrder } = query;

  const where = {};
  console.log(query);
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

  const skip = (page - 1) * limit;

  const [characters, total] = await Promise.all([
    characterRepository.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),

    characterRepository.count(where),
  ]);

  return {
    data: characters,

    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// format slug
const normalizeSlug = (slug) => slug.trim().toLowerCase().replace(/\s+/g, "-");

//  404 error if user doesn't exist
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
