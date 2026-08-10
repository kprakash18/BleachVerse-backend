import * as locationRepository from "./location.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
import { calculatePaginationParams, buildPaginatedResponse } from "../../common/utils/pagination.js";
import { normalizeSlug } from "../../common/utils/slug.js";

const formatLocationDetail = (location) => ({
  name: location.name,
  slug: location.slug,
  type: location.type,
  description: location.description,
  parent: location.parent,
  subLocations: location.children,
  fights: location.fights,
});

export const getLocations = async (query) => {
  const {
    search,
    type,
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

  const orderBy = {
    [sortBy]: sortOrder,
  };

  const [locations, totalItems] = await Promise.all([
    locationRepository.findLocations({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    locationRepository.countLocations(where),
  ]);

  return buildPaginatedResponse({
    data: locations,
    totalItems,
    page,
    limit,
  });
};

export const getLocationBySlug = async (slug) => {
  const normalizedSlug = normalizeSlug(slug);

  const location = await locationRepository.findLocationBySlug(normalizedSlug);

  if (!location) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Location not found",
    );
  }

  return formatLocationDetail(location);
};
