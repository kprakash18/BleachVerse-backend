import { BaseDocumentBuilder } from "./base-document.builder.js";

export class PowerDocumentBuilder extends BaseDocumentBuilder {
  /**
   * Transforms a hydrated power entity into a semantic document.
   * @param {Object} power
   * @returns {{ entityType: string, entityId: string, content: string, metadata: Object }}
   */
  build(power) {
    if (!power || !power.id || !power.name) {
      throw new Error("Invalid power entity: id and name are required");
    }

    const lines = [];

    // Header
    lines.push(`# Power: ${power.name}`);

    // Category & Source
    const powerType = power.type || "OFFENSIVE";
    const powerSource = power.source || "ZANPAKUTO";
    lines.push(`Type: ${powerType} | Source: ${powerSource}`);

    // Associated Character
    const characterName = power.character?.name || power.characterName;
    if (characterName) {
      lines.push(`\n## Wielded By\n${characterName}`);
    }

    // Associated Transformation
    const transformationName = power.transformation?.name || power.transformationName;
    if (transformationName) {
      lines.push(`\n## Unlocked In Transformation\n${transformationName}`);
    }

    // Description & Mechanics
    if (power.description) {
      lines.push(`\n## Description & Mechanics\n${power.description}`);
    }

    const content = lines.join("\n");

    const metadata = {
      name: power.name,
      type: powerType,
      source: powerSource,
      character: characterName || null,
      transformation: transformationName || null,
    };

    return this.createDocument({
      entityType: "POWER",
      entityId: power.id,
      content,
      metadata,
    });
  }
}
