import { BaseDocumentBuilder } from "./base-document.builder.js";

export class OrganizationDocumentBuilder extends BaseDocumentBuilder {
  /**
   * Transforms a hydrated organization entity into a semantic document.
   * @param {Object} organization
   * @returns {{ entityType: string, entityId: string, content: string, metadata: Object }}
   */
  build(organization) {
    if (!organization || !organization.id || !organization.name) {
      throw new Error("Invalid organization entity: id and name are required");
    }

    const lines = [];

    // Header
    lines.push(`# Organization: ${organization.name}`);

    // Type
    const orgType = organization.type || "FACTION";
    lines.push(`Organization Type: ${orgType}`);

    // Parent Organization
    const parentName = organization.parent?.name || organization.parentName;
    if (parentName) {
      lines.push(`\n## Parent Organization\n${parentName}`);
    }

    // Sub-organizations / Divisions
    if (organization.children && organization.children.length > 0) {
      const childNames = organization.children
        .map((c) => (typeof c === "string" ? c : c.name))
        .filter(Boolean)
        .join(", ");
      if (childNames) {
        lines.push(`\n## Sub-Divisions & Branches\n${childNames}`);
      }
    }

    // Leadership & Key Members (cap to avoid unbounded document bloat)
    if (organization.members && organization.members.length > 0) {
      const memberLines = organization.members
        .slice(0, 20)
        .map((m) => {
          const charName = m.character?.name || m.name || "Unknown Member";
          return m.role ? `- ${charName} (${m.role})` : `- ${charName}`;
        })
        .join("\n");
      if (memberLines) {
        lines.push(`\n## Key Members & Leadership\n${memberLines}`);
      }
    }

    // Description & Purpose
    if (organization.description) {
      lines.push(`\n## Description & Purpose\n${organization.description}`);
    }

    const content = lines.join("\n");

    const metadata = {
      name: organization.name,
      slug: organization.slug || "",
      type: orgType,
      parent: parentName || null,
    };

    return this.createDocument({
      entityType: "ORGANIZATION",
      entityId: organization.id,
      content,
      metadata,
    });
  }
}
