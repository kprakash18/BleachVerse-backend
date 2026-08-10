import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { RACE } from "../../../src/modules/race/race.constant.js";

describe("Races Module — Edge & Validation Cases", () => {
  it("should return 400 VALIDATION_ERROR for invalid category enum value not present in RACE.CATEGORIES", async () => {
    const invalidCategory = "INVALID_CATEGORY_" + Date.now();
    expect(RACE.CATEGORIES.includes(invalidCategory)).toBe(false);
    const res = await request(app).get(`/api/v1/races?category=${invalidCategory}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should safely handle SQL-injection string in name parameter", async () => {
    const res = await request(app).get("/api/v1/races/' OR '1'='1'; DROP TABLE races;--");
    expect([200, 404]).toContain(res.status);
  });
});
