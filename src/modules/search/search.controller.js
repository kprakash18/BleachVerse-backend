import { semanticSearchService } from "../../services/semantic/semantic-search.service.js";
import { searchOrchestratorService } from "../../services/search/search-orchestrator.service.js";
import successResponse from "../../common/responses/successResponse.js";

export class SearchController {
  /**
   * Handles GET /api/v1/search/semantic
   */
  async searchSemantic(req, res, next) {
    try {
      const { q, type, limit, threshold, hydrate } = req.validatedData.query;

      const result = await semanticSearchService.searchSemantic({
        query: q,
        type,
        limit,
        threshold,
        hydrate,
      });

      return successResponse(res, result, 200);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Handles GET /api/v1/search (Unified Hybrid Graph + Vector Search)
   */
  async searchUnified(req, res, next) {
    try {
      const { q, mode, limit, threshold, hydrate } = req.validatedData.query;

      const result = await searchOrchestratorService.search({
        query: q,
        mode,
        limit,
        threshold,
        hydrate,
      });

      return successResponse(res, result, 200);
    } catch (err) {
      next(err);
    }
  }
}

export const searchController = new SearchController();
