import * as transformationRepository from "./transformation.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";

const formatTransformationDetail = (transformation) => ({
  id: transformation.id,
  name: transformation.name,
  type: transformation.type,
  description: transformation.description,
  isCanonical: transformation.isCanonical,
  sourceMaterial: transformation.sourceMaterial,
  character: transformation.character,
  zanpakuto: transformation.zanpakuto,
  firstEpisode: transformation.firstEpisode
    ? {
        title: transformation.firstEpisode.title,
        slug: transformation.firstEpisode.slug,
        episodeNumber: transformation.firstEpisode.number,
      }
    : null,
  firstFight: transformation.firstFight,
  powers: transformation.powers,
});

export const getTransformations = async (query) => {
  const {
    page = 1,
    limit = 10,
    search,
    type,
    characterSlug,
    zanpakutoSlug,
    sourceMaterial,
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

  if (characterSlug) {
    where.character = {
      slug: characterSlug,
    };
  }

  if (zanpakutoSlug) {
    where.zanpakuto = {
      slug: zanpakutoSlug,
    };
  }

  if (sourceMaterial) {
    where.sourceMaterial = sourceMaterial.toUpperCase();
  }

  const skip = (page - 1) * limit;

  const orderBy = {
    [sortBy]: sortOrder,
  };

  const [transformations, totalItems] = await Promise.all([
    transformationRepository.findTransformations({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    transformationRepository.countTransformations(where),
  ]);

  return {
    data: transformations,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

export const getTransformationById = async (id) => {
  const transformation = await transformationRepository.findTransformationById(id);

  if (!transformation) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Transformation not found",
    );
  }

  return formatTransformationDetail(transformation);
};
