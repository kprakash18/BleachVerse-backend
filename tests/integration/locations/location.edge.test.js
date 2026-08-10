import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { LOCATION } from "../../../src/modules/location/location.constant.js";

describe("Locations Module — Edge & Validation Cases", () => {
  it("should return 400 VALIDATION_ERROR for invalid type enum value not present in LOCATION.TYPES", async () => {
    const invalidType = "INVALID_TYPE_" + Date.now();
    expect(LOCATION.TYPES.includes(invalidType)).toBe(false);
    const res = await request(app).get(`/api/v1/locations?type=${invalidType}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for slug with special characters (!@#)", async () => {
    const res = await request(app).get("/api/v1/locations/!@#$%^");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for URL-encoded script tag in slug", async () => {
    const res = await request(app).get("/api/v1/locations/%3Cscript%3Ealert(1)%3C%2Fscript%3E");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });
});
