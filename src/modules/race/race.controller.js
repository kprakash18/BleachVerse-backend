import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";
import * as raceService from "./race.service.js";

export const getRaces = asyncHandler(async (req, res) => {
  const result = await raceService.getRaces(req.validatedData.query);

  return successResponse(res, result.data, 200, result.pagination);
});

export const getRaceByName = asyncHandler(async (req, res) => {
  const { name } = req.validatedData.params;

  const race = await raceService.getRaceByName(name);

  return successResponse(res, race);
});
