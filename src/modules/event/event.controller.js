import asyncHandler from "../../common/utils/asyncHandler.js";
import successResponse from "../../common/responses/successResponse.js";
import * as eventService from "./event.service.js";

export const getEvents = asyncHandler(async (req, res) => {
  const result = await eventService.getEvents(req.validatedData.query);

  return successResponse(res, result.data, 200, result.pagination);
});

export const getEventBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.validatedData.params;

  const event = await eventService.getEventBySlug(slug);

  return successResponse(res, event);
});
