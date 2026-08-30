import { embeddingService } from "../embeddings/embedding.service.js";
import { redisCircuitBreaker } from "../embeddings/redis-circuit-breaker.service.js";
import { redisEmbeddingCacheService } from "./redis-embedding-cache.service.js";
import { normalizeQuery } from "./query-normalizer.service.js";
import { semanticDocumentRepository } from "../../repositories/semantic-document.repository.js";
import { semanticHydrationService } from "./semantic-hydration.service.js";

export class SemanticSearchService {
  /**
   * Performs semantic vector similarity search against PostgreSQL pgvector store.
   * Shielded by Redis distributed caching, circuit breaker, and repository abstraction.
   * @param {Object} params
   * @param {string} params.query User search query
   * @param {string} [params.type] Optional entity type filter
   * @param {number} [params.threshold=0.5] Minimum similarity cutoff (0.0 - 1.0)
   * @param {number} [params.limit=10] Maximum results to return
   * @param {boolean} [params.hydrate=true] Whether to populate full relational database entity details
   * @returns {Promise<{ query: string, count: number, threshold: number, cached: boolean, results: Array }>}
   */
  async searchSemantic({
    query,
    type = null,
    threshold = 0.5,
    limit = 10,
    hydrate = true,
  }) {
    const normalizedQuery = normalizeQuery(query);
    if (!normalizedQuery) {
      return { query, count: 0, threshold, cached: false, results: [] };
    }

    // 1. Check distributed Redis embedding cache
    let queryVector = await redisEmbeddingCacheService.get(normalizedQuery);
    let isCached = queryVector !== null;

    // 2. Generate embedding through distributed Redis circuit breaker on cache miss
    if (!queryVector) {
      queryVector = await redisCircuitBreaker.execute(async () => {
        return embeddingService.generateEmbedding(normalizedQuery, { isInteractive: true });
      });
      await redisEmbeddingCacheService.set(normalizedQuery, queryVector);
    }

    // 3. Delegate pgvector similarity retrieval to repository
    const candidates = await semanticDocumentRepository.searchSimilar({
      vector: queryVector,
      entityType: type,
      threshold,
      limit,
    });

    if (candidates.length === 0) {
      return {
        query,
        count: 0,
        threshold,
        cached: isCached,
        results: [],
      };
    }

    // 4. Delegate entity hydration to dedicated hydration layer
    let results = candidates;
    if (hydrate) {
      results = await semanticHydrationService.hydrateCandidates(candidates);
    }

    return {
      query,
      count: results.length,
      threshold,
      cached: isCached,
      results,
    };
  }
}

export const semanticSearchService = new SemanticSearchService();
