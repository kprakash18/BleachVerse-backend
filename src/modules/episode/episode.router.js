import { Router } from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import {
  getEpisodesSchema,
  getEpisodeBySlugSchema,
  getEpisodeByNumberSchema,
} from "./episode.validator.js";
import * as episodeController from "./episode.controller.js";

const router = Router();

// GET /episodes (Collection)
router.get("/episodes", validateRequest(getEpisodesSchema), episodeController.getEpisodes);

// GET /episodes/number/:number (Lookup by episode number)
router.get(
  "/episodes/number/:number",
  validateRequest(getEpisodeByNumberSchema),
  episodeController.getEpisodeByNumber,
);

// GET /episodes/:slug (Lookup by episode slug)
router.get(
  "/episodes/:slug",
  validateRequest(getEpisodeBySlugSchema),
  episodeController.getEpisodeBySlug,
);

export default router;
