import { Router } from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import {
  getOrganizationsSchema,
  getOrganizationBySlugSchema,
} from "./organization.validator.js";
import * as organizationController from "./organization.controller.js";
import {expensiveApiRateLimiter} from "../../common/middleware/rateLimmiter.js"

const router = Router();

router.get(
  "/organizations",
  expensiveApiRateLimiter,
  validateRequest(getOrganizationsSchema),
  organizationController.getOrganizations,
);

router.get(
  "/organizations/:slug",
  validateRequest(getOrganizationBySlugSchema),
  organizationController.getOrganizationBySlug,
);

export default router;
