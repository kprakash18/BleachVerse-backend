import * as zanpakutoRepository from "./zanpakuto.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
import { calculatePaginationParams, buildPaginatedResponse } from "../../common/utils/pagination.js";
import { normalizeSlug } from "../../common/utils/slug.js";

const formatZanpakutoDetail = (zanpakuto) => ({
  name: zanpakuto.name,
  slug: zanpakuto.slug,
  type: zanpakuto.type,
  releaseCommand: zanpakuto.releaseCommand,
  spiritName: zanpakuto.spiritName,
  description: zanpakuto.description,
  wielder: zanpakuto.character,
  aliases: zanpakuto.aliases.map((a) => a.alias),
  transformations: zanpakuto.transformations,
});

export const getZanpakutos = async (query) => {
  const {
    search,
    type,
    wielderSlug,
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

  if (type) {
    where.type = type.toUpperCase();
  }

  if (wielderSlug) {
    where.character = {
      slug: wielderSlug,
    };
  }

  const orderBy = {
    [sortBy]: sortOrder,
  };

  const [zanpakutos, totalItems] = await Promise.all([
    zanpakutoRepository.findZanpakutos({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    zanpakutoRepository.countZanpakutos(where),
  ]);

  const data = zanpakutos.map((z) => ({
    name: z.name,
    slug: z.slug,
    type: z.type,
    releaseCommand: z.releaseCommand,
    spiritName: z.spiritName,
    wielder: z.character,
  }));

  return buildPaginatedResponse({
    data,
    totalItems,
    page,
    limit,
  });
};

export const getZanpakutoBySlug = async (slug) => {
  const normalizedSlug = normalizeSlug(slug);

  const zanpakuto = await zanpakutoRepository.findZanpakutoBySlug(normalizedSlug);

  if (!zanpakuto) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Zanpakutō not found",
    );
  }

  return formatZanpakutoDetail(zanpakuto);
};
