import { describe, it, expect } from "vitest";
import { queryClassifierService } from "../../../src/services/search/query-classifier.service.js";

describe("QueryClassifierService (Phase 5.9A)", () => {
  it("should classify pure semantic query correctly", () => {
    const intent = queryClassifierService.classify("orange-haired substitute soul reaper");

    expect(intent.mode).toBe("SEMANTIC");
    expect(intent.intents.semantic).toBe(true);
    expect(intent.intents.graph).toBe(false);
    expect(intent.graphConstraints).toHaveLength(0);
    expect(intent.semanticQuery).toContain("orange-haired substitute soul reaper");
  });

  it("should classify pure graph query and resolve target slug", () => {
    const intent = queryClassifierService.classify("characters who fought Kenpachi");

    expect(intent.intents.graph).toBe(true);
    expect(intent.graphConstraints).toEqual([
      {
        relationship: "FOUGHT",
        targetSlug: "kenpachi-zaraki",
        direction: "BOTH",
      },
    ]);
  });

  it("should classify hybrid multi-constraint query with structured filter and intersection mode", () => {
    const intent = queryClassifierService.classify("Espada who fought Kenpachi and are brutal");

    expect(intent.mode).toBe("HYBRID");
    expect(intent.intents.semantic).toBe(true);
    expect(intent.intents.graph).toBe(true);
    expect(intent.intents.structured).toBe(true);
    expect(intent.aggregationMode).toBe("INTERSECTION");

    expect(intent.graphConstraints).toEqual([
      {
        relationship: "FOUGHT",
        targetSlug: "kenpachi-zaraki",
        direction: "BOTH",
      },
    ]);

    expect(intent.structuredFilters).toEqual({
      faction: "ESPADA",
      race: "ARRANCAR",
    });

    expect(intent.semanticQuery).toContain("brutal");
  });

  it("should detect TRAINED_BY relationship correctly", () => {
    const intent = queryClassifierService.classify("characters trained by Urahara");

    expect(intent.intents.graph).toBe(true);
    expect(intent.graphConstraints).toEqual([
      {
        relationship: "TRAINED_BY",
        targetSlug: "kisuke-urahara",
        direction: "OUTGOING",
      },
    ]);
  });

  it("should handle empty or whitespace query safely", () => {
    const intent = queryClassifierService.classify("   ");
    expect(intent.query).toBe("");
    expect(intent.mode).toBe("SEMANTIC");
    expect(intent.graphConstraints).toEqual([]);
  });
});
