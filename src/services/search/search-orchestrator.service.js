import { queryClassifierService } from "./query-classifier.service.js";
import { graphSearchService } from "./graph-search.service.js";
import { semanticSearchService } from "../semantic/semantic-search.service.js";
import { structuredSearchService } from "./structured-search.service.js";
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
  async search({ query, mode = "AUTO", limit = 10, threshold = 0.4, hydrate = true }) {
    const intent = queryClassifierService.classify(query);
    const resolvedMode = mode && mode.toUpperCase() !== "AUTO" ? mode.toUpperCase() : intent.mode;

    const runSemantic = ["SEMANTIC", "HYBRID"].includes(resolvedMode) || (resolvedMode === "AUTO" && intent.intents.semantic);
    const runGraph = ["GRAPH", "HYBRID"].includes(resolvedMode) || (resolvedMode === "AUTO" && intent.intents.graph);
    const runStructured = intent.intents.structured;

    const [semanticRes, graphRes, structuredRes] = await Promise.allSettled([
      runSemantic ? semanticSearchService.searchSemantic({ query: intent.semanticQuery || query, limit: limit * 2, threshold, hydrate: false }) : Promise.resolve(null),
      runGraph ? graphSearchService.searchGraphCandidates({ graphConstraints: intent.graphConstraints, limit: limit * 2 }) : Promise.resolve(null),
      runStructured ? structuredSearchService.searchStructuredCandidates({ structuredFilters: intent.structuredFilters, limit: limit * 2 }) : Promise.resolve(null),
    ]);

    const semanticCandidates = semanticRes.status === "fulfilled" ? semanticRes.value?.results || [] : [];
    const graphCandidates = graphRes.status === "fulfilled" ? graphRes.value || [] : [];
    const structuredCandidates = structuredRes.status === "fulfilled" ? structuredRes.value || [] : [];

    const aggregated = candidateAggregatorService.aggregate({
      semanticCandidates,
      graphCandidates,
      structuredCandidates,
      aggregationMode: intent.aggregationMode,
    });
    const ranked = searchRankingService.rank(aggregated, intent.aggregationMode, limit);

    let finalResults = ranked;
    if (hydrate && ranked.length > 0) {
      const candidatesForHydration = ranked.map((r) => ({ entityId: r.entityId, entityType: r.entityType, similarity: r.scores.final, metadata: r.metadata }));
      const hydratedList = await semanticHydrationService.hydrateCandidates(candidatesForHydration);
      finalResults = ranked.map((r, i) => ({ ...r, entity: hydratedList[i]?.entity || null }));
    }

    return {
      query,
      execution: {
        mode: resolvedMode,
        semanticUsed: runSemantic,
        graphUsed: runGraph,
        structuredUsed: runStructured,
        aggregationMode: intent.aggregationMode,
        sourcesUsed: [
          runSemantic ? "PGVECTOR" : null,
          runGraph ? "NEO4J" : null,
          runStructured ? "POSTGRES" : null,
        ].filter(Boolean),
        detected: {
          graphConstraints: intent.graphConstraints,
          structuredFilters: intent.structuredFilters,
        },
      },
      count: finalResults.length,
      results: finalResults,
    };
  }
}

export const searchOrchestratorService = new SearchOrchestratorService();
