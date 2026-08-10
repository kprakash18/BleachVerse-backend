import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";
import * as fightService from "./fight.service.js";

export const getFights = asyncHandler(async (req, res) => {
  const result = await fightService.getFights(req.validatedData.query);

  return successResponse(res, result.data, 200, result.pagination);
});

export const getFightBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.validatedData.params;

  const fight = await fightService.getFightBySlug(slug);

  return successResponse(res, fight);
});
