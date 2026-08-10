import { Router } from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import { getFightsSchema, getFightBySlugSchema } from "./fight.validator.js";
import * as fightController from "./fight.controller.js";

const router = Router();

// GET /fights (Collection with search, filters, pagination)
router.get("/fights", validateRequest(getFightsSchema), fightController.getFights);

// GET /fights/:slug (Lookup single fight by slug)
router.get(
  "/fights/:slug",
  validateRequest(getFightBySlugSchema),
  fightController.getFightBySlug,
);

export default router;
