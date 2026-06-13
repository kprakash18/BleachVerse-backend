import prisma from "../../../src/database/prisma.js";
import EpisodeData from "../Data/episode.data.js";
import { batchPromises } from "../utils.js";

export async function seedEpisodes() {
  console.log(" Seeding Episodes Data...");

  // Fetch all arcs once
  const arcs = await prisma.arc.findMany({
    select: {
      id: true,
      slug: true,
    },
  });

  // Create slug -> id map
  const arcMap = new Map(arcs.map((arc) => [arc.slug, arc.id]));

  await batchPromises(EpisodeData, async (episode) => {
    const arcId = arcMap.get(episode.arcSlug);

    if (!arcId) {
      throw new Error(`Arc not found for slug: ${episode.arcSlug}`);
    }

    await prisma.episode.upsert({
      where: {
        number: episode.number,
      },
      update: {},
      create: {
        number: episode.number,
        title: episode.title,
        type: episode.type,
        synopsis: episode.synopsis,
        airDate: episode.airDate,
        arcId,
      },
    });
  });

  console.log("Episodes seeded");
}
