import slugify from "slugify";
import { OrganizationType } from "@prisma/client";

const organizations = [
  {
    // soul society
    name: "Soul Society",
    type: OrganizationType.FACTION,
    description:
      "Soul Society is the spiritual afterworld in Bleach where deceased humans souls go after death, and where the Shinigami (Soul Reapers) live and operate.",
  },
  {
    name: "Gotei 13",
    type: OrganizationType.MILITARY,
    description:
      "The primary military force of Soul Society, consisting of 13 divisions of Shinigami led by captains and lieutenants. Most Shinigami characters belong to this organization.",
  },

  {
    name: "Stealth Force",
    type: OrganizationType.OTHER,
    description:
      "The covert operations unit of Soul Society, handling espionage, assassination, and security, including the gatekeepers of the Seireitei.",
  },

  {
    name: "Central 46",
    type: OrganizationType.OTHER,
    description:
      "The governing body of Soul Society, responsible for making laws and overseeing the judicial system. They are often depicted as a council of elders who make important decisions regarding the fate of souls and the Shinigami.",
  },

  {
    name: "Kidō Corps",
    type: OrganizationType.MILITARY,
    description:
      "A specialized branch focused on the use of kidō (spells) for combat, barriers, and support.",
  },

  {
    name: "Royal Guard",
    type: OrganizationType.ROYAL,
    description:
      "Also called Squad 0, this elite group protects the Soul King, the Royal Family, and the Soul King Palace.",
  },

  {
    name: "Shin'ō Academy",
    type: OrganizationType.ACADEMY,
    description:
      "Shin'ō Academy is the training institution for aspiring Shinigami (Soul Reapers) in the Bleach universe. It serves as the primary educational facility where students learn about their duties, combat skills, and the spiritual world. The academy is located in the Rukongai district of Soul Society and is responsible for training new recruits to become effective Shinigami.",
  },

  // arrancars
  {
    name: "Arrancar Army",
    type: OrganizationType.MILITARY,
    description:
      "The military force of Arrancars assembled under Sosuke Aizen in Hueco Mundo.",
  },
  {
    name: "Espada",
    type: OrganizationType.MILITARY,
    description:
      "The ten strongest Arrancars serving directly under Sosuke Aizen.",
  },

  {
    name: "Numeros",
    type: OrganizationType.MILITARY,
    description:
      "Standard Arrancar soldiers serving beneath the Espada hierarchy.",
  },

  {
    name: "Privaron Espada",
    type: OrganizationType.MILITARY,
    description:
      "Former Espada who lost their official ranks but remain powerful Arrancars.",
  },

  {
    name: "Fraccion",
    type: OrganizationType.MILITARY,
    description:
      "Personal subordinates assigned to serve individual Espada members.",
  },

  {
    name: "Exequias",
    type: OrganizationType.MILITARY,
    description:
      "A specialized execution and cleanup force operating within Las Noches.",
  },

  // quincies
  {
    name: "Wandenreich",
    type: OrganizationType.MILITARY,
    description: "The hidden Quincy empire founded and ruled by Yhwach.",
  },

  {
    name: "Sternritter",
    type: OrganizationType.MILITARY,
    description: "Elite Quincy warriors granted Schrifts by Yhwach.",
  },

  {
    name: "Schutzstaffel",
    type: OrganizationType.MILITARY,
    description:
      "The royal guard of the Wandenreich composed of Yhwach's strongest Quincy.",
  },

  {
    name: "Jagdarmee",
    type: OrganizationType.MILITARY,
    description:
      "The military hunting force responsible for Wandenreich combat operations.",
  },

  // human world

  {
    name: "Visored",
    type: OrganizationType.FACTION,
    description:
      "A group of former Shinigami who gained Hollow powers through Hollowfication.",
  },

  {
    name: "Xcution",
    type: OrganizationType.FACTION,
    description:
      "An organization of Fullbringers led by Kugo Ginjo operating in the Human World.",
  },
  {
    name: "Seireitei Gate Guards",
    type: OrganizationType.MILITARY,
    description:
      "The four giant guardians responsible for protecting the four main gates of the Seireitei in Soul Society.",
  },
  {
    name: "Bounts",
    type: OrganizationType.FACTION,
    description:
      "A clan of humans created through a Soul Society research accident who feed on human souls to gain power and longevity.",
  },
  {
    name: "Ishida Family",
    type: OrganizationType.OTHER,
    description:
      "A prominent, pure-blood Quincy family residing in the Human World.",
  },
];

const OrganizationData = organizations.map((org) => ({
  ...org,
  slug: slugify(org.name, { lower: true, strict: true }),
}));

export default OrganizationData;

