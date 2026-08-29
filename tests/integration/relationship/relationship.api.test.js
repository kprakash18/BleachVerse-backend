import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../../src/app.js";

describe("Relationship Module Integration Tests", () => {
  it("GET /api/v1/characters/:slug/relationships — should return character relationships", async () => {
    const res = await request(app).get("/api/v1/characters/ichigo-kurosaki/relationships");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("character");
    expect(res.body.data).toHaveProperty("relationships");
    expect(Array.isArray(res.body.data.relationships)).toBe(true);
  });

  it("GET /api/v1/characters/:slug/relationships?type=FOUGHT — should filter by relationship type", async () => {
    const res = await request(app).get("/api/v1/characters/ichigo-kurosaki/relationships?type=FOUGHT");
    expect(res.status).toBe(200);
    expect(res.body.data.relationships.every((r) => r.type === "FOUGHT")).toBe(true);
  });

  it("GET /api/v1/characters/:slug/opponents — should return opponents character fought", async () => {
    const res = await request(app).get("/api/v1/characters/ichigo-kurosaki/opponents");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("opponents");
    expect(Array.isArray(res.body.data.opponents)).toBe(true);
  });

  it("GET /api/v1/characters/:slug/organizations — should return character organizations", async () => {
    const res = await request(app).get("/api/v1/characters/ichigo-kurosaki/organizations");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("organizations");
    expect(Array.isArray(res.body.data.organizations)).toBe(true);
  });

  it("POST /api/v1/relationships — should create a new relationship between characters", async () => {
    const res = await request(app)
      .post("/api/v1/relationships")
      .set("x-api-key", process.env.ADMIN_API_KEY || "bleachverse-admin-secret")
      .send({
        sourceSlug: "ichigo-kurosaki",
        targetSlug: "kisuke-urahara",
        relationshipType: "TRAINED_BY",
        metadata: { arc: "agent-of-the-shinigami-arc" },
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.relationship).toBe("TRAINED_BY");
  });

  it("GET /api/v1/characters/:slug/trainers — should return trainers after creation", async () => {
    const res = await request(app).get("/api/v1/characters/ichigo-kurosaki/trainers");
    expect(res.status).toBe(200);
    expect(res.body.data.trainers.some((t) => t.slug === "kisuke-urahara")).toBe(true);
  });

  it("GET /api/v1/graph/path — should traverse shortest path between connected characters", async () => {
    const res = await request(app).get("/api/v1/graph/path?from=ichigo-kurosaki&to=byakuya-kuchiki&depth=2");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("connected");
    if (res.body.data.connected) {
      expect(res.body.data).toHaveProperty("nodes");
      expect(res.body.data).toHaveProperty("relationships");
      expect(res.body.data.nodes.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("GET /api/v1/characters/non-existent-character-xyz/relationships — should return 404", async () => {
    const res = await request(app).get("/api/v1/characters/non-existent-character-xyz/relationships");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
  });
});
