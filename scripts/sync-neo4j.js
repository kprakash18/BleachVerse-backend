import "dotenv/config";
import prisma from "../src/database/prisma.js";
import { applyNeo4jSchema } from "../src/database/neo4jConstraints.js";
import { runCypher, closeNeo4jDriver } from "../src/database/neo4j.js";
import { CANON_RELATIONSHIPS } from "../src/modules/relationship/relationship.seed.js";

const BIDIRECTIONAL_TYPES = new Set(["ALLIED_WITH", "FOUGHT", "RIVAL_OF", "MARRIED_TO", "FAMILY_OF"]);

const getOpponentPairs = (f) => {
  const p = f.participants;
  if (p.length < 2) return [];
  if (p.length === 2) return [{ id1: p[0].characterId, id2: p[1].characterId }];

  const wins = p.filter((x) => x.outcome === "WIN" || (f.winnerId && x.characterId === f.winnerId));
  const loss = p.filter((x) => x.outcome === "LOSS" || (f.winnerId && x.characterId !== f.winnerId));

  const [side1, side2] = wins.length && loss.length ? [wins, loss] : [
    p.filter((x) => f.title.toLowerCase().split(/\s+vs\.?\s+/i)[0]?.includes(x.character?.name.toLowerCase())),
    p.filter((x) => f.title.toLowerCase().split(/\s+vs\.?\s+/i)[1]?.includes(x.character?.name.toLowerCase())),
  ];

  return side1?.length && side2?.length
    ? side1.flatMap((s1) => side2.map((s2) => ({ id1: s1.characterId, id2: s2.characterId })))
    : p.flatMap((a, i) => p.slice(i + 1).map((b) => ({ id1: a.characterId, id2: b.characterId })));
};

