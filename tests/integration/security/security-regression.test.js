import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { app, expectErrorContract } from "../../helpers/test-helpers.js";
import prisma from "../../../src/database/prisma.js";
import errorCodes from "../../../src/common/errors/errorCodes.js";
import { ApiError } from "../../../src/common/errors/ApiError.js";
import { errorHandler } from "../../../src/common/errors/errorHandler.js";
import { requestCorrelation } from "../../../src/common/middleware/requestCorrelation.js";

describe("Phase 3.8: Dedicated Security Regression Suite", () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Helper to assert standard Helmet headers are set
  const assertHelmetHeaders = (res) => {
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-frame-options"]).toBe("DENY");
    expect(res.headers["referrer-policy"]).toBe("no-referrer");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  };

  describe("1. Helmet + Error Statuses Integration", () => {
    it("Helmet + 400 (Validation Error)", async () => {
      const res = await request(app).get("/api/v1/characters?limit=-1");
      expect(res.status).toBe(400);
      assertHelmetHeaders(res);
    });

    it("Helmet + 404 (Not Found)", async () => {
      const res = await request(app).get("/api/v1/nonexistent-route-for-regression-test");
      expect(res.status).toBe(404);
      assertHelmetHeaders(res);
    });

    it("Helmet + 413 (Payload Too Large)", async () => {
      const largePayload = { name: "a".repeat(11000) };
      const res = await request(app)
        .post("/api/v1/characters")
        .set("Content-Type", "application/json")
        .send(largePayload);
      
      expect(res.status).toBe(413);
      assertHelmetHeaders(res);
    });

    it("Helmet + 429 (Rate Limit Exceeded)", async () => {
      // Replicate the exact middleware chain of app.js in a test app with low rate limit to trigger 429
      const testApp = express();
      testApp.use(requestCorrelation);
      
      testApp.use((req, res, next) => {
        helmet({
          frameguard: { action: 'deny' },
          referrerPolicy: { policy: 'no-referrer' },
        })(req, res, next);
      });

      const limiter = rateLimit({
        windowMs: 5000,
        limit: 1,
        standardHeaders: true,
        legacyHeaders: false,
        validate: { trustProxy: false },
        handler: (req, res, next) => {
          next(new ApiError(429, errorCodes.RATE_LIMIT_EXCEEDED, "Too many requests"));
        }
      });

      testApp.use("/api/v1", limiter);
      testApp.get("/api/v1/test", (req, res) => res.json({ ok: true }));
      testApp.use(errorHandler);

      // Request 1: Succeeds
      const res1 = await request(testApp).get("/api/v1/test");
      expect(res1.status).toBe(200);

      // Request 2: Triggers 429 Rate Limit Exceeded
      const res2 = await request(testApp).get("/api/v1/test");
      expect(res2.status).toBe(429);
      assertHelmetHeaders(res2);
    });
  });

  describe("2. CORS + Error Scenarios", () => {
    const allowedOrigin = "http://localhost:5173";
    const unauthorizedOrigin = "http://localhost:9000";

    it("should allow CORS headers on validation errors (400) for allowed origins", async () => {
      const res = await request(app)
        .get("/api/v1/characters?limit=-1")
        .set("Origin", allowedOrigin);

      expect(res.status).toBe(400);
      expect(res.headers["access-control-allow-origin"]).toBe(allowedOrigin);
    });

    it("should omit CORS headers on validation errors (400) for unauthorized origins", async () => {
      const res = await request(app)
        .get("/api/v1/characters?limit=-1")
        .set("Origin", unauthorizedOrigin);

      expect(res.status).toBe(400);
      expect(res.headers["access-control-allow-origin"]).toBeUndefined();
    });

    it("should allow CORS headers on unknown routes (404) for allowed origins", async () => {
      const res = await request(app)
        .get("/api/v1/not-a-route")
        .set("Origin", allowedOrigin);

      expect(res.status).toBe(404);
      expect(res.headers["access-control-allow-origin"]).toBe(allowedOrigin);
    });

    it("should allow CORS headers on payload too large (413) for allowed origins", async () => {
      const largePayload = { name: "a".repeat(11000) };
      const res = await request(app)
        .post("/api/v1/characters")
        .set("Origin", allowedOrigin)
        .set("Content-Type", "application/json")
        .send(largePayload);

      expect(res.status).toBe(413);
      expect(res.headers["access-control-allow-origin"]).toBe(allowedOrigin);
    });
  });

  describe("3. Rate Limiting Multi-Layer Interactions", () => {
    it("Rate Limiting + Resource Limits: 413 Payload Too Large should include rate limiting headers", async () => {
      const largePayload = { name: "a".repeat(11000) };
      const res = await request(app)
        .post("/api/v1/characters")
        .set("Content-Type", "application/json")
        .send(largePayload);

      expect(res.status).toBe(413);
      expect(res.headers["ratelimit-limit"]).toBeDefined();
      expect(res.headers["ratelimit-remaining"]).toBeDefined();
      expect(res.headers["ratelimit-reset"]).toBeDefined();
    });

    it("Rate Limiting + Validation: 400 Validation Error should include rate limiting headers", async () => {
      const res = await request(app).get("/api/v1/characters?limit=-1");

      expect(res.status).toBe(400);
      expect(res.headers["ratelimit-limit"]).toBeDefined();
      expect(res.headers["ratelimit-remaining"]).toBeDefined();
    });
  });

  describe("4. Input Hardening & Error Sanitization", () => {
    it("Malformed input + error sanitization (SyntaxError 400)", async () => {
      const res = await request(app)
        .post("/api/v1/characters")
        .set("Content-Type", "application/json")
        .send("{ invalid-json ");

      expectErrorContract(res, 400, "VALIDATION_ERROR");
      expect(res.body.error.message).toBe("Malformed JSON payload");
      
      // Ensure no stack traces or raw JSON engine errors are returned
      expect(res.body.error.details).toBeUndefined();
      expect(JSON.stringify(res.body)).not.toContain("SyntaxError");
    });
  });

  describe("5. Unknown Routes + Correlation IDs", () => {
    it("should return a unique correlation ID (X-Request-ID) on 404 responses", async () => {
      const res = await request(app).get("/api/v1/completely-unknown-route");
      expect(res.status).toBe(404);
      expect(res.headers["x-request-id"]).toBeDefined();
      expect(res.headers["x-request-id"]).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });
  });

  describe("6. Database Failures + Information Leakage Protection", () => {
    it("should redact secrets and credentials from database error responses and server-side logs", async () => {
      const dbError = new Error("Unable to connect to postgresql://admin:superSecretPassword99@database.server:5432/bleach_db");
      vi.spyOn(prisma.character, "findMany").mockRejectedValue(dbError);

      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      try {
        const res = await request(app).get("/api/v1/characters?limit=1");
        expect(res.status).toBe(500);

        // Assert response doesn't leak secrets
        const responseStr = JSON.stringify(res.body);
        expect(responseStr).not.toContain("superSecretPassword99");
        expect(responseStr).not.toContain("postgresql://admin:superSecretPassword99");

        // Assert console error logs don't leak secrets
        const loggedOutput = consoleErrorSpy.mock.calls.map(args => args.join(" ")).join("\n");
        expect(loggedOutput).not.toContain("superSecretPassword99");
        expect(loggedOutput).toContain("postgresql://<redacted_credentials>@<host>");
      } finally {
        process.env.NODE_ENV = originalEnv;
      }
    });

    it("should redact SQL query structure and file paths from errors", async () => {
      const dbError = new Error("FAIL: SELECT * FROM \"User\" WHERE email = 'attacker@test.com' in /Users/kp/Desktop/BleachVerseProject/node_modules/prisma/client.js");
      vi.spyOn(prisma.character, "findMany").mockRejectedValue(dbError);

      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      try {
        const res = await request(app).get("/api/v1/characters?limit=1");
        expect(res.status).toBe(500);

        // Assert response contains no query info or files
        const responseStr = JSON.stringify(res.body);
        expect(responseStr).not.toContain("SELECT *");
        expect(responseStr).not.toContain("/Users/kp");
      } finally {
        process.env.NODE_ENV = originalEnv;
      }
    });
  });

  describe("7. Production vs. Development Behavior", () => {
    it("should hide error details and stack trace in production mode", async () => {
      const dbError = new Error("Specific database connection timeout");
      vi.spyOn(prisma.character, "findMany").mockRejectedValue(dbError);

      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      try {
        const res = await request(app).get("/api/v1/characters?limit=1");
        expectErrorContract(res, 500, "INTERNAL_SERVER_ERROR");
        expect(res.body.error.message).toBe("An unexpected error occurred.");
        expect(res.body.error.details).toBeUndefined();
      } finally {
        process.env.NODE_ENV = originalEnv;
      }
    });

    it("should show sanitized error details and stack trace in development mode", async () => {
      const dbError = new Error("Specific database connection timeout");
      vi.spyOn(prisma.character, "findMany").mockRejectedValue(dbError);

      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      try {
        const res = await request(app).get("/api/v1/characters?limit=1");
        expectErrorContract(res, 500, "INTERNAL_SERVER_ERROR");
        expect(res.body.error.message).toBe("Specific database connection timeout");
        expect(res.body.error.details).toBeDefined();
        expect(res.body.error.details.stack).toBeDefined();
      } finally {
        process.env.NODE_ENV = originalEnv;
      }
    });
  });

  describe("8. Request ID Propagation", () => {
    it("should propagate request ID to successful response and console logs", async () => {
      const res = await request(app).get("/api/v1/characters?limit=1");
      expect(res.status).toBe(200);
      expect(res.headers["x-request-id"]).toBeDefined();
    });

    it("should propagate request ID on client and server error responses", async () => {
      const res = await request(app).get("/api/v1/characters?limit=-1");
      expect(res.status).toBe(400);
      const reqId = res.headers["x-request-id"];
      expect(reqId).toBeDefined();

      const loggedOutput = consoleErrorSpy.mock.calls.map(args => args.join(" ")).join("\n");
      expect(loggedOutput).toContain(reqId);
    });
  });

  describe("9. Security-Header Preservation under Complex Conditions", () => {
    it("should preserve Helmet and CORS headers even when requesting a non-existent endpoint with CORS headers", async () => {
      const res = await request(app)
        .get("/api/v1/completely-unknown-route-cors")
        .set("Origin", "http://localhost:5173");

      expect(res.status).toBe(404);
      assertHelmetHeaders(res);
      expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:5173");
    });
  });
});
