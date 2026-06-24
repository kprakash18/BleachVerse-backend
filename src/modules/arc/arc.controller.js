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

// Child nodes of Arc: GET /api/v1/arcs/:slug/episodes
export const getEpisodesByArcSlug = asyncHandler(async (req, res) => {
  const result = await arcService.getEpisodesByArcSlug({
    slug: req.validatedData.params.slug,
    ...req.validatedData.query,
  });

  return successResponse(res, result.data, 200, result.pagination);
});

// Child nodes of Arc: GET /api/v1/arcs/:slug/fights
export const getFightsByArcSlug = asyncHandler(async (req, res) => {
  const result = await arcService.getFightsByArcSlug({
    slug: req.validatedData.params.slug,
    ...req.validatedData.query,
  });

  return successResponse(res, result.data, 200, result.pagination);
});

// Child nodes of Arc: GET /api/v1/arcs/:slug/events
export const getEventsByArcSlug = asyncHandler(async (req, res) => {
  const result = await arcService.getEventsByArcSlug({
    slug: req.validatedData.params.slug,
    ...req.validatedData.query,
  });

  return successResponse(res, result.data, 200, result.pagination);
});

// Child nodes of Arc: GET /api/v1/arcs/:slug/characters
export const getCharactersByArcSlug = asyncHandler(async (req, res) => {
  const result = await arcService.getCharactersByArcSlug({
    slug: req.validatedData.params.slug,
    ...req.validatedData.query,
  });

  return successResponse(res, result.data, 200, result.pagination);
});

