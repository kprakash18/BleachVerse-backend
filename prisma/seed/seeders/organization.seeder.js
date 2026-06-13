import prisma from "../../../src/database/prisma.js";
import organizationData from "../Data/organization.data.js";
import { batchPromises } from "../utils.js";

export async function seedOrganization() {
  console.log("Seeding organizations Data.....");

  await batchPromises(organizationData, async (org) => {
    await prisma.organization.upsert({
      where: {
        slug: org.slug,
      },
      update: org,
      create: org,
    });
  });

  console.log("Organization Data seeded");
}
