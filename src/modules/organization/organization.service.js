import * as organizationRepository from "./organization.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";

const formatOrganizationDetail = (organization) => ({
  name: organization.name,
  slug: organization.slug,
  type: organization.type,
  description: organization.description,
  parent: organization.parent,
  subOrganizations: organization.children,
  members: organization.members.map((m) => ({
    role: m.role,
    character: m.character,
  })),
});

export const getOrganizations = async (query) => {
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

  const [organizations, totalItems] = await Promise.all([
    organizationRepository.findOrganizations({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    organizationRepository.countOrganizations(where),
  ]);

  return {
    data: organizations,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

export const getOrganizationBySlug = async (slug) => {
  const normalizedSlug = slug.trim().toLowerCase();

  const organization = await organizationRepository.findOrganizationBySlug(
    normalizedSlug,
  );

  if (!organization) {
    throw new ApiError(
      404,
      errorCodes.RESOURCE_NOT_FOUND,
      "Organization not found",
    );
  }

  return formatOrganizationDetail(organization);
};
