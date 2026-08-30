import { runCypher } from "../../database/neo4j.js";
import { GRAPH_RELATIONSHIPS } from "./query-classifier.service.js";

export class GraphSearchService {
  /**
   * Searches Neo4j graph for candidate entities matching relational constraints.
   * @param {Object} params
   * @param {Array<Object>} params.graphConstraints
   * @param {Object} [params.structuredFilters]
   * @param {number} [params.limit=20]
   * @returns {Promise<Array<{ entityId: string, entityType: string, graphScore: number, graphMetadata: Object }>>}
   */
  async searchGraphCandidates({ graphConstraints = [], structuredFilters = {}, limit = 20 }) {
    if (!Array.isArray(graphConstraints) || graphConstraints.length === 0) {
      return [];
    }

    const queryLimit = Math.min(Math.max(Number(limit) || 20, 1), 50);
    const allCandidates = [];

    for (const constraint of graphConstraints) {
      const { relationship, targetSlug, direction = "BOTH" } = constraint;

      if (!GRAPH_RELATIONSHIPS[relationship] || !targetSlug) {
        continue;
      }

      try {
        let cypher;
        if (relationship === GRAPH_RELATIONSHIPS.FOUGHT) {
          cypher = `
            MATCH (source:Character)-[:FOUGHT]-(target:Character)
            WHERE target.slug = $targetSlug
            RETURN DISTINCT source.id AS entityId, 'CHARACTER' AS entityType
            LIMIT $limit
          `;
        } else if (relationship === GRAPH_RELATIONSHIPS.TRAINED_BY) {
          cypher = `
            MATCH (source:Character)-[:TRAINED_BY]->(target:Character)
            WHERE target.slug = $targetSlug
            RETURN DISTINCT source.id AS entityId, 'CHARACTER' AS entityType
            LIMIT $limit
          `;
        } else if (relationship === GRAPH_RELATIONSHIPS.MEMBER_OF) {
          cypher = `
            MATCH (source:Character)-[:MEMBER_OF]->(target:Organization)
            WHERE target.slug = $targetSlug
            RETURN DISTINCT source.id AS entityId, 'CHARACTER' AS entityType
            LIMIT $limit
          `;
        } else {
          continue;
        }

        const result = await runCypher(cypher, { targetSlug, limit: queryLimit });

        if (result?.records) {
          for (const record of result.records) {
            const entityId = record.get("entityId");
            const entityType = record.get("entityType") || "CHARACTER";

            if (entityId) {
              allCandidates.push({
                entityId,
                entityType,
                graphScore: 1.0,
                graphMetadata: {
                  relationship,
                  targetSlug,
                  hops: 1,
                },
              });
            }
          }
        }
      } catch (err) {
        // Non-blocking graceful error degradation
        if (process.env.NODE_ENV !== "test") {
          console.warn(`[GraphSearchService] Cypher search notice (${relationship} -> ${targetSlug}):`, err.message);
        }
      }
    }

    return allCandidates;
  }
}

export const graphSearchService = new GraphSearchService();
