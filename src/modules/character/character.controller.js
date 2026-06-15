import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";

import * as characterService from "./character.service.js";

export const getCharacters = asyncHandler(async (req, res) => {
  const result = await characterService.getCharacters(req.validatedData.query);

  return successResponse(res, result.data, 200, result.meta);
});
