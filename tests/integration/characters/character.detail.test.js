import { describe, it, expect } from "vitest";
import { request, app, expectDetailContract, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Characters Module — GET /api/v1/characters/:slug (Detail)", () => {
  it("should return full detail shape for a dynamically fetched character slug", async () => {
    const list = await request(app).get("/api/v1/characters?limit=1");
    if (list.body.data.length > 0) {
      const targetChar = list.body.data[0];
      const res = await request(app).get(`/api/v1/characters/${targetChar.slug}`);
      expectDetailContract(res);
      expect(res.body.data.name).toBe(targetChar.name);
      expect(res.body.data).toHaveProperty("sex");
      expect(res.body.data).toHaveProperty("status");
      expect(Array.isArray(res.body.data.aliases)).toBe(true);
      expect(Array.isArray(res.body.data.races)).toBe(true);
      expect(Array.isArray(res.body.data.organizations)).toBe(true);
    }
  });

  it("should normalize uppercase slug to lowercase dynamically", async () => {
    const list = await request(app).get("/api/v1/characters?limit=1");
    if (list.body.data.length > 0) {
      const targetChar = list.body.data[0];
      const upperSlug = targetChar.slug.toUpperCase();
      const res = await request(app).get(`/api/v1/characters/${upperSlug}`);
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe(targetChar.name);
    }
  });

  it("should handle URL-encoded space in slug (%20 → hyphen normalization)", async () => {
    const list = await request(app).get("/api/v1/characters?limit=1");
    if (list.body.data.length > 0) {
      const targetChar = list.body.data[0];
      const spaceSlug = targetChar.slug.replace(/-/g, "%20");
      const res = await request(app).get(`/api/v1/characters/${spaceSlug}`);
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe(targetChar.name);
    }
  });

  it("should return aliases as array of { alias } objects", async () => {
    const list = await request(app).get("/api/v1/characters?limit=10");
    if (list.body.data.length > 0) {
      const targetSlug = list.body.data[0].slug;
      const res = await request(app).get(`/api/v1/characters/${targetSlug}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data.aliases)).toBe(true);
    }
  });

  it("should return 404 RESOURCE_NOT_FOUND for non-existent slug", async () => {
    const nonExistentSlug = "non-existent-character-slug-" + Date.now();
    const res = await request(app).get(`/api/v1/characters/${nonExistentSlug}`);
    expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
  });
});
