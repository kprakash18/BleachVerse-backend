import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract } from "../../helpers/test-helpers.js";
import { ARC_TYPES, ARC_SORT_FIELDS, SORT_ORDERS } from "../../../src/modules/arc/arc.constants.js";

describe("Arcs Module — GET /api/v1/arcs (Collection)", () => {
  it("should return paginated list of arcs with defaults", async () => {
    const res = await request(app).get("/api/v1/arcs");
    expectPaginationContract(res, 1, 10, "totalItems");
  });

  it("should filter arcs by type enum from ARC_TYPES and verify returned records", async () => {
    const targetType = ARC_TYPES[0];
    const res = await request(app).get(`/api/v1/arcs?type=${targetType}`);
    expect(res.status).toBe(200);
    for (const arc of res.body.data) {
      expect(arc.type).toBe(targetType);
    }
  });

  it("should handle lowercase type filter (auto-upcase)", async () => {
    const targetType = ARC_TYPES[0];
    const res = await request(app).get(`/api/v1/arcs?type=${targetType.toLowerCase()}`);
    expect(res.status).toBe(200);
    for (const arc of res.body.data) {
      expect(arc.type).toBe(targetType);
    }
  });

  it("should sort arcs by field in ARC_SORT_FIELDS ascending", async () => {
    const sortField = ARC_SORT_FIELDS[0];
    const sortOrder = SORT_ORDERS[0];
    const res = await request(app).get(`/api/v1/arcs?sortBy=${sortField}&sortOrder=${sortOrder}&limit=5`);
    expect(res.status).toBe(200);
    const names = res.body.data.map((a) => a.name);
    expect(names).toEqual([...names].sort());
  });

  it("should return collection summary fields (name, slug, type, description)", async () => {
    const res = await request(app).get("/api/v1/arcs?limit=1");
    expect(res.status).toBe(200);
    if (res.body.data.length > 0) {
      const arc = res.body.data[0];
      expect(arc).toHaveProperty("name");
      expect(arc).toHaveProperty("slug");
      expect(arc).toHaveProperty("type");
      expect(arc).toHaveProperty("description");
    }
  });
});
