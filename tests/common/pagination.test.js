import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract, expectErrorContract } from "../helpers/test-helpers.js";
import { calculatePaginationParams, buildPaginatedResponse } from "../../src/common/utils/pagination.js";
import { normalizeSlug } from "../../src/common/utils/slug.js";
import { basePaginationSchema, baseSearchSchema, createSortSchema } from "../../src/common/utils/commonValidation.js";

describe("Pagination Utility Helpers (Unit Tests)", () => {
  it("should calculate page=1, limit=10, skip=0 by default", () => {
    const result = calculatePaginationParams({ page: 1, limit: 10 });
    expect(result).toEqual({ page: 1, limit: 10, skip: 0 });
  });

  it("should calculate correct skip for page=2, limit=10", () => {
    const result = calculatePaginationParams({ page: 2, limit: 10 });
    expect(result).toEqual({ page: 2, limit: 10, skip: 10 });
  });

  it("should format standardized pagination response envelope", () => {
    const data = [{ id: 1 }];
    const result = buildPaginatedResponse({ data, totalItems: 169, page: 1, limit: 10 });
    expect(result).toEqual({
      data,
      pagination: {
        page: 1,
        limit: 10,
        totalItems: 169,
        totalPages: 17,
      },
    });
  });
});

describe("Slug Utility Helper (Unit Tests)", () => {
  it("should normalize Ichigo Kurosaki to ichigo-kurosaki", () => {
    expect(normalizeSlug("Ichigo Kurosaki")).toBe("ichigo-kurosaki");
  });

  it("should handle leading and trailing whitespace", () => {
    expect(normalizeSlug("  Ichigo Kurosaki  ")).toBe("ichigo-kurosaki");
  });

  it("should handle multiple spaces between words", () => {
    expect(normalizeSlug("  SOUL   SOCIETY  ")).toBe("soul-society");
  });
});

describe("Common Zod Validation Schemas (Unit Tests)", () => {
  it("should coerce and validate default pagination query parameters", () => {
    const parsed = basePaginationSchema.parse({});
    expect(parsed).toEqual({ page: 1, limit: 10 });
  });

  it("should reject invalid limit over 100", () => {
    const result = basePaginationSchema.safeParse({ limit: 150 });
    expect(result.success).toBe(false);
  });

  it("should validate allowed sort fields and sortOrder", () => {
    const schema = createSortSchema(["name", "createdAt"], "name");
    const parsed = schema.parse({ sortBy: "name", sortOrder: "desc" });
    expect(parsed).toEqual({ sortBy: "name", sortOrder: "desc" });
  });
});

describe("Common Infrastructure — Pagination Contract & Boundaries", () => {
  const endpoints = [
    "/api/v1/characters",
    "/api/v1/episodes",
    "/api/v1/arcs",
    "/api/v1/fights",
    "/api/v1/organizations",
    "/api/v1/zanpakutos",
    "/api/v1/locations",
    "/api/v1/races",
    "/api/v1/quotes",
    "/api/v1/events",
    "/api/v1/powers",
    "/api/v1/transformations",
    "/api/v1/appearances",
  ];

  for (const endpoint of endpoints) {
    describe(`Endpoint: ${endpoint}`, () => {
      it("should return page=1, limit=10 by default", async () => {
        const res = await request(app).get(endpoint);
        expectPaginationContract(res, 1, 10, "totalItems");
      });

      it("should accept limit=1 (minimum page size)", async () => {
        const res = await request(app).get(`${endpoint}?limit=1`);
        expect(res.status).toBe(200);
        expect(res.body.pagination.limit).toBe(1);
        expect(res.body.data.length).toBeLessThanOrEqual(1);
      });

      it("should accept limit=100 (maximum page size)", async () => {
        const res = await request(app).get(`${endpoint}?limit=100`);
        expect(res.status).toBe(200);
        expect(res.body.pagination.limit).toBe(100);
      });

      it("should return 400 for page=0", async () => {
        const res = await request(app).get(`${endpoint}?page=0`);
        expectErrorContract(res, 400, "VALIDATION_ERROR");
      });

      it("should return 400 for negative page", async () => {
        const res = await request(app).get(`${endpoint}?page=-5`);
        expectErrorContract(res, 400, "VALIDATION_ERROR");
      });

      it("should return 400 for limit=0", async () => {
        const res = await request(app).get(`${endpoint}?limit=0`);
        expectErrorContract(res, 400, "VALIDATION_ERROR");
      });

      it("should return 400 for limit=-1", async () => {
        const res = await request(app).get(`${endpoint}?limit=-1`);
        expectErrorContract(res, 400, "VALIDATION_ERROR");
      });

      it("should return 400 for limit=101 (exceeds max)", async () => {
        const res = await request(app).get(`${endpoint}?limit=101`);
        expectErrorContract(res, 400, "VALIDATION_ERROR");
      });

      it("should return 400 for non-numeric page", async () => {
        const res = await request(app).get(`${endpoint}?page=abc`);
        expectErrorContract(res, 400, "VALIDATION_ERROR");
      });

      it("should return 400 for non-numeric limit", async () => {
        const res = await request(app).get(`${endpoint}?limit=xyz`);
        expectErrorContract(res, 400, "VALIDATION_ERROR");
      });

      it("should return empty data[] when page is beyond totalPages", async () => {
        const res = await request(app).get(`${endpoint}?page=99`);
        expect(res.status).toBe(200);
        expect(res.body.data).toEqual([]);
        expect(res.body.pagination.page).toBe(99);
      });
    });
  }
});
