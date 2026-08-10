
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Fight Module — Adversarial Integration Tests", () => {
  describe("GET /api/v1/fights — valid requests", () => {
    it("should return paginated fight list with defaults", async () => {
      const res = await request(app).get("/api/v1/fights");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("pagination");
      expect(res.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });

    it("should return collection fields: title, slug, type, winner, arc, location", async () => {
      const res = await request(app).get("/api/v1/fights?limit=1");
      expect(res.status).toBe(200);
      if (res.body.data.length > 0) {
        const fight = res.body.data[0];
        expect(fight).toHaveProperty("title");
        expect(fight).toHaveProperty("slug");
        expect(fight).toHaveProperty("type");
        expect(fight).toHaveProperty("winner");
        expect(fight).toHaveProperty("arc");
        expect(fight).toHaveProperty("location");
      }
    });

    it("should filter by type=DUEL (lowercase auto-uppercased)", async () => {
      const res = await request(app).get("/api/v1/fights?type=duel");
      expect(res.status).toBe(200);
      for (const fight of res.body.data) {
        expect(fight.type).toBe("DUEL");
      }
    });
  });

  describe("GET /api/v1/fights — pagination abuse", () => {
    it("should return 400 for page=0", async () => {
      const res = await request(app).get("/api/v1/fights?page=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=101", async () => {
      const res = await request(app).get("/api/v1/fights?limit=101");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return empty data[] for out-of-range page", async () => {
      const res = await request(app).get("/api/v1/fights?page=99999");
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
      expect(res.body.pagination.page).toBe(99999);
    });
  });

  describe("GET /api/v1/fights — invalid enum & filters", () => {
    it("should return 400 for invalid type enum (type=INVALID)", async () => {
      const res = await request(app).get("/api/v1/fights?type=INVALID");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for invalid sortBy field", async () => {
      const res = await request(app).get("/api/v1/fights?sortBy=hackedField");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return safe 200 for SQL-like search input", async () => {
      const res = await request(app).get(
        "/api/v1/fights?search=' OR '1'='1'; DROP TABLE fights;--",
      );
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
    });
  });

  describe("GET /api/v1/fights/:slug — valid, not found, invalid", () => {
    it("should return full detail shape for a real fight slug", async () => {
      const list = await request(app).get("/api/v1/fights?limit=1");
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/fights/${slug}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("title");
        expect(res.body.data).toHaveProperty("slug");
        expect(res.body.data).toHaveProperty("type");
        expect(res.body.data).toHaveProperty("summary");
        expect(res.body.data).toHaveProperty("participants");
        expect(Array.isArray(res.body.data.participants)).toBe(true);
      }
    });

    it("should return 404 RESOURCE_NOT_FOUND for non-existent fight slug", async () => {
      const res = await request(app).get(
        "/api/v1/fights/zzz-no-such-fight-exists",
      );
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });

    it("should return 400 VALIDATION_ERROR for slug with special chars (!@#)", async () => {
      const res = await request(app).get("/api/v1/fights/!@#$%");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });
});
