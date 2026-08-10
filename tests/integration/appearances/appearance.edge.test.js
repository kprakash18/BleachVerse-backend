import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Appearances Module — Edge & Validation Cases", () => {
  it("should return 400 VALIDATION_ERROR for non-UUID string parameter", async () => {
    const res = await request(app).get("/api/v1/appearances/invalid-uuid-string");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR for SQL injection string as ID", async () => {
    const res = await request(app).get("/api/v1/appearances/1'; DROP TABLE appearances;--");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });
});
