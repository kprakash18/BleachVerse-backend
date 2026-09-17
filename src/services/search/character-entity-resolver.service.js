import prisma from "../../database/prisma.js";
import { normalizeQuery } from "../semantic/query-normalizer.service.js";

const normalizeEntityName = (value) => normalizeQuery(value).replace(/-/g, " ");

function levenshteinDistance(left, right) {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    let diagonal = row[0];
    row[0] = i;
    for (let j = 1; j <= right.length; j += 1) {
      const above = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        diagonal + (left[i - 1] === right[j - 1] ? 0 : 1),
      );
      diagonal = above;
    }
  }
  return row[right.length];
}

function similarity(left, right) {
  const maxLength = Math.max(left.length, right.length);
  return maxLength === 0 ? 1 : 1 - levenshteinDistance(left, right) / maxLength;
}

function buildAliases(character) {
  const aliases = new Map();
  const addAlias = (value, priority) => {
    const normalized = normalizeEntityName(value);
    if (normalized) aliases.set(normalized, Math.max(aliases.get(normalized) || 0, priority));
  };
  addAlias(character.name, 3);
  addAlias(character.slug, 3);
  for (const { alias } of character.aliases || []) addAlias(alias, 3);
  const nameParts = normalizeEntityName(character.name).split(" ");
  if (nameParts.length > 1) {
    addAlias(nameParts[0], 2);
    addAlias(nameParts[nameParts.length - 1], 1);
  }
  return [...aliases].map(([alias, priority]) => ({ alias, priority }));
}

export class CharacterEntityResolverService {
  constructor(options = {}) {
    this.loadCharacters = options.loadCharacters || (() => prisma.character.findMany({
      select: {
        slug: true,
        name: true,
        aliases: { select: { alias: true } },
      },
    }));
    this.cacheTtlMs = options.cacheTtlMs ?? 5 * 60 * 1000;
    this.fuzzyThreshold = options.fuzzyThreshold ?? 0.82;
    this.ambiguityMargin = options.ambiguityMargin ?? 0.08;
    this.index = null;
    this.indexExpiresAt = 0;
  }

  async getIndex() {
    if (this.index && Date.now() < this.indexExpiresAt) return this.index;
    const characters = await this.loadCharacters();
    const index = [];
    for (const character of characters) {
      for (const { alias, priority } of buildAliases(character)) {
        index.push({ slug: character.slug, name: character.name, alias, priority });
      }
    }
    this.index = index;
    this.indexExpiresAt = Date.now() + this.cacheTtlMs;
    return index;
  }

  clearCache() {
    this.index = null;
    this.indexExpiresAt = 0;
  }

  async resolve(rawName) {
    const query = normalizeEntityName(rawName);
    if (!query) return { status: "UNKNOWN", query, candidates: [] };
    const index = await this.getIndex();
    const unique = (matches) => [...new Map(matches.map((match) => [match.slug, match])).values()];
    const exactCandidates = index.filter(({ alias }) => alias === query);
    const highestPriority = Math.max(...exactCandidates.map(({ priority }) => priority), 0);
    const exact = unique(exactCandidates.filter(({ priority }) => priority === highestPriority));

    if (exact.length === 1) {
      return { status: "MATCH", ...exact[0], matchedAlias: exact[0].alias, matchType: "EXACT", confidence: 1 };
    }
    if (exact.length > 1) {
      return { status: "AMBIGUOUS", query, candidates: exact.map(({ slug, name }) => ({ slug, name })) };
    }

    const bestByCharacter = new Map();
    for (const candidate of index) {
      const confidence = similarity(query, candidate.alias);
      const current = bestByCharacter.get(candidate.slug);
      if (!current || confidence > current.confidence) bestByCharacter.set(candidate.slug, { ...candidate, confidence });
    }
    const ranked = [...bestByCharacter.values()].sort((a, b) => b.confidence - a.confidence);
    const [best, runnerUp] = ranked;
    if (!best || best.confidence < this.fuzzyThreshold) return { status: "UNKNOWN", query, candidates: [] };
    if (runnerUp && best.confidence - runnerUp.confidence < this.ambiguityMargin) {
      return {
        status: "AMBIGUOUS",
        query,
        candidates: ranked.slice(0, 3).map(({ slug, name, confidence }) => ({ slug, name, confidence: Number(confidence.toFixed(4)) })),
      };
    }
    return {
      status: "MATCH",
      slug: best.slug,
      name: best.name,
      matchedAlias: best.alias,
      matchType: "FUZZY",
      confidence: Number(best.confidence.toFixed(4)),
    };
  }
}

export const characterEntityResolverService = new CharacterEntityResolverService();
