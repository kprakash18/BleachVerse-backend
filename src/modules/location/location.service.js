import * as locationRepository from "./location.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";

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
    page = 1,
    limit = 10,
    search,
    type,
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

  const skip = (page - 1) * limit;

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

  return {
    data: locations,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

export const getLocationBySlug = async (slug) => {
  const normalizedSlug = slug.trim().toLowerCase();

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
