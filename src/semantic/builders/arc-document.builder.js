import { BaseDocumentBuilder } from "./base-document.builder.js";

export class ArcDocumentBuilder extends BaseDocumentBuilder {
  /**
   * Transforms a hydrated arc entity into a semantic document.
   * @param {Object} arc
   * @returns {{ entityType: string, entityId: string, content: string, metadata: Object }}
   */
  build(arc) {
    if (!arc || !arc.id || !arc.name) {
      throw new Error("Invalid arc entity: id and name are required");
    }

    const lines = [];

    // Header
    lines.push(`# Arc: ${arc.name}`);

    // Type
    const arcType = arc.type || "CANON";
    lines.push(`Story Arc Type: ${arcType}`);

    // Bounds / Coverage
    const coverage = [];
    if (arc.startEpisodeNumber != null && arc.endEpisodeNumber != null) {
      coverage.push(`Episodes ${arc.startEpisodeNumber} - ${arc.endEpisodeNumber}`);
    } else if (arc.startEpisodeNumber != null) {
      coverage.push(`Episode ${arc.startEpisodeNumber}+`);
    }

    if (arc.startChapter != null && arc.endChapter != null) {
      coverage.push(`Chapters ${arc.startChapter} - ${arc.endChapter}`);
    } else if (arc.startChapter != null) {
      coverage.push(`Chapter ${arc.startChapter}+`);
    }

    if (coverage.length > 0) {
      lines.push(`\n## Coverage\n${coverage.join(" | ")}`);
    }

    // Description & Narrative Summary
    if (arc.description) {
      lines.push(`\n## Description & Narrative\n${arc.description}`);
    }

    // Major Fights
    if (arc.fights && arc.fights.length > 0) {
      const fightList = arc.fights
        .map((f) => `- ${f.title || f.name}`)
        .filter(Boolean)
        .slice(0, 15) // Keep top fights to prevent unbounded growth
        .join("\n");
      if (fightList) {
        lines.push(`\n## Key Battles\n${fightList}`);
      }
    }

    const content = lines.join("\n");

    const metadata = {
      name: arc.name,
      slug: arc.slug || "",
      type: arcType,
      startEpisodeNumber: arc.startEpisodeNumber ?? null,
      endEpisodeNumber: arc.endEpisodeNumber ?? null,
    };

    return this.createDocument({
      entityType: "ARC",
      entityId: arc.id,
      content,
      metadata,
    });
  }
}
