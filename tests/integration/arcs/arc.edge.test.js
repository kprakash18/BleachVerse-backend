import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { ARC_TYPES, ARC_SORT_FIELDS } from "../../../src/modules/arc/arc.constants.js";

describe("Arcs Module — Edge & Validation Cases", () => {
  it("should return 400 VALIDATION_ERROR for invalid type enum value not present in ARC_TYPES", async () => {
    const invalidType = "INVALID_TYPE_" + Date.now();
    expect(ARC_TYPES.includes(invalidType)).toBe(false);
    const res = await request(app).get(`/api/v1/arcs?type=${invalidType}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for unknown query parameter (strict schema)", async () => {
    const res = await request(app).get("/api/v1/arcs?unknownParam=xyz");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for invalid sortBy field not present in ARC_SORT_FIELDS", async () => {
    const invalidSortBy = "INVALID_SORTBY_" + Date.now();
    expect(ARC_SORT_FIELDS.includes(invalidSortBy)).toBe(false);
    const res = await request(app).get(`/api/v1/arcs?sortBy=${invalidSortBy}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for invalid sub-resource pagination", async () => {
    const res = await request(app).get("/api/v1/arcs/some-arc/episodes?page=0");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should safely handle SQL-injection string in search query", async () => {
    const res = await request(app).get("/api/v1/arcs?search=' OR '1'='1';--");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
