
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Transformation Module — Adversarial Integration Tests", () => {
  describe("GET /api/v1/transformations — valid requests", () => {
    it("should return paginated list with defaults", async () => {
      const res = await request(app).get("/api/v1/transformations");
      expect(res.status).toBe(200);
      expect(res.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });

    it("should return collection fields: id, name, type, description, character, zanpakuto", async () => {
      const res = await request(app).get("/api/v1/transformations?limit=1");
      expect(res.status).toBe(200);
      if (res.body.data.length > 0) {
        const t = res.body.data[0];
        expect(t).toHaveProperty("id");
        expect(t).toHaveProperty("name");
        expect(t).toHaveProperty("type");
        expect(t).toHaveProperty("description");
        expect(t).toHaveProperty("character");
        expect(t).toHaveProperty("zanpakuto");
      }
    });

    it("should filter by type=BANKAI (lowercase auto-uppercased)", async () => {
      const res = await request(app).get("/api/v1/transformations?type=bankai");
      expect(res.status).toBe(200);
      for (const t of res.body.data) {
        expect(t.type).toBe("BANKAI");
      }
    });

    it("should filter by characterSlug and return correct transformations", async () => {
      const res = await request(app).get(
        "/api/v1/transformations?characterSlug=ichigo-kurosaki",
      );
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("should return empty results for non-existent characterSlug", async () => {
      const res = await request(app).get(
        "/api/v1/transformations?characterSlug=zzz-nobody",
      );
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe("GET /api/v1/transformations — pagination abuse", () => {
    it("should return 400 for page=0", async () => {
      const res = await request(app).get("/api/v1/transformations?page=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=101", async () => {
      const res = await request(app).get("/api/v1/transformations?limit=101");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return empty data[] for out-of-range page", async () => {
      const res = await request(app).get(
        "/api/v1/transformations?page=99999",
      );
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe("GET /api/v1/transformations — invalid enum", () => {
    it("should return 400 for invalid type (type=MEGA)", async () => {
      const res = await request(app).get("/api/v1/transformations?type=MEGA");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for invalid sourceMaterial (sourceMaterial=YOUTUBE)", async () => {
      const res = await request(app).get(
        "/api/v1/transformations?sourceMaterial=YOUTUBE",
      );
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("GET /api/v1/transformations/:id — UUID validation", () => {
    it("should return 400 for non-UUID string", async () => {
      const res = await request(app).get(
        "/api/v1/transformations/not-a-uuid-string",
      );
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for SQL-injection-like id", async () => {
      const res = await request(app).get(
        "/api/v1/transformations/1'; DROP TABLE transformations;--",
      );
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 404 for valid UUID that does not exist", async () => {
      const res = await request(app).get(
        "/api/v1/transformations/00000000-0000-4000-8000-000000000000",
      );
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });

    it("should return full detail shape (with firstEpisode, firstFight, powers[]) for a real id", async () => {
      const list = await request(app).get("/api/v1/transformations?limit=1");
      if (list.body.data.length > 0) {
        const id = list.body.data[0].id;
        const res = await request(app).get(`/api/v1/transformations/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("id", id);
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("isCanonical");
        expect(res.body.data).toHaveProperty("sourceMaterial");
        expect(res.body.data).toHaveProperty("firstEpisode");
        expect(res.body.data).toHaveProperty("firstFight");
        expect(Array.isArray(res.body.data.powers)).toBe(true);
      }
    });
  });
});
