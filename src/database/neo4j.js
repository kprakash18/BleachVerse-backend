import neo4j from "neo4j-driver";

let singletonDriver = null;

export const getNeo4jDriver = () => {
  const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;
  if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) return null;
  if (!singletonDriver) {
    singletonDriver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD));
  }
  return singletonDriver;
};

export const verifyNeo4jConnection = async () => {
  const driver = getNeo4jDriver();
  if (!driver) throw new Error("Neo4j driver is not configured. Missing required environment variables.");
  return driver.getServerInfo();
};

export const runCypher = async (query, params = {}) => {
  const driver = getNeo4jDriver();
  if (!driver) throw new Error("Neo4j driver is not configured.");
  const session = driver.session(process.env.NEO4J_DATABASE ? { database: process.env.NEO4J_DATABASE } : {});
  try {
    return await session.run(query, params);
  } finally {
    await session.close();
  }
};

export const closeNeo4jDriver = async () => {
  if (singletonDriver) {
    await singletonDriver.close();
    singletonDriver = null;
  }
};

export default {
  getNeo4jDriver,
  verifyNeo4jConnection,
  runCypher,
  closeNeo4jDriver,
};
