import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";
import * as organizationService from "./organization.service.js";

export const getOrganizations = asyncHandler(async (req, res) => {
  const result = await organizationService.getOrganizations(
    req.validatedData.query,
  );

  return successResponse(res, result.data, 200, result.pagination);
});

export const getOrganizationBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.validatedData.params;

  const organization = await organizationService.getOrganizationBySlug(slug);

  return successResponse(res, organization);
});
