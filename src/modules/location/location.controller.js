import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";
import * as locationService from "./location.service.js";

export const getLocations = asyncHandler(async (req, res) => {
  const result = await locationService.getLocations(req.validatedData.query);

  return successResponse(res, result.data, 200, result.pagination);
});

export const getLocationBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.validatedData.params;

  const location = await locationService.getLocationBySlug(slug);

  return successResponse(res, location);
});
