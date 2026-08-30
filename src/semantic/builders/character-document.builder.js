import { BaseDocumentBuilder } from "./base-document.builder.js";

export class CharacterDocumentBuilder extends BaseDocumentBuilder {
  /**
   * Transforms a hydrated character entity into a semantic document.
   * @param {Object} character
   * @returns {{ entityType: string, entityId: string, content: string, metadata: Object }}
   */
  build(character) {
    if (!character || !character.id || !character.name) {
      throw new Error("Invalid character entity: id and name are required");
    }

    const lines = [];

    // Title / Header
    lines.push(`# Character: ${character.name}`);

    // Basic attributes
    const sex = character.sex || "UNKNOWN";
    const status = character.status || "ALIVE";
    lines.push(`${character.name} is a ${sex.toLowerCase()} character currently ${status.toLowerCase()}.`);

    // Aliases
    if (character.aliases && character.aliases.length > 0) {
      const aliasList = character.aliases
        .map((a) => (typeof a === "string" ? a : a.alias))
        .filter(Boolean)
        .join(", ");
      if (aliasList) {
        lines.push(`\n## Aliases\n${aliasList}`);
      }
    }

    // Races
    if (character.races && character.races.length > 0) {
      const raceList = character.races
        .map((r) => (typeof r === "string" ? r : r.race?.name || r.name))
        .filter(Boolean)
        .join(", ");
      if (raceList) {
        lines.push(`\n## Races\n${raceList}`);
      }
    }

    // Affiliations & Roles
    if (character.organizations && character.organizations.length > 0) {
      const orgList = character.organizations
        .map((o) => {
          const orgName = o.organization?.name || o.name;
          return o.role ? `${orgName} (Role: ${o.role})` : orgName;
        })
        .filter(Boolean)
        .join(", ");
      if (orgList) {
        lines.push(`\n## Affiliations\n${orgList}`);
      }
    }

    // Zanpakuto
    if (character.zanpakutos && character.zanpakutos.length > 0) {
      const zList = character.zanpakutos
        .map((z) => {
          const zDetails = [`Name: ${z.name}`];
          if (z.releaseCommand) zDetails.push(`Release Command: "${z.releaseCommand}"`);
          if (z.spiritName) zDetails.push(`Spirit: ${z.spiritName}`);
          if (z.description) zDetails.push(`Description: ${z.description}`);
          return zDetails.join("\n");
        })
        .join("\n\n");
      if (zList) {
        lines.push(`\n## Zanpakuto\n${zList}`);
      }
    }

    // Powers
    if (character.powers && character.powers.length > 0) {
      const pList = character.powers
        .map((p) => {
          const pType = p.type ? ` (${p.type})` : "";
          const pDesc = p.description ? `: ${p.description}` : "";
          return `- **${p.name}**${pType}${pDesc}`;
        })
        .join("\n");
      if (pList) {
        lines.push(`\n## Powers & Abilities\n${pList}`);
      }
    }

    // Transformations
    if (character.transformations && character.transformations.length > 0) {
      const tList = character.transformations
        .map((t) => {
          const tType = t.type ? ` [${t.type}]` : "";
          const tDesc = t.description ? `: ${t.description}` : "";
          return `- **${t.name}**${tType}${tDesc}`;
        })
        .join("\n");
      if (tList) {
        lines.push(`\n## Transformations\n${tList}`);
      }
    }

    // Narrative Description / Background
    if (character.description) {
      lines.push(`\n## Description & Lore\n${character.description}`);
    }

    const content = lines.join("\n");

    const metadata = {
      name: character.name,
      slug: character.slug || "",
      sex: character.sex || "UNKNOWN",
      status: character.status || "ALIVE",
    };

    return this.createDocument({
      entityType: "CHARACTER",
      entityId: character.id,
      content,
      metadata,
    });
  }
}
