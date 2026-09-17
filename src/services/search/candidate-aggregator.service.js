export class CandidateAggregatorService {
  /**
   * Aggregates semantic and graph candidate sets based on aggregation mode.
   * @param {Object} params
   * @param {Array<Object>} [params.semanticCandidates]
   * @param {Array<Object>} [params.graphCandidates]
   * @param {Array<Object>} [params.structuredCandidates]
   * @param {string} [params.aggregationMode="UNION"] INTERSECTION | UNION
   * @param {Array<string>} [params.activeSources] Sources that were intentionally queried
   * @returns {Array<Object>} Aggregated candidate list
   */
  aggregate({
    semanticCandidates = [],
    graphCandidates = [],
    structuredCandidates = [],
    aggregationMode = "UNION",
    activeSources = [],
  }) {
    const candidateMap = new Map();
    const sourceSets = {
      SEMANTIC: new Set(),
      GRAPH: new Set(),
      STRUCTURED: new Set(),
    };

    const ensureCandidate = (candidate, source, scorePatch = {}, metadataPatch = {}) => {
      if (!candidate?.entityId || !candidate?.entityType) return;
      const key = `${candidate.entityType}:${candidate.entityId}`;
      sourceSets[source].add(key);

      if (!candidateMap.has(key)) {
        candidateMap.set(key, {
          entityId: candidate.entityId,
          entityType: candidate.entityType,
          metadata: candidate.metadata || {},
          scores: { semantic: null, graph: null, structured: null },
          matchedBy: [],
        });
      }

      const item = candidateMap.get(key);
      item.metadata = {
        ...item.metadata,
        ...metadataPatch,
      };
      item.scores = {
        ...item.scores,
        ...scorePatch,
      };
      if (!item.matchedBy.includes(source)) item.matchedBy.push(source);
    };

    for (const c of semanticCandidates) {
      ensureCandidate(
        c,
        "SEMANTIC",
        { semantic: typeof c.similarity === "number" ? c.similarity : null },
        c.metadata || {},
      );
    }

    for (const c of graphCandidates) {
      const graphScore = typeof c.graphScore === "number" ? c.graphScore : 1.0;
      ensureCandidate(c, "GRAPH", { graph: graphScore }, c.graphMetadata || {});
    }

    for (const c of structuredCandidates) {
      const structuredScore = typeof c.structuredScore === "number" ? c.structuredScore : 1.0;
      ensureCandidate(c, "STRUCTURED", { structured: structuredScore }, c.structuredMetadata || {});
    }

    if (aggregationMode === "INTERSECTION") {
      const requestedSources = activeSources
        .map((source) => source?.toUpperCase?.())
        .filter((source) => sourceSets[source]);
      const activeSets = requestedSources.length > 0
        ? requestedSources.map((source) => sourceSets[source])
        : Object.values(sourceSets).filter((set) => set.size > 0);

      if (activeSets.length > 1) {
        return [...activeSets[0]]
          .filter((key) => activeSets.every((set) => set.has(key)))
          .map((key) => candidateMap.get(key));
      }
      return activeSets.length === 1
        ? [...activeSets[0]].map((key) => candidateMap.get(key))
        : [];
    }

    return Array.from(candidateMap.values());
  }
}

export const candidateAggregatorService = new CandidateAggregatorService();
