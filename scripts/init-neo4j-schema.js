import "dotenv/config";
import { applyNeo4jSchema } from "../src/database/neo4jConstraints.js";
import { closeNeo4jDriver } from "../src/database/neo4j.js";

async function main() {
  console.log("Applying Neo4j schema constraints and indexes...");
  try {
    await applyNeo4jSchema();
    console.log("Neo4j constraints and indexes applied successfully!");
  } catch (error) {
    console.error("Failed to apply Neo4j schema:", error.message);
    process.exit(1);
  } finally {
    await closeNeo4jDriver();
  }
}

main();
