import { describe, expect, it, vi } from "vitest";
import { CharacterEntityResolverService } from "../../../src/services/search/character-entity-resolver.service.js";

const characters = [
  { slug: "ichigo-kurosaki", name: "Ichigo Kurosaki", aliases: [{ alias: "Deathberry" }] },
  { slug: "white-ichigo", name: "White Ichigo", aliases: [{ alias: "The Inner Hollow" }] },
  { slug: "grimmjow-jaegerjaquez", name: "Grimmjow Jaegerjaquez", aliases: [] },
];

describe("CharacterEntityResolverService", () => {
  it("resolves names, slugs, stored aliases, and derived name parts", async () => {
    const resolver = new CharacterEntityResolverService({ loadCharacters: async () => characters });
    await expect(resolver.resolve("Ichigo Kurosaki")).resolves.toMatchObject({ status: "MATCH", slug: "ichigo-kurosaki", matchType: "EXACT" });
    await expect(resolver.resolve("ichigo-kurosaki")).resolves.toMatchObject({ status: "MATCH", slug: "ichigo-kurosaki" });
    await expect(resolver.resolve("Deathberry")).resolves.toMatchObject({ status: "MATCH", slug: "ichigo-kurosaki" });
    await expect(resolver.resolve("Grimmjow")).resolves.toMatchObject({ status: "MATCH", slug: "grimmjow-jaegerjaquez" });
  });

  it("resolves a clear misspelling above the fuzzy threshold", async () => {
    const resolver = new CharacterEntityResolverService({ loadCharacters: async () => characters });
    await expect(resolver.resolve("grimmjaw")).resolves.toMatchObject({
      status: "MATCH",
      slug: "grimmjow-jaegerjaquez",
      matchType: "FUZZY",
    });
  });

  it("prefers a given-name match over the same token used as another character's family name", async () => {
    const resolver = new CharacterEntityResolverService({ loadCharacters: async () => characters });
    await expect(resolver.resolve("ichigo")).resolves.toMatchObject({ status: "MATCH", slug: "ichigo-kurosaki" });
  });

  it("returns ambiguous when equally authoritative aliases belong to multiple characters", async () => {
    const resolver = new CharacterEntityResolverService({
      loadCharacters: async () => [
        { slug: "first", name: "Alex First", aliases: [] },
        { slug: "second", name: "Alex Second", aliases: [] },
      ],
    });
    const result = await resolver.resolve("alex");
    expect(result.status).toBe("AMBIGUOUS");
    expect(result.candidates.map(({ slug }) => slug)).toEqual(expect.arrayContaining(["first", "second"]));
  });

  it("rejects weak fuzzy matches", async () => {
    const resolver = new CharacterEntityResolverService({ loadCharacters: async () => characters });
    await expect(resolver.resolve("someone unrelated")).resolves.toEqual({ status: "UNKNOWN", query: "someone unrelated", candidates: [] });
  });

  it("caches the database index and supports explicit invalidation", async () => {
    const loadCharacters = vi.fn(async () => characters);
    const resolver = new CharacterEntityResolverService({ loadCharacters, cacheTtlMs: 60_000 });
    await resolver.resolve("Deathberry");
    await resolver.resolve("Grimmjow");
    expect(loadCharacters).toHaveBeenCalledTimes(1);
    resolver.clearCache();
    await resolver.resolve("Deathberry");
    expect(loadCharacters).toHaveBeenCalledTimes(2);
  });
});
