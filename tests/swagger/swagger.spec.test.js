import { describe, it, expect } from "vitest";
import swaggerSpec from "../../src/docs/swagger.js";

describe("OpenAPI 3.0.3 Specification Integrity Tests (Static Validation)", () => {
  it("should load a valid OpenAPI specification object", () => {
    expect(swaggerSpec).toBeDefined();
    expect(typeof swaggerSpec).toBe("object");
  });

  it("should specify OpenAPI version starting with 3.0 (3.0.3)", () => {
    expect(swaggerSpec.openapi).toBeDefined();
    expect(swaggerSpec.openapi.startsWith("3.0")).toBe(true);
  });

  it("should document API metadata (title, version, description) and base server URL (/api/v1)", () => {
    expect(swaggerSpec.info).toHaveProperty("title");
    expect(swaggerSpec.info).toHaveProperty("version");
    expect(swaggerSpec.servers).toBeInstanceOf(Array);
    expect(swaggerSpec.servers.some((s) => s.url === "/api/v1")).toBe(true);
  });

  it("should define all 15 OpenAPI tags", () => {
    expect(swaggerSpec.tags).toBeInstanceOf(Array);
    expect(swaggerSpec.tags.length).toBe(15);
    const tagNames = swaggerSpec.tags.map((t) => t.name);
    const expectedTags = [
      "Characters",
      "Arcs",
      "Episodes",
      "Fights",
      "Organizations",
      "Zanpakutos",
      "Locations",
      "Races",
      "Quotes",
      "Events",
      "Powers",
      "Transformations",
      "Appearances",
      "Relationships",
      "Search",
    ];
    for (const tag of expectedTags) {
      expect(tagNames).toContain(tag);
    }
  });

  it("should document all operations across all paths", () => {
    expect(swaggerSpec.paths).toBeDefined();
    const pathKeys = Object.keys(swaggerSpec.paths);
    expect(pathKeys.length).toBe(43);

    for (const pathKey of pathKeys) {
      const pathObj = swaggerSpec.paths[pathKey];
      const operation = pathObj.get || pathObj.post || pathObj.patch;
      expect(operation).toBeDefined();
      expect(operation).toHaveProperty("tags");
      expect(operation.tags.length).toBeGreaterThan(0);
      expect(operation).toHaveProperty("responses");
    }
  });

  it("should document unified search execution metadata and semantic search", () => {
    expect(swaggerSpec.paths["/search"].get.tags).toContain("Search");
    expect(swaggerSpec.paths["/search/semantic"].get.tags).toContain("Search");
    expect(swaggerSpec.components.schemas).toHaveProperty("SearchExecution");
    expect(swaggerSpec.components.schemas).toHaveProperty("SearchCandidate");
  });

  it("should enforce explicit response code rules across operations", () => {
    for (const [pathKey, pathObj] of Object.entries(swaggerSpec.paths)) {
      const operation = pathObj.get || pathObj.post || pathObj.patch;
      const responses = operation.responses;
      expect(responses).toHaveProperty("400");
      expect(responses).toHaveProperty("500");

      if (pathObj.get || pathObj.patch) {
        expect(responses).toHaveProperty("200");
      } else if (pathObj.post) {
        expect(responses).toHaveProperty("201");
      }

      const isDetailOrSubResource = pathKey.includes("{") || pathKey.includes("number");
      if (isDetailOrSubResource) {
        expect(responses).toHaveProperty("404");
      }
    }
  });

  it("should resolve all internal $ref pointers to valid components", () => {
    const components = swaggerSpec.components;
    expect(components).toHaveProperty("schemas");
    expect(components).toHaveProperty("parameters");
    expect(components).toHaveProperty("responses");

    const checkRefs = (obj) => {
      if (!obj || typeof obj !== "object") return;
      for (const [key, value] of Object.entries(obj)) {
        if (key === "$ref" && typeof value === "string") {
          const parts = value.split("/");
          expect(parts[0]).toBe("#");
          expect(parts[1]).toBe("components");
          const section = parts[2];
          const name = parts[3];
          expect(components).toHaveProperty(section);
          expect(components[section]).toHaveProperty(name);
        } else {
          checkRefs(value);
        }
      }
    };

    checkRefs(swaggerSpec.paths);
    checkRefs(swaggerSpec.components);
  });
});