try {
  console.log("Applying Neo4j schema & syncing comprehensive graph from PostgreSQL...");
  await applyNeo4jSchema();

  const [
    characters, organizations, arcs, memberships, fights,
    zanpakutos, races, characterRaces, locations,
    events, eventParticipants, powers, transformations,
  ] = await Promise.all([
    prisma.character.findMany({ select: { id: true, slug: true, name: true, sex: true, status: true } }),
    prisma.organization.findMany({ select: { id: true, slug: true, name: true, type: true, parentId: true } }),
    prisma.arc.findMany({ select: { id: true, slug: true, name: true, type: true } }),
    prisma.characterOrganization.findMany({ select: { characterId: true, organizationId: true, role: true } }),
    prisma.fight.findMany({
      select: {
        id: true, slug: true, title: true, type: true, arcId: true, locationId: true, winnerId: true,
        participants: { select: { characterId: true, outcome: true, character: { select: { id: true, name: true, slug: true } } } },
      },
    }),
    prisma.zanpakuto.findMany({ select: { id: true, slug: true, name: true, type: true, releaseCommand: true, spiritName: true, characterId: true } }),
    prisma.race.findMany({ select: { id: true, name: true, category: true } }),
    prisma.characterRace.findMany({ select: { characterId: true, raceId: true } }),
    prisma.location.findMany({ select: { id: true, slug: true, name: true, type: true, parentId: true } }),
    prisma.event.findMany({ select: { id: true, slug: true, title: true, type: true, arcId: true, locationId: true } }),
    prisma.eventParticipant.findMany({ select: { eventId: true, characterId: true, role: true } }),
    prisma.power.findMany({ select: { id: true, name: true, type: true, source: true, characterId: true } }),
    prisma.transformation.findMany({ select: { id: true, name: true, type: true, characterId: true, zanpakutoId: true } }),
  ]);

  // 1. Sync All Nodes
  const nodeBatches = [
    ["Character", characters], ["Organization", organizations], ["Arc", arcs],
    ["Zanpakuto", zanpakutos], ["Race", races], ["Location", locations],
    ["Event", events], ["Power", powers], ["Transformation", transformations],
    ["Fight", fights.map(({ id, slug, title, type }) => ({ id, slug, title, type }))],
  ];
  for (const [label, batch] of nodeBatches) {
    await runCypher(`UNWIND $batch AS n MERGE (m:${label} {id: n.id}) SET m += n`, { batch });
  }

  // 2. Sync Entity Relationships
  const edgeBatches = [
    ["UNWIND $batch AS m MATCH (c:Character {id: m.characterId}), (o:Organization {id: m.organizationId}) MERGE (c)-[r:MEMBER_OF]->(o) SET r.role = m.role", memberships],
    ["UNWIND $batch AS h MATCH (s:Organization {id: h.id}), (p:Organization {id: h.parentId}) MERGE (s)-[:SUB_ORGANIZATION_OF]->(p)", organizations.filter((o) => o.parentId)],
    ["UNWIND $batch AS l MATCH (f:Fight {id: l.id}), (a:Arc {id: l.arcId}) MERGE (f)-[:OCCURRED_IN]->(a)", fights.filter((f) => f.arcId)],
    ["UNWIND $batch AS l MATCH (f:Fight {id: l.id}), (loc:Location {id: l.locationId}) MERGE (f)-[:TOOK_PLACE_AT]->(loc)", fights.filter((f) => f.locationId)],
    ["UNWIND $batch AS l MATCH (f:Fight {id: l.id}), (c:Character {id: l.winnerId}) MERGE (f)-[:WON_BY]->(c)", fights.filter((f) => f.winnerId)],
    ["UNWIND $batch AS l MATCH (c:Character {id: l.characterId}), (f:Fight {id: l.fightId}) MERGE (c)-[r:PARTICIPATED_IN]->(f) SET r.outcome = l.outcome", fights.flatMap((f) => f.participants.map((p) => ({ ...p, fightId: f.id })))],
    ["UNWIND $batch AS w MATCH (c:Character {id: w.characterId}), (z:Zanpakuto {id: w.id}) MERGE (c)-[:WIELDS]->(z)", zanpakutos.filter((z) => z.characterId)],
    ["UNWIND $batch AS cr MATCH (c:Character {id: cr.characterId}), (r:Race {id: cr.raceId}) MERGE (c)-[:BELONGS_TO_RACE]->(r)", characterRaces],
    ["UNWIND $batch AS h MATCH (c:Location {id: h.id}), (p:Location {id: h.parentId}) MERGE (c)-[:LOCATED_IN]->(p)", locations.filter((l) => l.parentId)],
    ["UNWIND $batch AS p MATCH (c:Character {id: p.characterId}), (pow:Power {id: p.id}) MERGE (c)-[:POSSESSES_POWER]->(pow)", powers.filter((p) => p.characterId)],
    ["UNWIND $batch AS t MATCH (c:Character {id: t.characterId}), (tr:Transformation {id: t.id}) MERGE (c)-[:ACHIEVED_FORM]->(tr)", transformations.filter((t) => t.characterId)],
    ["UNWIND $batch AS z MATCH (t:Transformation {id: z.id}), (zpk:Zanpakuto {id: z.zanpakutoId}) MERGE (t)-[:TIED_TO_ZANPAKUTO]->(zpk)", transformations.filter((t) => t.zanpakutoId)],
    ["UNWIND $batch AS l MATCH (e:Event {id: l.id}), (a:Arc {id: l.arcId}) MERGE (e)-[:OCCURRED_IN_ARC]->(a)", events.filter((e) => e.arcId)],
    ["UNWIND $batch AS l MATCH (e:Event {id: l.id}), (loc:Location {id: l.locationId}) MERGE (e)-[:TOOK_PLACE_AT]->(loc)", events.filter((e) => e.locationId)],
    ["UNWIND $batch AS p MATCH (c:Character {id: p.characterId}), (e:Event {id: p.eventId}) MERGE (c)-[r:PARTICIPATED_IN_EVENT]->(e) SET r.role = p.role", eventParticipants],
  ];
  for (const [query, batch] of edgeBatches) {
    if (batch.length) await runCypher(query, { batch });
  }

  // 3. Sync Combat Opponents
  const combatLinks = fights.flatMap((f) => getOpponentPairs(f).map((p) => ({ ...p, fightId: f.id, fightTitle: f.title, fightSlug: f.slug })));
  await runCypher(
    `UNWIND $batch AS l
     MATCH (c1:Character {id: l.id1}), (c2:Character {id: l.id2})
     MERGE (c1)-[r1:FOUGHT { fightId: l.fightId }]->(c2) SET r1.fightTitle = l.fightTitle, r1.fightSlug = l.fightSlug
     MERGE (c2)-[r2:FOUGHT { fightId: l.fightId }]->(c1) SET r2.fightTitle = l.fightTitle, r2.fightSlug = l.fightSlug`,
    { batch: combatLinks }
  );

  // 4. Sync Canon Lore Relationships
  for (const type of [...new Set(CANON_RELATIONSHIPS.map((r) => r.type))]) {
    const batch = CANON_RELATIONSHIPS.filter((r) => r.type === type);
    const query = BIDIRECTIONAL_TYPES.has(type)
      ? `UNWIND $batch AS r MATCH (s:Character {slug: r.sourceSlug}), (t:Character {slug: r.targetSlug})
         MERGE (s)-[r1:${type}]->(t) MERGE (t)-[r2:${type}]->(s) SET r1.note = r.note, r2.note = r.note`
      : `UNWIND $batch AS r MATCH (s:Character {slug: r.sourceSlug}), (t:Character {slug: r.targetSlug})
         MERGE (s)-[rel:${type}]->(t) SET rel.note = r.note`;
    await runCypher(query, { batch });
  }

  const totalNodes = characters.length + organizations.length + arcs.length + fights.length + zanpakutos.length + races.length + locations.length + events.length + powers.length + transformations.length;
  console.log(`Knowledge Graph sync completed: ${totalNodes} total nodes across 10 entities.`);
} catch (error) {
  console.error("Graph sync failed:", error.message);
  process.exit(1);
} finally {
  await closeNeo4jDriver();
  await prisma.$disconnect();
}
