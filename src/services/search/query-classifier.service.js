import { normalizeQuery } from "../semantic/query-normalizer.service.js";

// Canonical relationship dictionary
export const GRAPH_RELATIONSHIPS = {
  FOUGHT: "FOUGHT",
  TRAINED_BY: "TRAINED_BY",
  MEMBER_OF: "MEMBER_OF",
  WIELDS: "WIELDS",
};

// Domain entity alias dictionary mapping colloquial names to canonical slugs
const KNOWN_TARGET_SLUGS = {
  kenpachi: "kenpachi-zaraki",
  "kenpachi zaraki": "kenpachi-zaraki",
  zaraki: "kenpachi-zaraki",
  aizen: "sosuke-aizen",
  "sosuke aizen": "sosuke-aizen",
  ichigo: "ichigo-kurosaki",
  "ichigo kurosaki": "ichigo-kurosaki",
  byakuya: "byakuya-kuchiki",
  "byakuya kuchiki": "byakuya-kuchiki",
  rukia: "rukia-kuchiki",
  "rukia kuchiki": "rukia-kuchiki",
  urahara: "kisuke-urahara",
  "kisuke urahara": "kisuke-urahara",
  yamamoto: "genryusai-shigekuni-yamamoto",
  "genryusai yamamoto": "genryusai-shigekuni-yamamoto",
  renji: "renji-abarai",
  "renji abarai": "renji-abarai",
  ulquiorra: "ulquiorra-cifer",
  "ulquiorra cifer": "ulquiorra-cifer",
  grimmjow: "grimmjow-jaegerjaquez",
  "grimmjow jaegerjaquez": "grimmjow-jaegerjaquez",
  yhwach: "yhwach",
  shunsui: "shunsui-kyoraku",
  "shunsui kyoraku": "shunsui-kyoraku",
  toshiro: "toshiro-hitsugaya",
  hitsugaya: "toshiro-hitsugaya",
  "toshiro hitsugaya": "toshiro-hitsugaya",
  gin: "gin-ichimaru",
  "gin ichimaru": "gin-ichimaru",
  mayuri: "mayuri-kurotsuchi",
  "mayuri kurotsuchi": "mayuri-kurotsuchi",
  unohana: "retsu-unohana",
  "retsu unohana": "retsu-unohana",
};

// Structured domain filters allowlist
const STRUCTURED_TERMS = {
  captain: { role: "CAPTAIN" },
  captains: { role: "CAPTAIN" },
  lieutenant: { role: "LIEUTENANT" },
  lieutenants: { role: "LIEUTENANT" },
  espada: { faction: "ESPADA", race: "ARRANCAR" },
  arrancar: { race: "ARRANCAR" },
  arrancars: { race: "ARRANCAR" },
  quincy: { race: "QUINCY" },
  quincies: { race: "QUINCY" },
  shinigami: { race: "SHINIGAMI" },
  "soul reaper": { race: "SHINIGAMI" },
  "soul reapers": { race: "SHINIGAMI" },
  hollow: { race: "HOLLOW" },
  hollows: { race: "HOLLOW" },
  visored: { group: "VISORED" },
  vizard: { group: "VISORED" },
};

export class QueryClassifierService {
  /**
   * Classifies a user query into structured intent, graph constraints, semantic residuals, and aggregation mode.
   * @param {string} query
   * @returns {Object} Intent Model
   */
  classify(query) {
    const normalized = normalizeQuery(query);
    if (!normalized) {
      return {
        query: "",
        mode: "SEMANTIC",
        intents: { semantic: true, graph: false, structured: false },
        entityTypes: ["CHARACTER"],
        graphConstraints: [],
        structuredFilters: {},
        semanticQuery: "",
        aggregationMode: "UNION",
      };
    }

    let remainingText = normalized;
    const graphConstraints = [];
    const structuredFilters = {};

    // 1. Detect Graph Constraints (FOUGHT, TRAINED_BY, MEMBER_OF, WIELDS)
    // Patterns: "who fought X", "fought X", "battled X", "against X", "vs X"
    const foughtMatch = remainingText.match(/(?:who\s+)?(?:fought|battled|faced|defeated|vs|versus|against)\s+([a-z\s'-]+?)(?:\s+(?:and|with|who|that)|$)/i);
    if (foughtMatch) {
      const rawTarget = foughtMatch[1].trim();
      const targetSlug = KNOWN_TARGET_SLUGS[rawTarget] || rawTarget.replace(/\s+/g, "-");
      graphConstraints.push({
        relationship: GRAPH_RELATIONSHIPS.FOUGHT,
        targetSlug,
        direction: "BOTH",
      });
      remainingText = remainingText.replace(foughtMatch[0], " ").trim();
    }

    // Patterns: "trained by X", "student of X", "disciple of X"
    const trainedMatch = remainingText.match(/(?:trained\s+by|student\s+of|disciple\s+of)\s+([a-z\s'-]+?)(?:\s+(?:and|with|who|that)|$)/i);
    if (trainedMatch) {
      const rawTarget = trainedMatch[1].trim();
      const targetSlug = KNOWN_TARGET_SLUGS[rawTarget] || rawTarget.replace(/\s+/g, "-");
      graphConstraints.push({
        relationship: GRAPH_RELATIONSHIPS.TRAINED_BY,
        targetSlug,
        direction: "OUTGOING",
      });
      remainingText = remainingText.replace(trainedMatch[0], " ").trim();
    }

    // 2. Detect Structured Domain Terms
    for (const [term, filters] of Object.entries(STRUCTURED_TERMS)) {
      const regex = new RegExp(`\\b${term}\\b`, "i");
      if (regex.test(remainingText)) {
        Object.assign(structuredFilters, filters);
        // Do not completely strip the term from semantic query so vector context is retained
      }
    }

    // 3. Clean up residual semantic query
    const semanticQuery = remainingText
      .replace(/\b(who|that|is|are|the|a|an|and|with|of|in|to|for|character|characters)\b/gi, " ")
      .replace(/\s+/g, " ")
      .trim();

    // 4. Intent and Aggregation Mode Resolution
    const hasGraph = graphConstraints.length > 0;
    const hasStructured = Object.keys(structuredFilters).length > 0;
    const hasSemantic = semanticQuery.length > 0;

    let mode = "SEMANTIC";
    if (hasGraph && hasSemantic) {
      mode = "HYBRID";
    } else if (hasGraph) {
      mode = "GRAPH";
    } else {
      mode = "SEMANTIC";
    }

    // If query has explicit graph constraint + semantic traits -> INTERSECTION
    // If query is broad (e.g. "characters related to X") -> UNION
    const isBroadDiscovery = /(?:related\s+to|connected\s+to|all\s+about)/i.test(normalized);
    const aggregationMode = isBroadDiscovery || (!hasGraph && hasSemantic) ? "UNION" : "INTERSECTION";

    return {
      query,
      mode,
      intents: {
        semantic: hasSemantic,
        graph: hasGraph,
        structured: hasStructured,
      },
      entityTypes: ["CHARACTER"],
      graphConstraints,
      structuredFilters,
      semanticQuery: hasSemantic ? semanticQuery : normalized,
      aggregationMode,
    };
  }
}

export const queryClassifierService = new QueryClassifierService();
