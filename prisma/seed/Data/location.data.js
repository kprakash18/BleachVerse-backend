import slugify from "slugify";
import { LocationType } from "@prisma/client";

const locations = [
  // WORLDS
  {
    name: "World of the Living",
    slug: "world-of-the-living",
    type: LocationType.WORLD,
    description: "The human world where ordinary humans reside.",
  },
  {
    name: "Soul Society",
    slug: "soul-society",
    type: LocationType.WORLD,
    description: "The spiritual realm governed by the Gotei 13.",
  },
  {
    name: "Hueco Mundo",
    slug: "hueco-mundo",
    type: LocationType.WORLD,
    description: "The realm inhabited by Hollows and Arrancar.",
  },
  {
    name: "Royal Palace",
    slug: "royal-palace",
    type: LocationType.WORLD,
    description: "The residence of the Soul King.",
  },
  {
    name: "Wandenreich",
    slug: "wandenreich",
    type: LocationType.WORLD,
    description: "The hidden Quincy empire.",
  },

  // REGIONS
  {
    name: "Karakura Town",
    slug: "karakura-town",
    type: LocationType.REGION,
    parentSlug: "world-of-the-living",
  },
  {
    name: "Seireitei",
    slug: "seireitei",
    type: LocationType.REGION,
    parentSlug: "soul-society",
  },
  {
    name: "Rukongai",
    slug: "rukongai",
    type: LocationType.REGION,
    parentSlug: "soul-society",
  },
  {
    name: "Dangai",
    slug: "dangai",
    type: LocationType.REGION,
  },
  {
    name: "Valley of Screams",
    slug: "valley-of-screams",
    type: LocationType.REGION,
  },

  // STRUCTURES
  {
    name: "Las Noches",
    slug: "las-noches",
    type: LocationType.STRUCTURE,
    parentSlug: "hueco-mundo",
  },
  {
    name: "Central 46 Chambers",
    slug: "central-46-chambers",
    type: LocationType.STRUCTURE,
    parentSlug: "seireitei",
  },
  {
    name: "Squad 1 Barracks",
    slug: "squad-1-barracks",
    type: LocationType.STRUCTURE,
    parentSlug: "seireitei",
  },
  {
    name: "Squad 4 Barracks",
    slug: "squad-4-barracks",
    type: LocationType.STRUCTURE,
    parentSlug: "seireitei",
  },
  {
    name: "Squad 6 Barracks",
    slug: "squad-6-barracks",
    type: LocationType.STRUCTURE,
    parentSlug: "seireitei",
  },
  {
    name: "Squad 10 Barracks",
    slug: "squad-10-barracks",
    type: LocationType.STRUCTURE,
    parentSlug: "seireitei",
  },
  {
    name: "Squad 11 Barracks",
    slug: "squad-11-barracks",
    type: LocationType.STRUCTURE,
    parentSlug: "seireitei",
  },
  {
    name: "Squad 13 Barracks",
    slug: "squad-13-barracks",
    type: LocationType.STRUCTURE,
    parentSlug: "seireitei",
  },
  {
    name: "Sokyoku Hill",
    slug: "sokyoku-hill",
    type: LocationType.STRUCTURE,
    parentSlug: "seireitei",
  },
  {
    name: "Underground Training Ground",
    slug: "underground-training-ground",
    type: LocationType.STRUCTURE,
    parentSlug: "seireitei",
  },
  {
    name: "Kirinden",
    slug: "kirinden",
    type: LocationType.STRUCTURE,
    parentSlug: "royal-palace",
  },
  {
    name: "Hoohden",
    slug: "hoohden",
    type: LocationType.STRUCTURE,
    parentSlug: "royal-palace",
  },
  {
    name: "Senjumaru Palace",
    slug: "senjumaru-palace",
    type: LocationType.STRUCTURE,
    parentSlug: "royal-palace",
  },
  {
    name: "Silbern",
    slug: "silbern",
    type: LocationType.STRUCTURE,
    parentSlug: "wandenreich",
  },
];

export default locations;
