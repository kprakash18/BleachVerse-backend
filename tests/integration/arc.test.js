
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Arc Module — Adversarial Integration Tests", () => {
  describe("GET /api/v1/arcs — valid requests", () => {
    it("should return paginated list with correct defaults", async () => {
      const res = await request(app).get("/api/v1/arcs");
      expect(res.status).toBe(200);
      expect(res.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });

    it("should filter arcs by type=CANON and verify all returned items", async () => {
      const res = await request(app).get("/api/v1/arcs?type=CANON");
      expect(res.status).toBe(200);
      for (const arc of res.body.data) {
        expect(arc.type).toBe("CANON");
      }
    });

    it("should accept lowercase type=canon (auto-uppercased by preprocess)", async () => {
      const res = await request(app).get("/api/v1/arcs?type=canon");
      expect(res.status).toBe(200);
      for (const arc of res.body.data) {
        expect(arc.type).toBe("CANON");
      }
    });

    it("should sort arcs by name ascending", async () => {
      const res = await request(app).get(
        "/api/v1/arcs?sortBy=name&sortOrder=asc&limit=5",
      );
      expect(res.status).toBe(200);
      const names = res.body.data.map((a) => a.name);
      expect(names).toEqual([...names].sort());
    });

    it("should return arc summary with required fields in collection", async () => {
      const res = await request(app).get("/api/v1/arcs?limit=1");
      expect(res.status).toBe(200);
      if (res.body.data.length > 0) {
        const arc = res.body.data[0];
        expect(arc).toHaveProperty("name");
        expect(arc).toHaveProperty("slug");
        expect(arc).toHaveProperty("type");
        expect(arc).toHaveProperty("description");
      }
    });
  });

  describe("GET /api/v1/arcs — pagination abuse", () => {
    it("should return 400 for page=0", async () => {
      const res = await request(app).get("/api/v1/arcs?page=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for page=-99", async () => {
      const res = await request(app).get("/api/v1/arcs?page=-99");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=101", async () => {
      const res = await request(app).get("/api/v1/arcs?limit=101");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for non-numeric page (page=xyz)", async () => {
      const res = await request(app).get("/api/v1/arcs?page=xyz");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return empty data[] with full pagination for out-of-range page", async () => {
      const res = await request(app).get("/api/v1/arcs?page=99999");
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
      expect(res.body.pagination.page).toBe(99999);
    });
  });

  describe("GET /api/v1/arcs — invalid enum & strict schema", () => {
    it("should return 400 for invalid type enum", async () => {
      const res = await request(app).get("/api/v1/arcs?type=INVALID");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for unknown query parameter (strict schema)", async () => {
      const res = await request(app).get("/api/v1/arcs?unknownParam=xyz");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for invalid sortBy field", async () => {
      const res = await request(app).get("/api/v1/arcs?sortBy=hackedField");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("GET /api/v1/arcs/:slug — valid & not found", () => {
    it("should return 404 RESOURCE_NOT_FOUND for non-existent arc slug", async () => {
      const res = await request(app).get(
        "/api/v1/arcs/definitely-does-not-exist",
      );
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });

    it("should return arc detail with chapter fields on detail endpoint", async () => {
      const list = await request(app).get("/api/v1/arcs?limit=1");
      expect(list.status).toBe(200);
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/arcs/${slug}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("slug");
        expect(res.body.data).toHaveProperty("type");
        expect(res.body.data).toHaveProperty("description");
        expect(res.body.data).toHaveProperty("coverage");
      }
    });
  });

  describe("GET /api/v1/arcs/:slug/episodes — sub-resource", () => {
    it("should return 404 when parent arc does not exist", async () => {
      const res = await request(app).get(
        "/api/v1/arcs/zzz-non-existent/episodes",
      );
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });

    it("should return paginated episodes for a valid arc slug", async () => {
      const list = await request(app).get("/api/v1/arcs?type=CANON&limit=1");
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/arcs/${slug}/episodes`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body).toHaveProperty("pagination");
      }
    });

    it("should return all episodes unpaginated when all=true", async () => {
      const list = await request(app).get("/api/v1/arcs?type=CANON&limit=1");
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const paginated = await request(app).get(
          `/api/v1/arcs/${slug}/episodes`,
        );
        const all = await request(app).get(
          `/api/v1/arcs/${slug}/episodes?all=true`,
        );
        expect(all.status).toBe(200);
        expect(all.body.data.length).toBeGreaterThanOrEqual(
          paginated.body.data.length,
        );
      }
    });

    it("should return 400 for invalid pagination on sub-resource", async () => {
      const res = await request(app).get(
        "/api/v1/arcs/some-arc/episodes?page=0",
      );
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });
});
