export class SearchRankingService {
  /**
   * Computes unified ranking scores for aggregated candidates and sorts descending.
   * @param {Array<Object>} candidates
   * @param {string} [aggregationMode="UNION"] INTERSECTION | UNION
   * @param {number} [limit=10]
   * @returns {Array<Object>}
   */
  rank(candidates, aggregationMode = "UNION", limit = 10) {
    if (!Array.isArray(candidates) || candidates.length === 0) return [];

    const isIntersection = aggregationMode === "INTERSECTION";
    const scored = candidates.map((c) => {
      const s = c.scores?.semantic ?? null;
      const g = c.scores?.graph ?? null;

      const finalScore = isIntersection
        ? Math.min((s ?? 0.5) + (g ? 0.1 : 0), 1.0)
        : (s ?? 0) * 0.75 + (g ?? 0) * 0.25;

      return {
        ...c,
        scores: { ...c.scores, final: Number(finalScore.toFixed(4)) },
      };
    });

    scored.sort((a, b) => b.scores.final - a.scores.final);
    return scored.slice(0, Math.min(Math.max(Number(limit) || 10, 1), 50));
  }
}

export const searchRankingService = new SearchRankingService();
