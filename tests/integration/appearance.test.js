
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Appearance Module — Adversarial Integration Tests", () => {
  describe("GET /api/v1/appearances — valid requests", () => {
    it("should return paginated list with defaults", async () => {
      const res = await request(app).get("/api/v1/appearances");
      expect(res.status).toBe(200);
      expect(res.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });

    it("should return collection fields: id, isFirstAppearance, character, episode", async () => {
      const res = await request(app).get("/api/v1/appearances?limit=1");
      expect(res.status).toBe(200);
      if (res.body.data.length > 0) {
        const ap = res.body.data[0];
        expect(ap).toHaveProperty("id");
        expect(ap).toHaveProperty("isFirstAppearance");
        expect(ap).toHaveProperty("character");
        expect(ap.character).toHaveProperty("name");
        expect(ap.character).toHaveProperty("slug");
        expect(ap).toHaveProperty("episode");
        expect(ap.episode).toHaveProperty("title");
        expect(ap.episode).toHaveProperty("slug");
        expect(ap.episode).toHaveProperty("episodeNumber");
        expect(ap.episode).not.toHaveProperty("synopsis");
        expect(ap.episode).not.toHaveProperty("arc");
      }
    });

    it("should filter by characterSlug and return only that character's appearances", async () => {
      const res = await request(app).get(
        "/api/v1/appearances?characterSlug=ichigo-kurosaki",
      );
      expect(res.status).toBe(200);
      for (const ap of res.body.data) {
        expect(ap.character.slug).toBe("ichigo-kurosaki");
      }
    });

    it("should filter by isFirstAppearance=true and only return debut episodes", async () => {
      const res = await request(app).get(
        "/api/v1/appearances?isFirstAppearance=true",
      );
      expect(res.status).toBe(200);
      for (const ap of res.body.data) {
        expect(ap.isFirstAppearance).toBe(true);
      }
    });

    it("should return empty data[] for non-existent characterSlug", async () => {
      const res = await request(app).get(
        "/api/v1/appearances?characterSlug=zzz-nobody-123",
      );
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe("GET /api/v1/appearances — pagination abuse", () => {
    it("should return 400 for page=0", async () => {
      const res = await request(app).get("/api/v1/appearances?page=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for page=-5", async () => {
      const res = await request(app).get("/api/v1/appearances?page=-5");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=0", async () => {
      const res = await request(app).get("/api/v1/appearances?limit=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=101", async () => {
      const res = await request(app).get("/api/v1/appearances?limit=101");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return empty data[] for out-of-range page with full pagination contract", async () => {
      const res = await request(app).get("/api/v1/appearances?page=99999");
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
      expect(res.body.pagination).toMatchObject({
        page: 99999,
        limit: 10,
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });
  });

  describe("GET /api/v1/appearances/:id — UUID validation", () => {
    it("should return 400 for non-UUID string (invalid-uuid)", async () => {
      const res = await request(app).get("/api/v1/appearances/invalid-uuid");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for numeric id (12345)", async () => {
      const res = await request(app).get("/api/v1/appearances/12345");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for SQL-injection-like id", async () => {
      const res = await request(app).get(
        "/api/v1/appearances/1'; DROP TABLE appearances;--",
      );
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 404 for valid UUID that does not exist", async () => {
      const res = await request(app).get(
        "/api/v1/appearances/00000000-0000-4000-8000-000000000000",
      );
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });

    it("should return full detail shape (with episode.synopsis, episode.airDate, episode.arc) for a real id", async () => {
      const list = await request(app).get("/api/v1/appearances?limit=1");
      if (list.body.data.length > 0) {
        const id = list.body.data[0].id;
        const res = await request(app).get(`/api/v1/appearances/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("id", id);
        expect(res.body.data).toHaveProperty("isFirstAppearance");
        expect(res.body.data).toHaveProperty("character");
        expect(res.body.data).toHaveProperty("episode");
        expect(res.body.data.episode).toHaveProperty("synopsis");
        expect(res.body.data.episode).toHaveProperty("airDate");
        expect(res.body.data.episode).toHaveProperty("arc");
      }
    });
  });
});
