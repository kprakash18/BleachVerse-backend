import { Router } from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import {
  getAppearancesSchema,
  getAppearanceByIdSchema,
} from "./appearance.validator.js";
import * as appearanceController from "./appearance.controller.js";

const router = Router();

router.get(
  "/appearances",
  validateRequest(getAppearancesSchema),
  appearanceController.getAppearances,
);

router.get(
  "/appearances/:id",
  validateRequest(getAppearanceByIdSchema),
  appearanceController.getAppearanceById,
);

export default router;
