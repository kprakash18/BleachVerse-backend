import { describe, it, expect } from "vitest";
import { request, app, expectDetailContract, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Organizations Module — GET /api/v1/organizations/:slug (Detail)", () => {
  it("should return full detail shape for a dynamically fetched organization slug", async () => {
    const list = await request(app).get("/api/v1/organizations?limit=1");
    if (list.body.data.length > 0) {
      const slug = list.body.data[0].slug;
      const res = await request(app).get(`/api/v1/organizations/${slug}`);
      expectDetailContract(res);
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("slug", slug);
      expect(res.body.data).toHaveProperty("type");
      expect(res.body.data).toHaveProperty("parent");
      expect(Array.isArray(res.body.data.subOrganizations)).toBe(true);
      expect(Array.isArray(res.body.data.members)).toBe(true);
    }
  });

  it("should return member objects with role and character detail", async () => {
    const list = await request(app).get("/api/v1/organizations?limit=10");
    if (list.body.data.length > 0) {
      const slug = list.body.data[0].slug;
      const res = await request(app).get(`/api/v1/organizations/${slug}`);
      if (res.body.data.members.length > 0) {
        const member = res.body.data.members[0];
        expect(member).toHaveProperty("role");
        expect(member).toHaveProperty("character");
        expect(member.character).toHaveProperty("name");
        expect(member.character).toHaveProperty("slug");
      }
    }
  });

  it("should return 404 RESOURCE_NOT_FOUND for non-existent organization slug", async () => {
    const nonExistentSlug = "non-existent-organization-slug-" + Date.now();
    const res = await request(app).get(`/api/v1/organizations/${nonExistentSlug}`);
    expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
  });
});
