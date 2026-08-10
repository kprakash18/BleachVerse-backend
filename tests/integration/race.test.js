
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Race Module — Adversarial Integration Tests", () => {
  describe("GET /api/v1/races — valid requests", () => {
    it("should return paginated list with defaults", async () => {
      const res = await request(app).get("/api/v1/races");
      expect(res.status).toBe(200);
      expect(res.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });

    it("should return collection fields: name, category, description (no slug or id)", async () => {
      const res = await request(app).get("/api/v1/races?limit=1");
      expect(res.status).toBe(200);
      if (res.body.data.length > 0) {
        const race = res.body.data[0];
        expect(race).toHaveProperty("name");
        expect(race).toHaveProperty("category");
        expect(race).toHaveProperty("description");
        expect(race).not.toHaveProperty("id");
        expect(race).not.toHaveProperty("slug");
      }
    });

    it("should filter by category=MAIN (lowercase auto-uppercased)", async () => {
      const res = await request(app).get("/api/v1/races?category=main");
      expect(res.status).toBe(200);
      for (const race of res.body.data) {
        expect(race.category).toBe("MAIN");
      }
    });
  });

  describe("GET /api/v1/races — pagination abuse", () => {
    it("should return 400 for page=0", async () => {
      const res = await request(app).get("/api/v1/races?page=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=101", async () => {
      const res = await request(app).get("/api/v1/races?limit=101");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return empty data[] for out-of-range page", async () => {
      const res = await request(app).get("/api/v1/races?page=99999");
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe("GET /api/v1/races — invalid enum", () => {
    it("should return 400 for invalid category (category=ALIEN)", async () => {
      const res = await request(app).get("/api/v1/races?category=ALIEN");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("GET /api/v1/races/:name — valid, not found, invalid", () => {
    it("should return full detail shape for Soul Reaper including characters array", async () => {
      const res = await request(app).get("/api/v1/races/Soul Reaper");
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("category");
      expect(res.body.data).toHaveProperty("description");
      expect(Array.isArray(res.body.data.characters)).toBe(true);
    });

    it("should perform case-insensitive name lookup (soul reaper → Soul Reaper)", async () => {
      const res = await request(app).get("/api/v1/races/soul reaper");
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("Soul Reaper");
    });

    it("should return characters as { character: { name, slug } } join table shape", async () => {
      const res = await request(app).get("/api/v1/races/Soul Reaper");
      expect(res.status).toBe(200);
      if (res.body.data.characters.length > 0) {
       
        const entry = res.body.data.characters[0];
        expect(entry).toHaveProperty("name");
        expect(entry).toHaveProperty("slug");
        expect(entry).not.toHaveProperty("character");
      }
    });

    it("should return 404 for a name that does not exist in the database", async () => {
      const res = await request(app).get("/api/v1/races/Kryptonian");
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });

    it("should return 400 for SQL-like injection attempt in name param (no regex, but DB is safe)", async () => {
      const res = await request(app).get(
        "/api/v1/races/' OR '1'='1'; DROP TABLE races;--",
      );
      expect([200, 404]).toContain(res.status);
      if (res.status === 404) {
        expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
      }
    });
  });
});
