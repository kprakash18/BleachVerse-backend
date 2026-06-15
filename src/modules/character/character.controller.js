import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";

import * as characterService from "./character.service.js";

export const getCharacters = asyncHandler(async (req, res) => {
  const result = await characterService.getCharacters(req.validatedData.query);

  return successResponse(res, result.data, 200, result.meta);
});

// get character detailss using their unique slug
export const getCharacterBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.validatedData.params;

  const character = await characterService.getCharacterBySlug(slug);

  return successResponse(res, character);
});
