import neo4j from "neo4j-driver";
import { runCypher } from "../../database/neo4j.js";
import { GRAPH_RELATIONSHIPS } from "./query-classifier.service.js";

const CYPHER_TEMPLATES = {
  [GRAPH_RELATIONSHIPS.FOUGHT]: `
    MATCH (source:Character)-[:FOUGHT]-(target:Character)
    WHERE target.slug = $targetSlug
    RETURN DISTINCT source.id AS entityId, 'CHARACTER' AS entityType
    LIMIT $limit
  `,
  [GRAPH_RELATIONSHIPS.TRAINED_BY]: `
    MATCH (source:Character)-[:TRAINED_BY]->(target:Character)
    WHERE target.slug = $targetSlug
    RETURN DISTINCT source.id AS entityId, 'CHARACTER' AS entityType
    LIMIT $limit
  `,
  [GRAPH_RELATIONSHIPS.MEMBER_OF]: `
    MATCH (source:Character)-[:MEMBER_OF]->(target:Organization)
    WHERE target.slug = $targetSlug
    RETURN DISTINCT source.id AS entityId, 'CHARACTER' AS entityType
    LIMIT $limit
  `,
};

export class GraphSearchService {
  /**
   * Searches Neo4j graph for candidate entities matching relational constraints.
   * @param {Object} params
   * @param {Array<Object>} params.graphConstraints
   * @param {Object} [params.structuredFilters]
   * @param {number} [params.limit=20]
   * @returns {Promise<Array<{ entityId: string, entityType: string, graphScore: number, graphMetadata: Object }>>}
   */
  async searchGraphCandidates({ graphConstraints = [], limit = 20 }) {
    if (!Array.isArray(graphConstraints) || graphConstraints.length === 0) {
      return [];
    }

    const queryLimit = Math.min(Math.max(Number(limit) || 20, 1), 50);
    const candidatesByConstraint = [];

    for (const constraint of graphConstraints) {
      const { relationship, targetSlug } = constraint;
      const cypher = CYPHER_TEMPLATES[relationship];

      if (!cypher || !targetSlug) return [];

      try {
        const result = await runCypher(cypher, { targetSlug, limit: neo4j.int(queryLimit) });
        const constraintCandidates = new Map();

        if (result?.records) {
          for (const record of result.records) {
            const entityId = record.get("entityId");
            if (entityId) {
              constraintCandidates.set(`${record.get("entityType") || "CHARACTER"}:${entityId}`, {
                entityId,
                entityType: record.get("entityType") || "CHARACTER",
                graphScore: 1.0,
                graphMetadata: { relationship, targetSlug, hops: 1 },
              });
            }
          }
        }
        candidatesByConstraint.push(constraintCandidates);
      } catch (err) {
        if (process.env.NODE_ENV !== "test") {
          console.warn(`[GraphSearchService] Cypher search notice (${relationship} -> ${targetSlug}):`, err.message);
        }
        return [];
      }
    }

    if (candidatesByConstraint.length === 0) return [];
    const [first, ...rest] = candidatesByConstraint;
    return [...first.entries()]
      .filter(([key]) => rest.every((candidateMap) => candidateMap.has(key)))
      .map(([key, candidate]) => {
        if (candidatesByConstraint.length === 1) return candidate;
        return {
          ...candidate,
          graphMetadata: {
            constraints: candidatesByConstraint.map((candidateMap) => candidateMap.get(key).graphMetadata),
            hops: candidatesByConstraint.length,
          },
        };
      });
  }
}

export const graphSearchService = new GraphSearchService();
