import * as arcService from "./arc.service.js";
import successResponse from "../../common/responses/successResponse.js";
import asyncHandler from "../../common/utils/asyncHandler.js";

export const getArcs = asyncHandler(async (req, res) => {
  const result = await arcService.getArcs(req.validatedData.query);

  return successResponse(res, result.data, 200, result.pagination);
});

// get arc/:slug
export const getArcBySlug = asyncHandler(async (req, res) => {
  const arc = await arcService.getArcBySlug(req.validatedData.params.slug);

  return successResponse(res, arc);
});
