import { Router } from "express";
import {
  getArcs,
  getArcBySlug,
  getEpisodesByArcSlug,
} from "./arc.controller.js";
import {
  getArcsSchema,
  getArcBySlugSchema,
  getEpisodesByArcSlugSchema,
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

export default router;
