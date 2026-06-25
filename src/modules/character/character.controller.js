import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";

import * as characterService from "./character.service.js";

// List characters with filtering, sorting and pagination
export const getCharacters = asyncHandler(async (req, res) => {
  const result = await characterService.getCharacters(req.validatedData.query);

  return successResponse(res, result.data, 200, result.pagination);
});

// Get one character's full details by their unique slug
export const getCharacterBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.validatedData.params;

  const character = await characterService.getCharacterBySlug(slug);

  return successResponse(res, character);
});
