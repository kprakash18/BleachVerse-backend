import { Router } from "express";
import { searchController } from "./search.controller.js";
import { semanticSearchSchema } from "./search.validation.js";
import { unifiedSearchSchema } from "./unified-search.validation.js";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import { semanticSearchRateLimiter } from "../../common/middleware/redisRateLimiter.js";

const router = Router();

/**
 * GET /api/v1/search
 * Unified Hybrid Graph + Vector Intelligence search endpoint.
 */
router.get(
  "/",
  semanticSearchRateLimiter,
  validateRequest(unifiedSearchSchema),
  searchController.searchUnified
);

/**
 * GET /api/v1/search/semantic
 * Dedicated pgvector similarity search endpoint.
 */
router.get(
  "/semantic",
  semanticSearchRateLimiter,
  validateRequest(semanticSearchSchema),
  searchController.searchSemantic
);

export default router;
