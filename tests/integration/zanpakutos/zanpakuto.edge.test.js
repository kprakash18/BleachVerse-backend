import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { ZANPAKUTO } from "../../../src/modules/zanpakuto/zanpakuto.constant.js";

describe("Zanpakutō Module — Edge & Validation Cases", () => {
  it("should return 400 VALIDATION_ERROR for invalid type enum value not present in ZANPAKUTO.TYPES", async () => {
    const invalidType = "INVALID_TYPE_" + Date.now();
    expect(ZANPAKUTO.TYPES.includes(invalidType)).toBe(false);
    const res = await request(app).get(`/api/v1/zanpakutos?type=${invalidType}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for slug with special characters (!@#)", async () => {
    const res = await request(app).get("/api/v1/zanpakutos/!@#$%");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for URL-encoded script tag in slug", async () => {
    const res = await request(app).get("/api/v1/zanpakutos/%3Cscript%3Ealert(1)%3C%2Fscript%3E");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should handle Japanese / Unicode string in search (斬月)", async () => {
    const res = await request(app).get("/api/v1/zanpakutos?search=斬月");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
