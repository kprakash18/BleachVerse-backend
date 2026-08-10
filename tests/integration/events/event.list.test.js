import { describe, it, expect } from "vitest";
import { request, app, expectPaginationContract } from "../../helpers/test-helpers.js";
import { EVENT } from "../../../src/modules/event/event.constant.js";

describe("Events Module — GET /api/v1/events (Collection)", () => {
  it("should return paginated list of events with defaults", async () => {
    const res = await request(app).get("/api/v1/events");
    expectPaginationContract(res, 1, 10, "totalItems");
  });

  it("should return collection fields: title, slug, type, description, arc, location", async () => {
    const res = await request(app).get("/api/v1/events?limit=1");
    expect(res.status).toBe(200);
    if (res.body.data.length > 0) {
      const ev = res.body.data[0];
      expect(ev).toHaveProperty("title");
      expect(ev).toHaveProperty("slug");
      expect(ev).toHaveProperty("type");
      expect(ev).toHaveProperty("description");
      expect(ev).toHaveProperty("arc");
      expect(ev).toHaveProperty("location");
    }
  });

  it("should filter by valid type enum from EVENT.TYPES", async () => {
    const targetType = EVENT.TYPES[0];
    const res = await request(app).get(`/api/v1/events?type=${targetType.toLowerCase()}`);
    expect(res.status).toBe(200);
    for (const ev of res.body.data) {
      expect(ev.type).toBe(targetType);
    }
  });

  it("should filter by valid sourceMaterial enum from EVENT.SOURCE_MATERIALS", async () => {
    const targetSource = EVENT.SOURCE_MATERIALS[0];
    const res = await request(app).get(`/api/v1/events?sourceMaterial=${targetSource.toLowerCase()}`);
    expect(res.status).toBe(200);
  });
});
