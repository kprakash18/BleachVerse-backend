import { Router } from "express";

import { getCharacters, getCharacterBySlug } from "./character.controller.js";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import {
  getCharactersSchema,
  getCharacterBySlugSchema,
} from "./character.validation.js";

const router = Router();

router.get("/characters", validateRequest(getCharactersSchema), getCharacters);
// Get a character by slug
router.get(
  "/character/:slug",
  validateRequest(getCharacterBySlugSchema),
  getCharacterBySlug,
);

export default router;
