import "dotenv/config";
import { verifyNeo4jConnection, closeNeo4jDriver } from "../src/database/neo4j.js";

async function main() {
  console.log("Connecting to Neo4j at:", process.env.NEO4J_URI);
  try {
    const serverInfo = await verifyNeo4jConnection();
    console.log("Neo4j connection successful!");
    console.log("Server info:", serverInfo.agent, serverInfo.address, serverInfo.protocolVersion);
  } catch (error) {
    console.error("Neo4j connection failed:", error.message);
  } finally {
    await closeNeo4jDriver();
  }
}

main();
