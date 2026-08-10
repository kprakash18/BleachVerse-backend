import { Router } from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import {
  getZanpakutosSchema,
  getZanpakutoBySlugSchema,
} from "./zanpakuto.validator.js";
import * as zanpakutoController from "./zanpakuto.controller.js";

const router = Router();

router.get(
  "/zanpakutos",
  validateRequest(getZanpakutosSchema),
  zanpakutoController.getZanpakutos,
);

router.get(
  "/zanpakutos/:slug",
  validateRequest(getZanpakutoBySlugSchema),
  zanpakutoController.getZanpakutoBySlug,
);

export default router;
