import { describe, it, expect } from "vitest";
import { request, app, expectDetailContract, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Races Module — GET /api/v1/races/:name (Detail by Name)", () => {
  it("should return full detail shape for a dynamically fetched race name including flat characters array", async () => {
    const list = await request(app).get("/api/v1/races?limit=1");
    if (list.body.data.length > 0) {
      const targetName = list.body.data[0].name;
      const res = await request(app).get(`/api/v1/races/${encodeURIComponent(targetName)}`);
      expectDetailContract(res);
      expect(res.body.data).toHaveProperty("name", targetName);
      expect(res.body.data).toHaveProperty("category");
      expect(res.body.data).toHaveProperty("description");
      expect(Array.isArray(res.body.data.characters)).toBe(true);
      if (res.body.data.characters.length > 0) {
        const char = res.body.data.characters[0];
        expect(char).toHaveProperty("name");
        expect(char).toHaveProperty("slug");
      }
    }
  });

  it("should perform case-insensitive name lookup dynamically", async () => {
    const list = await request(app).get("/api/v1/races?limit=1");
    if (list.body.data.length > 0) {
      const targetName = list.body.data[0].name;
      const lowerName = targetName.toLowerCase();
      const res = await request(app).get(`/api/v1/races/${encodeURIComponent(lowerName)}`);
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe(targetName);
    }
  });

  it("should return 404 RESOURCE_NOT_FOUND for non-existent race name", async () => {
    const nonExistentName = "NonExistentRaceName-" + Date.now();
    const res = await request(app).get(`/api/v1/races/${nonExistentName}`);
    expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
  });
});
