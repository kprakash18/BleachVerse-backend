import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";
import * as appearanceService from "./appearance.service.js";

export const getAppearances = asyncHandler(async (req, res) => {
  const result = await appearanceService.getAppearances(req.validatedData.query);

  return successResponse(res, result.data, 200, result.pagination);
});

export const getAppearanceById = asyncHandler(async (req, res) => {
  const { id } = req.validatedData.params;

  const appearance = await appearanceService.getAppearanceById(id);

  return successResponse(res, appearance);
});
