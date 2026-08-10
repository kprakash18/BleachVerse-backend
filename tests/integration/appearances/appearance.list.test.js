import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract } from "../../helpers/test-helpers.js";

describe("Appearances Module — GET /api/v1/appearances (Collection)", () => {
  it("should return paginated list of appearances with defaults", async () => {
    const res = await request(app).get("/api/v1/appearances");
    expectPaginationContract(res, 1, 10, "totalItems");
  });

  it("should return collection fields: id, isFirstAppearance, character, episode", async () => {
    const res = await request(app).get("/api/v1/appearances?limit=1");
    expect(res.status).toBe(200);
    if (res.body.data.length > 0) {
      const ap = res.body.data[0];
      expect(ap).toHaveProperty("id");
      expect(ap).toHaveProperty("isFirstAppearance");
      expect(ap).toHaveProperty("character");
      expect(ap.character).toHaveProperty("name");
      expect(ap.character).toHaveProperty("slug");
      expect(ap).toHaveProperty("episode");
      expect(ap.episode).toHaveProperty("title");
      expect(ap.episode).toHaveProperty("slug");
      expect(ap.episode).toHaveProperty("episodeNumber");
    }
  });

  it("should filter by characterSlug dynamically fetched from populated record", async () => {
    const list = await request(app).get("/api/v1/appearances?limit=10");
    const itemWithChar = list.body.data.find((a) => a.character && a.character.slug);
    if (itemWithChar) {
      const charSlug = itemWithChar.character.slug;
      const res = await request(app).get(`/api/v1/appearances?characterSlug=${charSlug}`);
      expect(res.status).toBe(200);
      for (const ap of res.body.data) {
        expect(ap.character.slug).toBe(charSlug);
      }
    }
  });

  it("should filter by isFirstAppearance=true", async () => {
    const res = await request(app).get("/api/v1/appearances?isFirstAppearance=true");
    expect(res.status).toBe(200);
    for (const ap of res.body.data) {
      expect(ap.isFirstAppearance).toBe(true);
    }
  });
});
