import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract } from "../../helpers/test-helpers.js";
import { FIGHT } from "../../../src/modules/fight/fight.constant.js";

describe("Fights Module — GET /api/v1/fights (Collection)", () => {
  it("should return paginated list of fights with defaults", async () => {
    const res = await request(app).get("/api/v1/fights");
    expectPaginationContract(res, 1, 10, "totalItems");
  });

  it("should return collection fields: title, slug, type, winner, arc, location", async () => {
    const res = await request(app).get("/api/v1/fights?limit=1");
    expect(res.status).toBe(200);
    if (res.body.data.length > 0) {
      const fight = res.body.data[0];
      expect(fight).toHaveProperty("title");
      expect(fight).toHaveProperty("slug");
      expect(fight).toHaveProperty("type");
      expect(fight).toHaveProperty("winner");
      expect(fight).toHaveProperty("arc");
      expect(fight).toHaveProperty("location");
    }
  });

  it("should filter by valid type enum from FIGHT.TYPES", async () => {
    const targetType = FIGHT.TYPES[0];
    const res = await request(app).get(`/api/v1/fights?type=${targetType.toLowerCase()}`);
    expect(res.status).toBe(200);
    for (const fight of res.body.data) {
      expect(fight.type).toBe(targetType);
    }
  });

  it("should filter by winnerSlug retrieved dynamically from real fight winner", async () => {
    const list = await request(app).get("/api/v1/fights?limit=10");
    const fightWithWinner = list.body.data.find((f) => f.winner && f.winner.slug);
    if (fightWithWinner) {
      const winnerSlug = fightWithWinner.winner.slug;
      const res = await request(app).get(`/api/v1/fights?winnerSlug=${winnerSlug}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    }
  });
});
