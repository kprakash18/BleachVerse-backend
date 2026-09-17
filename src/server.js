import app from "./app.js";
import prisma from "./database/prisma.js";
import { verifyNeo4jConnection, closeNeo4jDriver } from "./database/neo4j.js";

const PORT = process.env.PORT || 5000;
const requireNeo4j = process.env.REQUIRE_NEO4J === "true";

try {
  await prisma.$connect();
  console.log("PostgreSQL connected successfully");

  try {
    const neo4jInfo = await verifyNeo4jConnection();
    console.log(`Neo4j connected successfully (${neo4jInfo.agent || "Neo4j"})`);
  } catch (error) {
    if (requireNeo4j) {
      throw error;
    }
    console.warn(
      `Neo4j unavailable; graph endpoints will fail until it is reachable: ${error.message}`
    );
  }

  const server = app.listen(PORT, () => {
    console.log(`BleachVerse API server started\nhttp://localhost:${PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`\nReceived ${signal}. Gracefully shutting down...`);
    server.close();
    await Promise.allSettled([
      closeNeo4jDriver(),
      prisma.$disconnect(),
    ]);
    console.log("Databases disconnected. Server shut down cleanly.");
    process.exit(0);
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
} catch (error) {
  console.error("Failed to start server due to required service connectivity error:", error.message);
  await Promise.allSettled([closeNeo4jDriver(), prisma.$disconnect()]);
  process.exit(1);
}
