import { describe, it, expect } from "vitest";
import { request, app, expectDetailContract, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Events Module — GET /api/v1/events/:slug (Detail)", () => {
  it("should return full detail shape including isCanonical, sourceMaterial, episode, participants array", async () => {
    const list = await request(app).get("/api/v1/events?limit=1");
    if (list.body.data.length > 0) {
      const slug = list.body.data[0].slug;
      const res = await request(app).get(`/api/v1/events/${slug}`);
      expectDetailContract(res);
      expect(res.body.data).toHaveProperty("title");
      expect(res.body.data).toHaveProperty("slug", slug);
      expect(res.body.data).toHaveProperty("isCanonical");
      expect(res.body.data).toHaveProperty("sourceMaterial");
      expect(res.body.data).toHaveProperty("episode");
      expect(Array.isArray(res.body.data.participants)).toBe(true);
    }
  });

  it("should return 404 RESOURCE_NOT_FOUND for non-existent event slug", async () => {
    const res = await request(app).get("/api/v1/events/non-existent-event-slug-xyz");
    expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
  });
});
