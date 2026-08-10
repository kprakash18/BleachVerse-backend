import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract } from "../../helpers/test-helpers.js";
import { LOCATION } from "../../../src/modules/location/location.constant.js";

describe("Locations Module — GET /api/v1/locations (Collection)", () => {
  it("should return paginated list of locations with defaults", async () => {
    const res = await request(app).get("/api/v1/locations");
    expectPaginationContract(res, 1, 10, "totalItems");
  });

  it("should return summary fields: name, slug, type, description", async () => {
    const res = await request(app).get("/api/v1/locations?limit=1");
    expect(res.status).toBe(200);
    if (res.body.data.length > 0) {
      const loc = res.body.data[0];
      expect(loc).toHaveProperty("name");
      expect(loc).toHaveProperty("slug");
      expect(loc).toHaveProperty("type");
      expect(loc).toHaveProperty("description");
    }
  });

  it("should filter by valid type enum from LOCATION.TYPES", async () => {
    const targetType = LOCATION.TYPES[0];
    const res = await request(app).get(`/api/v1/locations?type=${targetType.toLowerCase()}`);
    expect(res.status).toBe(200);
    for (const loc of res.body.data) {
      expect(loc.type).toBe(targetType);
    }
  });
});
