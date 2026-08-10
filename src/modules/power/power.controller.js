import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";
import * as powerService from "./power.service.js";

export const getPowers = asyncHandler(async (req, res) => {
  const result = await powerService.getPowers(req.validatedData.query);

  return successResponse(res, result.data, 200, result.pagination);
});

export const getPowerById = asyncHandler(async (req, res) => {
  const { id } = req.validatedData.params;

  const power = await powerService.getPowerById(id);

  return successResponse(res, power);
});
