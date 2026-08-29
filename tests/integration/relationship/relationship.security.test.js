import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../../src/app.js";

const ADMIN_KEY = process.env.ADMIN_API_KEY || "bleachverse-admin-secret";

describe("Relationship Module Security & Adversarial Tests", () => {
  it("POST /api/v1/relationships — should reject unauthorized request without admin key", async () => {
    const res = await request(app)
      .post("/api/v1/relationships")
      .send({
        sourceSlug: "ichigo-kurosaki",
        targetSlug: "kisuke-urahara",
        relationshipType: "TRAINED_BY",
      });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("POST /api/v1/relationships — should reject Cypher injection in relationship type", async () => {
    const res = await request(app)
      .post("/api/v1/relationships")
      .set("x-api-key", ADMIN_KEY)
      .send({
        sourceSlug: "ichigo-kurosaki",
        targetSlug: "kisuke-urahara",
        relationshipType: "FOUGHT]->() DELETE ()-[",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("POST /api/v1/relationships — should reject self-relationship attempt", async () => {
    const res = await request(app)
      .post("/api/v1/relationships")
      .set("x-api-key", ADMIN_KEY)
      .send({
        sourceSlug: "ichigo-kurosaki",
        targetSlug: "ichigo-kurosaki",
        relationshipType: "TRAINED_BY",
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(JSON.stringify(res.body)).toContain("Self-relationships are not allowed");
  });

  it("GET /api/v1/graph/path — should reject extreme depth (> 3)", async () => {
    const res = await request(app).get(
      "/api/v1/graph/path?from=ichigo-kurosaki&to=kisuke-urahara&depth=10",
    );
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("GET /api/v1/graph/path — should reject negative / zero depth", async () => {
    const res = await request(app).get(
      "/api/v1/graph/path?from=ichigo-kurosaki&to=kisuke-urahara&depth=0",
    );
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("GET /api/v1/graph/path — should reject non-numeric string depth", async () => {
    const res = await request(app).get(
      "/api/v1/graph/path?from=ichigo-kurosaki&to=kisuke-urahara&depth=infinite",
    );
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("GET /api/v1/characters/:slug/relationships — should safely handle malformed / SQL / Cypher injection in slug", async () => {
    const res = await request(app).get(
      "/api/v1/characters/'%20OR%201=1%20MATCH%20(n)%20DELETE%20n;--/relationships",
    );
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});
