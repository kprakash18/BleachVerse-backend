import * as organizationRepository from "./organization.repository.js";
import ApiError from "../../common/errors/ApiError.js";
import errorCodes from "../../common/errors/errorCodes.js";
import { calculatePaginationParams, buildPaginatedResponse } from "../../common/utils/pagination.js";
import { normalizeSlug } from "../../common/utils/slug.js";

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

  const [organizations, totalItems] = await Promise.all([
    organizationRepository.findOrganizations({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    organizationRepository.countOrganizations(where),
  ]);

  return buildPaginatedResponse({
    data: organizations,
    totalItems,
    page,
    limit,
  });
};

export const getOrganizationBySlug = async (slug) => {
  const normalizedSlug = normalizeSlug(slug);

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
