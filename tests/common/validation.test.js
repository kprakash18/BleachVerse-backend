import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../helpers/test-helpers.js";

describe("Common Infrastructure — Request Validation Middleware & Edge Cases", () => {
  it("should return 400 VALIDATION_ERROR envelope for invalid UUID parameter", async () => {
    const res = await request(app).get("/api/v1/quotes/not-a-valid-uuid");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR envelope for invalid enum query parameter", async () => {
    const res = await request(app).get("/api/v1/characters?status=INVALID_ENUM_VALUE");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR envelope for invalid slug format", async () => {
    const res = await request(app).get("/api/v1/characters/!@#$%^&*()");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should return 400 VALIDATION_ERROR envelope for non-integer episode number parameter", async () => {
    const res = await request(app).get("/api/v1/episodes/number/not-a-number");
    expectErrorContract(res, 400, "VALIDATION_ERROR");
  });

  it("should accept leading zeros in pagination parameters (?page=01&limit=05)", async () => {
    const res = await request(app).get("/api/v1/characters?page=01&limit=05");
    expect(res.status).toBe(200);
    expect(res.body.pagination.page).toBe(1);
    expect(res.body.pagination.limit).toBe(5);
  });

  it("should respond safely (non-5xx) when unsupported POST method is sent to read-only route", async () => {
    const res = await request(app).post("/api/v1/characters").send({ name: "Hacker" });
    expect(res.status).toBeLessThan(500);
  });

  it("should handle trailing slashes on endpoint URLs cleanly", async () => {
    const res = await request(app).get("/api/v1/characters/");
    expect([200, 301, 404]).toContain(res.status);
  });
});
