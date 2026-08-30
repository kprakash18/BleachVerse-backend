export class CandidateAggregatorService {
  /**
   * Aggregates semantic and graph candidate sets based on aggregation mode.
   * @param {Object} params
   * @param {Array<Object>} [params.semanticCandidates]
   * @param {Array<Object>} [params.graphCandidates]
   * @param {string} [params.aggregationMode="UNION"] INTERSECTION | UNION
   * @returns {Array<Object>} Aggregated candidate list
   */
  aggregate({ semanticCandidates = [], graphCandidates = [], aggregationMode = "UNION" }) {
    const candidateMap = new Map();
    const semanticSet = new Set();
    const graphSet = new Set();

    for (const c of semanticCandidates) {
      if (!c?.entityId || !c?.entityType) continue;
      const key = `${c.entityType}:${c.entityId}`;
      semanticSet.add(key);
      candidateMap.set(key, {
        entityId: c.entityId,
        entityType: c.entityType,
        metadata: c.metadata || {},
        scores: { semantic: typeof c.similarity === "number" ? c.similarity : null, graph: null, structured: null },
        matchedBy: ["SEMANTIC"],
      });
    }

    for (const c of graphCandidates) {
      if (!c?.entityId || !c?.entityType) continue;
      const key = `${c.entityType}:${c.entityId}`;
      graphSet.add(key);
      const graphScore = typeof c.graphScore === "number" ? c.graphScore : 1.0;

      if (candidateMap.has(key)) {
        const item = candidateMap.get(key);
        item.scores.graph = graphScore;
        if (!item.matchedBy.includes("GRAPH")) item.matchedBy.push("GRAPH");
      } else {
        candidateMap.set(key, {
          entityId: c.entityId,
          entityType: c.entityType,
          metadata: c.metadata || {},
          scores: { semantic: null, graph: graphScore, structured: null },
          matchedBy: ["GRAPH"],
        });
      }
    }

    if (aggregationMode === "INTERSECTION") {
      if (semanticSet.size > 0 && graphSet.size > 0) {
        return [...semanticSet].filter((k) => graphSet.has(k)).map((k) => candidateMap.get(k));
      }
      return Array.from(graphSet.size > 0 ? graphSet : semanticSet, (k) => candidateMap.get(k));
    }

    return Array.from(candidateMap.values());
  }
}

export const candidateAggregatorService = new CandidateAggregatorService();
