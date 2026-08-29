import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  getNeo4jDriver,
  verifyNeo4jConnection,
  runCypher,
  closeNeo4jDriver,
} from "../../../src/database/neo4j.js";

describe("Neo4j Database Lifecycle & Driver Unit Tests", () => {
  const originalEnv = { ...process.env };

  beforeEach(async () => {
    await closeNeo4jDriver();
    process.env = { ...originalEnv };
  });

  afterEach(async () => {
    await closeNeo4jDriver();
    process.env = { ...originalEnv };
  });

  it("should return null if required Neo4j credentials are missing", () => {
    delete process.env.NEO4J_URI;
    delete process.env.NEO4J_USERNAME;
    delete process.env.NEO4J_PASSWORD;

    expect(getNeo4jDriver()).toBeNull();
  });

  it("should throw error when verifying connection if driver is not configured", async () => {
    delete process.env.NEO4J_URI;
    delete process.env.NEO4J_USERNAME;
    delete process.env.NEO4J_PASSWORD;

    await expect(verifyNeo4jConnection()).rejects.toThrow("Neo4j driver is not configured");
  });

  it("should throw error when executing runCypher if driver is not configured", async () => {
    delete process.env.NEO4J_URI;
    delete process.env.NEO4J_USERNAME;
    delete process.env.NEO4J_PASSWORD;

    await expect(runCypher("RETURN 1")).rejects.toThrow("Neo4j driver is not configured");
  });

  it("should verify connectivity against running Neo4j instance", async () => {
    process.env.NEO4J_URI = "bolt://localhost:7687";
    process.env.NEO4J_USERNAME = "neo4j";
    process.env.NEO4J_PASSWORD = "bleachverse_secret_password";
    process.env.NEO4J_DATABASE = "neo4j";

    const serverInfo = await verifyNeo4jConnection();
    expect(serverInfo).toBeDefined();
    expect(serverInfo.address).toContain("localhost:7687");
  });

  it("should execute Cypher query via runCypher helper and cleanly close session", async () => {
    process.env.NEO4J_URI = "bolt://localhost:7687";
    process.env.NEO4J_USERNAME = "neo4j";
    process.env.NEO4J_PASSWORD = "bleachverse_secret_password";
    process.env.NEO4J_DATABASE = "neo4j";

    const result = await runCypher("RETURN 1 AS num");

    expect(result).toBeDefined();
    expect(result.records.length).toBe(1);
    const numVal = result.records[0].get("num");
    expect(numVal.toNumber ? numVal.toNumber() : numVal).toBe(1);
  });
});
