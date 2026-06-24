import { Router } from "express";
import {
  getArcs,
  getArcBySlug,
  getEpisodesByArcSlug,
  getFightsByArcSlug,
  getEventsByArcSlug,
  getCharactersByArcSlug,
} from "./arc.controller.js";
import {
  getArcsSchema,
  getArcBySlugSchema,
  getEpisodesByArcSlugSchema,
  getFightsByArcSlugSchema,
  getEventsByArcSlugSchema,
  getCharactersByArcSlugSchema,
} from "./arc.validation.js";
import { validateRequest } from "../../common/middleware/validateRequest.js";
const router = Router();
router.get("/", validateRequest(getArcsSchema), getArcs);

router.get("/:slug", validateRequest(getArcBySlugSchema), getArcBySlug);

// Child nodes of Arc: Fetch all episodes belonging to a specific parent Arc
router.get(
  "/:slug/episodes",
  validateRequest(getEpisodesByArcSlugSchema),
  getEpisodesByArcSlug,
);

// Child nodes of Arc: Fetch all fights belonging to a specific parent Arc
router.get(
  "/:slug/fights",
  validateRequest(getFightsByArcSlugSchema),
  getFightsByArcSlug,
);

// Child nodes of Arc: Fetch all events belonging to a specific parent Arc
router.get(
  "/:slug/events",
  validateRequest(getEventsByArcSlugSchema),
  getEventsByArcSlug,
);

// Child nodes of Arc: Fetch all distinct characters belonging to a specific parent Arc
router.get(
  "/:slug/characters",
  validateRequest(getCharactersByArcSlugSchema),
  getCharactersByArcSlug,
);

export default router;

