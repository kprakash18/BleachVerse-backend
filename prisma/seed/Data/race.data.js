import { RaceCategory } from "@prisma/client";

const races = [
  {
    name: "Human",
    category: RaceCategory.MAIN,
    description: "Ordinary Humans living in the World of Living",
  },

  {
    name: "Soul Reaper",
    category: "MAIN",
    description: "Spiritual beings who guide souls and fight Hollows.",
  },
  {
    name: "Hollow",
    category: "MAIN",
    description: "Corrupted souls that have lost their hearts.",
  },
  {
    name: "Quincy",
    category: "MAIN",
    description: "Humans capable of manipulating Reishi.",
  },
  {
    name: "Arrancar",
    category: "HYBRID",
    description:
      "Hollows who have removed their masks and gained Soul Reaper-like powers.",
  },
  {
    name: "Visored",
    category: "HYBRID",
    description: "Soul Reapers who possess Hollow powers.",
  },
  {
    name: "Fullbringer",
    category: "SPECIAL",
    description: "Humans with powers derived from Hollow influence.",
  },
  {
    name: "Mod Soul",
    category: "SPECIAL",
    description: "Artificial souls created by Soul Society.",
  },
  {
    name: "Bount",
    category: "SPECIAL",
    description: "Spirit-absorbing beings appearing in the anime-only arc.",
  },
  {
    name: "Soul King Fragment",
    category: "COSMIC",
    description:
      "Beings whose powers originate from fragments of the Soul King.",
  },
];

export default races;
