import { describe, it, expect } from "vitest";
import { request, app } from "../../helpers/test-helpers.js";

describe("Request & Resource Limits (Phase 3.4)", () => {
  describe("JSON Body Size Limit", () => {
    it("should accept requests with small JSON bodies", async () => {
      const res = await request(app)
        .post("/api/v1/characters") // Note: POST on GET-only route will return 404 or 400 but body parser should run first
        .set("Content-Type", "application/json")
        .send({ name: "Ichigo" });
      
      // Since route is GET-only, it should fall through to 404, not 413
      expect(res.status).toBe(404);
    });

    it("should reject JSON bodies exceeding the 10kb limit with 413 Payload Too Large", async () => {
      const largePayload = { data: "a".repeat(11000) }; // Exceeds 10kb (10,240 bytes)
      
      const res = await request(app)
        .post("/api/v1/characters")
        .set("Content-Type", "application/json")
        .send(largePayload);
      
      expect(res.status).toBe(413);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toHaveProperty("code", "PAYLOAD_TOO_LARGE");
    });
  });

  describe("Pagination Boundaries", () => {
    it("should allow limit between 1 and 100", async () => {
      const res1 = await request(app).get("/api/v1/characters?limit=1");
      expect(res1.status).toBe(200);

      const res2 = await request(app).get("/api/v1/characters?limit=100");
      expect(res2.status).toBe(200);
    });

    it("should reject limit exceeding 100", async () => {
      const res = await request(app).get("/api/v1/characters?limit=101");
      expect(res.status).toBe(400);
    });

    it("should reject limit of 0 or negative limits", async () => {
      const res1 = await request(app).get("/api/v1/characters?limit=0");
      expect(res1.status).toBe(400);

      const res2 = await request(app).get("/api/v1/characters?limit=-5");
      expect(res2.status).toBe(400);
    });

    it("should reject extremely large limits or invalid limits", async () => {
      const res1 = await request(app).get("/api/v1/characters?limit=999999999999");
      expect(res1.status).toBe(400);

      const res2 = await request(app).get("/api/v1/characters?limit=abc");
      expect(res2.status).toBe(400);
    });

    it("should allow page=1", async () => {
      const res = await request(app).get("/api/v1/characters?page=1");
      expect(res.status).toBe(200);
    });

    it("should reject page=0 or negative page", async () => {
      const res1 = await request(app).get("/api/v1/characters?page=0");
      expect(res1.status).toBe(400);

      const res2 = await request(app).get("/api/v1/characters?page=-1");
      expect(res2.status).toBe(400);
    });

    it("should reject page exceeding maximum limit boundary or invalid pages", async () => {
      const res1 = await request(app).get("/api/v1/characters?page=101");
      expect(res1.status).toBe(400);

      const res2 = await request(app).get("/api/v1/characters?page=abc");
      expect(res2.status).toBe(400);
    });
  });

  describe("Search Query String Limits", () => {
    it("should allow search query within 500 characters limit", async () => {
      const validSearch = "a".repeat(500);
      const res = await request(app).get(`/api/v1/characters?search=${validSearch}`);
      expect(res.status).toBe(200);
    });

    it("should reject search query exceeding 500 characters limit", async () => {
      const invalidSearch = "a".repeat(501);
      const res = await request(app).get(`/api/v1/characters?search=${invalidSearch}`);
      expect(res.status).toBe(400);
    });
  });

  describe("Arc Episodes ?all=true Protection", () => {
    it("should permit all=true but serve it successfully within limits", async () => {
      const list = await request(app).get("/api/v1/arcs?limit=1");
      if (list.body.data.length > 0) {
        const slug = list.body.data[0].slug;
        const res = await request(app).get(`/api/v1/arcs/${slug}/episodes?all=true`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
      }
    });
  });
});
