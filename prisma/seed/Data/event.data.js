import { EventType, SourceMaterial } from "@prisma/client";
import slugify from "slugify";

const bleachVerseEventSeedData = [
  {
    title: "Masaki Kurosaki's Death",
    type: EventType.DEATH,
    description: "Masaki Kurosaki, Ichigo's mother, is killed by the Hollow Grand Fisher while protecting her young son, leaving a lasting scar on Ichigo's heart.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 8,
    arcName: "Substitute Shinigami Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Ichigo Kurosaki Gains Soul Reaper Powers",
    type: EventType.POWER_GAIN,
    description: "Rukia Kuchiki pierces Ichigo Kurosaki with her Zanpakutō, transferring her Soul Reaper powers to him so he can protect his family from a Hollow.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 1,
    arcName: "Substitute Shinigami Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Rukia Kuchiki's Arrest",
    type: EventType.OTHER,
    description: "Byakuya Kuchiki and Renji Abarai arrive in the Human World to arrest Rukia Kuchiki for the crime of transferring her powers to a human.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 16,
    arcName: "Substitute Shinigami Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Ryoka Invasion of Seireitei",
    type: EventType.INVASION,
    description: "Ichigo Kurosaki and his friends launch into Seireitei via Kukaku Shiba's fireworks cannon to rescue Rukia Kuchiki from her execution.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 22,
    arcName: "Soul Society: The Sneak Entry Arc",
    locationName: "Seireitei"
  },
  {
    title: "Rukia Kuchiki's Execution Ordered",
    type: EventType.OTHER,
    description: "The execution of Rukia Kuchiki is officially ordered and its scheduled date is advanced by what is believed to be the Central 46, but is actually Sosuke Aizen's orchestration.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 35,
    arcName: "Soul Society: The Sneak Entry Arc",
    locationName: "Central 46 Chambers"
  },
  {
    title: "Rukia Kuchiki's Execution Cancelled",
    type: EventType.RESCUE,
    description: "Just as the Sokyoku is released to execute Rukia, Ichigo Kurosaki destroys the execution stand with the help of Kyoraku and Ukitake, rescuing Rukia.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 54,
    arcName: "Soul Society: The Rescue Arc",
    locationName: "Sokyoku Hill"
  },
  {
    title: "Sosuke Aizen Reveals His Betrayal",
    type: EventType.BETRAYAL,
    description: "Aizen reveals that he faked his own death and slaughtered the Central 46, revealing his grand plan to obtain the Hogyoku hidden inside Rukia.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 60,
    arcName: "Soul Society: The Rescue Arc",
    locationName: "Central 46 Chambers"
  },
  {
    title: "Sosuke Aizen Defects from Soul Society",
    type: EventType.BETRAYAL,
    description: "Sosuke Aizen extracts the Hogyoku from Rukia Kuchiki and defects to Hueco Mundo using the Negacion with Gin Ichimaru and Kaname Tosen.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 62,
    arcName: "Soul Society: The Rescue Arc",
    locationName: "Sokyoku Hill"
  },
  {
    title: "Arrival of the Arrancar",
    type: EventType.INVASION,
    description: "The Arrancars Ulquiorra Cifer and Yammy Llargo arrive in Karakura Town on Aizen's orders, marking the beginning of the Arrancar conflict.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 113,
    arcName: "Arrancar: The Arrival Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Orihime Inoue Kidnapped",
    type: EventType.OTHER,
    description: "Ulquiorra Cifer corners Orihime Inoue in the Dangai, forcing her to accompany him to Hueco Mundo in exchange for sparing her friends' lives.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 143,
    arcName: "Arrancar: The Hueco Mundo Sneak Entry Arc",
    locationName: "Dangai"
  },
  {
    title: "Vizards Begin Training Ichigo",
    type: EventType.OTHER,
    description: "Ichigo Kurosaki approaches the Vizards in their secret warehouse to learn how to control his inner Hollow and prevent it from taking over.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 122,
    arcName: "Arrancar: The Arrival Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Ichigo Masters Hollow Mask",
    type: EventType.POWER_GAIN,
    description: "Through intense training in his inner world, Ichigo defeats his inner Hollow, mastering the Hollow mask and gaining a massive boost in combat power.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 125,
    arcName: "Arrancar: The Arrival Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Rescue Mission to Hueco Mundo",
    type: EventType.RESCUE,
    description: "Ichigo Kurosaki, Uryu Ishida, and Yasutora Sado launch an unauthorized rescue mission into Hueco Mundo to save Orihime Inoue from Las Noches.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 144,
    arcName: "Arrancar: The Hueco Mundo Sneak Entry Arc",
    locationName: "Las Noches"
  },
  {
    title: "Neliel Tu Odelschwanck Reveals Her True Form",
    type: EventType.TRANSFORMATION,
    description: "To protect an injured Ichigo from the Espada Nnoitra Gilga, the toddler Nel reverts back to her original form as the former 3rd Espada, Nelliel.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 192,
    arcName: "Arrancar vs. Shinigami Arc",
    locationName: "Las Noches"
  },
  {
    title: "Ichigo Undergoes Vasto Lorde Transformation",
    type: EventType.TRANSFORMATION,
    description: "Mortally wounded by Ulquiorra, Ichigo's Hollow powers completely consume him, transforming him into a mindless, extremely powerful Vasto Lorde state.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 271,
    arcName: "Arrancar: Downfall Arc",
    locationName: "Las Noches"
  },
  {
    title: "Ulquiorra Cifer's Death",
    type: EventType.DEATH,
    description: "Following a brutal clash with Ichigo's Vasto Lorde form, Ulquiorra Cifer's body disintegrates into ash as he finally begins to understand the concept of a heart.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 272,
    arcName: "Arrancar: Downfall Arc",
    locationName: "Las Noches"
  },
  {
    title: "Battle of Fake Karakura Town",
    type: EventType.BATTLE,
    description: "The Gotei 13 captains and Visoreds join forces to fight Sosuke Aizen, his top Espadas, and their Fracciones in a simulated town barrier.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 213,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    locationName: "Fake Karakura Town"
  },
  {
    title: "Wonderweiss Seals Ryujin Jakka",
    type: EventType.POWER_LOSS,
    description: "The modified Arrancar Wonderweiss Margela intercepts Yamamoto, sealing the flames of Ryujin Jakka at the cost of his speech and reason.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 293,
    arcName: "Arrancar: Downfall Arc",
    locationName: "Fake Karakura Town"
  },
  {
    title: "Gin Ichimaru Betrays Sosuke Aizen",
    type: EventType.BETRAYAL,
    description: "Gin Ichimaru reveals his lifelong plan of revenge, piercing Aizen with his Bankai Kamishini no Yari to steal the Hogyoku.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 307,
    arcName: "Arrancar: Downfall Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Gin Ichimaru's Death",
    type: EventType.DEATH,
    description: "Having failed to kill the newly evolved Aizen, Gin Ichimaru is fatally slashed by Aizen, dying in Rangiku Matsumoto's arms.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 308,
    arcName: "Arrancar: Downfall Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Ichigo Uses Final Getsuga Tensho",
    type: EventType.TRANSFORMATION,
    description: "Ichigo releases the Final Getsuga Tensho (Mugetsu), trading all of his Soul Reaper powers for the ultimate strike to weaken Aizen.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 309,
    arcName: "Arrancar: Downfall Arc",
    locationName: "Fake Karakura Town"
  },
  {
    title: "Sosuke Aizen's Defeat and Sealing",
    type: EventType.BATTLE,
    description: "With Aizen weakened by Mugetsu, Kisuke Urahara's Kido seal activates, capturing and sealing Aizen for his crimes.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 310,
    arcName: "Arrancar: Downfall Arc",
    locationName: "Fake Karakura Town"
  },
  {
    title: "Ichigo Kurosaki Loses Soul Reaper Powers",
    type: EventType.POWER_LOSS,
    description: "Following the aftermath of the battle against Aizen, the residual energy of the Final Getsuga Tensho fades, leaving Ichigo completely powerless.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 342,
    arcName: "The Gotei 13 Invasion Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Ichigo Begins Fullbring Training",
    type: EventType.OTHER,
    description: "Desperately wanting to protect his friends, Ichigo joins Xcution and begins training to harness his latent Fullbring powers.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 343,
    arcName: "The Lost Substitute Shinigami Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Kugo Ginjo Betrays Ichigo Kurosaki",
    type: EventType.BETRAYAL,
    description: "Kugo Ginjo reveals his status as the first Substitute Soul Reaper and betrays Ichigo, stealing his completed Fullbring powers.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 359,
    arcName: "The Lost Substitute Shinigami Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Ichigo Regains Soul Reaper Powers",
    type: EventType.POWER_GAIN,
    description: "Rukia Kuchiki stabs Ichigo with a sword containing spiritual energy from the Gotei 13 captains, restoring his Soul Reaper powers.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 361,
    arcName: "The Lost Substitute Shinigami Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Kugo Ginjo's Death",
    type: EventType.DEATH,
    description: "Ichigo Kurosaki defeats Kugo Ginjo in a final duel, killing him and later requesting that his body be buried in the Human World.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 366,
    arcName: "The Lost Substitute Shinigami Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Wandenreich Declares War",
    type: EventType.OTHER,
    description: "Luders Friegen and other Quincy soldiers infiltrate Yamamoto's office, declaring that the Wandenreich will destroy Soul Society in five days.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 367,
    arcName: "Thousand-Year Blood War Arc",
    locationName: "Squad 1 Barracks"
  },
  {
    title: "First Quincy Invasion of Soul Society",
    type: EventType.INVASION,
    description: "The Sternritter launch a sudden, devastating invasion of Seireitei, stealing the Bankai of several captains and leaving the Soul Society in ruins.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 368,
    arcName: "Thousand-Year Blood War Arc",
    locationName: "Seireitei"
  },
  {
    title: "Bankai Theft by the Sternritter",
    type: EventType.POWER_LOSS,
    description: "During the first invasion, the Sternritters use special Quincy medallions to steal the Bankai of Byakuya, Hitsugaya, Soi Fon, and Kensei.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 369,
    arcName: "Thousand-Year Blood War Arc",
    locationName: "Seireitei"
  },
  {
    title: "Death of Genryusai Shigekuni Yamamoto",
    type: EventType.DEATH,
    description: "Head Captain Yamamoto is cut down and obliterated by Yhwach after his Bankai, Zanka no Tachi, is stolen.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 375,
    arcName: "Thousand-Year Blood War Arc",
    locationName: "Seireitei"
  },
  {
    title: "Royal Guard Arrives",
    type: EventType.OTHER,
    description: "The Zero Division descends in the Tenbarin to escort Ichigo, Rukia, Renji, and Byakuya to the Soul King Palace for healing and training.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 376,
    arcName: "Thousand-Year Blood War Arc",
    locationName: "Seireitei"
  },
  {
    title: "Retsu Unohana Trains Kenpachi Zaraki",
    type: EventType.OTHER,
    description: "To unlock Kenpachi Zaraki's latent potential, Captain-Commander Kyoraku orders Retsu Unohana to train him to the death in Muken.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 378,
    arcName: "Thousand-Year Blood War Arc",
    locationName: "Underground Training Ground"
  },
  {
    title: "Death of Retsu Unohana",
    type: EventType.DEATH,
    description: "At the conclusion of their duel in Muken, Retsu Unohana is killed by Kenpachi Zaraki, passing on the title of Kenpachi.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 378,
    arcName: "Thousand-Year Blood War Arc",
    locationName: "Underground Training Ground"
  },
  {
    title: "Kenpachi Zaraki Unlocks His True Power",
    type: EventType.POWER_GAIN,
    description: "By defeating Unohana, Kenpachi Zaraki finally breaks his mental shackles and hears the voice of his Zanpakuto, Nozarashi.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 378,
    arcName: "Thousand-Year Blood War Arc",
    locationName: "Underground Training Ground"
  },
  {
    title: "Ichigo Learns the Truth About His Origins",
    type: EventType.REVEAL,
    description: "Isshin Kurosaki explains to Ichigo that his mother, Masaki, was a pure-blood Quincy, explaining his diverse genetic and spiritual heritage.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 379,
    arcName: "Thousand-Year Blood War Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Ichigo Awakens True Zangetsu",
    type: EventType.POWER_GAIN,
    description: "Oetsu Nimaiya reforges Zangetsu in the Royal Palace, and Ichigo learns the truth of his Quincy and Hollow heritage, yielding dual blades.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 379,
    arcName: "Thousand-Year Blood War Arc",
    locationName: "Hoohden"
  },
  {
    title: "Second Quincy Invasion of Soul Society",
    type: EventType.INVASION,
    description: "The Wandenreich returns to Seireitei, replacing it with the Quincy city Wahrwelt and launching a final offensive against Gotei 13.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 380,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    locationName: "Seireitei"
  },
  {
    title: "Rukia Kuchiki Achieves Bankai",
    type: EventType.POWER_GAIN,
    description: "Rukia Kuchiki releases her absolute zero Bankai, Hakka no Togame, defeating Sternritter Äs Nödt with Byakuya's guidance.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 385,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    locationName: "Seireitei"
  },
  {
    title: "Renji Abarai Achieves True Bankai",
    type: EventType.POWER_GAIN,
    description: "Renji Abarai releases his true Bankai, Soō Zabimaru, completely vaporizing the Sternritter Mask De Masculine.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 384,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    locationName: "Seireitei"
  },
  {
    title: "Kenpachi Zaraki Achieves Bankai",
    type: EventType.POWER_GAIN,
    description: "Prompted by Yachiru, Kenpachi Zaraki releases his nameless Bankai, transforming into a demonic berserker state to slice through Gerard Valkyrie.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 405,
    arcName: "Thousand-Year Blood War: The Conflict Arc",
    locationName: "Royal Palace"
  },
  {
    title: "Soul King Killed",
    type: EventType.DEATH,
    description: "Controlled by Yhwach's Quincy blood flowing through him, Ichigo Kurosaki unwillingly delivers the fatal blow to the Soul King, destabilizing all worlds.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 393,
    arcName: "Thousand-Year Blood War: The Conflict Arc",
    locationName: "Royal Palace"
  },
  {
    title: "Yhwach Absorbs the Soul King",
    type: EventType.POWER_GAIN,
    description: "Following the death of the Soul King, Yhwach absorbs the Soul King's body and Mimihagi, gaining absolute control over reality.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 395,
    arcName: "Thousand-Year Blood War: The Conflict Arc",
    locationName: "Royal Palace"
  },
  {
    title: "Uryu Ishida Named Yhwach's Successor",
    type: EventType.REVEAL,
    description: "Yhwach introduces Uryu Ishida to the Sternritters, appointing him as the successor to the emperor throne and Sternritter 'A'.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 380,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    locationName: "Silbern"
  },
  {
    title: "Sosuke Aizen Released from Muken",
    type: EventType.OTHER,
    description: "Captain-Commander Shunsui Kyoraku travels to Muken and releases three of Sosuke Aizen's seals to enlist his help in defending Seireitei.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 396,
    arcName: "Thousand-Year Blood War: The Conflict Arc",
    locationName: "Underground Training Ground"
  },
  {
    title: "Yhwach Defeated",
    type: EventType.DEATH,
    description: "Ichigo Kurosaki delivers the final sword blow to split Yhwach in two, aided by Aizen's illusions and Uryu's Still Silver arrow.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: null,
    arcName: "Thousand-Year Blood War: The Calamity Arc",
    locationName: "Royal Palace"
  },
  {
    title: "Kazui Kurosaki Introduced",
    type: EventType.OTHER,
    description: "Ten years after the defeat of Yhwach, Ichigo and Orihime's young son Kazui Kurosaki is introduced, possessing Soul Reaper powers of his own.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: null,
    arcName: "Thousand-Year Blood War: The Calamity Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Isshin Reveals His Past",
    type: EventType.REVEAL,
    description: "Isshin Kurosaki reveals his past to Ichigo, explaining his former life as Captain Isshin Shiba of Gotei 13's Squad 10 and how he met Masaki.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 387,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    locationName: "Karakura Town"
  },
  {
    title: "Aizen Creates the Arrancar Army",
    type: EventType.OTHER,
    description: "Sosuke Aizen uses the Hogyoku to force Hollows to undergo Arrancarization, building an elite Arrancar army in Hueco Mundo.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 113,
    arcName: "Arrancar: The Arrival Arc",
    locationName: "Las Noches"
  },
  {
    title: "Soul King Palace Invasion",
    type: EventType.INVASION,
    description: "Yhwach, Jugram Haschwalth, Uryu Ishida, and the Schutzstaffel breach the barrier of the Royal Palace to assassinate the Soul King.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 389,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    locationName: "Royal Palace"
  },
  {
    title: "Yhwach Kills Ichibe Hyosube",
    type: EventType.DEATH,
    description: "Yhwach activates his eyes of 'The Almighty' to see and alter the future, completely blowing apart Squad 0 leader Ichibe Hyosube.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: 391,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    locationName: "Royal Palace"
  },
  {
    title: "Aizen Released from Chair-Sama Restrictions",
    type: EventType.OTHER,
    description: "During the final battle, Sosuke Aizen is released from the chair restraints that bound his spiritual pressure, allowing him to fight Yhwach.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: null,
    arcName: "Thousand-Year Blood War: The Calamity Arc",
    locationName: "Royal Palace"
  },
  {
    title: "Kazui Removes Yhwach Residual Reiatsu",
    type: EventType.OTHER,
    description: "Ten years after Yhwach's defeat, a residual mass of his Reiatsu appears in Karakura Town and is completely dispersed by Kazui Kurosaki touching it.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: null,
    arcName: "Thousand-Year Blood War: The Calamity Arc",
    locationName: "Karakura Town"
  },

  // --- Bonus Lore Event ---
  {
    title: "Sosuke Aizen Implants the Hogyoku into Rukia Kuchiki",
    type: EventType.OTHER,
    description: "Long before the main story, Sosuke Aizen secretly conceals the Hogyoku inside Rukia Kuchiki's soul to hide it from Soul Society, making her the unwitting carrier of the most powerful artifact in existence.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    episodeNumber: null,
    arcName: "Substitute Shinigami Arc",
    locationName: "Seireitei"
  }
];

const EventData = bleachVerseEventSeedData.map((event) => ({
  ...event,
  slug: slugify(event.title, { lower: true, strict: true }),
}));

export default EventData;

