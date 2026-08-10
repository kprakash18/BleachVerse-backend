import { describe, it, expect } from "vitest";
import { request, app, expectDetailContract, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Zanpakutō Module — GET /api/v1/zanpakutos/:slug (Detail)", () => {
  it("should return full detail shape including wielder, aliases array, and transformations array", async () => {
    const list = await request(app).get("/api/v1/zanpakutos?limit=1");
    if (list.body.data.length > 0) {
      const slug = list.body.data[0].slug;
      const res = await request(app).get(`/api/v1/zanpakutos/${slug}`);
      expectDetailContract(res);
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("slug", slug);
      expect(res.body.data).toHaveProperty("type");
      expect(res.body.data).toHaveProperty("description");
      expect(res.body.data).toHaveProperty("wielder");
      expect(Array.isArray(res.body.data.aliases)).toBe(true);
      expect(Array.isArray(res.body.data.transformations)).toBe(true);
    }
  });

  it("should return 404 RESOURCE_NOT_FOUND for non-existent zanpakuto slug", async () => {
    const nonExistentSlug = "non-existent-sword-slug-" + Date.now();
    const res = await request(app).get(`/api/v1/zanpakutos/${nonExistentSlug}`);
    expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
  });
});
