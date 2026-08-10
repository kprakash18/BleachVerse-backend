import { describe, it, expect } from "vitest";
import { request, app, expectDetailContract, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Transformations Module — GET /api/v1/transformations/:id (Detail by UUID)", () => {
  it("should return full detail shape (firstEpisode, firstFight, powers array) for a valid transformation ID", async () => {
    const list = await request(app).get("/api/v1/transformations?limit=1");
    if (list.body.data.length > 0) {
      const id = list.body.data[0].id;
      const res = await request(app).get(`/api/v1/transformations/${id}`);
      expectDetailContract(res);
      expect(res.body.data).toHaveProperty("id", id);
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("isCanonical");
      expect(res.body.data).toHaveProperty("sourceMaterial");
      expect(res.body.data).toHaveProperty("firstEpisode");
      expect(res.body.data).toHaveProperty("firstFight");
      expect(Array.isArray(res.body.data.powers)).toBe(true);
    }
  });

  it("should return 404 RESOURCE_NOT_FOUND for valid UUID that does not exist in DB", async () => {
    const res = await request(app).get("/api/v1/transformations/00000000-0000-4000-8000-000000000000");
    expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
  });
});
