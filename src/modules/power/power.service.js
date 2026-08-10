import * as powerRepository from "./power.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";

const formatPowerDetail = (power) => ({
  id: power.id,
  name: power.name,
  type: power.type,
  source: power.source,
  description: power.description,
  isCanonical: power.isCanonical,
  sourceMaterial: power.sourceMaterial,
  character: power.character,
  transformation: power.transformation,
});

export const getPowers = async (query) => {
  const {
    page = 1,
    limit = 10,
    search,
    type,
    source,
    sourceMaterial,
    characterSlug,
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

  if (type) {
    where.type = type.toUpperCase();
  }

  if (source) {
    where.source = source.toUpperCase();
  }

  if (sourceMaterial) {
    where.sourceMaterial = sourceMaterial.toUpperCase();
  }

  if (characterSlug) {
    where.character = {
      slug: characterSlug,
    };
  }

  const skip = (page - 1) * limit;

  const orderBy = {
    [sortBy]: sortOrder,
  };

  const [powers, totalItems] = await Promise.all([
    powerRepository.findPowers({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    powerRepository.countPowers(where),
  ]);

  return {
    data: powers,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

export const getPowerById = async (id) => {
  const power = await powerRepository.findPowerById(id);

  if (!power) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Power not found",
    );
  }

  return formatPowerDetail(power);
};
