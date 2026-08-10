import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";
import * as episodeService from "./episode.service.js";

export const getEpisodes = asyncHandler(async (req, res) => {
  const result = await episodeService.getEpisodes(req.validatedData.query);

  return successResponse(res, result.data, 200, result.pagination);
});

export const getEpisodeBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.validatedData.params;

  const episode = await episodeService.getEpisodeBySlug(slug);

  return successResponse(res, episode);
});

export const getEpisodeByNumber = asyncHandler(async (req, res) => {
  const { number } = req.validatedData.params;

  const episode = await episodeService.getEpisodeByNumber(number);

  return successResponse(res, episode);
});
