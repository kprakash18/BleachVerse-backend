import { describe, it, expect, beforeAll } from "vitest";
import express from "express";
import cors from "cors";
import request from "supertest";
import { app } from "../../helpers/test-helpers.js";
import rateLimit from "express-rate-limit";
import { ApiError } from "../../../src/common/errors/ApiError.js";
import errorCodes from "../../../src/common/errors/errorCodes.js";
import RATE_LIMIT_DEFAULTS from "../../../src/common/middleware/rateLimiter.constant.js";


// Helper function to simulate time delay in tests
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Rate Limiting & Abuse Protection (Phase 3.5)", () => {
  
  describe("Integration with Main Application", () => {
    it("should expose standard RateLimit headers on public API routes", async () => {
      const res = await request(app).get("/api/v1/characters?limit=1");
      expect(res.status).toBe(200);
      expect(res.headers["ratelimit-limit"]).toBeDefined();
      expect(res.headers["ratelimit-remaining"]).toBeDefined();
      expect(res.headers["ratelimit-reset"]).toBeDefined();
    });

    it("should NOT apply rate limiting to the Swagger documentation (/api-docs)", async () => {
      const res = await request(app).get("/api-docs/");
      expect(res.status).toBe(200);
      expect(res.headers["ratelimit-limit"]).toBeUndefined();
      expect(res.headers["ratelimit-remaining"]).toBeUndefined();
      expect(res.headers["ratelimit-reset"]).toBeUndefined();
    });

    it("should ensure security headers (Helmet) are preserved on rate-limited endpoints", async () => {
      const res = await request(app).get("/api/v1/characters?limit=1");
      expect(res.headers["x-frame-options"]).toBe("DENY");
      expect(res.headers["x-content-type-options"]).toBe("nosniff");
      expect(res.headers["referrer-policy"]).toBe("no-referrer");
    });
  });

  describe("Rate Limiter Behavior (Unit & Contract Verification)", () => {
    let testApp;
    
    beforeAll(() => {
      testApp = express();
      
      // Micro rate limiter: 2 requests per 100ms window
      const testLimiter = rateLimit({
        windowMs: 100,
        limit: 2,
        standardHeaders: true,
        legacyHeaders: false,
        validate : {trustProxy: false},
        handler: (req, res, next) => {
          next(new ApiError(429, errorCodes.RATE_LIMIT_EXCEEDED, "Too many requests"));
        }
      });

      testApp.use(cors({ origin: "http://example.com" }));
      testApp.use(testLimiter);
      testApp.get("/test", (req, res) => res.status(200).json({ ok: true }));
      
      // Centralized error handler mirroring the production setup
      testApp.use((err, req, res, next) => {
        if (err instanceof ApiError) {
          return res.status(err.statusCode).json({
            error: {
              code: err.code,
              message: err.message
            }
          });
        }
        res.status(500).json({ error: { code: "INTERNAL_ERROR", message: err.message } });
      });
    });

    it("should permit requests below the limit and decrement ratelimit-remaining", async () => {
      const res1 = await request(testApp).get("/test");
      expect(res1.status).toBe(200);
      expect(res1.headers["ratelimit-remaining"]).toBe("1");

      const res2 = await request(testApp).get("/test");
      expect(res2.status).toBe(200);
      expect(res2.headers["ratelimit-remaining"]).toBe("0");
    });

    it("should block requests exceeding the limit with 429 and standard error envelope", async () => {
      // Consume standard allowance
      await request(testApp).get("/test");
      await request(testApp).get("/test");

      // Trigger abuse threshold
      const res = await request(testApp).get("/test");
      expect(res.status).toBe(429);
      expect(res.headers["retry-after"]).toBeDefined();
      expect(res.body).toEqual({
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many requests"
        }
      });
    });

    it("should reset the rate limit counter after the window expires", async () => {
      await request(testApp).get("/test");
      await request(testApp).get("/test");
      
      // Wait for window (100ms) to expire plus a small scheduling buffer
      await sleep(150);

      const res = await request(testApp).get("/test");
      expect(res.status).toBe(200);
      expect(res.headers["ratelimit-remaining"]).toBe("1");
    });

    it("should isolate rate limits between different clients", async () => {
      const ipTestApp = express();
      ipTestApp.set("trust proxy", true);
      
      const testLimiter = rateLimit({
        windowMs: 1000,
        limit: 1,
        standardHeaders: true,
        legacyHeaders: false,
        validate : {trustProxy : false} ,
        handler: (req, res, next) => {
          next(new ApiError(429, errorCodes.RATE_LIMIT_EXCEEDED, "Too many requests"));
        }
      });
      
      ipTestApp.use(testLimiter);
      ipTestApp.get("/test", (req, res) => res.status(200).json({ ok: true }));
      ipTestApp.use((err, req, res, next) => {
        res.status(err.statusCode || 500).json({ error: { code: err.code } });
      });

      // Request from client IP 1
      const res1 = await request(ipTestApp)
        .get("/test")
        .set("X-Forwarded-For", "1.1.1.1");
      expect(res1.status).toBe(200);

      // Repeating from client IP 1 should block
      const res1Block = await request(ipTestApp)
        .get("/test")
        .set("X-Forwarded-For", "1.1.1.1");
      expect(res1Block.status).toBe(429);

      // Client IP 2 should still be allowed (isolated context)
      const res2 = await request(ipTestApp)
        .get("/test")
        .set("X-Forwarded-For", "2.2.2.2");
      expect(res2.status).toBe(200);
    });

    it("should preserve CORS headers on 429 response", async () => {
      // Consume allowance
      await request(testApp).get("/test");
      await request(testApp).get("/test");

      // Verify header matches CORS config on block
      const res = await request(testApp)
        .get("/test")
        .set("Origin", "http://example.com");
      
      expect(res.status).toBe(429);
      expect(res.headers["access-control-allow-origin"]).toBe("http://example.com");
    });
  });

  describe("Distinction between Resource Limits and Rate Limits", () => {
    it("should distinguish between 413 Payload Too Large and 429 Rate Limit Exceeded", async () => {
      // Trigger size limits
      const largePayload = { data: "a".repeat(11000) };
      const res413 = await request(app)
        .post("/api/v1/characters")
        .set("Content-Type", "application/json")
        .send(largePayload);
      
      expect(res413.status).toBe(413);
      expect(res413.body.error.code).toBe("PAYLOAD_TOO_LARGE");

      // Normal request works (headers present, not triggered by 413)
      const res200 = await request(app).get("/api/v1/characters?limit=1");
      expect(res200.status).toBe(200);
      expect(res200.headers["ratelimit-limit"]).toBeDefined();
    });
  });
    describe("Environment Configuration & Constant Defaults", () => {
    it("should have high limits for development environment to allow local dev and testing", () => {
      expect(RATE_LIMIT_DEFAULTS.development.max).toBe(999999);
      expect(RATE_LIMIT_DEFAULTS.development.expensiveMax).toBe(999999);
    });

    it("should have strict limits for production environment to enforce abuse protection", () => {
      expect(RATE_LIMIT_DEFAULTS.production.max).toBe(100);
      expect(RATE_LIMIT_DEFAULTS.production.expensiveMax).toBe(30);
    });

    it("should verify that the active defaults fall back to development config during test runs", () => {
      // In the test runner, currentEnv is 'test'
      const currentEnv = (process.env.NODE_ENV || "development").toLowerCase();
      expect(currentEnv).toBe("test");
      
      // Look up defaults just like rateLimmiter.js does
      const activeDefaults = RATE_LIMIT_DEFAULTS[currentEnv] || RATE_LIMIT_DEFAULTS.development;
      
      // It should fall back to development defaults (high limits)
      expect(activeDefaults.max).toBe(999999);
      expect(activeDefaults.expensiveMax).toBe(999999);
    });
  });

});
