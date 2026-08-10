import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract } from "../../helpers/test-helpers.js";
import { EPISODE } from "../../../src/modules/episode/episode.constant.js";

describe("Episodes Module — GET /api/v1/episodes (Collection)", () => {
  it("should return paginated list of episodes with defaults", async () => {
    const res = await request(app).get("/api/v1/episodes");
    expectPaginationContract(res, 1, 10, "totalItems");
  });

  it("should return collection summary shape (title, slug, episodeNumber, type) and omit detail fields", async () => {
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
      expect(ep).not.toHaveProperty("arc");
    }
  });

  it("should filter by type enum from EPISODE.TYPES and verify returned items", async () => {
    const targetType = EPISODE.TYPES[0];
    const res = await request(app).get(`/api/v1/episodes?type=${targetType}`);
    expect(res.status).toBe(200);
    for (const ep of res.body.data) {
      expect(ep.type).toBe(targetType);
    }
  });

  it("should handle lowercase filter value (auto-upcase)", async () => {
    const targetType = EPISODE.TYPES[0];
    const res = await request(app).get(`/api/v1/episodes?type=${targetType.toLowerCase()}`);
    expect(res.status).toBe(200);
    for (const ep of res.body.data) {
      expect(ep.type).toBe(targetType);
    }
  });

  it("should filter by valid arcSlug dynamically retrieved from populated arc", async () => {
    const arcs = await request(app).get("/api/v1/arcs?limit=1");
    if (arcs.body.data.length > 0) {
      const arcSlug = arcs.body.data[0].slug;
      const res = await request(app).get(`/api/v1/episodes?arcSlug=${arcSlug}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    }
  });

  it("should return empty data[] for filter with no matches", async () => {
    const nonExistentArc = "non-existent-arc-slug-" + Date.now();
    const res = await request(app).get(`/api/v1/episodes?arcSlug=${nonExistentArc}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.pagination.totalItems).toBe(0);
  });
});
