import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract } from "../../helpers/test-helpers.js";

describe("Zanpakutō Module — GET /api/v1/zanpakutos (Collection)", () => {
  it("should return paginated list of zanpakutos with defaults", async () => {
    const res = await request(app).get("/api/v1/zanpakutos");
    expectPaginationContract(res, 1, 10, "totalItems");
  });

  it("should return collection fields: name, slug, type, releaseCommand, spiritName, wielder", async () => {
    const res = await request(app).get("/api/v1/zanpakutos?limit=1");
    expect(res.status).toBe(200);
    if (res.body.data.length > 0) {
      const z = res.body.data[0];
      expect(z).toHaveProperty("name");
      expect(z).toHaveProperty("slug");
      expect(z).toHaveProperty("type");
      expect(z).toHaveProperty("releaseCommand");
      expect(z).toHaveProperty("spiritName");
      expect(z).toHaveProperty("wielder");
    }
  });

  it("should filter by wielderSlug dynamically fetched from populated wielder", async () => {
    const list = await request(app).get("/api/v1/zanpakutos?limit=10");
    const itemWithWielder = list.body.data.find((z) => z.wielder && z.wielder.slug);
    if (itemWithWielder) {
      const wielderSlug = itemWithWielder.wielder.slug;
      const res = await request(app).get(`/api/v1/zanpakutos?wielderSlug=${wielderSlug}`);
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    }
  });
});
