import slugify from "slugify";
import { LocationType } from "@prisma/client";

const locations = [
  // WORLDS
  {
    name: "World of the Living",
    type: LocationType.WORLD,
    description: "The human world where ordinary humans reside.",
  },
  {
    name: "Soul Society",
    type: LocationType.WORLD,
    description: "The spiritual realm governed by the Gotei 13.",
  },
  {
    name: "Hueco Mundo",
    type: LocationType.WORLD,
    description: "The realm inhabited by Hollows and Arrancar.",
  },
  {
    name: "Royal Palace",
    type: LocationType.WORLD,
    description: "The residence of the Soul King.",
  },
  {
    name: "Wandenreich",
    type: LocationType.WORLD,
    description: "The hidden Quincy empire.",
  },

  // REGIONS
  {
    name: "Karakura Town",
    type: LocationType.REGION,
    parentName: "World of the Living",
  },
  {
    name: "Fake Karakura Town",
    type: LocationType.REGION,
    parentName: "World of the Living",
  },
  {
    name: "Seireitei",
    type: LocationType.REGION,
    parentName: "Soul Society",
  },
  {
    name: "Rukongai",
    type: LocationType.REGION,
    parentName: "Soul Society",
  },
  {
    name: "Dangai",
    type: LocationType.REGION,
  },
  {
    name: "Valley of Screams",
    type: LocationType.REGION,
  },

  // STRUCTURES
  {
    name: "Las Noches",
    type: LocationType.STRUCTURE,
    parentName: "Hueco Mundo",
  },
  {
    name: "Central 46 Chambers",
    type: LocationType.STRUCTURE,
    parentName: "Seireitei",
  },
  {
    name: "Squad 1 Barracks",
    type: LocationType.STRUCTURE,
    parentName: "Seireitei",
  },
  {
    name: "Squad 4 Barracks",
    type: LocationType.STRUCTURE,
    parentName: "Seireitei",
  },
  {
    name: "Squad 6 Barracks",
    type: LocationType.STRUCTURE,
    parentName: "Seireitei",
  },
  {
    name: "Squad 10 Barracks",
    type: LocationType.STRUCTURE,
    parentName: "Seireitei",
  },
  {
    name: "Squad 11 Barracks",
    type: LocationType.STRUCTURE,
    parentName: "Seireitei",
  },
  {
    name: "Squad 13 Barracks",
    type: LocationType.STRUCTURE,
    parentName: "Seireitei",
  },
  {
    name: "Sokyoku Hill",
    type: LocationType.STRUCTURE,
    parentName: "Seireitei",
  },
  {
    name: "Underground Training Ground",
    type: LocationType.STRUCTURE,
    parentName: "Seireitei",
  },
  {
    name: "Kirinden",
    type: LocationType.STRUCTURE,
    parentName: "Royal Palace",
  },
  {
    name: "Hoohden",
    type: LocationType.STRUCTURE,
    parentName: "Royal Palace",
  },
  {
    name: "Senjumaru Palace",
    type: LocationType.STRUCTURE,
    parentName: "Royal Palace",
  },
  {
    name: "Silbern",
    type: LocationType.STRUCTURE,
    parentName: "Wandenreich",
  },
];

const LocationData = locations.map((loc) => ({
  ...loc,
  slug: slugify(loc.name, { lower: true, strict: true }),
  parentSlug: loc.parentName ? slugify(loc.parentName, { lower: true, strict: true }) : undefined,
}));

export default LocationData;

