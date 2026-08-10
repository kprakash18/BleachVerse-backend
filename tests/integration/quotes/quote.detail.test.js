import { describe, it, expect } from "vitest";
import { request, app, expectDetailContract, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Quotes Module — GET /api/v1/quotes/:id (Detail by UUID)", () => {
  it("should return full detail shape (with sourceMaterial) for a valid quote ID", async () => {
    const list = await request(app).get("/api/v1/quotes?limit=1");
    if (list.body.data.length > 0) {
      const id = list.body.data[0].id;
      const res = await request(app).get(`/api/v1/quotes/${id}`);
      expectDetailContract(res);
      expect(res.body.data).toHaveProperty("id", id);
      expect(res.body.data).toHaveProperty("text");
      expect(res.body.data).toHaveProperty("isCanonical");
      expect(res.body.data).toHaveProperty("sourceMaterial");
      expect(res.body.data).toHaveProperty("character");
    }
  });

  it("should return 404 RESOURCE_NOT_FOUND for valid UUID that does not exist in DB", async () => {
    const res = await request(app).get("/api/v1/quotes/00000000-0000-4000-8000-000000000000");
    expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
  });
});
