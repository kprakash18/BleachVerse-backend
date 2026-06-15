import { Router } from "express";

import { getCharacters } from "./character.controller.js";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import { getCharactersSchema } from "./character.validation.js";

const router = Router();

router.get("/character", validateRequest(getCharactersSchema), getCharacters);

export default router;
