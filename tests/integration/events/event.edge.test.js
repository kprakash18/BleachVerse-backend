import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { EVENT } from "../../../src/modules/event/event.constant.js";

describe("Events Module — Edge & Validation Cases", () => {
  it("should return 400 VALIDATION_ERROR for invalid type enum value not present in EVENT.TYPES", async () => {
    const invalidType = "INVALID_TYPE_" + Date.now();
    expect(EVENT.TYPES.includes(invalidType)).toBe(false);
    const res = await request(app).get(`/api/v1/events?type=${invalidType}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for invalid sourceMaterial enum value not present in EVENT.SOURCE_MATERIALS", async () => {
    const invalidSourceMaterial = "INVALID_MATERIAL_" + Date.now();
    expect(EVENT.SOURCE_MATERIALS.includes(invalidSourceMaterial)).toBe(false);
    const res = await request(app).get(`/api/v1/events?sourceMaterial=${invalidSourceMaterial}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for slug with special characters (!@#)", async () => {
    const res = await request(app).get("/api/v1/events/!@#$%^&*");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for URL-encoded script tag in slug", async () => {
    const res = await request(app).get("/api/v1/events/%3Cscript%3Ealert(1)%3C%2Fscript%3E");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });
});
