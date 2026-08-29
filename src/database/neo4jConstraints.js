import { runCypher } from "./neo4j.js";

export const SCHEMA_CONSTRAINTS = [
  "CREATE CONSTRAINT character_id_unique IF NOT EXISTS FOR (c:Character) REQUIRE c.id IS UNIQUE",
  "CREATE CONSTRAINT organization_id_unique IF NOT EXISTS FOR (o:Organization) REQUIRE o.id IS UNIQUE",
  "CREATE CONSTRAINT arc_id_unique IF NOT EXISTS FOR (a:Arc) REQUIRE a.id IS UNIQUE",
  "CREATE CONSTRAINT fight_id_unique IF NOT EXISTS FOR (f:Fight) REQUIRE f.id IS UNIQUE",
  "CREATE CONSTRAINT zanpakuto_id_unique IF NOT EXISTS FOR (z:Zanpakuto) REQUIRE z.id IS UNIQUE",
  "CREATE CONSTRAINT race_id_unique IF NOT EXISTS FOR (r:Race) REQUIRE r.id IS UNIQUE",
  "CREATE CONSTRAINT location_id_unique IF NOT EXISTS FOR (l:Location) REQUIRE l.id IS UNIQUE",
  "CREATE CONSTRAINT event_id_unique IF NOT EXISTS FOR (e:Event) REQUIRE e.id IS UNIQUE",
  "CREATE CONSTRAINT power_id_unique IF NOT EXISTS FOR (p:Power) REQUIRE p.id IS UNIQUE",
  "CREATE CONSTRAINT transformation_id_unique IF NOT EXISTS FOR (t:Transformation) REQUIRE t.id IS UNIQUE",
];

export const SCHEMA_INDEXES = [
  "CREATE INDEX character_slug_idx IF NOT EXISTS FOR (c:Character) ON (c.slug)",
  "CREATE INDEX character_name_idx IF NOT EXISTS FOR (c:Character) ON (c.name)",
  "CREATE INDEX organization_slug_idx IF NOT EXISTS FOR (o:Organization) ON (o.slug)",
  "CREATE INDEX arc_slug_idx IF NOT EXISTS FOR (a:Arc) ON (a.slug)",
  "CREATE INDEX fight_slug_idx IF NOT EXISTS FOR (f:Fight) ON (f.slug)",
  "CREATE INDEX zanpakuto_slug_idx IF NOT EXISTS FOR (z:Zanpakuto) ON (z.slug)",
  "CREATE INDEX location_slug_idx IF NOT EXISTS FOR (l:Location) ON (l.slug)",
  "CREATE INDEX event_slug_idx IF NOT EXISTS FOR (e:Event) ON (e.slug)",
];

export const applyNeo4jSchema = async () => {
  for (const constraint of SCHEMA_CONSTRAINTS) {
    await runCypher(constraint);
  }
  for (const index of SCHEMA_INDEXES) {
    await runCypher(index);
  }
};
