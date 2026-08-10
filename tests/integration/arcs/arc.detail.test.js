import { describe, it, expect } from "vitest";
import { request, app, expectDetailContract, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Arcs Module — Detail & Sub-Resources", () => {
  describe("GET /api/v1/arcs/:slug", () => {
    it("should return arc detail with coverage object on valid slug", async () => {
      const list = await request(app).get("/api/v1/arcs?limit=1");
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/arcs/${slug}`);
        expectDetailContract(res);
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("slug", slug);
        expect(res.body.data).toHaveProperty("type");
        expect(res.body.data).toHaveProperty("coverage");
      }
    });

    it("should return 404 RESOURCE_NOT_FOUND for non-existent arc slug", async () => {
      const res = await request(app).get("/api/v1/arcs/non-existent-arc-slug-xyz");
      expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
    });
  });

  describe("Sub-resource: GET /api/v1/arcs/:slug/episodes", () => {
    it("should return paginated episodes for a valid arc slug", async () => {
      const list = await request(app).get("/api/v1/arcs?limit=1");
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/arcs/${slug}/episodes`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body).toHaveProperty("pagination");
      }
    });

    it("should return all episodes unpaginated when all=true", async () => {
      const list = await request(app).get("/api/v1/arcs?limit=1");
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/arcs/${slug}/episodes?all=true`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
      }
    });

    it("should return 404 when parent arc does not exist", async () => {
      const res = await request(app).get("/api/v1/arcs/non-existent-arc/episodes");
      expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
    });
  });

  describe("Sub-resource: GET /api/v1/arcs/:slug/fights", () => {
    it("should return paginated fights for a valid arc slug", async () => {
      const list = await request(app).get("/api/v1/arcs?limit=1");
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/arcs/${slug}/fights`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
      }
    });
  });

  describe("Sub-resource: GET /api/v1/arcs/:slug/events", () => {
    it("should return paginated events for a valid arc slug", async () => {
      const list = await request(app).get("/api/v1/arcs?limit=1");
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/arcs/${slug}/events`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
      }
    });
  });

  describe("Sub-resource: GET /api/v1/arcs/:slug/characters", () => {
    it("should return paginated distinct characters for a valid arc slug", async () => {
      const list = await request(app).get("/api/v1/arcs?limit=1");
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/arcs/${slug}/characters`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
      }
    });
  });
});
