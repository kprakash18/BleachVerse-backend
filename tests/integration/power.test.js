
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Power Module — Adversarial Integration Tests", () => {
  describe("GET /api/v1/powers — valid requests", () => {
    it("should return paginated list with defaults", async () => {
      const res = await request(app).get("/api/v1/powers");
      expect(res.status).toBe(200);
      expect(res.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });

    it("should return collection fields: id, name, type, source, description, character, transformation", async () => {
      const res = await request(app).get("/api/v1/powers?limit=1");
      expect(res.status).toBe(200);
      if (res.body.data.length > 0) {
        const p = res.body.data[0];
        expect(p).toHaveProperty("id");
        expect(p).toHaveProperty("name");
        expect(p).toHaveProperty("type");
        expect(p).toHaveProperty("source");
        expect(p).toHaveProperty("description");
        expect(p).toHaveProperty("character");
        expect(p).toHaveProperty("transformation");
      }
    });

    it("should filter by source=ZANPAKUTO (lowercase auto-uppercased)", async () => {
      const res = await request(app).get("/api/v1/powers?source=zanpakuto");
      expect(res.status).toBe(200);
      for (const p of res.body.data) {
        expect(p.source).toBe("ZANPAKUTO");
      }
    });

    it("should filter by type=OFFENSIVE and verify records", async () => {
      const res = await request(app).get("/api/v1/powers?type=OFFENSIVE");
      expect(res.status).toBe(200);
      for (const p of res.body.data) {
        expect(p.type).toBe("OFFENSIVE");
      }
    });

    it("should filter by characterSlug and return empty for non-existent character", async () => {
      const res = await request(app).get(
        "/api/v1/powers?characterSlug=zzz-nobody",
      );
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe("GET /api/v1/powers — pagination abuse", () => {
    it("should return 400 for page=0", async () => {
      const res = await request(app).get("/api/v1/powers?page=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=101", async () => {
      const res = await request(app).get("/api/v1/powers?limit=101");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return empty data[] for out-of-range page", async () => {
      const res = await request(app).get("/api/v1/powers?page=99999");
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe("GET /api/v1/powers — invalid enum", () => {
    it("should return 400 for invalid type (type=MAGICAL)", async () => {
      const res = await request(app).get("/api/v1/powers?type=MAGICAL");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for invalid source (source=ALIEN)", async () => {
      const res = await request(app).get("/api/v1/powers?source=ALIEN");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("GET /api/v1/powers/:id — UUID validation", () => {
    it("should return 400 for non-UUID string", async () => {
      const res = await request(app).get("/api/v1/powers/not-a-uuid");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for numeric id (12345)", async () => {
      const res = await request(app).get("/api/v1/powers/12345");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for SQL-like injection as id", async () => {
      const res = await request(app).get(
        "/api/v1/powers/1'; DROP TABLE powers;--",
      );
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 404 for valid UUID that does not exist", async () => {
      const res = await request(app).get(
        "/api/v1/powers/00000000-0000-4000-8000-000000000000",
      );
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });

    it("should return full detail shape (with isCanonical, sourceMaterial) for a real power id", async () => {
      const list = await request(app).get("/api/v1/powers?limit=1");
      if (list.body.data.length > 0) {
        const id = list.body.data[0].id;
        const res = await request(app).get(`/api/v1/powers/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("id", id);
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("isCanonical");
        expect(res.body.data).toHaveProperty("sourceMaterial");
        expect(res.body.data).toHaveProperty("character");
        expect(res.body.data).toHaveProperty("transformation");
      }
    });
  });
});
