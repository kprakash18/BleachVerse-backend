import { describe, it, expect } from "vitest";
import { request, app } from "../../helpers/test-helpers.js";

describe("CORS Security Hardening", () => {
  const allowedDevOrigin = "http://localhost:5173";
  const unauthorizedOrigin = "http://localhost:9000"; // any thing other than 3000 is invalid in dev mode

  it("should permit requests from an allowed development origin", async () => {
    const res = await request(app)
      .get("/api/v1/characters?limit=1")
      .set("Origin", allowedDevOrigin);

    expect(res.status).toBe(200);
    expect(res.headers["access-control-allow-origin"]).toBe(allowedDevOrigin);
  });

  it("should reject requests from an unauthorized origin by omitting access-control headers", async () => {
    const res = await request(app)
      .get("/api/v1/characters?limit=1")
      .set("Origin", unauthorizedOrigin);

    expect(res.status).toBe(200); // Standard HTTP response status remains 200
    expect(res.headers["access-control-allow-origin"]).toBeUndefined(); // CORS rejected at browser layer
  });

  it("should allow requests with no Origin header (CLI / same-origin clients)", async () => {
    const res = await request(app).get("/api/v1/characters?limit=1");
    expect(res.status).toBe(200);
    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });

  it("should handle OPTIONS preflight requests successfully for an allowed origin", async () => {
    const res = await request(app)
      .options("/api/v1/characters")
      .set("Origin", allowedDevOrigin)
      .set("Access-Control-Request-Method", "GET")
      .set("Access-Control-Request-Headers", "Content-Type");

    expect(res.status).toBe(204); // preflight defaults to 204 or 200 depending on cors default settings (cors package uses 204 by default)
    expect(res.headers["access-control-allow-origin"]).toBe(allowedDevOrigin);
    expect(res.headers["access-control-allow-methods"]).toContain("GET");
    expect(res.headers["access-control-allow-methods"]).toContain("OPTIONS");
    expect(res.headers["access-control-allow-methods"]).not.toContain("POST");
    expect(res.headers["access-control-allow-headers"]).toContain("Content-Type");
  });

  it("should reject OPTIONS preflight requests from an unauthorized origin", async () => {
    const res = await request(app)
      .options("/api/v1/characters")
      .set("Origin", unauthorizedOrigin)
      .set("Access-Control-Request-Method", "GET");

    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });

  it("should verify that credentials transport is disabled", async () => {
    const res = await request(app)
      .get("/api/v1/characters?limit=1")
      .set("Origin", allowedDevOrigin);

    expect(res.headers["access-control-allow-credentials"]).toBeUndefined();
  });
});
