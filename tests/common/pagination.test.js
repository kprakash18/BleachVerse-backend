import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract, expectErrorContract } from "../helpers/test-helpers.js";

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
        const totalKey = endpoint === "/api/v1/characters" ? "total" : "totalItems";
        expectPaginationContract(res, 1, 10, totalKey);
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
        const res = await request(app).get(`${endpoint}?page=99999`);
        expect(res.status).toBe(200);
        expect(res.body.data).toEqual([]);
        expect(res.body.pagination.page).toBe(99999);
      });
    });
  }
});
