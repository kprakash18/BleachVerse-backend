import { runCypher } from "./neo4j.js";

export const SCHEMA_CONSTRAINTS = [
  "CREATE CONSTRAINT character_id_unique IF NOT EXISTS FOR (c:Character) REQUIRE c.id IS UNIQUE",
  "CREATE CONSTRAINT organization_id_unique IF NOT EXISTS FOR (o:Organization) REQUIRE o.id IS UNIQUE",
  "CREATE CONSTRAINT arc_id_unique IF NOT EXISTS FOR (a:Arc) REQUIRE a.id IS UNIQUE",
  "CREATE CONSTRAINT fight_id_unique IF NOT EXISTS FOR (f:Fight) REQUIRE f.id IS UNIQUE",
];

export const SCHEMA_INDEXES = [
  "CREATE INDEX character_slug_idx IF NOT EXISTS FOR (c:Character) ON (c.slug)",
  "CREATE INDEX character_name_idx IF NOT EXISTS FOR (c:Character) ON (c.name)",
  "CREATE INDEX organization_slug_idx IF NOT EXISTS FOR (o:Organization) ON (o.slug)",
  "CREATE INDEX arc_slug_idx IF NOT EXISTS FOR (a:Arc) ON (a.slug)",
  "CREATE INDEX fight_slug_idx IF NOT EXISTS FOR (f:Fight) ON (f.slug)",
];

export const applyNeo4jSchema = async () => {
  for (const constraint of SCHEMA_CONSTRAINTS) {
    await runCypher(constraint);
  }
  for (const index of SCHEMA_INDEXES) {
    await runCypher(index);
  }
};
