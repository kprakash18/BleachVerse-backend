import { runCypher } from "../../database/neo4j.js";
import { RELATIONSHIP_TYPES } from "./relationship.constant.js";

const BIDIRECTIONAL_TYPES = new Set(["ALLIED_WITH", "FOUGHT", "RIVAL_OF", "MARRIED_TO", "FAMILY_OF"]);

const getRelatedCharacters = async (slug, relType) => {
  const result = await runCypher(
    `MATCH (c:Character {slug: $slug})-[:${relType}]->(target:Character)
     RETURN target.name AS name, target.slug AS slug, target.id AS id`,
    { slug },
  );
  return result.records.map((r) => ({ id: r.get("id"), name: r.get("name"), slug: r.get("slug") }));
};

export const createRelationship = async (sourceSlug, targetSlug, type, metadata = {}) => {
  if (!RELATIONSHIP_TYPES.includes(type)) throw new Error(`Unsupported relationship type: ${type}`);

  const cypher =
    type === "MEMBER_OF"
      ? "MATCH (s:Character {slug: $sourceSlug}), (t:Organization {slug: $targetSlug}) MERGE (s)-[r:MEMBER_OF]->(t) SET r += $metadata RETURN s, r, t"
      : BIDIRECTIONAL_TYPES.has(type)
      ? `MATCH (s:Character {slug: $sourceSlug}), (t:Character {slug: $targetSlug}) MERGE (s)-[r1:${type}]->(t) MERGE (t)-[r2:${type}]->(s) SET r1 += $metadata, r2 += $metadata RETURN s, r1 AS r, t`
      : `MATCH (s:Character {slug: $sourceSlug}), (t:Character {slug: $targetSlug}) MERGE (s)-[r:${type}]->(t) SET r += $metadata RETURN s, r, t`;

  const result = await runCypher(cypher, { sourceSlug, targetSlug, metadata });
  if (!result.records.length) return null;

  const record = result.records[0];
  return {
    source: record.get("s").properties,
    relationship: record.get("r").type,
    target: record.get("t").properties,
    metadata: record.get("r").properties,
  };
};

export const getCharacterRelationships = async (slug, filterType = null) => {
  const cypher = `MATCH (c:Character {slug: $slug})-[r]-(target)
     ${filterType ? "WHERE type(r) = $filterType" : ""}
     RETURN c.name AS character, c.slug AS characterSlug, type(r) AS type,
            labels(target)[0] AS targetLabel, target.name AS targetName, target.slug AS targetSlug,
            properties(r) AS properties`;

  const result = await runCypher(cypher, { slug, filterType });
  return result.records.map((record) => ({
    type: record.get("type"),
    target: {
      label: record.get("targetLabel"),
      name: record.get("targetName"),
      slug: record.get("targetSlug"),
    },
    properties: record.get("properties") || {},
  }));
};

export const getCharacterTrainers = (slug) => getRelatedCharacters(slug, "TRAINED_BY");

export const getCharacterBetrayed = (slug) => getRelatedCharacters(slug, "BETRAYED");

export const getCharacterOpponents = async (slug) => {
  const result = await runCypher(
    `MATCH (c:Character {slug: $slug})-[r:FOUGHT]->(opponent:Character)
     RETURN opponent.name AS name, opponent.slug AS slug, opponent.id AS id,
            collect(DISTINCT { fightId: r.fightId, title: r.fightTitle, slug: r.fightSlug }) AS fights`,
    { slug },
  );
  return result.records.map((r) => ({
    id: r.get("id"),
    name: r.get("name"),
    slug: r.get("slug"),
    fights: (r.get("fights") || []).filter((f) => f.title || f.slug),
  }));
};

export const getCharacterOrganizations = async (slug) => {
  const result = await runCypher(
    `MATCH (c:Character {slug: $slug})-[r:MEMBER_OF]->(org:Organization)
     RETURN org.name AS name, org.slug AS slug, org.id AS id, org.type AS type, r.role AS role`,
    { slug },
  );
  return result.records.map((r) => ({
    id: r.get("id"),
    name: r.get("name"),
    slug: r.get("slug"),
    type: r.get("type"),
    role: r.get("role") || null,
  }));
};

export const findShortestPath = async (fromSlug, toSlug, maxDepth = 2) => {
  const safeDepth = Math.max(1, Math.min(3, parseInt(maxDepth, 10) || 2));
  const query = `
    MATCH (from {slug: $fromSlug}), (to {slug: $toSlug})
    MATCH path = shortestPath((from)-[*1..${safeDepth}]-(to))
    RETURN [n IN nodes(path) | { id: n.id, slug: n.slug, name: n.name, label: labels(n)[0] }] AS nodes,
           [r IN relationships(path) | type(r)] AS relationships,
           length(path) AS length
  `;

  const result = await runCypher(query, { fromSlug, toSlug });
  if (!result.records.length) return null;

  const record = result.records[0];
  const lengthVal = record.get("length");
  return {
    length: lengthVal?.toNumber ? lengthVal.toNumber() : lengthVal,
    nodes: record.get("nodes"),
    relationships: record.get("relationships"),
  };
};
