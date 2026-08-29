import "dotenv/config";
import prisma from "../src/database/prisma.js";
import { applyNeo4jSchema } from "../src/database/neo4jConstraints.js";
import { runCypher, closeNeo4jDriver } from "../src/database/neo4j.js";
import { CANON_RELATIONSHIPS } from "../src/modules/relationship/relationship.seed.js";

const BIDIRECTIONAL_TYPES = new Set(["ALLIED_WITH", "FOUGHT", "RIVAL_OF", "MARRIED_TO", "FAMILY_OF"]);

try {
  console.log("Applying Neo4j schema & syncing comprehensive graph from PostgreSQL...");
  await applyNeo4jSchema();

  // 1. Fetch all canonical data in parallel
  const [
    characters,
    organizations,
    arcs,
    memberships,
    fights,
    zanpakutos,
    races,
    characterRaces,
    locations,
    events,
    eventParticipants,
    powers,
    transformations,
  ] = await Promise.all([
    prisma.character.findMany({ select: { id: true, slug: true, name: true, sex: true, status: true } }),
    prisma.organization.findMany({ select: { id: true, slug: true, name: true, type: true, parentId: true } }),
    prisma.arc.findMany({ select: { id: true, slug: true, name: true, type: true } }),
    prisma.characterOrganization.findMany({ select: { characterId: true, organizationId: true, role: true } }),
    prisma.fight.findMany({
      select: {
        id: true, slug: true, title: true, type: true, arcId: true, locationId: true, winnerId: true,
        participants: { select: { characterId: true, outcome: true } },
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

  // 2. Batch Sync All Nodes (UNWIND)
  await runCypher("UNWIND $batch AS c MERGE (n:Character {id: c.id}) SET n += c", { batch: characters });
  await runCypher("UNWIND $batch AS o MERGE (n:Organization {id: o.id}) SET n += o", { batch: organizations });
  await runCypher("UNWIND $batch AS a MERGE (n:Arc {id: a.id}) SET n += a", { batch: arcs });
  await runCypher("UNWIND $batch AS z MERGE (n:Zanpakuto {id: z.id}) SET n += z", { batch: zanpakutos });
  await runCypher("UNWIND $batch AS r MERGE (n:Race {id: r.id}) SET n += r", { batch: races });
  await runCypher("UNWIND $batch AS l MERGE (n:Location {id: l.id}) SET n += l", { batch: locations });
  await runCypher("UNWIND $batch AS e MERGE (n:Event {id: e.id}) SET n += e", { batch: events });
  await runCypher("UNWIND $batch AS p MERGE (n:Power {id: p.id}) SET n += p", { batch: powers });
  await runCypher("UNWIND $batch AS t MERGE (n:Transformation {id: t.id}) SET n += t", { batch: transformations });

  // 3. Batch Sync Organizations & Hierarchies
  await runCypher(
    `UNWIND $batch AS m
     MATCH (c:Character {id: m.characterId}), (o:Organization {id: m.organizationId})
     MERGE (c)-[r:MEMBER_OF]->(o)
     SET r.role = m.role`,
    { batch: memberships }
  );

  const orgHierarchies = organizations.filter((o) => o.parentId).map((o) => ({ id: o.id, parentId: o.parentId }));
  await runCypher(
    `UNWIND $batch AS h
     MATCH (sub:Organization {id: h.id}), (parent:Organization {id: h.parentId})
     MERGE (sub)-[:SUB_ORGANIZATION_OF]->(parent)`,
    { batch: orgHierarchies }
  );

  // 4. Batch Sync Fights, Combat, & Outcomes
  const fightNodes = fights.map(({ id, slug, title, type }) => ({ id, slug, title, type }));
  const arcFightLinks = fights.filter((f) => f.arcId).map((f) => ({ fightId: f.id, arcId: f.arcId }));
  const locationFightLinks = fights.filter((f) => f.locationId).map((f) => ({ fightId: f.id, locationId: f.locationId }));
  const winnerLinks = fights.filter((f) => f.winnerId).map((f) => ({ fightId: f.id, winnerId: f.winnerId }));
  const participantLinks = fights.flatMap((f) =>
    f.participants.map((p) => ({ fightId: f.id, characterId: p.characterId, outcome: p.outcome }))
  );
  const combatLinks = fights.flatMap((f) => {
    const ids = f.participants.map((p) => p.characterId);
    return ids.flatMap((id1, i) => ids.slice(i + 1).map((id2) => ({ id1, id2 })));
  });

  await runCypher("UNWIND $batch AS f MERGE (n:Fight {id: f.id}) SET n += f", { batch: fightNodes });
  await runCypher("UNWIND $batch AS l MATCH (f:Fight {id: l.fightId}), (a:Arc {id: l.arcId}) MERGE (f)-[:OCCURRED_IN]->(a)", { batch: arcFightLinks });
  await runCypher("UNWIND $batch AS l MATCH (f:Fight {id: l.fightId}), (loc:Location {id: l.locationId}) MERGE (f)-[:TOOK_PLACE_AT]->(loc)", { batch: locationFightLinks });
  await runCypher("UNWIND $batch AS l MATCH (f:Fight {id: l.fightId}), (c:Character {id: l.winnerId}) MERGE (f)-[:WON_BY]->(c)", { batch: winnerLinks });
  await runCypher("UNWIND $batch AS l MATCH (c:Character {id: l.characterId}), (f:Fight {id: l.fightId}) MERGE (c)-[r:PARTICIPATED_IN]->(f) SET r.outcome = l.outcome", { batch: participantLinks });
  await runCypher("UNWIND $batch AS l MATCH (c1:Character {id: l.id1}), (c2:Character {id: l.id2}) MERGE (c1)-[:FOUGHT]->(c2) MERGE (c2)-[:FOUGHT]->(c1)", { batch: combatLinks });

  // 5. Batch Sync Zanpakutos, Races, Locations, Powers & Transformations
  const zanpakutoWielders = zanpakutos.filter((z) => z.characterId).map((z) => ({ characterId: z.characterId, zanpakutoId: z.id }));
  await runCypher(
    `UNWIND $batch AS w
     MATCH (c:Character {id: w.characterId}), (z:Zanpakuto {id: w.zanpakutoId})
     MERGE (c)-[:WIELDS]->(z)`,
    { batch: zanpakutoWielders }
  );

  await runCypher(
    `UNWIND $batch AS cr
     MATCH (c:Character {id: cr.characterId}), (r:Race {id: cr.raceId})
     MERGE (c)-[:BELONGS_TO_RACE]->(r)`,
    { batch: characterRaces }
  );

  const locHierarchies = locations.filter((l) => l.parentId).map((l) => ({ id: l.id, parentId: l.parentId }));
  await runCypher(
    `UNWIND $batch AS h
     MATCH (child:Location {id: h.id}), (parent:Location {id: h.parentId})
     MERGE (child)-[:LOCATED_IN]->(parent)`,
    { batch: locHierarchies }
  );

  const powerOwners = powers.filter((p) => p.characterId).map((p) => ({ characterId: p.characterId, powerId: p.id }));
  await runCypher(
    `UNWIND $batch AS p
     MATCH (c:Character {id: p.characterId}), (pow:Power {id: p.powerId})
     MERGE (c)-[:POSSESSES_POWER]->(pow)`,
    { batch: powerOwners }
  );

  const formOwners = transformations.filter((t) => t.characterId).map((t) => ({ characterId: t.characterId, transformationId: t.id }));
  await runCypher(
    `UNWIND $batch AS t
     MATCH (c:Character {id: t.characterId}), (tr:Transformation {id: t.transformationId})
     MERGE (c)-[:ACHIEVED_FORM]->(tr)`,
    { batch: formOwners }
  );

  const formZanpakutos = transformations.filter((t) => t.zanpakutoId).map((t) => ({ transformationId: t.id, zanpakutoId: t.zanpakutoId }));
  await runCypher(
    `UNWIND $batch AS z
     MATCH (tr:Transformation {id: z.transformationId}), (zpk:Zanpakuto {id: z.zanpakutoId})
     MERGE (tr)-[:TIED_TO_ZANPAKUTO]->(zpk)`,
    { batch: formZanpakutos }
  );

  // 6. Batch Sync Events
  const eventArcLinks = events.filter((e) => e.arcId).map((e) => ({ eventId: e.id, arcId: e.arcId }));
  const eventLocLinks = events.filter((e) => e.locationId).map((e) => ({ eventId: e.id, locationId: e.locationId }));
  await runCypher("UNWIND $batch AS l MATCH (e:Event {id: l.eventId}), (a:Arc {id: l.arcId}) MERGE (e)-[:OCCURRED_IN_ARC]->(a)", { batch: eventArcLinks });
  await runCypher("UNWIND $batch AS l MATCH (e:Event {id: l.eventId}), (loc:Location {id: l.locationId}) MERGE (e)-[:TOOK_PLACE_AT]->(loc)", { batch: eventLocLinks });
  await runCypher(
    `UNWIND $batch AS p
     MATCH (c:Character {id: p.characterId}), (e:Event {id: p.eventId})
     MERGE (c)-[r:PARTICIPATED_IN_EVENT]->(e)
     SET r.role = p.role`,
    { batch: eventParticipants }
  );

  // 7. Batch Sync Canon Lore Relationships
  const uniqueTypes = [...new Set(CANON_RELATIONSHIPS.map((r) => r.type))];
  for (const type of uniqueTypes) {
    const batch = CANON_RELATIONSHIPS.filter((r) => r.type === type);
    if (BIDIRECTIONAL_TYPES.has(type)) {
      await runCypher(
        `UNWIND $batch AS r
         MATCH (s:Character {slug: r.sourceSlug}), (t:Character {slug: r.targetSlug})
         MERGE (s)-[r1:${type}]->(t)
         MERGE (t)-[r2:${type}]->(s)
         SET r1.note = r.note, r2.note = r.note`,
        { batch }
      );
    } else {
      await runCypher(
        `UNWIND $batch AS r
         MATCH (s:Character {slug: r.sourceSlug}), (t:Character {slug: r.targetSlug})
         MERGE (s)-[rel:${type}]->(t)
         SET rel.note = r.note`,
        { batch }
      );
    }
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
