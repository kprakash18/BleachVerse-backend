import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";
import * as transformationService from "./transformation.service.js";

export const getTransformations = asyncHandler(async (req, res) => {
  const result = await transformationService.getTransformations(
    req.validatedData.query,
  );

  return successResponse(res, result.data, 200, result.pagination);
});

export const getTransformationById = asyncHandler(async (req, res) => {
  const { id } = req.validatedData.params;

  const transformation = await transformationService.getTransformationById(id);

  return successResponse(res, transformation);
});
