import { Router } from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import {
  getLocationsSchema,
  getLocationBySlugSchema,
} from "./location.validator.js";
import * as locationController from "./location.controller.js";

const router = Router();

router.get(
  "/locations",
  validateRequest(getLocationsSchema),
  locationController.getLocations,
);

router.get(
  "/locations/:slug",
  validateRequest(getLocationBySlugSchema),
  locationController.getLocationBySlug,
);

export default router;
