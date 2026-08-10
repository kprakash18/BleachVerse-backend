
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Zanpakutō Module — Adversarial Integration Tests", () => {
  describe("GET /api/v1/zanpakutos — valid requests", () => {
    it("should return paginated list with defaults", async () => {
      const res = await request(app).get("/api/v1/zanpakutos");
      expect(res.status).toBe(200);
      expect(res.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });

    it("should return collection fields: name, slug, type, releaseCommand, spiritName, wielder", async () => {
      const res = await request(app).get("/api/v1/zanpakutos?limit=1");
      expect(res.status).toBe(200);
      if (res.body.data.length > 0) {
        const z = res.body.data[0];
        expect(z).toHaveProperty("name");
        expect(z).toHaveProperty("slug");
        expect(z).toHaveProperty("type");
        expect(z).toHaveProperty("releaseCommand");
        expect(z).toHaveProperty("spiritName");
       
        expect(z).toHaveProperty("wielder");
      }
    });

    it("should filter by wielderSlug and return only that wielder's weapons", async () => {
      const res = await request(app).get(
        "/api/v1/zanpakutos?wielderSlug=ichigo-kurosaki",
      );
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("should return empty results for non-existent wielderSlug", async () => {
      const res = await request(app).get(
        "/api/v1/zanpakutos?wielderSlug=non-existent-character",
      );
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe("GET /api/v1/zanpakutos — pagination abuse", () => {
    it("should return 400 for page=0", async () => {
      const res = await request(app).get("/api/v1/zanpakutos?page=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=101", async () => {
      const res = await request(app).get("/api/v1/zanpakutos?limit=101");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return empty data[] for out-of-range page", async () => {
      const res = await request(app).get("/api/v1/zanpakutos?page=99999");
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe("GET /api/v1/zanpakutos — invalid enum", () => {
    it("should return 400 for invalid type (type=SUPER)", async () => {
      const res = await request(app).get("/api/v1/zanpakutos?type=SUPER");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("GET /api/v1/zanpakutos/:slug — valid, not found, invalid", () => {
    it("should return full detail shape including aliases and transformations", async () => {
      const list = await request(app).get(
        "/api/v1/zanpakutos?wielderSlug=ichigo-kurosaki",
      );
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/zanpakutos/${slug}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("slug");
        expect(res.body.data).toHaveProperty("type");
        expect(res.body.data).toHaveProperty("description");
        expect(Array.isArray(res.body.data.aliases)).toBe(true);
        expect(Array.isArray(res.body.data.transformations)).toBe(true);
       
        expect(res.body.data).toHaveProperty("wielder");
        expect(res.body.data.wielder).toHaveProperty("name");
      }
    });

    it("should return 404 for non-existent zanpakuto slug", async () => {
      const res = await request(app).get(
        "/api/v1/zanpakutos/zzz-no-such-sword",
      );
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });

    it("should return 400 for slug with special characters", async () => {
      const res = await request(app).get("/api/v1/zanpakutos/!@#$%");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });
});
