import { BaseDocumentBuilder } from "./base-document.builder.js";
import { CharacterDocumentBuilder } from "./character-document.builder.js";
import { FightDocumentBuilder } from "./fight-document.builder.js";
import { QuoteDocumentBuilder } from "./quote-document.builder.js";
import { ArcDocumentBuilder } from "./arc-document.builder.js";
import { OrganizationDocumentBuilder } from "./organization-document.builder.js";
import { PowerDocumentBuilder } from "./power-document.builder.js";
import { TransformationDocumentBuilder } from "./transformation-document.builder.js";

export {
  BaseDocumentBuilder,
  CharacterDocumentBuilder,
  FightDocumentBuilder,
  QuoteDocumentBuilder,
  ArcDocumentBuilder,
  OrganizationDocumentBuilder,
  PowerDocumentBuilder,
  TransformationDocumentBuilder,
};

export const characterDocumentBuilder = new CharacterDocumentBuilder();
export const fightDocumentBuilder = new FightDocumentBuilder();
export const quoteDocumentBuilder = new QuoteDocumentBuilder();
export const arcDocumentBuilder = new ArcDocumentBuilder();
export const organizationDocumentBuilder = new OrganizationDocumentBuilder();
export const powerDocumentBuilder = new PowerDocumentBuilder();
export const transformationDocumentBuilder = new TransformationDocumentBuilder();

export const BUILDERS_MAP = {
  CHARACTER: characterDocumentBuilder,
  FIGHT: fightDocumentBuilder,
  QUOTE: quoteDocumentBuilder,
  ARC: arcDocumentBuilder,
  ORGANIZATION: organizationDocumentBuilder,
  POWER: powerDocumentBuilder,
  TRANSFORMATION: transformationDocumentBuilder,
};

/**
 * Helper to build a semantic document given an entityType and hydrated entity.
 * @param {string} entityType
 * @param {Object} entity
 * @returns {{ entityType: string, entityId: string, content: string, metadata: Object }}
 */
export function buildSemanticDocument(entityType, entity) {
  const normalizedType = (entityType || "").toUpperCase();
  const builder = BUILDERS_MAP[normalizedType];
  if (!builder) {
    throw new Error(`No document builder registered for entity type: "${entityType}"`);
  }
  return builder.build(entity);
}
