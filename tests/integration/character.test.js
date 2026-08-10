
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Character Module — Adversarial Integration Tests", () => {

  describe("GET /api/v1/characters — valid requests", () => {
    it("should return paginated list with default page=1 limit=10", async () => {
      const res = await request(app).get("/api/v1/characters");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("pagination");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.pagination).toMatchObject({
        page: 1,
        limit: 10,
        total: expect.any(Number),    
        totalPages: expect.any(Number),
      });
    });

    it("should return correct items for page=2 limit=5", async () => {
      const res = await request(app).get("/api/v1/characters?page=2&limit=5");

      expect(res.status).toBe(200);
      expect(res.body.pagination.page).toBe(2);
      expect(res.body.pagination.limit).toBe(5);
      expect(res.body.data.length).toBeLessThanOrEqual(5);
    });

    it("should accept limit=100 (maximum allowed)", async () => {
      const res = await request(app).get("/api/v1/characters?limit=100");

      expect(res.status).toBe(200);
      expect(res.body.pagination.limit).toBe(100);
    });

    it("should filter by status=ALIVE and verify every returned record", async () => {
      const res = await request(app).get("/api/v1/characters?status=ALIVE");

      expect(res.status).toBe(200);
      for (const char of res.body.data) {
        expect(char.status).toBe("ALIVE");
      }
    });

    it("should filter by sex=FEMALE and verify every returned record", async () => {
      const res = await request(app).get("/api/v1/characters?sex=FEMALE");

      expect(res.status).toBe(200);
      for (const char of res.body.data) {
        expect(char.sex).toBe("FEMALE");
      }
    });

    it("should perform case-insensitive name search", async () => {
      const res = await request(app).get("/api/v1/characters?search=ichigo");

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].name.toLowerCase()).toContain("ichigo");
    });

    it("should sort ascending by name (default)", async () => {
      const res = await request(app).get(
        "/api/v1/characters?sortBy=name&sortOrder=asc&limit=5",
      );

      expect(res.status).toBe(200);
      const names = res.body.data.map((c) => c.name);
      expect(names).toEqual([...names].sort());
    });

    it("should sort descending by name", async () => {
      const res = await request(app).get(
        "/api/v1/characters?sortBy=name&sortOrder=desc&limit=5",
      );

      expect(res.status).toBe(200);
      const names = res.body.data.map((c) => c.name);
      expect(names).toEqual([...names].sort().reverse());
    });
  });

  describe("GET /api/v1/characters — pagination boundary & abuse", () => {
    it("should return 400 for page=0", async () => {
      const res = await request(app).get("/api/v1/characters?page=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for negative page", async () => {
      const res = await request(app).get("/api/v1/characters?page=-1");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for decimal page (page=1.5)", async () => {
      const res = await request(app).get("/api/v1/characters?page=1.5");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for non-numeric page (page=abc)", async () => {
      const res = await request(app).get("/api/v1/characters?page=abc");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=0", async () => {
      const res = await request(app).get("/api/v1/characters?limit=0");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=-1", async () => {
      const res = await request(app).get("/api/v1/characters?limit=-1");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=101 (exceeds max)", async () => {
      const res = await request(app).get("/api/v1/characters?limit=101");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for limit=999999 (extreme value)", async () => {
      const res = await request(app).get("/api/v1/characters?limit=999999");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return empty data[] with full pagination when page is beyond totalPages", async () => {
      const res = await request(app).get("/api/v1/characters?page=99999");

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
      expect(res.body.pagination).toMatchObject({
        page: 99999,
        limit: 10,
        total: expect.any(Number),
        totalPages: expect.any(Number),
      });
    });
  });

  describe("GET /api/v1/characters — invalid enum & filter abuse", () => {
    it("should return 400 for invalid status enum (status=INVALID)", async () => {
      const res = await request(app).get("/api/v1/characters?status=INVALID");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for lowercase status (status=alive) — no auto-upcase", async () => {
      const res = await request(app).get("/api/v1/characters?status=alive");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for invalid sex enum (sex=ROBOT)", async () => {
      const res = await request(app).get("/api/v1/characters?sex=ROBOT");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for invalid sortBy field", async () => {
      const res = await request(app).get(
        "/api/v1/characters?sortBy=password",
      );
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 for invalid sortOrder value", async () => {
      const res = await request(app).get("/api/v1/characters?sortOrder=random");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("GET /api/v1/characters — search adversarial inputs", () => {
    it("should return 200 with empty results for search with no matches", async () => {
      const res = await request(app).get(
        "/api/v1/characters?search=zzznomatch12345",
      );
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
      expect(res.body.pagination.total).toBe(0);
    });

    it("should return 200 safely for SQL-like injection attempt in search", async () => {
      const res = await request(app).get(
        "/api/v1/characters?search=' OR '1'='1'; DROP TABLE characters;--",
      );
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should return 200 safely for HTML/script tag in search", async () => {
      const res = await request(app).get(
        "/api/v1/characters?search=<script>alert(1)</script>",
      );
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
    });

    it("should return 200 safely for special regex chars in search", async () => {
      const res = await request(app).get(
        "/api/v1/characters?search=.*%5B%5D%7B%7D",
      );
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
    });

    it("should return 200 safely for very long search string (500 chars)", async () => {
      const longStr = "a".repeat(500);
      const res = await request(app).get(
        `/api/v1/characters?search=${longStr}`,
      );
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
    });
  });


  describe("GET /api/v1/characters/:slug — valid requests", () => {
    it("should return 200 with full detail shape for ichigo-kurosaki", async () => {
      const res = await request(app).get(
        "/api/v1/characters/ichigo-kurosaki",
      );

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.name).toBe("Ichigo Kurosaki");
      expect(res.body.data).toHaveProperty("sex");
      expect(res.body.data).toHaveProperty("status");
      expect(Array.isArray(res.body.data.aliases)).toBe(true);
      expect(Array.isArray(res.body.data.races)).toBe(true);
      expect(Array.isArray(res.body.data.organizations)).toBe(true);
    });

    it("should normalize uppercase slug to lowercase and return correct character", async () => {
      const res = await request(app).get(
        "/api/v1/characters/ICHIGO-KUROSAKI",
      );
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("Ichigo Kurosaki");
    });

    it("should handle URL-encoded space in slug (%20 → hyphen normalization)", async () => {
      const res = await request(app).get(
        "/api/v1/characters/ichigo%20kurosaki",
      );
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("Ichigo Kurosaki");
    });

    it("should return aliases as an array of { alias } objects", async () => {
      const res = await request(app).get(
        "/api/v1/characters/ichigo-kurosaki",
      );
      expect(res.status).toBe(200);
      expect(res.body.data.aliases.length).toBeGreaterThan(0);
      expect(res.body.data.aliases[0]).toHaveProperty("alias");
      expect(typeof res.body.data.aliases[0].alias).toBe("string");
    });

    it("should return races as an array of { race: { name } } objects", async () => {
      const res = await request(app).get(
        "/api/v1/characters/ichigo-kurosaki",
      );
      expect(res.status).toBe(200);
      expect(res.body.data.races.length).toBeGreaterThan(0);
      expect(res.body.data.races[0]).toHaveProperty("race");
      expect(res.body.data.races[0].race).toHaveProperty("name");
    });

    it("should return organizations as an array with role and organization fields", async () => {
      const res = await request(app).get(
        "/api/v1/characters/ichigo-kurosaki",
      );
      expect(res.status).toBe(200);
      expect(res.body.data.organizations.length).toBeGreaterThan(0);
      const org = res.body.data.organizations[0];
      expect(org).toHaveProperty("role");
      expect(org).toHaveProperty("organization");
      expect(org.organization).toHaveProperty("name");
    });
  });

  describe("GET /api/v1/characters/:slug — not found & invalid slug", () => {
    it("should return 404 RESOURCE_NOT_FOUND for non-existent slug", async () => {
      const res = await request(app).get(
        "/api/v1/characters/zzz-does-not-exist-xyz",
      );
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe("RESOURCE_NOT_FOUND");
    });

    it("should return 400 VALIDATION_ERROR for slug with illegal special characters (!@#)", async () => {
      const res = await request(app).get("/api/v1/characters/!@#invalid");
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 VALIDATION_ERROR for SQL-injection-like slug", async () => {
      const res = await request(app).get(
        "/api/v1/characters/1'; DROP TABLE characters;--",
      );
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 400 VALIDATION_ERROR for script-tag slug", async () => {
      const res = await request(app).get(
        "/api/v1/characters/%3Cscript%3Ealert(1)%3C%2Fscript%3E",
      );
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("GET /api/v1/characters/:slug — error shape contract", () => {
    it("should return correct error envelope shape on 404", async () => {
      const res = await request(app).get(
        "/api/v1/characters/zzz-does-not-exist-xyz",
      );
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toHaveProperty("code");
      expect(res.body.error).toHaveProperty("message");
      expect(typeof res.body.error.code).toBe("string");
      expect(typeof res.body.error.message).toBe("string");
    });

    it("should return correct error envelope shape on 400", async () => {
      const res = await request(app).get("/api/v1/characters?page=0");
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toHaveProperty("code");
      expect(res.body.error).toHaveProperty("message");
    });
  });
});