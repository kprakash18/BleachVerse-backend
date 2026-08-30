import { BaseDocumentBuilder } from "./base-document.builder.js";

export class QuoteDocumentBuilder extends BaseDocumentBuilder {
  /**
   * Transforms a hydrated quote entity into a semantic document.
   * @param {Object} quote
   * @returns {{ entityType: string, entityId: string, content: string, metadata: Object }}
   */
  build(quote) {
    if (!quote || !quote.id || !quote.text) {
      throw new Error("Invalid quote entity: id and text are required");
    }

    const lines = [];

    // Header
    lines.push("# Quote");
    lines.push(`"${quote.text.trim()}"`);

    // Speaker
    const speakerName = quote.character?.name || quote.characterName || "Unknown Character";
    lines.push(`\n## Speaker\n${speakerName}`);

    // Category
    const category = quote.category || "OTHER";
    lines.push(`\n## Category\n${category}`);

    // Arc
    const arcName = quote.arc?.name || quote.arcName;
    if (arcName) {
      lines.push(`\n## Arc\n${arcName}`);
    }

    // Episode Reference
    const episodeNumber = quote.episode?.number;
    const episodeTitle = quote.episode?.title;
    if (episodeNumber || episodeTitle) {
      const epInfo = [
        episodeNumber ? `Episode ${episodeNumber}` : null,
        episodeTitle ? `"${episodeTitle}"` : null,
      ]
        .filter(Boolean)
        .join(" - ");
      lines.push(`\n## Episode Reference\n${epInfo}`);
    }

    const content = lines.join("\n");

    const metadata = {
      characterName: speakerName,
      category,
      arc: arcName || null,
      sourceMaterial: quote.sourceMaterial || "MANGA",
    };

    return this.createDocument({
      entityType: "QUOTE",
      entityId: quote.id,
      content,
      metadata,
    });
  }
}
