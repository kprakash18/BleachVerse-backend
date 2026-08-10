
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Quote Module — Adversarial Integration Tests", () => {
  describe("GET /api/v1/quotes — valid requests", () => {
    it("should return paginated list with defaults", async () => {
      const res = await request(app).get("/api/v1/quotes");
      expect(res.status).toBe(200);
      expect(res.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });

    it("should return collection fields: id, text, category, isCanonical, character, episode, arc", async () => {
      const res = await request(app).get("/api/v1/quotes?limit=1");
      expect(res.status).toBe(200);
      if (res.body.data.length > 0) {
        const q = res.body.data[0];
        expect(q).toHaveProperty("id");
        expect(q).toHaveProperty("text");
        expect(q).toHaveProperty("category");
        expect(q).toHaveProperty("isCanonical");
        expect(q).toHaveProperty("character");
        expect(q).toHaveProperty("episode");
        expect(q).toHaveProperty("arc");
      }
    });

    it("should filter by characterSlug and return only that character's quotes", async () => {
      const res = await request(app).get(
        "/api/v1/quotes?characterSlug=ichigo-kurosaki",
      );
      expect(res.status).toBe(200);
      for (const q of res.body.data) {
        expect(q.character.slug).toBe("ichigo-kurosaki");
      }
    });

    it("should filter by category=MOTIVATIONAL (lowercase auto-uppercased)", async () => {
      const res = await request(app).get("/api/v1/quotes?category=motivational");
      expect(res.status).toBe(200);
      for (const q of res.body.data) {
        expect(q.category).toBe("MOTIVATIONAL");
      }
    });

    it("should return empty list for non-existent characterSlug", async () => {
      const res = await request(app).get(
        "/api/v1/quotes?characterSlug=zzz-nobody",
      );
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe("GET /api/v1/quotes — pagination abuse", () => {
    it("should return 400 for page=0", async () => {
      const res = await request(app).get("/api/v1/quotes?page=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=101", async () => {
      const res = await request(app).get("/api/v1/quotes?limit=101");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return empty data[] for out-of-range page", async () => {
      const res = await request(app).get("/api/v1/quotes?page=99999");
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe("GET /api/v1/quotes — invalid enum", () => {
    it("should return 400 for invalid category (category=ANGRY)", async () => {
      const res = await request(app).get("/api/v1/quotes?category=ANGRY");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("GET /api/v1/quotes/character/:characterSlug", () => {
    it("should return paginated quotes for ichigo-kurosaki", async () => {
      const res = await request(app).get(
        "/api/v1/quotes/character/ichigo-kurosaki",
      );
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("pagination");
    });

    it("should return 200 with empty data for non-existent character slug", async () => {
      const res = await request(app).get(
        "/api/v1/quotes/character/zzz-nobody-123",
      );
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe("GET /api/v1/quotes/:id — UUID validation", () => {
    it("should return 400 for non-UUID string (invalid-uuid-string)", async () => {
      const res = await request(app).get("/api/v1/quotes/invalid-uuid-string");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for SQL-like input as id", async () => {
      const res = await request(app).get(
        "/api/v1/quotes/1'; DROP TABLE quotes;--",
      );
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for empty-looking numeric id", async () => {
      const res = await request(app).get("/api/v1/quotes/12345");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 404 for valid UUID that does not exist", async () => {
      const res = await request(app).get(
        "/api/v1/quotes/00000000-0000-4000-8000-000000000000",
      );
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });

    it("should return full detail shape for a real quote id", async () => {
      const list = await request(app).get("/api/v1/quotes?limit=1");
      if (list.body.data.length > 0) {
        const id = list.body.data[0].id;
        const res = await request(app).get(`/api/v1/quotes/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("id", id);
        expect(res.body.data).toHaveProperty("text");
        expect(res.body.data).toHaveProperty("isCanonical");
        expect(res.body.data).toHaveProperty("sourceMaterial");
        expect(res.body.data).toHaveProperty("character");
      }
    });
  });
});
