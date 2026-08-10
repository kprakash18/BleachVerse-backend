import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { ORGANIZATION } from "../../../src/modules/organization/organization.constant.js";

describe("Organizations Module — Edge & Validation Cases", () => {
  it("should return 400 VALIDATION_ERROR for invalid type enum value not present in ORGANIZATION.TYPES", async () => {
    const invalidType = "INVALID_TYPE_" + Date.now();
    expect(ORGANIZATION.TYPES.includes(invalidType)).toBe(false);
    const res = await request(app).get(`/api/v1/organizations?type=${invalidType}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for invalid sortBy field not present in ORGANIZATION.SORT_FIELDS", async () => {
    const invalidSortBy = "INVALID_SORTBY_" + Date.now();
    expect(ORGANIZATION.SORT_FIELDS.includes(invalidSortBy)).toBe(false);
    const res = await request(app).get(`/api/v1/organizations?sortBy=${invalidSortBy}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for slug with special characters (!@#)", async () => {
    const res = await request(app).get("/api/v1/organizations/!@#invalid$%");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for URL-encoded script tag in slug", async () => {
    const res = await request(app).get("/api/v1/organizations/%3Cscript%3Ealert(1)%3C%2Fscript%3E");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });
});
