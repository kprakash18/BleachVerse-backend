
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Organization Module — Adversarial Integration Tests", () => {
  describe("GET /api/v1/organizations — valid requests", () => {
    it("should return paginated list with defaults", async () => {
      const res = await request(app).get("/api/v1/organizations");
      expect(res.status).toBe(200);
      expect(res.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });

    it("should return summary fields: name, slug, type, description", async () => {
      const res = await request(app).get("/api/v1/organizations?limit=1");
      expect(res.status).toBe(200);
      if (res.body.data.length > 0) {
        const org = res.body.data[0];
        expect(org).toHaveProperty("name");
        expect(org).toHaveProperty("slug");
        expect(org).toHaveProperty("type");
        expect(org).toHaveProperty("description");
      }
    });

    it("should filter by type=MILITARY (lowercase auto-uppercased)", async () => {
      const res = await request(app).get("/api/v1/organizations?type=military");
      expect(res.status).toBe(200);
      for (const org of res.body.data) {
        expect(org.type).toBe("MILITARY");
      }
    });

    it("should search by name and return matching results", async () => {
      const res = await request(app).get("/api/v1/organizations?search=gotei");
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/v1/organizations — pagination abuse", () => {
    it("should return 400 for page=0", async () => {
      const res = await request(app).get("/api/v1/organizations?page=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=101", async () => {
      const res = await request(app).get("/api/v1/organizations?limit=101");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return empty data[] for out-of-range page", async () => {
      const res = await request(app).get("/api/v1/organizations?page=99999");
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
      expect(res.body.pagination.page).toBe(99999);
    });
  });

  describe("GET /api/v1/organizations — invalid enum", () => {
    it("should return 400 for invalid type (type=GANG)", async () => {
      const res = await request(app).get("/api/v1/organizations?type=GANG");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for invalid sortBy field", async () => {
      const res = await request(app).get("/api/v1/organizations?sortBy=id");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("GET /api/v1/organizations/:slug — valid, not found, invalid", () => {
    it("should return full detail shape for gotei-13", async () => {
      const res = await request(app).get("/api/v1/organizations/gotei-13");
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("slug");
      expect(res.body.data).toHaveProperty("type");
      expect(res.body.data).toHaveProperty("parent");
     
      expect(Array.isArray(res.body.data.subOrganizations)).toBe(true);
      expect(Array.isArray(res.body.data.members)).toBe(true);
    });

    it("should return members as { role, character: { name, slug } } objects", async () => {
      const res = await request(app).get("/api/v1/organizations/gotei-13");
      if (res.body.data.members.length > 0) {
        const member = res.body.data.members[0];
        expect(member).toHaveProperty("role");
        expect(member).toHaveProperty("character");
        expect(member.character).toHaveProperty("name");
        expect(member.character).toHaveProperty("slug");
      }
    });

    it("should return 404 for non-existent organization slug", async () => {
      const res = await request(app).get(
        "/api/v1/organizations/zzz-no-such-org",
      );
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });

    it("should return 400 for slug with special characters", async () => {
      const res = await request(app).get("/api/v1/organizations/!@#invalid$%");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });
});
