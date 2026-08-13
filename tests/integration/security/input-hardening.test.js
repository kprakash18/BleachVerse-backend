import { describe, it, expect } from "vitest";
import request from "supertest";
import { app, expectErrorContract } from "../../helpers/test-helpers.js";

describe("Input & Query Hardening (Phase 3.6)", () => {

  describe("1. Slug Validation", () => {
    it("should accept valid slugs with hyphens", async () => {
      const res = await request(app).get("/api/v1/arcs/substitute-shinigami-arc");
      expect(res.status).not.toBe(400);
    });

    it("should accept valid slugs with spaces", async () => {
      const res = await request(app).get("/api/v1/arcs/Substitute Shinigami Arc");
      expect(res.status).not.toBe(400);
    });

    it("should reject slugs with special characters/SQL-like syntax", async () => {
      const res = await request(app).get("/api/v1/arcs/ichigo' OR '1'='1");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should reject slugs with HTML-like script tags", async () => {
      const res = await request(app).get("/api/v1/arcs/ichigo%3Cscript%3Ealert(1)%3C%2Fscript%3E");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should reject slugs exceeding maximum length boundaries (100 chars)", async () => {
      const longSlug = "a".repeat(101);
      const res = await request(app).get(`/api/v1/arcs/${longSlug}`);
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should reject non-ASCII Unicode characters in slugs", async () => {
      const res = await request(app).get("/api/v1/arcs/死神代行篇");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });
  });

  describe("2. Name Validation", () => {
    it("should accept valid human-readable names with spaces and letters", async () => {
      const res = await request(app).get("/api/v1/races/Soul Reaper");
      expect(res.status).not.toBe(400);
    });

    it("should accept valid Unicode names (Japanese/Chinese/Accents)", async () => {
      const res1 = await request(app).get("/api/v1/races/黒崎一護");
      expect(res1.status).not.toBe(400);

      const res2 = await request(app).get("/api/v1/races/José");
      expect(res2.status).not.toBe(400);
    });

    it("should reject names containing dangerous filesystem or shell metacharacters", async () => {
      const res1 = await request(app).get("/api/v1/races/%2e%2e%2fetc%2fpasswd");
      expectErrorContract(res1, 400, "VALIDATION_ERROR");

      const res2 = await request(app).get("/api/v1/races/Soul%3BDROP%20TABLE");
      expectErrorContract(res2, 400, "VALIDATION_ERROR");

      const res3 = await request(app).get("/api/v1/races/Soul%3Cscript%3E");
      expectErrorContract(res3, 400, "VALIDATION_ERROR");
    });

    it("should reject names that are empty or contain only whitespace", async () => {
      const res = await request(app).get("/api/v1/races/%20");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });
  });

  describe("3. UUID Validation", () => {
    it("should accept valid UUIDs", async () => {
      const res = await request(app).get("/api/v1/quotes/78332559-e15c-44c3-b655-a322299bd72b");
      expect(res.status).not.toBe(400);
    });

    it("should reject malformed or invalid UUIDs", async () => {
      const res = await request(app).get("/api/v1/quotes/invalid-uuid-format");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should reject empty or whitespace UUID parameters", async () => {
      const res = await request(app).get("/api/v1/quotes/%20");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should reject excessively long UUID parameters", async () => {
      const longUuid = "a".repeat(200);
      const res = await request(app).get(`/api/v1/quotes/${longUuid}`);
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });
  });

  describe("4. Numeric Boundary Validation", () => {
    it("should reject negative numbers", async () => {
      const res1 = await request(app).get("/api/v1/episodes/number/-5");
      expectErrorContract(res1, 400, "VALIDATION_ERROR");

      const res2 = await request(app).get("/api/v1/characters?page=-1");
      expectErrorContract(res2, 400, "VALIDATION_ERROR");
    });

    it("should reject zero", async () => {
      const res1 = await request(app).get("/api/v1/episodes/number/0");
      expectErrorContract(res1, 400, "VALIDATION_ERROR");

      const res2 = await request(app).get("/api/v1/characters?page=0");
      expectErrorContract(res2, 400, "VALIDATION_ERROR");
    });

    it("should reject decimal/floating-point values", async () => {
      const res1 = await request(app).get("/api/v1/episodes/number/1.5");
      expectErrorContract(res1, 400, "VALIDATION_ERROR");

      const res2 = await request(app).get("/api/v1/characters?page=1.5");
      expectErrorContract(res2, 400, "VALIDATION_ERROR");
    });

    it("should reject NaN parameter values", async () => {
      const res1 = await request(app).get("/api/v1/episodes/number/NaN");
      expectErrorContract(res1, 400, "VALIDATION_ERROR");

      const res2 = await request(app).get("/api/v1/characters?page=NaN");
      expectErrorContract(res2, 400, "VALIDATION_ERROR");
    });

    it("should reject Infinity and -Infinity parameter values", async () => {
      const res1 = await request(app).get("/api/v1/episodes/number/Infinity");
      expectErrorContract(res1, 400, "VALIDATION_ERROR");

      const res2 = await request(app).get("/api/v1/characters?page=-Infinity");
      expectErrorContract(res2, 400, "VALIDATION_ERROR");
    });

    it("should reject huge integers that trigger overflow/represent Infinity", async () => {
      const res1 = await request(app).get("/api/v1/episodes/number/99999999999999999999999999");
      expectErrorContract(res1, 400, "VALIDATION_ERROR");

      const res2 = await request(app).get("/api/v1/characters?page=1e309");
      expectErrorContract(res2, 400, "VALIDATION_ERROR");
    });
  });

  describe("5. Query Type Confusion", () => {
    it("should reject array parameter types where object/string is expected", async () => {
      const res = await request(app).get("/api/v1/characters?page[]=1");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should reject object parameter types where string/number is expected", async () => {
      const res = await request(app).get("/api/v1/characters?page[foo]=1");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should reject empty query values", async () => {
      const res = await request(app).get("/api/v1/characters?page=");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should reject null or undefined string values", async () => {
      const res1 = await request(app).get("/api/v1/characters?page=null");
      expectErrorContract(res1, 400, "VALIDATION_ERROR");

      const res2 = await request(app).get("/api/v1/characters?page=undefined");
      expectErrorContract(res2, 400, "VALIDATION_ERROR");
    });
  });

  describe("6. Unknown Query Parameters", () => {
    it("should reject unknown query parameters with 400", async () => {
      const res = await request(app).get("/api/v1/characters?limit=10&hacker=true");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });
  });

  describe("7. Repeated Query Parameters", () => {
    it("should reject repeated parameters that Zod receives as arrays", async () => {
      const res = await request(app).get("/api/v1/characters?page=1&page=2");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });
  });

  describe("8. Search Validation", () => {
    it("should accept valid search query within 500 characters", async () => {
      const searchStr = "a".repeat(500);
      const res = await request(app).get(`/api/v1/characters?search=${searchStr}`);
      expect(res.status).not.toBe(400);
    });

    it("should reject search query exceeding 500 characters limit", async () => {
      const searchStr = "a".repeat(501);
      const res = await request(app).get(`/api/v1/characters?search=${searchStr}`);
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });
  });

  describe("9. Sorting Validation", () => {
    it("should accept valid sortBy fields", async () => {
      const res = await request(app).get("/api/v1/characters?sortBy=name");
      expect(res.status).not.toBe(400);
    });

    it("should reject invalid/unknown sortBy fields", async () => {
      const res = await request(app).get("/api/v1/characters?sortBy=invalid_field");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should reject SQL-like characters in sortBy", async () => {
      const res = await request(app).get("/api/v1/characters?sortBy=name;DROP");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should reject invalid sortOrder values", async () => {
      const res = await request(app).get("/api/v1/characters?sortOrder=invalid_order");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });
  });

  describe("10. Encoded & Special-Character Attacks", () => {
    it("should reject pre-decoded path traversal payloads", async () => {
      const res = await request(app).get("/api/v1/arcs/../Substitute Shinigami Arc");
      expect(res.status).toBe(404);
    });

    it("should reject URL-encoded path traversal payloads at validation", async () => {
      const res = await request(app).get("/api/v1/appearances?characterSlug=%2e%2e%2fetc%2fpasswd");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should reject URL-encoded script injection tags", async () => {
      const res = await request(app).get("/api/v1/appearances?characterSlug=%3Cscript%3Ealert(1)%3C%2Fscript%3E");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });
  });

});
