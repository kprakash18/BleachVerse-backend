import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract } from "../../helpers/test-helpers.js";
import { TRANSFORMATION } from "../../../src/modules/transformation/transformation.constant.js";

describe("Transformations Module — GET /api/v1/transformations (Collection)", () => {
  it("should return paginated list of transformations with defaults", async () => {
    const res = await request(app).get("/api/v1/transformations");
    expectPaginationContract(res, 1, 10, "totalItems");
  });

  it("should return collection fields: id, name, type, description, character, zanpakuto", async () => {
    const res = await request(app).get("/api/v1/transformations?limit=1");
    expect(res.status).toBe(200);
    if (res.body.data.length > 0) {
      const t = res.body.data[0];
      expect(t).toHaveProperty("id");
      expect(t).toHaveProperty("name");
      expect(t).toHaveProperty("type");
      expect(t).toHaveProperty("description");
      expect(t).toHaveProperty("character");
      expect(t).toHaveProperty("zanpakuto");
    }
  });

  it("should filter by valid type enum from TRANSFORMATION.TYPES", async () => {
    const targetType = TRANSFORMATION.TYPES[0];
    const res = await request(app).get(`/api/v1/transformations?type=${targetType.toLowerCase()}`);
    expect(res.status).toBe(200);
    for (const t of res.body.data) {
      expect(t.type).toBe(targetType);
    }
  });

  it("should filter by characterSlug dynamically fetched from populated record", async () => {
    const list = await request(app).get("/api/v1/transformations?limit=10");
    const itemWithChar = list.body.data.find((t) => t.character && t.character.slug);
    if (itemWithChar) {
      const charSlug = itemWithChar.character.slug;
      const res = await request(app).get(`/api/v1/transformations?characterSlug=${charSlug}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    }
  });
});
