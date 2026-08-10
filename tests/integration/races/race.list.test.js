import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract } from "../../helpers/test-helpers.js";
import { RACE } from "../../../src/modules/race/race.constant.js";

describe("Races Module — GET /api/v1/races (Collection)", () => {
  it("should return paginated list of races with defaults", async () => {
    const res = await request(app).get("/api/v1/races");
    expectPaginationContract(res, 1, 10, "totalItems");
  });

  it("should return collection fields (name, category, description) and omit id/slug", async () => {
    const res = await request(app).get("/api/v1/races?limit=1");
    expect(res.status).toBe(200);
    if (res.body.data.length > 0) {
      const race = res.body.data[0];
      expect(race).toHaveProperty("name");
      expect(race).toHaveProperty("category");
      expect(race).toHaveProperty("description");
      expect(race).not.toHaveProperty("id");
      expect(race).not.toHaveProperty("slug");
    }
  });

  it("should filter by valid category enum from RACE.CATEGORIES", async () => {
    const targetCategory = RACE.CATEGORIES[0];
    const res = await request(app).get(`/api/v1/races?category=${targetCategory.toLowerCase()}`);
    expect(res.status).toBe(200);
    for (const race of res.body.data) {
      expect(race.category).toBe(targetCategory);
    }
  });
});
