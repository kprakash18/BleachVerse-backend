import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { FIGHT } from "../../../src/modules/fight/fight.constant.js";

describe("Fights Module — Edge, Validation & Security Cases", () => {
  it("should return 400 VALIDATION_ERROR for invalid type enum value not present in FIGHT.TYPES", async () => {
    const invalidType = "INVALID_TYPE_" + Date.now();
    expect(FIGHT.TYPES.includes(invalidType)).toBe(false);
    const res = await request(app).get(`/api/v1/fights?type=${invalidType}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for invalid sortBy field not present in FIGHT.SORT_FIELDS", async () => {
    const invalidSortBy = "INVALID_SORTBY_" + Date.now();
    expect(FIGHT.SORT_FIELDS.includes(invalidSortBy)).toBe(false);
    const res = await request(app).get(`/api/v1/fights?sortBy=${invalidSortBy}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for slug with special characters (!@#)", async () => {
    const res = await request(app).get("/api/v1/fights/!@#$%");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for URL-encoded script tag in slug", async () => {
    const res = await request(app).get("/api/v1/fights/%3Cscript%3Ealert(1)%3C%2Fscript%3E");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should safely handle SQL-injection string in search query", async () => {
    const res = await request(app).get("/api/v1/fights?search=' OR '1'='1'; DROP TABLE fights;--");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
