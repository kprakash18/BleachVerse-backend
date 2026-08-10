import { Router } from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import { getEventsSchema, getEventBySlugSchema } from "./event.validator.js";
import * as eventController from "./event.controller.js";

const router = Router();

router.get("/events", validateRequest(getEventsSchema), eventController.getEvents);

router.get(
  "/events/:slug",
  validateRequest(getEventBySlugSchema),
  eventController.getEventBySlug,
);

export default router;
