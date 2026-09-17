import { normalizeQuery } from "../semantic/query-normalizer.service.js";
import { characterEntityResolverService } from "./character-entity-resolver.service.js";

export const GRAPH_RELATIONSHIPS = {
  FOUGHT: "FOUGHT",
  TRAINED_BY: "TRAINED_BY",
  MEMBER_OF: "MEMBER_OF",
  WIELDS: "WIELDS",
};

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

const TARGET_END = "(?=\\s+(?:and|who|that|with|trained|mentored|student|disciple)\\b|$)";
const RELATIONSHIP_PATTERNS = [
  {
    relationship: GRAPH_RELATIONSHIPS.FOUGHT,
    direction: "BOTH",
    patterns: [
      new RegExp(`\\b(?:characters?\\s+)?(?:who\\s+)?(?:fought|battled|faced|defeated|versus|vs|against)\\s+(?<target>[a-z][a-z\\s'-]*?)${TARGET_END}`, "gi"),
      new RegExp(`\\b(?:battles?|fights?)\\s+(?:with|against|involving)\\s+(?<target>[a-z][a-z\\s'-]*?)${TARGET_END}`, "gi"),
      new RegExp(`\\b(?:characters?\\s+)?whose\\s+(?:battles?|fights?)\\s+(?:included|involved)\\s+(?<target>[a-z][a-z\\s'-]*?)${TARGET_END}`, "gi"),
      new RegExp(`\\bopponents?\\s+of\\s+(?<target>[a-z][a-z\\s'-]*?)${TARGET_END}`, "gi"),
    ],
  },
  {
    relationship: GRAPH_RELATIONSHIPS.TRAINED_BY,
    direction: "OUTGOING",
    patterns: [
      new RegExp(`\\b(?:characters?\\s+)?(?:trained|mentored|taught)\\s+by\\s+(?<target>[a-z][a-z\\s'-]*?)${TARGET_END}`, "gi"),
      new RegExp(`\\b(?:students?|disciples?)\\s+of\\s+(?<target>[a-z][a-z\\s'-]*?)${TARGET_END}`, "gi"),
      new RegExp(`\\b(?:characters?\\s+)?who\\s+learned\\s+from\\s+(?<target>[a-z][a-z\\s'-]*?)${TARGET_END}`, "gi"),
    ],
  },
];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const cleanSemanticText = (value) => value
  .replace(/\b(who|whose|that|is|are|the|a|an|and|with|of|in|to|for|character|characters)\b/gi, " ")
  .replace(/\s+/g, " ")
  .trim();

function findRelationshipMentions(query) {
  const mentions = [];
  const occupied = [];
  for (const definition of RELATIONSHIP_PATTERNS) {
    for (const pattern of definition.patterns) {
      pattern.lastIndex = 0;
      for (const match of query.matchAll(pattern)) {
        const start = match.index;
        const end = start + match[0].length;
        if (occupied.some((range) => start < range.end && end > range.start)) continue;
        occupied.push({ start, end });
        mentions.push({
          relationship: definition.relationship,
          direction: definition.direction,
          rawTarget: match.groups.target.trim(),
          matchedText: match[0],
          start,
        });
      }
    }
  }
  return mentions.sort((a, b) => a.start - b.start);
}

export class QueryClassifierService {
  constructor(options = {}) {
    this.entityResolver = options.entityResolver || characterEntityResolverService;
  }

  async classify(query) {
    const normalized = normalizeQuery(query);
    if (!normalized) {
      return {
        query: "",
        mode: "SEMANTIC",
        intents: { semantic: true, graph: false, structured: false },
        entityTypes: ["CHARACTER"],
        graphConstraints: [],
        unresolvedGraphMentions: [],
        structuredFilters: {},
        semanticQuery: "",
        aggregationMode: "UNION",
      };
    }

    let remainingText = normalized;
    const graphConstraints = [];
    const unresolvedGraphMentions = [];
    const structuredFilters = {};
    const matchedStructuredTermRegexes = [];

    for (const mention of findRelationshipMentions(normalized)) {
      const resolution = await this.entityResolver.resolve(mention.rawTarget);
      if (resolution.status !== "MATCH") {
        unresolvedGraphMentions.push({
          relationship: mention.relationship,
          rawTarget: mention.rawTarget,
          reason: resolution.status,
          candidates: resolution.candidates || [],
        });
        continue;
      }
      graphConstraints.push({
        relationship: mention.relationship,
        targetSlug: resolution.slug,
        direction: mention.direction,
        resolution: {
          matchedAlias: resolution.matchedAlias,
          matchType: resolution.matchType,
          confidence: resolution.confidence,
        },
      });
      remainingText = remainingText.replace(mention.matchedText, " ").trim();
    }

    for (const [term, filters] of Object.entries(STRUCTURED_TERMS)) {
      const regex = new RegExp(`\\b${escapeRegex(term)}\\b`, "i");
      if (regex.test(remainingText)) {
        Object.assign(structuredFilters, filters);
        matchedStructuredTermRegexes.push(regex);
      }
    }

    const semanticTextWithStructuredTerms = remainingText;
    if (graphConstraints.length > 0) {
      for (const regex of matchedStructuredTermRegexes) remainingText = remainingText.replace(regex, " ").trim();
    }

    const semanticQuery = cleanSemanticText(remainingText);
    const hasGraph = graphConstraints.length > 0;
    const hasStructured = Object.keys(structuredFilters).length > 0;
    const hasSemantic = semanticQuery.length > 0;
    const semanticQueryWithContext = hasGraph && hasStructured && hasSemantic
      ? cleanSemanticText(semanticTextWithStructuredTerms)
      : semanticQuery;

    let mode = "SEMANTIC";
    if (hasGraph && (hasSemantic || hasStructured)) mode = "HYBRID";
    else if (hasGraph) mode = "GRAPH";
    else if (hasStructured && hasSemantic) mode = "HYBRID";

    const isBroadDiscovery = /(?:related\s+to|connected\s+to|all\s+about)/i.test(normalized);
    const aggregationMode = isBroadDiscovery || (!hasGraph && hasSemantic) ? "UNION" : "INTERSECTION";

    return {
      query,
      mode,
      intents: { semantic: hasSemantic, graph: hasGraph, structured: hasStructured },
      entityTypes: ["CHARACTER"],
      graphConstraints,
      unresolvedGraphMentions,
      structuredFilters,
      semanticQuery: hasSemantic ? semanticQueryWithContext : normalized,
      aggregationMode,
    };
  }
}

export const queryClassifierService = new QueryClassifierService();
