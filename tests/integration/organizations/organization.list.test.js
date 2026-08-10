import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract } from "../../helpers/test-helpers.js";
import { ORGANIZATION } from "../../../src/modules/organization/organization.constant.js";

describe("Organizations Module — GET /api/v1/organizations (Collection)", () => {
  it("should return paginated list of organizations with defaults", async () => {
    const res = await request(app).get("/api/v1/organizations");
    expectPaginationContract(res, 1, 10, "totalItems");
  });

  it("should return summary fields: name, slug, type, description", async () => {
    const res = await request(app).get("/api/v1/organizations?limit=1");
    expect(res.status).toBe(200);
    if (res.body.data.length > 0) {
      const org = res.body.data[0];
      expect(org).toHaveProperty("name");
      expect(org).toHaveProperty("slug");
      expect(org).toHaveProperty("type");
      expect(org).toHaveProperty("description");
    }
  });

  it("should filter by valid type enum from ORGANIZATION.TYPES", async () => {
    const targetType = ORGANIZATION.TYPES[0];
    const res = await request(app).get(`/api/v1/organizations?type=${targetType.toLowerCase()}`);
    expect(res.status).toBe(200);
    for (const org of res.body.data) {
      expect(org.type).toBe(targetType);
    }
  });

  it("should search by name derived dynamically from a populated organization", async () => {
    const list = await request(app).get("/api/v1/organizations?limit=1");
    if (list.body.data.length > 0) {
      const orgName = list.body.data[0].name;
      const searchTerm = orgName.slice(0, 3).toLowerCase();
      const res = await request(app).get(`/api/v1/organizations?search=${searchTerm}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    }
  });
});
