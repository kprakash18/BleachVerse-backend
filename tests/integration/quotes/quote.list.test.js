import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract } from "../../helpers/test-helpers.js";
import { QUOTE } from "../../../src/modules/quote/quote.constant.js";

describe("Quotes Module — GET /api/v1/quotes (Collection)", () => {
  it("should return paginated list of quotes with defaults", async () => {
    const res = await request(app).get("/api/v1/quotes");
    expectPaginationContract(res, 1, 10, "totalItems");
  });

  it("should return collection fields: id, text, category, isCanonical, character, episode, arc", async () => {
    const res = await request(app).get("/api/v1/quotes?limit=1");
    expect(res.status).toBe(200);
    if (res.body.data.length > 0) {
      const q = res.body.data[0];
      expect(q).toHaveProperty("id");
      expect(q).toHaveProperty("text");
      expect(q).toHaveProperty("category");
      expect(q).toHaveProperty("isCanonical");
      expect(q).toHaveProperty("character");
      expect(q).toHaveProperty("episode");
      expect(q).toHaveProperty("arc");
    }
  });

  it("should filter by characterSlug dynamically fetched from populated quote character", async () => {
    const list = await request(app).get("/api/v1/quotes?limit=10");
    const quoteWithChar = list.body.data.find((q) => q.character && q.character.slug);
    if (quoteWithChar) {
      const charSlug = quoteWithChar.character.slug;
      const res = await request(app).get(`/api/v1/quotes?characterSlug=${charSlug}`);
      expect(res.status).toBe(200);
      for (const q of res.body.data) {
        expect(q.character.slug).toBe(charSlug);
      }
    }
  });

  it("should filter by valid category enum from QUOTE.CATEGORIES", async () => {
    const targetCategory = QUOTE.CATEGORIES[0];
    const res = await request(app).get(`/api/v1/quotes?category=${targetCategory.toLowerCase()}`);
    expect(res.status).toBe(200);
    for (const q of res.body.data) {
      expect(q.category).toBe(targetCategory);
    }
  });

  it("should return paginated quotes via /quotes/character/:characterSlug route dynamically", async () => {
    const list = await request(app).get("/api/v1/quotes?limit=10");
    const quoteWithChar = list.body.data.find((q) => q.character && q.character.slug);
    if (quoteWithChar) {
      const charSlug = quoteWithChar.character.slug;
      const res = await request(app).get(`/api/v1/quotes/character/${charSlug}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body).toHaveProperty("pagination");
    }
  });
});
