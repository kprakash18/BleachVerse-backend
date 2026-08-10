import { describe, it, expect } from "vitest";
import { request, app, expectErrorContract } from "../../helpers/test-helpers.js";
import { EPISODE } from "../../../src/modules/episode/episode.constant.js";

describe("Episodes Module — Edge, Validation & Security Cases", () => {
  describe("Validation & Route Parameters", () => {
    it("should return 400 for negative episode number parameter (-1)", async () => {
      const res = await request(app).get("/api/v1/episodes/number/-1");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should return 400 for zero episode number parameter (0)", async () => {
      const res = await request(app).get("/api/v1/episodes/number/0");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should return 400 for non-numeric episode number parameter (abc)", async () => {
      const res = await request(app).get("/api/v1/episodes/number/abc");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should return 400 for decimal episode number parameter (1.5)", async () => {
      const res = await request(app).get("/api/v1/episodes/number/1.5");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should return 400 for invalid type enum value not present in EPISODE.TYPES", async () => {
      const invalidType = "INVALID_TYPE_" + Date.now();
      expect(EPISODE.TYPES.includes(invalidType)).toBe(false);
      const res = await request(app).get(`/api/v1/episodes?type=${invalidType}`);
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should return 400 for invalid slug regex characters", async () => {
      const res = await request(app).get("/api/v1/episodes/!@#$%^&*()");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });
  });

  describe("Security & Adversarial Inputs", () => {
    it("should return 400 for URL-encoded script tag in slug", async () => {
      const res = await request(app).get("/api/v1/episodes/%3Cscript%3Ealert(1)%3C%2Fscript%3E");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should safely handle SQL-injection string in arcSlug query without crashing", async () => {
      const res = await request(app).get("/api/v1/episodes?arcSlug=' OR '1'='1'; DROP TABLE episodes;--");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should safely handle Japanese / Unicode string in arcSlug query", async () => {
      const res = await request(app).get("/api/v1/episodes?arcSlug=死神代行篇");
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });

    it("should return 400 VALIDATION_ERROR for empty enum filter query parameter (?type=)", async () => {
      const res = await request(app).get("/api/v1/episodes?type=");
      expectErrorContract(res, 400, "VALIDATION_ERROR");
    });

    it("should handle repeated query parameters (?type=CANON&type=FILLER)", async () => {
      const res = await request(app).get("/api/v1/episodes?type=CANON&type=FILLER");
      expect([200, 400]).toContain(res.status);
    });
  });
});
