import { describe, it, expect } from "vitest";
import { request, app, expectDetailContract, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Fights Module — GET /api/v1/fights/:slug (Detail)", () => {
  it("should return full detail shape including summary and participants array", async () => {
    const list = await request(app).get("/api/v1/fights?limit=1");
    if (list.body.data.length > 0) {
      const slug = list.body.data[0].slug;
      const res = await request(app).get(`/api/v1/fights/${slug}`);
      expectDetailContract(res);
      expect(res.body.data).toHaveProperty("title");
      expect(res.body.data).toHaveProperty("slug", slug);
      expect(res.body.data).toHaveProperty("type");
      expect(res.body.data).toHaveProperty("summary");
      expect(Array.isArray(res.body.data.participants)).toBe(true);
    }
  });

  it("should verify participants array elements have character with name and slug", async () => {
    const list = await request(app).get("/api/v1/fights?limit=1");
    if (list.body.data.length > 0) {
      const slug = list.body.data[0].slug;
      const res = await request(app).get(`/api/v1/fights/${slug}`);
      if (res.body.data.participants.length > 0) {
        const p = res.body.data.participants[0];
        expect(p).toHaveProperty("outcome");
        expect(p).toHaveProperty("character");
        expect(p.character).toHaveProperty("name");
        expect(p.character).toHaveProperty("slug");
      }
    }
  });

  it("should return 404 RESOURCE_NOT_FOUND for non-existent fight slug", async () => {
    const res = await request(app).get("/api/v1/fights/non-existent-fight-slug-xyz");
    expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
  });
});
