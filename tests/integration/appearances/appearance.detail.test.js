import { describe, it, expect } from "vitest";
import { request, app, expectDetailContract, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Appearances Module — GET /api/v1/appearances/:id (Detail by UUID)", () => {
  it("should return full detail shape (with episode synopsis, airDate, arc) for a valid appearance ID", async () => {
    const list = await request(app).get("/api/v1/appearances?limit=1");
    if (list.body.data.length > 0) {
      const id = list.body.data[0].id;
      const res = await request(app).get(`/api/v1/appearances/${id}`);
      expectDetailContract(res);
      expect(res.body.data).toHaveProperty("id", id);
      expect(res.body.data).toHaveProperty("isFirstAppearance");
      expect(res.body.data).toHaveProperty("character");
      expect(res.body.data).toHaveProperty("episode");
      expect(res.body.data.episode).toHaveProperty("synopsis");
      expect(res.body.data.episode).toHaveProperty("airDate");
      expect(res.body.data.episode).toHaveProperty("arc");
    }
  });

  it("should return 404 RESOURCE_NOT_FOUND for valid UUID that does not exist in DB", async () => {
    const res = await request(app).get("/api/v1/appearances/00000000-0000-4000-8000-000000000000");
    expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
  });
});
