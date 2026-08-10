import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Event Module — Adversarial Integration Tests", () => {
  describe("GET /api/v1/events — valid requests", () => {
    it("should return paginated list with defaults", async () => {
      const res = await request(app).get("/api/v1/events");
      expect(res.status).toBe(200);
      expect(res.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
        totalItems: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });



    it("should return collection fields: title, slug, type, description, arc, location", async () => {
      const res = await request(app).get("/api/v1/events?limit=1");
      expect(res.status).toBe(200);
      if (res.body.data.length > 0) {
        const ev = res.body.data[0];
        expect(ev).toHaveProperty("title");
        expect(ev).toHaveProperty("slug");
        expect(ev).toHaveProperty("type");
        expect(ev).toHaveProperty("description");
        expect(ev).toHaveProperty("arc");
        expect(ev).toHaveProperty("location");
      }
    });



    it("should filter by type=BATTLE (lowercase auto-uppercased)", async () => {
      const res = await request(app).get("/api/v1/events?type=battle");
      expect(res.status).toBe(200);
      for (const ev of res.body.data) {
        expect(ev.type).toBe("BATTLE");
      }
    });



    it("should filter by sourceMaterial=MANGA (lowercase auto-uppercased)", async () => {
      const res = await request(app).get("/api/v1/events?sourceMaterial=manga");
      expect(res.status).toBe(200);
    });
  });



  describe("GET /api/v1/events — pagination abuse", () => {
    it("should return 400 for page=0", async () => {
      const res = await request(app).get("/api/v1/events?page=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });



    it("should return 400 for limit=101", async () => {
      const res = await request(app).get("/api/v1/events?limit=101");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });



    it("should return empty data[] for out-of-range page", async () => {
      const res = await request(app).get("/api/v1/events?page=99999");
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });



  describe("GET /api/v1/events — invalid enum", () => {
    it("should return 400 for invalid type (type=PARTY)", async () => {
      const res = await request(app).get("/api/v1/events?type=PARTY");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });



    it("should return 400 for invalid sourceMaterial (sourceMaterial=BOOK)", async () => {
      const res = await request(app).get("/api/v1/events?sourceMaterial=BOOK");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });



  describe("GET /api/v1/events/:slug — valid, not found, invalid", () => {
    it("should return full detail shape including isCanonical, sourceMaterial, participants", async () => {
      const list = await request(app).get("/api/v1/events?limit=1");
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/events/${slug}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("title");
        expect(res.body.data).toHaveProperty("slug");
        expect(res.body.data).toHaveProperty("isCanonical");
        expect(res.body.data).toHaveProperty("sourceMaterial");
        expect(res.body.data).toHaveProperty("episode");
        expect(Array.isArray(res.body.data.participants)).toBe(true);
      }
    });



    it("should return 404 for non-existent event slug", async () => {
      const res = await request(app).get("/api/v1/events/zzz-no-such-event");
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });


    
    it("should return 400 for slug with special characters", async () => {
      const res = await request(app).get("/api/v1/events/!@#$%^&*");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });
});
