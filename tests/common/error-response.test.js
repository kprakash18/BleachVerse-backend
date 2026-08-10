import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../helpers/test-helpers.js";

describe("Common Infrastructure — Standard Error Response Envelope", () => {
  it("should format 404 RESOURCE_NOT_FOUND errors into standard JSON error envelope", async () => {
    const res = await request(app).get("/api/v1/characters/non-existent-character-slug-xyz");
    expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
    expect(res.body).not.toHaveProperty("data");
    expect(res.body).not.toHaveProperty("pagination");
  });

  it("should format 400 VALIDATION_ERROR errors into standard JSON error envelope", async () => {
    const res = await request(app).get("/api/v1/episodes?page=0");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
    expect(res.body).not.toHaveProperty("data");
    expect(res.body).not.toHaveProperty("pagination");
  });

  it("should return 404 RESOURCE_NOT_FOUND error envelope for non-existent resource", async () => {
    const res = await request(app).get("/api/v1/characters/non-existent-slug-xyz");
    expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
  });
});
