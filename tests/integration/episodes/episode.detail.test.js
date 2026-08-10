import { describe, it, expect } from "vitest";
import { request, app, expectDetailContract, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Episodes Module — Detail Endpoints (by Slug & Number)", () => {
  describe("GET /api/v1/episodes/:slug", () => {
    it("should return full detail shape for a dynamically fetched episode slug", async () => {
      const list = await request(app).get("/api/v1/episodes?limit=1");
      if (list.body.data.length > 0) {
        const targetSlug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/episodes/${targetSlug}`);
        expectDetailContract(res);
        const ep = res.body.data;
        expect(ep).toHaveProperty("title");
        expect(ep).toHaveProperty("slug", targetSlug);
        expect(ep).toHaveProperty("episodeNumber");
        expect(ep).toHaveProperty("type");
        expect(ep).toHaveProperty("synopsis");
        expect(ep).toHaveProperty("airDate");
        expect(ep).toHaveProperty("arc");
      }
    });

    it("should return 404 RESOURCE_NOT_FOUND for non-existent episode slug", async () => {
      const nonExistentSlug = "non-existent-episode-slug-" + Date.now();
      const res = await request(app).get(`/api/v1/episodes/${nonExistentSlug}`);
      expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
    });
  });

  describe("GET /api/v1/episodes/number/:number", () => {
    it("should return full detail shape for a dynamically fetched episode number", async () => {
      const list = await request(app).get("/api/v1/episodes?limit=1");
      if (list.body.data.length > 0) {
        const targetNumber = list.body.data[0].episodeNumber;
        const res = await request(app).get(`/api/v1/episodes/number/${targetNumber}`);
        expectDetailContract(res);
        const ep = res.body.data;
        expect(ep).toHaveProperty("title");
        expect(ep).toHaveProperty("slug");
        expect(ep).toHaveProperty("episodeNumber", targetNumber);
        expect(ep).toHaveProperty("type");
        expect(ep).toHaveProperty("synopsis");
        expect(ep).toHaveProperty("airDate");
        expect(ep).toHaveProperty("arc");
      }
    });

    it("should return 404 RESOURCE_NOT_FOUND for out-of-range episode number", async () => {
      const outOfRangeNumber = 99999;
      const res = await request(app).get(`/api/v1/episodes/number/${outOfRangeNumber}`);
      expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
    });
  });
});
