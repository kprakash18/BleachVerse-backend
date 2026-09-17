import { beforeEach, describe, expect, it, vi } from "vitest";
import { QueryClassifierService } from "../../../src/services/search/query-classifier.service.js";

const resolutions = {
  ichigo: { status: "MATCH", slug: "ichigo-kurosaki", matchedAlias: "ichigo", matchType: "EXACT", confidence: 1 },
  kenpachi: { status: "MATCH", slug: "kenpachi-zaraki", matchedAlias: "kenpachi", matchType: "EXACT", confidence: 1 },
  urahara: { status: "MATCH", slug: "kisuke-urahara", matchedAlias: "urahara", matchType: "EXACT", confidence: 1 },
  grimmjaw: { status: "MATCH", slug: "grimmjow-jaegerjaquez", matchedAlias: "grimmjow", matchType: "FUZZY", confidence: 0.8889 },
};

const resolver = { resolve: vi.fn(async (name) => resolutions[name] || { status: "UNKNOWN", candidates: [] }) };
const classifier = new QueryClassifierService({ entityResolver: resolver });

describe("QueryClassifierService", () => {
  beforeEach(() => vi.clearAllMocks());

  it("classifies a pure semantic query without resolving entities", async () => {
    const intent = await classifier.classify("orange-haired substitute protector");
    expect(intent.intents).toEqual({ semantic: true, graph: false, structured: false });
    expect(intent.mode).toBe("SEMANTIC");
    expect(intent.semanticQuery).toBe("orange-haired substitute protector");
    expect(resolver.resolve).not.toHaveBeenCalled();
  });

  it("classifies semantic and structured terms as hybrid", async () => {
    const intent = await classifier.classify("substitute soul reaper");
    expect(intent.intents).toEqual({ semantic: true, graph: false, structured: true });
    expect(intent.structuredFilters).toEqual({ race: "SHINIGAMI" });
    expect(intent.aggregationMode).toBe("UNION");
  });

  it("resolves graph targets and records exact-match evidence", async () => {
    const intent = await classifier.classify("characters who fought Kenpachi");
    expect(intent.mode).toBe("GRAPH");
    expect(intent.graphConstraints).toEqual([{
      relationship: "FOUGHT",
      targetSlug: "kenpachi-zaraki",
      direction: "BOTH",
      resolution: { matchedAlias: "kenpachi", matchType: "EXACT", confidence: 1 },
    }]);
  });

  it.each([
    "characters whose battles included Ichigo",
    "opponents of Ichigo",
    "battles involving Ichigo",
  ])("recognizes alternative fight wording: %s", async (query) => {
    const intent = await classifier.classify(query);
    expect(intent.intents.graph).toBe(true);
    expect(intent.graphConstraints[0]).toMatchObject({ relationship: "FOUGHT", targetSlug: "ichigo-kurosaki" });
  });

  it("accepts a high-confidence misspelling and exposes fuzzy confidence", async () => {
    const intent = await classifier.classify("who fought grimmjaw");
    expect(intent.graphConstraints[0]).toMatchObject({
      targetSlug: "grimmjow-jaegerjaquez",
      resolution: { matchType: "FUZZY", confidence: 0.8889 },
    });
  });

  it("extracts multiple relationship constraints", async () => {
    const intent = await classifier.classify("who fought Ichigo and trained by Urahara");
    expect(intent.graphConstraints).toHaveLength(2);
    expect(intent.graphConstraints).toEqual(expect.arrayContaining([
      expect.objectContaining({ relationship: "FOUGHT", targetSlug: "ichigo-kurosaki" }),
      expect.objectContaining({ relationship: "TRAINED_BY", targetSlug: "kisuke-urahara" }),
    ]));
    expect(intent.intents.semantic).toBe(false);
  });

  it("keeps unknown graph mentions in semantic fallback instead of inventing a slug", async () => {
    const intent = await classifier.classify("who fought Not A Real Character");
    expect(intent.mode).toBe("SEMANTIC");
    expect(intent.intents).toEqual({ semantic: true, graph: false, structured: false });
    expect(intent.graphConstraints).toEqual([]);
    expect(intent.semanticQuery).toBe("fought not real");
    expect(intent.unresolvedGraphMentions).toEqual([{
      relationship: "FOUGHT",
      rawTarget: "not a real character",
      reason: "UNKNOWN",
      candidates: [],
    }]);
  });

  it("does not route ambiguous entity names to graph search", async () => {
    resolver.resolve.mockResolvedValueOnce({
      status: "AMBIGUOUS",
      candidates: [{ slug: "ichigo-kurosaki" }, { slug: "white-ichigo" }],
    });
    const intent = await classifier.classify("who fought ichigo");
    expect(intent.intents.graph).toBe(false);
    expect(intent.intents.semantic).toBe(true);
    expect(intent.unresolvedGraphMentions[0]).toMatchObject({ reason: "AMBIGUOUS" });
  });

  it("retains structured context for descriptive hybrid search", async () => {
    const intent = await classifier.classify("Espada who fought Ichigo and are brutal");
    expect(intent.intents).toEqual({ semantic: true, graph: true, structured: true });
    expect(intent.structuredFilters).toEqual({ faction: "ESPADA", race: "ARRANCAR" });
    expect(intent.semanticQuery).toBe("espada brutal");
    expect(intent.aggregationMode).toBe("INTERSECTION");
  });

  it("handles empty input without loading the entity index", async () => {
    const intent = await classifier.classify("   ");
    expect(intent.query).toBe("");
    expect(intent.graphConstraints).toEqual([]);
    expect(resolver.resolve).not.toHaveBeenCalled();
  });
});
