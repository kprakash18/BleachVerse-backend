import { BaseDocumentBuilder } from "./base-document.builder.js";

export class TransformationDocumentBuilder extends BaseDocumentBuilder {
  /**
   * Transforms a hydrated transformation entity into a semantic document.
   * @param {Object} transformation
   * @returns {{ entityType: string, entityId: string, content: string, metadata: Object }}
   */
  build(transformation) {
    if (!transformation || !transformation.id || !transformation.name) {
      throw new Error("Invalid transformation entity: id and name are required");
    }

    const lines = [];

    // Header
    lines.push(`# Transformation: ${transformation.name}`);

    // Type
    const transType = transformation.type || "OTHER";
    lines.push(`Transformation Type: ${transType}`);

    // Associated Character
    const characterName = transformation.character?.name || transformation.characterName;
    if (characterName) {
      lines.push(`\n## Wielded By\n${characterName}`);
    }

    // Associated Zanpakuto
    const zanpakutoName = transformation.zanpakuto?.name || transformation.zanpakutoName;
    if (zanpakutoName) {
      lines.push(`\n## Associated Zanpakuto\n${zanpakutoName}`);
    }

    // Unlocked Powers
    if (transformation.powers && transformation.powers.length > 0) {
      const powerList = transformation.powers
        .map((p) => {
          const pName = p.name || p;
          const pDesc = p.description ? `: ${p.description}` : "";
          return `- **${pName}**${pDesc}`;
        })
        .join("\n");
      if (powerList) {
        lines.push(`\n## Unlocked Powers & Techniques\n${powerList}`);
      }
    }

    // First Appearance Context
    const firstEpTitle = transformation.firstEpisode?.title;
    const firstEpNum = transformation.firstEpisode?.number;
    const firstFightTitle = transformation.firstFight?.title;
    if (firstEpNum || firstEpTitle || firstFightTitle) {
      const appearanceDetails = [];
      if (firstEpNum || firstEpTitle) {
        appearanceDetails.push(`Episode: ${[firstEpNum ? `Episode ${firstEpNum}` : null, firstEpTitle ? `"${firstEpTitle}"` : null].filter(Boolean).join(" - ")}`);
      }
      if (firstFightTitle) {
        appearanceDetails.push(`First Battle: "${firstFightTitle}"`);
      }
      lines.push(`\n## Debut\n${appearanceDetails.join("\n")}`);
    }

    // Description & Lore
    if (transformation.description) {
      lines.push(`\n## Description & Lore\n${transformation.description}`);
    }

    const content = lines.join("\n");

    const metadata = {
      name: transformation.name,
      type: transType,
      character: characterName || null,
      zanpakuto: zanpakutoName || null,
      sourceMaterial: transformation.sourceMaterial || "MANGA",
    };

    return this.createDocument({
      entityType: "TRANSFORMATION",
      entityId: transformation.id,
      content,
      metadata,
    });
  }
}
