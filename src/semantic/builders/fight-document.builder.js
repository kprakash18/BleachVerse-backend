import { BaseDocumentBuilder } from "./base-document.builder.js";

export class FightDocumentBuilder extends BaseDocumentBuilder {
  /**
   * Transforms a hydrated fight entity into a semantic document.
   * @param {Object} fight
   * @returns {{ entityType: string, entityId: string, content: string, metadata: Object }}
   */
  build(fight) {
    if (!fight || !fight.id || !fight.title) {
      throw new Error("Invalid fight entity: id and title are required");
    }

    const lines = [];

    // Title / Header
    lines.push(`# Fight: ${fight.title}`);

    // Basic attributes
    const fightType = fight.type || "DUEL";
    lines.push(`Battle Type: ${fightType}`);

    // Arc
    const arcName = fight.arc?.name || fight.arcName;
    if (arcName) {
      lines.push(`\n## Arc\n${arcName}`);
    }

    // Location
    const locationName = fight.location?.name || fight.locationName;
    if (locationName) {
      lines.push(`\n## Location\n${locationName}`);
    }

    // Participants
    if (fight.participants && fight.participants.length > 0) {
      const participantList = fight.participants
        .map((p) => {
          const charName = p.character?.name || p.name || (typeof p === "string" ? p : "Unknown");
          const outcome = p.outcome ? ` (Outcome: ${p.outcome})` : "";
          return `- ${charName}${outcome}`;
        })
        .join("\n");
      lines.push(`\n## Participants\n${participantList}`);
    }

    // Winner
    const winnerName = fight.winner?.name || fight.winnerName;
    if (winnerName) {
      lines.push(`\n## Winner\n${winnerName}`);
    }

    // Episode Reference
    const episodeTitle = fight.episode?.title;
    const episodeNumber = fight.episode?.number;
    if (episodeTitle || episodeNumber) {
      const epInfo = [
        episodeNumber ? `Episode ${episodeNumber}` : null,
        episodeTitle ? `"${episodeTitle}"` : null,
      ]
        .filter(Boolean)
        .join(" - ");
      lines.push(`\n## Episode Reference\n${epInfo}`);
    }

    // Summary
    if (fight.summary) {
      lines.push(`\n## Summary\n${fight.summary}`);
    }

    const content = lines.join("\n");

    const metadata = {
      title: fight.title,
      slug: fight.slug || "",
      type: fight.type || "DUEL",
      arc: arcName || null,
      winner: winnerName || null,
    };

    return this.createDocument({
      entityType: "FIGHT",
      entityId: fight.id,
      content,
      metadata,
    });
  }
}
