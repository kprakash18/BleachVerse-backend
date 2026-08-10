import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract } from "../../helpers/test-helpers.js";
import { POWER } from "../../../src/modules/power/power.constant.js";

describe("Powers Module — GET /api/v1/powers (Collection)", () => {
  it("should return paginated list of powers with defaults", async () => {
    const res = await request(app).get("/api/v1/powers");
    expectPaginationContract(res, 1, 10, "totalItems");
  });

  it("should return collection fields: id, name, type, source, description, character, transformation", async () => {
    const res = await request(app).get("/api/v1/powers?limit=1");
    expect(res.status).toBe(200);
    if (res.body.data.length > 0) {
      const p = res.body.data[0];
      expect(p).toHaveProperty("id");
      expect(p).toHaveProperty("name");
      expect(p).toHaveProperty("type");
      expect(p).toHaveProperty("source");
      expect(p).toHaveProperty("description");
      expect(p).toHaveProperty("character");
      expect(p).toHaveProperty("transformation");
    }
  });

  it("should filter by valid source enum from POWER.SOURCES", async () => {
    const targetSource = POWER.SOURCES[0];
    const res = await request(app).get(`/api/v1/powers?source=${targetSource.toLowerCase()}`);
    expect(res.status).toBe(200);
    for (const p of res.body.data) {
      expect(p.source).toBe(targetSource);
    }
  });

  it("should filter by valid type enum from POWER.TYPES", async () => {
    const targetType = POWER.TYPES[0];
    const res = await request(app).get(`/api/v1/powers?type=${targetType}`);
    expect(res.status).toBe(200);
    for (const p of res.body.data) {
      expect(p.type).toBe(targetType);
    }
  });
});
