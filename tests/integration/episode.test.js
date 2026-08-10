
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Episode Module — Adversarial Integration Tests", () => {
  describe("GET /api/v1/episodes — valid requests", () => {
    it("should return paginated list with defaults", async () => {
      const res = await request(app).get("/api/v1/episodes");
      expect(res.status).toBe(200);
      expect(res.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });

    it("should return summary fields in collection (title, slug, number, type)", async () => {
      const res = await request(app).get("/api/v1/episodes?limit=1");
      expect(res.status).toBe(200);
      if (res.body.data.length > 0) {
        const ep = res.body.data[0];
        expect(ep).toHaveProperty("title");
        expect(ep).toHaveProperty("slug");
        expect(ep).toHaveProperty("episodeNumber");
        expect(ep).toHaveProperty("type");
        expect(ep).not.toHaveProperty("synopsis");
        expect(ep).not.toHaveProperty("airDate");
      }
    });

    it("should filter by type=FILLER and verify all returned records", async () => {
      const res = await request(app).get("/api/v1/episodes?type=FILLER");
      expect(res.status).toBe(200);
      for (const ep of res.body.data) {
        expect(ep.type).toBe("FILLER");
      }
    });

    it("should accept lowercase type=canon (auto-uppercased)", async () => {
      const res = await request(app).get("/api/v1/episodes?type=canon");
      expect(res.status).toBe(200);
      for (const ep of res.body.data) {
        expect(ep.type).toBe("CANON");
      }
    });
  });

  describe("GET /api/v1/episodes — pagination abuse", () => {
    it("should return 400 for page=0", async () => {
      const res = await request(app).get("/api/v1/episodes?page=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for page=-5", async () => {
      const res = await request(app).get("/api/v1/episodes?page=-5");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=0", async () => {
      const res = await request(app).get("/api/v1/episodes?limit=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=101", async () => {
      const res = await request(app).get("/api/v1/episodes?limit=101");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return empty data[] for page beyond totalPages", async () => {
      const res = await request(app).get("/api/v1/episodes?page=99999");
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
      expect(res.body.pagination.page).toBe(99999);
    });
  });

  describe("GET /api/v1/episodes — invalid enum", () => {
    it("should return 400 for invalid type (type=GARBAGE)", async () => {
      const res = await request(app).get("/api/v1/episodes?type=GARBAGE");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("GET /api/v1/episodes/number/:number — valid requests", () => {
    it("should return full detail shape for episode number 1", async () => {
      const res = await request(app).get("/api/v1/episodes/number/1");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      const ep = res.body.data;
      expect(ep).toHaveProperty("title");
      expect(ep).toHaveProperty("slug");
      expect(ep).toHaveProperty("episodeNumber", 1);
      expect(ep).toHaveProperty("type");
      expect(ep).toHaveProperty("synopsis");
      expect(ep).toHaveProperty("airDate");
      expect(ep).toHaveProperty("arc");
      expect(ep.arc).toHaveProperty("name");
      expect(ep.arc).toHaveProperty("slug");
    });
  });

  describe("GET /api/v1/episodes/number/:number — invalid number", () => {
    it("should return 400 for negative episode number (-1)", async () => {
      const res = await request(app).get("/api/v1/episodes/number/-1");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for zero episode number (0)", async () => {
      const res = await request(app).get("/api/v1/episodes/number/0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for non-numeric episode number (abc)", async () => {
      const res = await request(app).get("/api/v1/episodes/number/abc");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for decimal episode number (1.5)", async () => {
      const res = await request(app).get("/api/v1/episodes/number/1.5");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 404 for valid number that does not exist (99999)", async () => {
      const res = await request(app).get("/api/v1/episodes/number/99999");
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });
  });
});
