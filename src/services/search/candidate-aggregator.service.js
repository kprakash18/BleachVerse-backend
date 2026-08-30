export class CandidateAggregatorService {
  /**
   * Aggregates semantic and graph candidate sets based on aggregation mode.
   * @param {Object} params
   * @param {Array<Object>} [params.semanticCandidates]
   * @param {Array<Object>} [params.graphCandidates]
   * @param {string} [params.aggregationMode="UNION"] INTERSECTION | UNION
   * @returns {Array<Object>} Aggregated candidate list
   */
  aggregate({
    semanticCandidates = [],
    graphCandidates = [],
    aggregationMode = "UNION",
  }) {
    const candidateMap = new Map();

    const semanticSet = new Set();
    const graphSet = new Set();

    // 1. Process Semantic Candidates
    for (const c of semanticCandidates) {
      if (!c?.entityId || !c?.entityType) continue;
      const key = `${c.entityType}:${c.entityId}`;
      semanticSet.add(key);

      candidateMap.set(key, {
        entityId: c.entityId,
        entityType: c.entityType,
        metadata: c.metadata || {},
        scores: {
          semantic: typeof c.similarity === "number" ? c.similarity : null,
          graph: null,
          structured: null,
        },
        matchedBy: ["SEMANTIC"],
      });
    }

    // 2. Process Graph Candidates
    for (const c of graphCandidates) {
      if (!c?.entityId || !c?.entityType) continue;
      const key = `${c.entityType}:${c.entityId}`;
      graphSet.add(key);

      if (candidateMap.has(key)) {
        const existing = candidateMap.get(key);
        existing.scores.graph = typeof c.graphScore === "number" ? c.graphScore : 1.0;
        if (!existing.matchedBy.includes("GRAPH")) {
          existing.matchedBy.push("GRAPH");
        }
      } else {
        candidateMap.set(key, {
          entityId: c.entityId,
          entityType: c.entityType,
          metadata: c.metadata || {},
          scores: {
            semantic: null,
            graph: typeof c.graphScore === "number" ? c.graphScore : 1.0,
            structured: null,
          },
          matchedBy: ["GRAPH"],
        });
      }
    }

    // 3. Apply Aggregation Logic
    if (aggregationMode === "INTERSECTION") {
      // If both sets have candidates, enforce strict intersection
      if (semanticSet.size > 0 && graphSet.size > 0) {
        const intersectedKeys = [...semanticSet].filter((k) => graphSet.has(k));
        return intersectedKeys.map((k) => candidateMap.get(k));
      }
      // If only one engine was queried or produced candidates, return that engine's candidates
      if (graphSet.size > 0) {
        return [...graphSet].map((k) => candidateMap.get(k));
      }
      return [...semanticSet].map((k) => candidateMap.get(k));
    }

    // UNION mode (all merged candidates)
    return Array.from(candidateMap.values());
  }
}

export const candidateAggregatorService = new CandidateAggregatorService();
