import { describe, it, expect } from "vitest";
import { request, app, expectDetailContract, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Locations Module — GET /api/v1/locations/:slug (Detail)", () => {
  it("should return full detail shape including parent, subLocations array, and fights array", async () => {
    const list = await request(app).get("/api/v1/locations?limit=1");
    if (list.body.data.length > 0) {
      const slug = list.body.data[0].slug;
      const res = await request(app).get(`/api/v1/locations/${slug}`);
      expectDetailContract(res);
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("slug", slug);
      expect(res.body.data).toHaveProperty("type");
      expect(res.body.data).toHaveProperty("parent");
      expect(Array.isArray(res.body.data.subLocations)).toBe(true);
      expect(Array.isArray(res.body.data.fights)).toBe(true);
    }
  });

  it("should return 404 RESOURCE_NOT_FOUND for non-existent location slug", async () => {
    const res = await request(app).get("/api/v1/locations/non-existent-location-slug-xyz");
    expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
  });
});
