import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { POWER } from "../../../src/modules/power/power.constant.js";

describe("Powers Module — Edge & Validation Cases", () => {
  it("should return 400 VALIDATION_ERROR for non-UUID string parameter", async () => {
    const res = await request(app).get("/api/v1/powers/not-a-uuid-string");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for invalid type enum value not present in POWER.TYPES", async () => {
    const invalidType = "INVALID_TYPE_" + Date.now();
    expect(POWER.TYPES.includes(invalidType)).toBe(false);
    const res = await request(app).get(`/api/v1/powers?type=${invalidType}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for invalid source enum value not present in POWER.SOURCES", async () => {
    const invalidSource = "INVALID_SOURCE_" + Date.now();
    expect(POWER.SOURCES.includes(invalidSource)).toBe(false);
    const res = await request(app).get(`/api/v1/powers?source=${invalidSource}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for SQL injection string as ID", async () => {
    const res = await request(app).get("/api/v1/powers/1'; DROP TABLE powers;--");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });
});
