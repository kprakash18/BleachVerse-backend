import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";
import * as quoteService from "./quote.service.js";

export const getQuotes = asyncHandler(async (req, res) => {
  const result = await quoteService.getQuotes(req.validatedData.query);

  return successResponse(res, result.data, 200, result.pagination);
});

export const getQuoteById = asyncHandler(async (req, res) => {
  const { id } = req.validatedData.params;

  const quote = await quoteService.getQuoteById(id);

  return successResponse(res, quote);
});

export const getQuotesByCharacterSlug = asyncHandler(async (req, res) => {
  const { characterSlug } = req.validatedData.params;
  const { page, limit } = req.validatedData.query;

  const result = await quoteService.getQuotesByCharacterSlug({
    characterSlug,
    page,
    limit,
  });

  return successResponse(res, result.data, 200, result.pagination);
});
