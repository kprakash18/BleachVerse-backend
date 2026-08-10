import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { QUOTE } from "../../../src/modules/quote/quote.constant.js";

describe("Quotes Module — Edge & Validation Cases", () => {
  it("should return 400 VALIDATION_ERROR for non-UUID string parameter", async () => {
    const res = await request(app).get("/api/v1/quotes/invalid-uuid-string");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for invalid category enum value not present in QUOTE.CATEGORIES", async () => {
    const invalidCategory = "INVALID_CATEGORY_" + Date.now();
    expect(QUOTE.CATEGORIES.includes(invalidCategory)).toBe(false);
    const res = await request(app).get(`/api/v1/quotes?category=${invalidCategory}`);
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for SQL injection string as ID", async () => {
    const res = await request(app).get("/api/v1/quotes/1'; DROP TABLE quotes;--");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });
});
