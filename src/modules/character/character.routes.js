import { Router } from "express";

import { getCharacters, getCharacterBySlug } from "./character.controller.js";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import {
  getCharactersSchema,
  getCharacterBySlugSchema,
} from "./character.validator.js";

const router = Router();

// List characters (filter, sort, paginate)
router.get("/characters", validateRequest(getCharactersSchema), getCharacters);

// Get a single character by slug
router.get(
  "/characters/:slug",
  validateRequest(getCharacterBySlugSchema),
  getCharacterBySlug,
);

export default router;
