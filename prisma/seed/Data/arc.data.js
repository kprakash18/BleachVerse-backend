import { ArcType } from "@prisma/client";
import slugify from "slugify";

const rawArcData = [
  {
    // canon arc
    name: "Substitute Shinigami Arc",
    type: ArcType.CANON,
    description:
      "Ichigo Kurosaki gains Soul Reaper powers and begins protecting Karakura Town.",
    startEpisodeNumber: 1,
    endEpisodeNumber: 20,
    startChapter: 1,
    endChapter: 70,
  },

  {
    name: "Soul Society: The Sneak Entry Arc",
    type: ArcType.CANON,
    description:
      "Ichigo and his friends infiltrate Soul Society to rescue Rukia Kuchiki.",
    startEpisodeNumber: 21,
    endEpisodeNumber: 41,
    startChapter: 71,
    endChapter: 117,
  },

  {
    name: "Soul Society: The Rescue Arc",
    type: ArcType.CANON,
    description:
      "The rescue mission intensifies as Ichigo battles powerful Soul Reapers.",
    startEpisodeNumber: 42,
    endEpisodeNumber: 63,
    startChapter: 118,
    endChapter: 183,
  },

  {
    name: "Arrancar: The Arrival Arc",
    type: ArcType.CANON,
    description:
      "Powerful new enemies called Arrancars begin attacking the Human World under the command of Sosuke Aizen, forcing Ichigo and his allies to prepare for a greater threat.",
    startEpisodeNumber: 110,
    endEpisodeNumber: 131,
    startChapter: 184,
    endChapter: 229,
  },

  {
    name: "Arrancar: The Hueco Mundo Sneak Entry Arc",
    type: ArcType.CANON,
    description:
      "Ichigo, Uryū, and Chad enter Hueco Mundo, the Hollows' realm, to rescue Orihime Inoue after she is taken by Sosuke Aizen and the Arrancars.",
    startEpisodeNumber: 132,
    endEpisodeNumber: 151,
    startChapter: 229,
    endChapter: 251,
  },

  {
    name: "Arrancar: The Fierce Fight Arc",
    type: ArcType.CANON,
    description:
      "Ichigo and his friends battle powerful Arrancars in Hueco Mundo as they push deeper into enemy territory to rescue Orihime Inoue.",
    startEpisodeNumber: 152,
    endEpisodeNumber: 167,
    startChapter: 252,
    endChapter: 286,
  },

  {
    name: "Arrancar vs. Shinigami Arc",
    type: ArcType.CANON,
    description:
      "The Soul Reapers clash with Aizen's Arrancar army in the Human World, featuring intense battles as both sides fight for control and protect Karakura Town.",
    startEpisodeNumber: 190,
    endEpisodeNumber: 205,
    startChapter: 287,
    endChapter: 315,
  },

  {
    name: "The Past Arc",
    type: ArcType.CANON,
    description:
      "A flashback story revealing the events 100 years before the main series, including Sosuke Aizen's rise and the origins of the Visoreds.(negative manga chapter numbers to symbolize the past)",
    startEpisodeNumber: 206,
    endEpisodeNumber: 212,
    startChapter: -108,
    endChapter: -97,
  },

  {
    name: "Arrancar: Decisive Battle of Karakura Arc",
    type: ArcType.CANON,
    description:
      "The battle for Karakura Town reaches its climax as the Soul Reapers face Sosuke Aizen and his strongest Arrancars in a fight that will determine the fate of both worlds.",
    startEpisodeNumber: 213,
    endEpisodeNumber: 229,
    startChapter: 316,
    endChapter: 340,
  },

  {
    name: "Arrancar: Downfall Arc",
    type: ArcType.CANON,
    description:
      "The battle against Aizen concludes with decisive fights and sacrifices.",
    startEpisodeNumber: 266,
    endEpisodeNumber: 316,
    startChapter: 340,
    endChapter: 423,
  },

  {
    name: "The Lost Substitute Shinigami Arc",
    type: ArcType.CANON,
    description:
      "After losing his Soul Reaper powers, Ichigo seeks to regain them while uncovering a conspiracy involving a group called Xcution and the mysterious power known as Fullbring.",
    startEpisodeNumber: 343,
    endEpisodeNumber: 366,
    startChapter: 424,
    endChapter: 479,
  },
  {
    name: "Thousand-Year Blood War Arc",
    type: ArcType.CANON,
    description:
      "The Quincy empire, led by Yhwach, launches a devastating invasion of Soul Society, beginning the final war.",
    startEpisodeNumber: 367,
    endEpisodeNumber: 379,
    startChapter: 480,
    endChapter: 542,
  },

  {
    name: "Thousand-Year Blood War: The Separation Arc",
    type: ArcType.CANON,
    description:
      "The battle escalates as the Quincies tighten their grip on Soul Society, forcing the Soul Reapers to regroup and grow stronger.",
    startEpisodeNumber: 380,
    endEpisodeNumber: 392,
    startChapter: 543,
    endChapter: 608,
  },

  {
    name: "Thousand-Year Blood War: The Conflict Arc",
    type: ArcType.CANON,
    description:
      "The war reaches its most intense stage, with decisive battles, major revelations, and the fate of all worlds hanging in the balance.",
    startEpisodeNumber: 393,
    startChapter: 609,
    endChapter: 686,
  },

  // filler
  {
    name: "The Bount Arc",
    type: ArcType.FILLER,
    description:
      "Ichigo and his friends face the Bounts, a race of soul-absorbing immortals seeking revenge against Soul Society.",
    startEpisodeNumber: 64,
    endEpisodeNumber: 91,
  },

  {
    name: "The Bount: Assault on Soul Society Arc",
    type: ArcType.FILLER,
    description:
      "The Bounts invade Soul Society, leading to a final confrontation between Ichigo, the Soul Reapers, and Jin Kariya's forces.",
    startEpisodeNumber: 92,
    endEpisodeNumber: 109,
  },
  {
    name: "Zanpakuto Unknown Tales Arc/Beast Swords Arc",
    type: ArcType.FILLER,
    description:
      "An anime-only filler story where the Soul Reapers' Zanpakutō spirits rebel against their masters, forcing them to battle their own weapons and uncover the mystery behind the uprising.",
    startEpisodeNumber: 230,
    endEpisodeNumber: 265,
  },
  {
    name: "The New Captain Shusuke Amagai Arc",
    type: ArcType.FILLER,
    description:
      "A new captain joins the Gotei 13 while a hidden conspiracy unfolds.",
    startEpisodeNumber: 168,
    endEpisodeNumber: 189,
  },
  {
    name: "The Gotei 13 Invasion Arc",
    type: ArcType.FILLER,
    description:
      "An anime-only filler arc in which mysterious copies of Soul Reapers appear, causing chaos in Soul Society and forcing Ichigo to uncover the truth behind the impostors.",
    startEpisodeNumber: 317,
    endEpisodeNumber: 342,
  },

  // movies

  {
    name: "Bleach: Memories of Nobody (2006)",
    type: ArcType.MOVIE,
    description:
      "Ichigo and Rukia encounter a mysterious girl named Senna and become involved in a crisis that threatens to collide the Human World and Soul Society. watch after episode 117",
  },

  {
    name: "Bleach: The Diamond Dust Rebellion (2007)",
    type: ArcType.MOVIE,
    description:
      "Captain Toshiro Hitsugaya becomes the prime suspect in the theft of a powerful artifact and must uncover the truth.watch after episode 125",
  },

  {
    name: "Bleach: Fade to Black (2008)",
    type: ArcType.MOVIE,
    description:
      "Rukia mysteriously disappears from everyone's memories, leaving Ichigo to uncover what happened and restore her identity.watch after episode 125",
  },

  {
    name: "Bleach: The Hell Verse (2010)",
    type: ArcType.MOVIE,
    description:
      "Ichigo enters Hell to rescue his kidnapped sister and confront powerful enemies from the underworld..watch after episode 299",
  },

  {
    name: "Bleach: Live-Action Film (2018)",
    type: ArcType.MOVIE,
    description:
      "A live-action adaptation covering Ichigo's early journey as a Substitute Soul Reaper and his first battles against Hollows. watch after catching up latest episodes",
  },
];

// slug name
const ArcData = rawArcData.map((arc) => ({
  ...arc,
  slug: slugify(arc.name, { lower: true, strict: true }),
}));

export default ArcData;
