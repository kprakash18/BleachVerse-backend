import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { CHARACTER } from "../../../src/modules/character/character.constant.js";

describe("Characters Module — Edge, Validation & Security Cases", () => {
  describe("Validation & Query Parameters", () => {
    it("should return 400 for invalid status enum not present in CHARACTER.STATUSES", async () => {
      const invalidStatus = "INVALID_STATUS_" + Date.now();
      expect(CHARACTER.STATUSES.includes(invalidStatus)).toBe(false);
      const res = await request(app).get(`/api/v1/characters?status=${invalidStatus}`);
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should return 400 for lowercase status enum (status=alive) — strict raw z.enum", async () => {
      const res = await request(app).get("/api/v1/characters?status=alive");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should return 400 for invalid sex enum not present in CHARACTER.SEXES", async () => {
      const invalidSex = "INVALID_SEX_" + Date.now();
      expect(CHARACTER.SEXES.includes(invalidSex)).toBe(false);
      const res = await request(app).get(`/api/v1/characters?sex=${invalidSex}`);
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should return 400 for invalid sortBy field not present in CHARACTER.SORT_FIELDS", async () => {
      const invalidSortBy = "INVALID_SORTBY_" + Date.now();
      expect(CHARACTER.SORT_FIELDS.includes(invalidSortBy)).toBe(false);
      const res = await request(app).get(`/api/v1/characters?sortBy=${invalidSortBy}`);
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should return 400 for invalid sortOrder value not present in CHARACTER.SORT_ORDERS", async () => {
      const invalidSortOrder = "INVALID_ORDER_" + Date.now();
      expect(CHARACTER.SORT_ORDERS.includes(invalidSortOrder)).toBe(false);
      const res = await request(app).get(`/api/v1/characters?sortOrder=${invalidSortOrder}`);
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should return 400 for illegal special characters in slug (!@#)", async () => {
      const res = await request(app).get("/api/v1/characters/!@#invalid");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should return 400 for URL-encoded script tag in slug", async () => {
      const res = await request(app).get("/api/v1/characters/%3Cscript%3Ealert(1)%3C%2Fscript%3E");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should return 400 for empty status query parameter (?status=)", async () => {
      const res = await request(app).get("/api/v1/characters?status=");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });
  });

  describe("Security & Adversarial Inputs", () => {
    it("should safely handle SQL-injection attempt in search query", async () => {
      const res = await request(app).get("/api/v1/characters?search=' OR '1'='1'; DROP TABLE characters;--");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should safely handle HTML/script tag in search query", async () => {
      const res = await request(app).get("/api/v1/characters?search=<script>alert(1)</script>");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should safely handle Japanese / Unicode characters in search (黒崎一護)", async () => {
      const res = await request(app).get("/api/v1/characters?search=黒崎一護");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should handle leading/trailing whitespace in search query", async () => {
      const res = await request(app).get("/api/v1/characters?search=%20%20ichigo%20%20");
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("should safely handle extremely long search string (500 chars)", async () => {
      const longStr = "a".repeat(500);
      const res = await request(app).get(`/api/v1/characters?search=${longStr}`);
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });
});
