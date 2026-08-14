import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { app, expectErrorContract } from "../../helpers/test-helpers.js";
import prisma from "../../../src/database/prisma.js";

describe("Error Handling & Information Leakage Protection (Phase 3.7)", () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("1. Request Correlation ID", () => {
    it("should generate a unique X-Request-ID response header on successful response", async () => {
      const res = await request(app).get("/api/v1/characters?limit=1");
      expect(res.status).toBe(200);
      expect(res.headers["x-request-id"]).toBeDefined();
      expect(res.headers["x-request-id"]).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });

    it("should generate a unique X-Request-ID response header on error response", async () => {
      const res = await request(app).get("/api/v1/does-not-exist-at-all");
      expect(res.status).toBe(404);
      expect(res.headers["x-request-id"]).toBeDefined();
      expect(res.headers["x-request-id"]).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });

    it("should ignore client-supplied X-Request-ID headers", async () => {
      const clientSuppliedId = "attacker-controlled-value-12345";
      const res = await request(app)
        .get("/api/v1/characters?limit=1")
        .set("X-Request-ID", clientSuppliedId);

      expect(res.status).toBe(200);
      expect(res.headers["x-request-id"]).toBeDefined();
      expect(res.headers["x-request-id"]).not.toBe(clientSuppliedId);
      expect(res.headers["x-request-id"]).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });

    it("should log request ID, method, path, and error to console.error", async () => {
      const res = await request(app).get("/api/v1/does-not-exist-at-all-abc");
      expect(res.status).toBe(404);

      const loggedOutput = consoleErrorSpy.mock.calls.map(args => args.join(" ")).join("\n");
      const reqId = res.headers["x-request-id"];

      expect(loggedOutput).toContain(reqId);
      expect(loggedOutput).toContain("GET");
      expect(loggedOutput).toContain("/api/v1/does-not-exist-at-all-abc");
      expect(loggedOutput).toContain("Resource not found");
    });
  });

  describe("2. Error Classification & Mappings", () => {
    it("should map Prisma P2025 to 404 RESOURCE_NOT_FOUND", async () => {
      const { Prisma } = await import("@prisma/client");
      const p2025Error = new Prisma.PrismaClientKnownRequestError(
        "An operation failed because it depends on one or more records that were not found.",
        { code: "P2025", clientVersion: "5.0.0" }
      );
      vi.spyOn(prisma.character, "findMany").mockRejectedValue(p2025Error);

      const res = await request(app).get("/api/v1/characters?limit=1");
      expectErrorContract(res, 404, "RESOURCE_NOT_FOUND");
    });

    it("should map Prisma P2002 to 409 RESOURCE_ALREADY_EXISTS", async () => {
      const { Prisma } = await import("@prisma/client");
      const p2002Error = new Prisma.PrismaClientKnownRequestError(
        "Unique constraint failed",
        { code: "P2002", clientVersion: "5.0.0" }
      );
      vi.spyOn(prisma.character, "findMany").mockRejectedValue(p2002Error);

      const res = await request(app).get("/api/v1/characters?limit=1");
      expectErrorContract(res, 409, "RESOURCE_ALREADY_EXISTS");
    });

    it("should map malformed JSON SyntaxError to 400 VALIDATION_ERROR", async () => {
      const res = await request(app)
        .post("/api/v1/characters")
        .set("Content-Type", "application/json")
        .send("{ malformed json: true ");

      expectErrorContract(res, 400, "VALIDATION_ERROR");
      expect(res.body.error.message).toBe("Malformed JSON payload");
    });

    it("should preserve body-parser 413 Payload Too Large error response format", async () => {
      const largeBody = "a".repeat(10240 + 10); // > 10KB
      const res = await request(app)
        .post("/api/v1/characters")
        .set("Content-Type", "application/json")
        .send(JSON.stringify({ data: largeBody }));

      expectErrorContract(res, 413, "PAYLOAD_TOO_LARGE");
    });
  });

  describe("3. Information Leakage & Response Sanitization", () => {
    it("should return sanitized 500 response on database failure and not leak details", async () => {
      const dbError = new Error("Connection failed at postgresql://postgres:secretpassword123@localhost:5432/db");
      vi.spyOn(prisma.character, "findMany").mockRejectedValue(dbError);

      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      try {
        const res = await request(app).get("/api/v1/characters?limit=1");
        expectErrorContract(res, 500, "INTERNAL_SERVER_ERROR");
        expect(res.body.error.message).toBe("An unexpected error occurred.");

        const resStr = JSON.stringify(res.body);
        expect(resStr).not.toContain("postgres");
        expect(resStr).not.toContain("secretpassword123");
        expect(resStr).not.toContain("postgresql://");
      } finally {
        process.env.NODE_ENV = originalEnv;
      }
    });

    it("should sanitize secrets from logs even in development/test environment", async () => {
      const dbError = new Error("Connection failed at postgresql://postgres:secretpassword123@localhost:5432/db");
      vi.spyOn(prisma.character, "findMany").mockRejectedValue(dbError);

      const res = await request(app).get("/api/v1/characters?limit=1");
      expect(res.status).toBe(500);

      const loggedOutput = consoleErrorSpy.mock.calls.map(args => args.join(" ")).join("\n");
      expect(loggedOutput).not.toContain("secretpassword123");
      expect(loggedOutput).not.toContain("postgresql://postgres:secretpassword123@localhost:5432/db");
      expect(loggedOutput).toContain("postgresql://<redacted_credentials>@<host>");
    });

    it("should assert that response body contains no sensitive patterns", async () => {
      const dbError = new Error("SELECT * FROM Character WHERE id = 'xyz' failed. node_modules/prisma/index.js");
      vi.spyOn(prisma.character, "findMany").mockRejectedValue(dbError);

      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      try {
        const res = await request(app).get("/api/v1/characters?limit=1");
        expect(res.status).toBe(500);

        const resStr = JSON.stringify(res.body);
        const sensitivePatterns = [
          "SELECT", "INSERT", "UPDATE", "DELETE",
          "node_modules", "PrismaClient", "/Users/", "/home/",
          "password", "DATABASE_URL"
        ];
        sensitivePatterns.forEach(pattern => {
          expect(resStr).not.toContain(pattern);
        });
      } finally {
        process.env.NODE_ENV = originalEnv;
      }
    });
  });

  describe("4. Security Headers on Error Responses", () => {
    it("should contain standard security headers on 400 error response", async () => {
      const res = await request(app).get("/api/v1/characters?page=abc");
      expect(res.status).toBe(400);
      expect(res.headers["x-content-type-options"]).toBe("nosniff");
      expect(res.headers["x-frame-options"]).toBe("DENY");
      expect(res.headers["referrer-policy"]).toBe("no-referrer");
    });

    it("should contain standard security headers on 404 error response", async () => {
      const res = await request(app).get("/api/v1/does-not-exist");
      expect(res.status).toBe(404);
      expect(res.headers["x-content-type-options"]).toBe("nosniff");
      expect(res.headers["x-frame-options"]).toBe("DENY");
    });

    it("should verify HSTS presence conditionally based on production environment", async () => {
      const resDev = await request(app).get("/api/v1/does-not-exist");
      expect(resDev.headers["strict-transport-security"]).toBeUndefined();

      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      try {
        const resProd = await request(app).get("/api/v1/does-not-exist");
        expect(resProd.headers["strict-transport-security"]).toBeDefined();
      } finally {
        process.env.NODE_ENV = originalEnv;
      }
    });
  });
});
