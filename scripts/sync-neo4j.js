import "dotenv/config";
import prisma from "../src/database/prisma.js";
import { applyNeo4jSchema } from "../src/database/neo4jConstraints.js";
import { runCypher, closeNeo4jDriver } from "../src/database/neo4j.js";

try {
  console.log("Applying Neo4j schema & syncing graph from PostgreSQL...");
  await applyNeo4jSchema();

  // 1. Fetch all canonical data in parallel
  const [characters, organizations, arcs, memberships, fights] = await Promise.all([
    prisma.character.findMany({ select: { id: true, slug: true, name: true, sex: true, status: true } }),
    prisma.organization.findMany({ select: { id: true, slug: true, name: true, type: true } }),
    prisma.arc.findMany({ select: { id: true, slug: true, name: true, type: true } }),
    prisma.characterOrganization.findMany({ select: { characterId: true, organizationId: true, role: true } }),
    prisma.fight.findMany({
      select: {
        id: true, slug: true, title: true, type: true, arcId: true, winnerId: true,
        participants: { select: { characterId: true, outcome: true } },
      },
    }),
  ]);

  // 2. Batch sync Nodes (UNWIND)
  await runCypher("UNWIND $batch AS c MERGE (n:Character {id: c.id}) SET n += c", { batch: characters });
  await runCypher("UNWIND $batch AS o MERGE (n:Organization {id: o.id}) SET n += o", { batch: organizations });
  await runCypher("UNWIND $batch AS a MERGE (n:Arc {id: a.id}) SET n += a", { batch: arcs });

  // 3. Batch sync MEMBER_OF
  await runCypher(
    `UNWIND $batch AS m
     MATCH (c:Character {id: m.characterId}), (o:Organization {id: m.organizationId})
     MERGE (c)-[r:MEMBER_OF]->(o)
     SET r.role = m.role`,
    { batch: memberships }
  );

  // 4. Batch sync Fights, relationships & direct FOUGHT
  const fightNodes = fights.map(({ id, slug, title, type }) => ({ id, slug, title, type }));
  const arcLinks = fights.filter((f) => f.arcId).map((f) => ({ fightId: f.id, arcId: f.arcId }));
  const winnerLinks = fights.filter((f) => f.winnerId).map((f) => ({ fightId: f.id, winnerId: f.winnerId }));
  const participantLinks = fights.flatMap((f) =>
    f.participants.map((p) => ({ fightId: f.id, characterId: p.characterId, outcome: p.outcome }))
  );
  const combatLinks = fights.flatMap((f) => {
    const ids = f.participants.map((p) => p.characterId);
    return ids.flatMap((id1, i) => ids.slice(i + 1).map((id2) => ({ id1, id2 })));
  });

  await runCypher("UNWIND $batch AS f MERGE (n:Fight {id: f.id}) SET n += f", { batch: fightNodes });
  await runCypher("UNWIND $batch AS l MATCH (f:Fight {id: l.fightId}), (a:Arc {id: l.arcId}) MERGE (f)-[:OCCURRED_IN]->(a)", { batch: arcLinks });
  await runCypher("UNWIND $batch AS l MATCH (f:Fight {id: l.fightId}), (c:Character {id: l.winnerId}) MERGE (f)-[:WON_BY]->(c)", { batch: winnerLinks });
  await runCypher("UNWIND $batch AS l MATCH (c:Character {id: l.characterId}), (f:Fight {id: l.fightId}) MERGE (c)-[r:PARTICIPATED_IN]->(f) SET r.outcome = l.outcome", { batch: participantLinks });
  await runCypher("UNWIND $batch AS l MATCH (c1:Character {id: l.id1}), (c2:Character {id: l.id2}) MERGE (c1)-[:FOUGHT]->(c2) MERGE (c2)-[:FOUGHT]->(c1)", { batch: combatLinks });

  console.log(`Graph sync completed: ${characters.length} characters, ${organizations.length} orgs, ${arcs.length} arcs, ${fights.length} fights.`);
} catch (error) {
  console.error("Graph sync failed:", error.message);
  process.exit(1);
} finally {
  await closeNeo4jDriver();
  await prisma.$disconnect();
}
