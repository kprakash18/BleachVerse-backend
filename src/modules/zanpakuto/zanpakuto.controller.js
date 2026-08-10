import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";
import * as zanpakutoService from "./zanpakuto.service.js";

export const getZanpakutos = asyncHandler(async (req, res) => {
  const result = await zanpakutoService.getZanpakutos(req.validatedData.query);

  return successResponse(res, result.data, 200, result.pagination);
});

export const getZanpakutoBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.validatedData.params;

  const zanpakuto = await zanpakutoService.getZanpakutoBySlug(slug);

  return successResponse(res, zanpakuto);
});
