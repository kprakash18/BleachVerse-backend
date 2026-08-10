import { Router } from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import {
  getTransformationsSchema,
  getTransformationByIdSchema,
} from "./transformation.validator.js";
import * as transformationController from "./transformation.controller.js";

const router = Router();

router.get(
  "/transformations",
  validateRequest(getTransformationsSchema),
  transformationController.getTransformations,
);

router.get(
  "/transformations/:id",
  validateRequest(getTransformationByIdSchema),
  transformationController.getTransformationById,
);

export default router;
