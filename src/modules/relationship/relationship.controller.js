import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";
import * as relationshipService from "./relationship.service.js";

export const createRelationship = asyncHandler(async (req, res) => {
  const result = await relationshipService.createRelationship(req.validatedData.body);
  return successResponse(res, result, 201);
});

export const getCharacterRelationships = asyncHandler(async (req, res) => {
  const { slug } = req.validatedData.params;
  const { type } = req.validatedData.query || {};
  const result = await relationshipService.getCharacterRelationships(slug, type);
  return successResponse(res, result);
});

export const getCharacterTrainers = asyncHandler(async (req, res) => {
  const { slug } = req.validatedData.params;
  const result = await relationshipService.getCharacterTrainers(slug);
  return successResponse(res, result);
});

export const getCharacterBetrayed = asyncHandler(async (req, res) => {
  const { slug } = req.validatedData.params;
  const result = await relationshipService.getCharacterBetrayed(slug);
  return successResponse(res, result);
});

export const getCharacterOpponents = asyncHandler(async (req, res) => {
  const { slug } = req.validatedData.params;
  const result = await relationshipService.getCharacterOpponents(slug);
  return successResponse(res, result);
});

export const getCharacterOrganizations = asyncHandler(async (req, res) => {
  const { slug } = req.validatedData.params;
  const result = await relationshipService.getCharacterOrganizations(slug);
  return successResponse(res, result);
});

export const getShortestPath = asyncHandler(async (req, res) => {
  const { from, to, depth } = req.validatedData.query;
  const result = await relationshipService.getShortestPath(from, to, depth);
  return successResponse(res, result);
});

// Community Submissions & Moderation Queue
export const submitRelationship = asyncHandler(async (req, res) => {
  const result = await relationshipService.submitRelationship(req.validatedData.body);
  return successResponse(res, result, 201);
});

export const getSubmissions = asyncHandler(async (req, res) => {
  const result = await relationshipService.getSubmissions(req.validatedData.query);
  return successResponse(res, result.data, 200, result.pagination);
});

export const reviewSubmission = asyncHandler(async (req, res) => {
  const { id } = req.validatedData.params;
  const result = await relationshipService.reviewSubmission(id, req.validatedData.body);
  return successResponse(res, result);
});
