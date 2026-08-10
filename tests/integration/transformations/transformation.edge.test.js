import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { TRANSFORMATION } from "../../../src/modules/transformation/transformation.constant.js";

describe("Transformations Module — Edge & Validation Cases", () => {
  it("should return 400 VALIDATION_ERROR for non-UUID string parameter", async () => {
    const res = await request(app).get("/api/v1/transformations/not-a-uuid-string");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for invalid type enum value not present in TRANSFORMATION.TYPES", async () => {
    const invalidType = "INVALID_TYPE_" + Date.now();
    expect(TRANSFORMATION.TYPES.includes(invalidType)).toBe(false);
    const res = await request(app).get(`/api/v1/transformations?type=${invalidType}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for invalid sourceMaterial enum value not present in TRANSFORMATION.SOURCE_MATERIALS", async () => {
    const invalidSourceMaterial = "INVALID_MATERIAL_" + Date.now();
    expect(TRANSFORMATION.SOURCE_MATERIALS.includes(invalidSourceMaterial)).toBe(false);
    const res = await request(app).get(`/api/v1/transformations?sourceMaterial=${invalidSourceMaterial}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });
});
