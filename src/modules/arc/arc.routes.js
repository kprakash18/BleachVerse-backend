import { Router } from "express";
import { getArcs, getArcBySlug } from "./arc.controller.js";
import { getArcsSchema, getArcBySlugSchema } from "./arc.validation.js";
import { validateRequest } from "../../common/middleware/validateRequest.js";
const router = Router();
router.get(
  "/arcs",
  validateRequest(getArcsSchema),
  getArcs,
);

router.get(
  "/arc/:slug",
  validateRequest(getArcBySlugSchema),
  getArcBySlug,
);

export default router;
