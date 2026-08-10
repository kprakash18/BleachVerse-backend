import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract } from "../../helpers/test-helpers.js";
import { CHARACTER } from "../../../src/modules/character/character.constant.js";

describe("Characters Module — GET /api/v1/characters (Collection)", () => {
  it("should return paginated list of characters with defaults", async () => {
    const res = await request(app).get("/api/v1/characters");
    expectPaginationContract(res, 1, 10, "total");
  });

  it("should filter by valid status enum from CHARACTER.STATUSES and verify returned records", async () => {
    const targetStatus = CHARACTER.STATUSES[0];
    const res = await request(app).get(`/api/v1/characters?status=${targetStatus}`);
    expect(res.status).toBe(200);
    for (const char of res.body.data) {
      expect(char.status).toBe(targetStatus);
    }
  });

  it("should filter by valid sex enum from CHARACTER.SEXES and verify returned records", async () => {
    const targetSex = CHARACTER.SEXES[0];
    const res = await request(app).get(`/api/v1/characters?sex=${targetSex}`);
    expect(res.status).toBe(200);
    for (const char of res.body.data) {
      expect(char.sex).toBe(targetSex);
    }
  });

  it("should combine status and sex filters dynamically", async () => {
    const status = CHARACTER.STATUSES[0];
    const sex = CHARACTER.SEXES[0];
    const res = await request(app).get(`/api/v1/characters?status=${status}&sex=${sex}`);
    expect(res.status).toBe(200);
    for (const char of res.body.data) {
      expect(char.status).toBe(status);
      expect(char.sex).toBe(sex);
    }
  });

  it("should perform case-insensitive name search derived dynamically from populated record", async () => {
    const list = await request(app).get("/api/v1/characters?limit=1");
    if (list.body.data.length > 0) {
      const charName = list.body.data[0].name;
      const searchTerm = charName.slice(0, 3).toLowerCase();
      const res = await request(app).get(`/api/v1/characters?search=${searchTerm}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    }
  });

  it("should sort ascending by name field in CHARACTER.SORT_FIELDS", async () => {
    const sortField = CHARACTER.SORT_FIELDS[0];
    const sortOrder = CHARACTER.SORT_ORDERS[0];
    const res = await request(app).get(`/api/v1/characters?sortBy=${sortField}&sortOrder=${sortOrder}&limit=5`);
    expect(res.status).toBe(200);
    const names = res.body.data.map((c) => c.name);
    expect(names).toEqual([...names].sort());
  });

  it("should sort descending by name field in CHARACTER.SORT_FIELDS", async () => {
    const sortField = CHARACTER.SORT_FIELDS[0];
    const sortOrder = CHARACTER.SORT_ORDERS[1];
    const res = await request(app).get(`/api/v1/characters?sortBy=${sortField}&sortOrder=${sortOrder}&limit=5`);
    expect(res.status).toBe(200);
    const names = res.body.data.map((c) => c.name);
    expect(names).toEqual([...names].sort().reverse());
  });
});
