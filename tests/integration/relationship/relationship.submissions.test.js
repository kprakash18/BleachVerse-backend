import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../../../src/app.js";
import prisma from "../../../src/database/prisma.js";

const ADMIN_KEY = process.env.ADMIN_API_KEY || "bleachverse-admin-secret";

describe("Community Relationship Submissions & Moderation Integration Tests", () => {
  const createdIds = [];

  afterAll(async () => {
    if (createdIds.length > 0) {
      await prisma.relationshipSubmission.deleteMany({
        where: { id: { in: createdIds } },
      });
    }
  });

  it("POST /api/v1/relationships/submissions — should allow a fan to submit a relationship (status: PENDING)", async () => {
    const res = await request(app)
      .post("/api/v1/relationships/submissions")
      .send({
        sourceSlug: "ichigo-kurosaki",
        targetSlug: "rukia-kuchiki",
        relationshipType: "ALLIED_WITH",
        note: "Met in Karakura Town episode 1",
        submittedBy: "BleachFan99",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.status).toBe("PENDING");
    expect(res.body.data.sourceSlug).toBe("ichigo-kurosaki");
    expect(res.body.data.targetSlug).toBe("rukia-kuchiki");
    expect(res.body.data.submittedBy).toBe("BleachFan99");
    if (res.body.data.id) createdIds.push(res.body.data.id);
  });

  it("POST /api/v1/relationships/submissions — should reject invalid/self relationship", async () => {
    const res = await request(app)
      .post("/api/v1/relationships/submissions")
      .send({
        sourceSlug: "ichigo-kurosaki",
        targetSlug: "ichigo-kurosaki",
        relationshipType: "ALLIED_WITH",
      });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("POST /api/v1/relationships/submissions — should reject submission for non-existent character", async () => {
    const res = await request(app)
      .post("/api/v1/relationships/submissions")
      .send({
        sourceSlug: "ichigo-kurosaki",
        targetSlug: "non-existent-character-xyz",
        relationshipType: "ALLIED_WITH",
      });

    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
  });

  it("GET /api/v1/relationships/submissions — should require admin key", async () => {
    const res = await request(app).get("/api/v1/relationships/submissions");
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("GET /api/v1/relationships/submissions — should return list of submissions for admin", async () => {
    const sub = await prisma.relationshipSubmission.create({
      data: {
        sourceSlug: "ichigo-kurosaki",
        targetSlug: "rukia-kuchiki",
        relationshipType: "ALLIED_WITH",
        status: "PENDING",
      },
    });
    createdIds.push(sub.id);

    const res = await request(app)
      .get("/api/v1/relationships/submissions?status=PENDING")
      .set("x-api-key", ADMIN_KEY);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("PATCH /api/v1/relationships/submissions/:id/review — should approve submission and create edge in Neo4j", async () => {
    const sub = await prisma.relationshipSubmission.create({
      data: {
        sourceSlug: "byakuya-kuchiki",
        targetSlug: "renji-abarai",
        relationshipType: "ALLIED_WITH",
        note: "Gotei 13 comrades",
        status: "PENDING",
      },
    });
    createdIds.push(sub.id);

    const res = await request(app)
      .patch(`/api/v1/relationships/submissions/${sub.id}/review`)
      .set("x-api-key", ADMIN_KEY)
      .send({
        status: "APPROVED",
        reviewerNotes: "Verified canon comrades",
      });

    expect(res.status).toBe(200);
    expect(res.body.data.submission.status).toBe("APPROVED");
    expect(res.body.data.submission.reviewerNotes).toBe("Verified canon comrades");
    expect(res.body.data.graphRelationship).not.toBeNull();
    expect(res.body.data.graphRelationship.relationship).toBe("ALLIED_WITH");
  });

  it("PATCH /api/v1/relationships/submissions/:id/review — should reject submission without modifying Neo4j", async () => {
    const sub = await prisma.relationshipSubmission.create({
      data: {
        sourceSlug: "byakuya-kuchiki",
        targetSlug: "renji-abarai",
        relationshipType: "MARRIED_TO",
        status: "PENDING",
      },
    });
    createdIds.push(sub.id);

    const res = await request(app)
      .patch(`/api/v1/relationships/submissions/${sub.id}/review`)
      .set("x-api-key", ADMIN_KEY)
      .send({
        status: "REJECTED",
        reviewerNotes: "Non-canon relationship",
      });

    expect(res.status).toBe(200);
    expect(res.body.data.submission.status).toBe("REJECTED");
    expect(res.body.data.graphRelationship).toBeNull();
  });
});
