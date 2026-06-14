import slugify from "slugify";
import prisma from "../../../src/database/prisma.js";
import organizationData from "../Data/organization.data.js";
import { batchPromises } from "../utils.js";

const toSlug = (name) => slugify(name, { lower: true, strict: true });

export async function seedOrganization() {
  console.log("Seeding organizations Data.....");

  // ── Pass 1: Upsert all orgs without parentId ──────────────────────────────
  // Strips parentName so Prisma never sees an unknown field.
  await batchPromises(organizationData, async (org) => {
    const { parentName, ...orgFields } = org;

    await prisma.organization.upsert({
      where: { slug: org.slug },
      update: orgFields,
      create: orgFields,
    });
  });

  // ── Pass 2: Wire up parentId hierarchy ────────────────────────────────────
  // Fetch all freshly-seeded orgs so we can build a slug → id map.
  const seeded = await prisma.organization.findMany({
    select: { id: true, slug: true },
  });
  const orgMap = new Map(seeded.map((o) => [o.slug, o.id]));

  const children = organizationData.filter((o) => o.parentName);

  await batchPromises(children, async (org) => {
    const parentId = orgMap.get(toSlug(org.parentName));

    if (!parentId) {
      throw new Error(
        `Parent organization not found: "${org.parentName}" (slug: ${toSlug(org.parentName)})`,
      );
    }

    await prisma.organization.update({
      where: { slug: org.slug },
      data: { parentId },
    });
  });

  console.log(
    `Organization Data seeded (${organizationData.length} total, ` +
      `${children.length} with parent hierarchy wired)`,
  );
}
