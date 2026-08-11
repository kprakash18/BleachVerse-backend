import { describe, it, expect, vi } from "vitest";
import { request, app } from "../../helpers/test-helpers.js";
import * as characterRepository from "../../../src/modules/character/character.repository.js";

describe("HTTP Security Headers (Helmet)", () => {
  it("should contain standard security headers on a successful 200 API response", async () => {
    const res = await request(app).get("/api/v1/characters?limit=1");
    expect(res.status).toBe(200);
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-frame-options"]).toBe("DENY");
    expect(res.headers["referrer-policy"]).toBe("no-referrer");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });

  it("should contain security headers on a 404 response", async () => {
    const res = await request(app).get("/api/v1/security-test-nonexistent-route");
    expect(res.status).toBe(404);
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-frame-options"]).toBe("DENY");
    expect(res.headers["referrer-policy"]).toBe("no-referrer");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });

  it("should contain security headers on a 400 validation error response", async () => {
    const res = await request(app).get("/api/v1/characters?limit=-5");
    expect(res.status).toBe(400);
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-frame-options"]).toBe("DENY");
    expect(res.headers["referrer-policy"]).toBe("no-referrer");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });

  it("should contain security headers on a 500 unexpected database error response", async () => {
    const spy = vi.spyOn(characterRepository, "findMany").mockRejectedValueOnce(new Error("Database connection lost"));
    const res = await request(app).get("/api/v1/characters?limit=1");
    expect(res.status).toBe(500);
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-frame-options"]).toBe("DENY");
    expect(res.headers["referrer-policy"]).toBe("no-referrer");
    expect(res.headers["x-powered-by"]).toBeUndefined();
    spy.mockRestore();
  });

  it("should successfully serve /api-docs and contain Swagger HTML and security headers", async () => {
    const res = await request(app).get("/api-docs/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("swagger-ui");
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });

  it("should verify CSP (Content-Security-Policy) directives are properly configured for Swagger UI", async () => {
    const res = await request(app).get("/api-docs/");
    expect(res.headers["content-security-policy"]).toBeDefined();
    const csp = res.headers["content-security-policy"];
    expect(csp).toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).toContain("style-src 'self' 'unsafe-inline'");
    expect(csp).toContain("img-src 'self' data: https:");
  });

  it("should verify Strict-Transport-Security (HSTS) behavior based on environmental configuration", async () => {
    const res = await request(app).get("/api/v1/characters?limit=1");
    if (process.env.NODE_ENV === "production") {
      expect(res.headers["strict-transport-security"]).toBeDefined();
      expect(res.headers["strict-transport-security"]).toContain("max-age=31536000");
      expect(res.headers["strict-transport-security"]).toContain("includeSubDomains");
    } else {
      expect(res.headers["strict-transport-security"]).toBeUndefined();
    }
  });
});
