
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Location Module — Adversarial Integration Tests", () => {
  describe("GET /api/v1/locations — valid requests", () => {
    it("should return paginated list with defaults", async () => {
      const res = await request(app).get("/api/v1/locations");
      expect(res.status).toBe(200);
      expect(res.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });

    it("should return summary fields: name, slug, type, description", async () => {
      const res = await request(app).get("/api/v1/locations?limit=1");
      expect(res.status).toBe(200);
      if (res.body.data.length > 0) {
        const loc = res.body.data[0];
        expect(loc).toHaveProperty("name");
        expect(loc).toHaveProperty("slug");
        expect(loc).toHaveProperty("type");
        expect(loc).toHaveProperty("description");
      }
    });

    it("should filter by type=WORLD (lowercase auto-uppercased)", async () => {
      const res = await request(app).get("/api/v1/locations?type=world");
      expect(res.status).toBe(200);
      for (const loc of res.body.data) {
        expect(loc.type).toBe("WORLD");
      }
    });
  });

  describe("GET /api/v1/locations — pagination abuse", () => {
    it("should return 400 for page=0", async () => {
      const res = await request(app).get("/api/v1/locations?page=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=101", async () => {
      const res = await request(app).get("/api/v1/locations?limit=101");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for non-numeric limit", async () => {
      const res = await request(app).get("/api/v1/locations?limit=many");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return empty data[] for out-of-range page", async () => {
      const res = await request(app).get("/api/v1/locations?page=99999");
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe("GET /api/v1/locations — invalid enum", () => {
    it("should return 400 for invalid type (type=PLANET)", async () => {
      const res = await request(app).get("/api/v1/locations?type=PLANET");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("GET /api/v1/locations/:slug — valid, not found, invalid", () => {
    it("should return full detail shape including parent, children, fights", async () => {
      const list = await request(app).get("/api/v1/locations?limit=1");
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/locations/${slug}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("slug");
        expect(res.body.data).toHaveProperty("type");
        expect(res.body.data).toHaveProperty("parent");
        expect(Array.isArray(res.body.data.subLocations)).toBe(true);
        expect(Array.isArray(res.body.data.fights)).toBe(true);
      }
    });

    it("should return 404 for non-existent location slug", async () => {
      const res = await request(app).get(
        "/api/v1/locations/zzz-no-such-place",
      );
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });

    it("should return 400 for slug with special characters", async () => {
      const res = await request(app).get("/api/v1/locations/!@#$%^");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });
});
