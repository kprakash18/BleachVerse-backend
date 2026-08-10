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

  it("should define all 13 OpenAPI tags", () => {
    expect(swaggerSpec.tags).toBeInstanceOf(Array);
    expect(swaggerSpec.tags.length).toBe(13);
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
    ];
    for (const tag of expectedTags) {
      expect(tagNames).toContain(tag);
    }
  });

  it("should document exactly 32 GET operations across all paths", () => {
    expect(swaggerSpec.paths).toBeDefined();
    const pathKeys = Object.keys(swaggerSpec.paths);
    expect(pathKeys.length).toBe(32);

    for (const pathKey of pathKeys) {
      const pathObj = swaggerSpec.paths[pathKey];
      expect(pathObj).toHaveProperty("get");
      expect(pathObj.get).toHaveProperty("tags");
      expect(pathObj.get.tags.length).toBeGreaterThan(0);
      expect(pathObj.get).toHaveProperty("responses");
    }
  });

  it("should enforce explicit response code rules (Collection: 200,400,500 | Detail/Sub-resource: 200,400,404,500)", () => {
    for (const [pathKey, pathObj] of Object.entries(swaggerSpec.paths)) {
      const responses = pathObj.get.responses;
      expect(responses).toHaveProperty("200");
      expect(responses).toHaveProperty("400");
      expect(responses).toHaveProperty("500");

      const isDetailOrSubResource = pathKey.includes("{") || pathKey.includes("number");
      if (isDetailOrSubResource) {
        expect(responses).toHaveProperty("404");
      } else {
        expect(responses).not.toHaveProperty("404");
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
