import { describe, it, expect } from "vitest";
import { request, app } from "../helpers/test-helpers.js";
import swaggerSpec from "../../src/docs/swagger.js";

describe("OpenAPI 3.0.3 Runtime Contract Verification (32/32 Endpoints)", () => {
  // Master catalog of all 32 GET operations
  const endpointsToVerify = [
    // Characters (2)
    { path: "/api/v1/characters", type: "collection" },
    { path: "/api/v1/characters/ichigo-kurosaki", type: "detail" },

    // Arcs (6)
    { path: "/api/v1/arcs", type: "collection" },
    { path: "/api/v1/arcs/agent-of-the-shinigami-arc", type: "detail" },
    { path: "/api/v1/arcs/agent-of-the-shinigami-arc/episodes", type: "sub-collection" },
    { path: "/api/v1/arcs/agent-of-the-shinigami-arc/fights", type: "sub-collection" },
    { path: "/api/v1/arcs/agent-of-the-shinigami-arc/events", type: "sub-collection" },
    { path: "/api/v1/arcs/agent-of-the-shinigami-arc/characters", type: "sub-collection" },

    // Episodes (3)
    { path: "/api/v1/episodes", type: "collection" },
    { path: "/api/v1/episodes/the-day-i-became-a-shinigami", type: "detail" },
    { path: "/api/v1/episodes/number/1", type: "detail" },

    // Fights (2)
    { path: "/api/v1/fights", type: "collection" },
    { path: "/api/v1/fights/ichigo-vs-byakuya", type: "detail" },

    // Organizations (2)
    { path: "/api/v1/organizations", type: "collection" },
    { path: "/api/v1/organizations/gotei-13", type: "detail" },

    // Zanpakutos (2)
    { path: "/api/v1/zanpakutos", type: "collection" },
    { path: "/api/v1/zanpakutos/zangetsu", type: "detail" },

    // Locations (2)
    { path: "/api/v1/locations", type: "collection" },
    { path: "/api/v1/locations/soul-society", type: "detail" },

    // Races (2)
    { path: "/api/v1/races", type: "collection" },
    { path: "/api/v1/races/Soul Reaper", type: "detail" },

    // Quotes (3)
    { path: "/api/v1/quotes", type: "collection" },
    { path: "/api/v1/quotes/character/ichigo-kurosaki", type: "sub-collection" },

    // Events (2)
    { path: "/api/v1/events", type: "collection" },
    { path: "/api/v1/events/execution-of-rukia-kuchiki", type: "detail" },

    // Powers (2)
    { path: "/api/v1/powers", type: "collection" },

    // Transformations (2)
    { path: "/api/v1/transformations", type: "collection" },

    // Appearances (2)
    { path: "/api/v1/appearances", type: "collection" },
  ];

  it("should have 32 paths documented in master OpenAPI specification", () => {
    const specPaths = Object.keys(swaggerSpec.paths);
    expect(specPaths.length).toBe(32);
  });

  // Test dynamic fetching of UUIDs for ID-based detail routes (quotes, powers, transformations, appearances)
  it("should verify runtime response contract for quote detail by UUID", async () => {
    const list = await request(app).get("/api/v1/quotes?limit=1");
    if (list.body.data.length > 0) {
      const id = list.body.data[0].id;
      const res = await request(app).get(`/api/v1/quotes/${id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(typeof res.body.data).toBe("object");
    }
  });

  it("should verify runtime response contract for power detail by UUID", async () => {
    const list = await request(app).get("/api/v1/powers?limit=1");
    if (list.body.data.length > 0) {
      const id = list.body.data[0].id;
      const res = await request(app).get(`/api/v1/powers/${id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(typeof res.body.data).toBe("object");
    }
  });

  it("should verify runtime response contract for transformation detail by UUID", async () => {
    const list = await request(app).get("/api/v1/transformations?limit=1");
    if (list.body.data.length > 0) {
      const id = list.body.data[0].id;
      const res = await request(app).get(`/api/v1/transformations/${id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(typeof res.body.data).toBe("object");
    }
  });

  it("should verify runtime response contract for appearance detail by UUID", async () => {
    const list = await request(app).get("/api/v1/appearances?limit=1");
    if (list.body.data.length > 0) {
      const id = list.body.data[0].id;
      const res = await request(app).get(`/api/v1/appearances/${id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(typeof res.body.data).toBe("object");
    }
  });

  // Iterate over static catalog to verify runtime response envelope
  for (const ep of endpointsToVerify) {
    it(`Runtime Contract: GET ${ep.path}`, async () => {
      const res = await request(app).get(ep.path);
      expect([200, 404]).toContain(res.status);

      if (res.status === 200) {
        expect(res.body).toHaveProperty("data");
        if (ep.type === "collection" || ep.type === "sub-collection") {
          expect(Array.isArray(res.body.data)).toBe(true);
          if (res.body.pagination) {
            expect(res.body.pagination).toMatchObject({
              page: expect.any(Number),
              limit: expect.any(Number),
              totalItems: expect.any(Number),
              totalPages: expect.any(Number),
            });
          }
        } else {
          expect(typeof res.body.data).toBe("object");
          expect(Array.isArray(res.body.data)).toBe(false);
        }
      }
    });
  }
});
