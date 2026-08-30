import { queryClassifierService } from "./query-classifier.service.js";
import { graphSearchService } from "./graph-search.service.js";
import { semanticSearchService } from "../semantic/semantic-search.service.js";
import { candidateAggregatorService } from "./candidate-aggregator.service.js";
import { searchRankingService } from "./search-ranking.service.js";
import { semanticHydrationService } from "../semantic/semantic-hydration.service.js";

export class SearchOrchestratorService {
  /**
   * Orchestrates unified hybrid graph + vector search.
   * @param {Object} params
   * @param {string} params.query
   * @param {string} [params.mode="AUTO"] AUTO | SEMANTIC | GRAPH | HYBRID
   * @param {number} [params.limit=10]
   * @param {number} [params.threshold=0.4]
   * @param {boolean} [params.hydrate=true]
   * @returns {Promise<Object>}
   */
  async search({
    query,
    mode = "AUTO",
    limit = 10,
    threshold = 0.4,
    hydrate = true,
  }) {
    // 1. Classify query intent
    const intent = queryClassifierService.classify(query);

    // 2. Resolve active mode
    const resolvedMode =
      mode && mode.toUpperCase() !== "AUTO" ? mode.toUpperCase() : intent.mode;

    const runSemantic =
      resolvedMode === "SEMANTIC" ||
      resolvedMode === "HYBRID" ||
      (resolvedMode === "AUTO" && intent.intents.semantic);

    const runGraph =
      resolvedMode === "GRAPH" ||
      resolvedMode === "HYBRID" ||
      (resolvedMode === "AUTO" && intent.intents.graph);

    // 3. Execute parallel retrieval via Promise.allSettled for failure resilience
    const tasks = [];
    let semanticTaskIndex = -1;
    let graphTaskIndex = -1;

    if (runSemantic) {
      semanticTaskIndex = tasks.length;
      tasks.push(
        semanticSearchService.searchSemantic({
          query: intent.semanticQuery || query,
          limit: limit * 2, // Fetch slightly wider candidate pool before aggregation
          threshold,
          hydrate: false,
        })
      );
    }

    if (runGraph) {
      graphTaskIndex = tasks.length;
      tasks.push(
        graphSearchService.searchGraphCandidates({
          graphConstraints: intent.graphConstraints,
          structuredFilters: intent.structuredFilters,
          limit: limit * 2,
        })
      );
    }

    const settled = await Promise.allSettled(tasks);

    let semanticCandidates = [];
    if (semanticTaskIndex >= 0 && settled[semanticTaskIndex]?.status === "fulfilled") {
      semanticCandidates = settled[semanticTaskIndex].value?.results || [];
    }

    let graphCandidates = [];
    if (graphTaskIndex >= 0 && settled[graphTaskIndex]?.status === "fulfilled") {
      graphCandidates = settled[graphTaskIndex].value || [];
    }

    // 4. Candidate Aggregation
    const aggregated = candidateAggregatorService.aggregate({
      semanticCandidates,
      graphCandidates,
      aggregationMode: intent.aggregationMode,
    });

    // 5. Ranking & Sorting
    const ranked = searchRankingService.rank(aggregated, intent.aggregationMode, limit);

    // 6. Entity Hydration
    let finalResults = ranked;
    if (hydrate && ranked.length > 0) {
      const candidatesForHydration = ranked.map((r) => ({
        entityId: r.entityId,
        entityType: r.entityType,
        similarity: r.scores.final,
        metadata: r.metadata,
      }));

      const hydratedList = await semanticHydrationService.hydrateCandidates(
        candidatesForHydration
      );

      finalResults = ranked.map((r, i) => ({
        entityId: r.entityId,
        entityType: r.entityType,
        scores: r.scores,
        matchedBy: r.matchedBy,
        metadata: r.metadata,
        entity: hydratedList[i]?.entity || null,
      }));
    }

    return {
      query,
      execution: {
        mode: resolvedMode,
        semanticUsed: runSemantic,
        graphUsed: runGraph,
        structuredUsed: intent.intents.structured,
        aggregationMode: intent.aggregationMode,
      },
      count: finalResults.length,
      results: finalResults,
    };
  }
}

export const searchOrchestratorService = new SearchOrchestratorService();
