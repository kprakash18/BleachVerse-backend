export class SearchRankingService {
  /**
   * Computes unified ranking scores for aggregated candidates and sorts descending.
   * @param {Array<Object>} candidates
   * @param {string} [aggregationMode="UNION"] INTERSECTION | UNION
   * @param {number} [limit=10]
   * @returns {Array<Object>}
   */
  rank(candidates, aggregationMode = "UNION", limit = 10) {
    if (!Array.isArray(candidates) || candidates.length === 0) {
      return [];
    }

    const scored = candidates.map((candidate) => {
      const semanticScore = candidate.scores?.semantic ?? null;
      const graphScore = candidate.scores?.graph ?? null;

      let finalScore = 0;

      if (aggregationMode === "INTERSECTION") {
        // In intersection mode, graph is a hard filter; semantic score + small confirmation boost ranks candidates
        const baseSemantic = semanticScore ?? 0.5;
        const graphBoost = graphScore ? 0.1 : 0;
        finalScore = Math.min(baseSemantic + graphBoost, 1.0);
      } else {
        // In union mode, weighted blend
        const s = semanticScore ?? 0;
        const g = graphScore ?? 0;
        finalScore = s * 0.75 + g * 0.25;
      }

      return {
        ...candidate,
        scores: {
          ...candidate.scores,
          final: Number(finalScore.toFixed(4)),
        },
      };
    });

    // Sort descending by final score
    scored.sort((a, b) => b.scores.final - a.scores.final);

    const queryLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);
    return scored.slice(0, queryLimit);
  }
}

export const searchRankingService = new SearchRankingService();
