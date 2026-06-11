import prisma from "../../../src/database/prisma.js";

import organizationData from "../Data/organization.data.js";

export async function seedOrganization() {
  console.log("Seeding organizations Data.....");

  for (const org of organizationData) {
    await prisma.organization.upsert({
      where: {
        slug: org.slug,
      },
      update: org,
      create: org,
    });
  }

  console.log("Organization Data seeded");
}
