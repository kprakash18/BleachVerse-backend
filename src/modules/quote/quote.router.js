import { Router } from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import {
  getQuotesSchema,
  getQuoteByIdSchema,
  getQuotesByCharacterSlugSchema,
} from "./quote.validator.js";
import * as quoteController from "./quote.controller.js";

const router = Router();

router.get("/quotes", validateRequest(getQuotesSchema), quoteController.getQuotes);

router.get(
  "/quotes/character/:characterSlug",
  validateRequest(getQuotesByCharacterSlugSchema),
  quoteController.getQuotesByCharacterSlug,
);

router.get(
  "/quotes/:id",
  validateRequest(getQuoteByIdSchema),
  quoteController.getQuoteById,
);

export default router;
