import { FightType } from "@prisma/client";

const bleachVerseFightSeedData = [
  // ==========================================
  // ICHIGO KUROSAKI FIGHTS
  // ==========================================
  {
    title: "Ichigo Kurosaki vs Rukia Kuchiki",
    slug: "ichigo-vs-rukia-first-encounter",
    type: FightType.DUEL,
    summary: "Ichigo's first encounter with Rukia after she becomes his Soul Reaper. Ichigo attempts to attack Rukia to protect his family from a Hollow, but is easily defeated by her superior combat skills.",
    episodeNumber: 1,
    arcSlug: "substitute-shinigami-arc",
    locationSlug: "karakura-town",
    winnerName: "Rukia Kuchiki"
  },
  {
    title: "Ichigo Kurosaki vs Renji Abarai",
    slug: "ichigo-vs-renji-first-fight",
    type: FightType.DUEL,
    summary: "First battle between Ichigo and Renji when Renji comes to Karakura Town to take Rukia back to Soul Society. Renji easily defeats Ichigo despite his determination, showcasing the gap between a trained Shinigami and a substitute.",
    episodeNumber: 16,
    arcSlug: "substitute-shinigami-arc",
    locationSlug: "karakura-town",
    winnerName: "Renji Abarai"
  },
  {
    title: "Ichigo Kurosaki vs Renji Abarai (Rescue)",
    slug: "ichigo-vs-renji-seireitei-rescue",
    type: FightType.DUEL,
    summary: "Ichigo and Renji clash again during the Seireitei Rescue. After an intense battle, Ichigo overcomes his previous failure and defeats Renji, earning Renji's trust to save Rukia.",
    episodeNumber: 31,
    arcSlug: "soul-society-the-sneak-entry-arc",
    locationSlug: "seireitei",
    winnerName: "Ichigo Kurosaki"
  },
  {
    title: "Ichigo Kurosaki vs Kenpachi Zaraki",
    slug: "ichigo-vs-kenpachi-first-encounter",
    type: FightType.DUEL,
    summary: "Ichigo's first encounter with Kenpachi Zaraki during the Seireitei Rescue. Kenpachi's overwhelming spiritual pressure pushes Ichigo to his absolute limits, resulting in a mutual knockout.",
    episodeNumber: 38,
    arcSlug: "soul-society-the-sneak-entry-arc",
    locationSlug: "seireitei",
    winnerName: null
  },
  {
    title: "Ichigo Kurosaki vs Byakuya Kuchiki",
    slug: "ichigo-vs-byakuya-sokyoku-hill",
    type: FightType.DUEL,
    summary: "Final battle atop Sokyoku Hill before Rukia's execution. Ichigo, having mastered his Bankai, defeats Byakuya in an epic duel, unleashing his inner Hollow mask for the first time.",
    episodeNumber: 58,
    arcSlug: "soul-society-the-rescue-arc",
    locationSlug: "sokyoku-hill",
    winnerName: "Ichigo Kurosaki"
  },
  {
    title: "Ichigo Kurosaki vs Yammy Llargo",
    slug: "ichigo-vs-yammy-first-clash",
    type: FightType.DUEL,
    summary: "Ichigo fights Yammy during the first Espada arrival in Karakura Town. Ichigo overwhelms Yammy with his Bankai, but is suddenly paralyzed by his inner Hollow's interference, leading to a severe beating until Kisuke Urahara and Yoruichi rescue him.",
    episodeNumber: 113,
    arcSlug: "arrancar-the-arrival-arc",
    locationSlug: "karakura-town",
    winnerName: "Yammy Llargo"
  },
  {
    title: "Ichigo Kurosaki vs Grimmjow Jaegerjaquez (Arrival)",
    slug: "ichigo-vs-grimmjow-first",
    type: FightType.DUEL,
    summary: "First confrontation between Ichigo and Grimmjow in Karakura Town. Grimmjow completely dominates Ichigo in hand-to-hand combat, leaving Ichigo heavily injured and questioning his own power.",
    episodeNumber: 121,
    arcSlug: "arrancar-the-arrival-arc",
    locationSlug: "karakura-town",
    winnerName: "Grimmjow Jaegerjaquez"
  },
  {
    title: "Ichigo Kurosaki vs Grimmjow Jaegerjaquez (Clash)",
    slug: "ichigo-vs-grimmjow-second-clash",
    type: FightType.DUEL,
    summary: "Ichigo uses his newly trained Hollow Mask against Grimmjow in Karakura Town. Ichigo dominates the fight initially, but his mask shatters due to a short time limit. The fight is interrupted by Kaname Tosen.",
    episodeNumber: 140,
    arcSlug: "arrancar-the-hueco-mundo-sneak-entry-arc",
    locationSlug: "karakura-town",
    winnerName: null
  },
  {
    title: "Ichigo Kurosaki vs Dordoni Alessandro Del Socaccio",
    slug: "ichigo-vs-dordoni",
    type: FightType.DUEL,
    summary: "Ichigo battles the former Privaron Espada Dordoni in Hueco Mundo. Ichigo is forced to use his Hollow Mask to quickly defeat Dordoni's wind-based attacks.",
    episodeNumber: 152,
    arcSlug: "arrancar-the-fierce-fight-arc",
    locationSlug: "las-noches",
    winnerName: "Ichigo Kurosaki"
  },
  {
    title: "Ichigo Kurosaki vs Ulquiorra Cifer",
    slug: "ichigo-vs-ulquiorra-hueco-mundo",
    type: FightType.DUEL,
    summary: "First major battle between Ichigo and Ulquiorra in Las Noches. Ulquiorra easily defeats Ichigo, leaving a hollow hole in his chest to showcase the absolute gap in their power.",
    episodeNumber: 162,
    arcSlug: "arrancar-the-fierce-fight-arc",
    locationSlug: "las-noches",
    winnerName: "Ulquiorra Cifer"
  },
  {
    title: "Ichigo Kurosaki vs Grimmjow Jaegerjaquez (Final)",
    slug: "ichigo-vs-grimmjow-final-battle",
    type: FightType.DUEL,
    summary: "Final duel between Ichigo and Grimmjow in Las Noches. Grimmjow releases Pantera and Ichigo dons his Hollow Mask. After an intense clash of resolves, Ichigo defeats Grimmjow.",
    episodeNumber: 166,
    arcSlug: "arrancar-the-fierce-fight-arc",
    locationSlug: "las-noches",
    winnerName: "Ichigo Kurosaki"
  },
  {
    title: "Ichigo Kurosaki vs Nnoitra Gilga",
    slug: "ichigo-vs-nnoitra-gilga",
    type: FightType.DUEL,
    summary: "Ichigo, exhausted from his fight with Grimmjow, is immediately attacked by Nnoitra Gilga. Ichigo is severely beaten until Kenpachi Zaraki arrives to intervene.",
    episodeNumber: 191,
    arcSlug: "arrancar-vs-shinigami-arc",
    locationSlug: "las-noches",
    winnerName: "Nnoitra Gilga"
  },
  {
    title: "Ichigo Kurosaki vs Ulquiorra Cifer (Final)",
    slug: "ichigo-vs-ulquiorra-final-las-noches",
    type: FightType.DUEL,
    summary: "Climactic battle atop Las Noches. Ulquiorra releases Murciélago and Segunda Etapa. Ichigo is killed but returns in a berserk Hollow form, completely decimating Ulquiorra.",
    episodeNumber: 271,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "las-noches",
    winnerName: "Ichigo Kurosaki"
  },
  {
    title: "Ichigo Kurosaki vs Sosuke Aizen (Final)",
    slug: "ichigo-vs-aizen-fake-karakura-town",
    type: FightType.DUEL,
    summary: "Epic battle in Fake Karakura Town. Ichigo achieves the Final Getsuga Tenshō after training in the Dangai, completely overwhelming Aizen and leaving him vulnerable to Kisuke Urahara's seal.",
    episodeNumber: 309,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Ichigo Kurosaki"
  },
  {
    title: "Ichigo Kurosaki vs Kugo Ginjo",
    slug: "ichigo-vs-ginjo-final",
    type: FightType.DUEL,
    summary: "Final battle of the Fullbring Arc. Ichigo recovers his Shinigami powers and duels the first substitute Shinigami, Kugo Ginjo, defeating him and restoring peace to Karakura.",
    episodeNumber: 366,
    arcSlug: "the-lost-substitute-shinigami-arc",
    locationSlug: "karakura-town",
    winnerName: "Ichigo Kurosaki"
  },
  {
    title: "Ichigo Kurosaki vs Quilge Opie",
    slug: "ichigo-vs-quilge-opie",
    type: FightType.DUEL,
    summary: "Ichigo enters Hueco Mundo to save the Arrancar and clashes with Sternritter J Quilge Opie. Quilge's Vollständig Biskiel absorbs huge reishi, and he manages to trap Ichigo in his jail.",
    episodeNumber: 369,
    arcSlug: "thousand-year-blood-war-arc",
    locationSlug: "hueco-mundo",
    winnerName: null
  },
  {
    title: "Ichigo Kurosaki vs Yhwach (First)",
    slug: "ichigo-vs-yhwach-first",
    type: FightType.DUEL,
    summary: "Ichigo arrives in Seireitei and clashes with Quincy Emperor Yhwach. Yhwach dominates the fight and breaks Ichigo's Bankai blade before retreating due to a time limit.",
    episodeNumber: 374,
    arcSlug: "thousand-year-blood-war-arc",
    locationSlug: "seireitei",
    winnerName: "Yhwach"
  },
  {
    title: "Ichigo Kurosaki vs Candice Catnipp",
    slug: "ichigo-vs-candice",
    type: FightType.DUEL,
    summary: "Ichigo returns from the Royal Palace and easily handles Candice Catnipp and the other female Sternritter using his new dual-blade Shikai.",
    episodeNumber: 387,
    arcSlug: "thousand-year-blood-war-the-separation-arc",
    locationSlug: "seireitei",
    winnerName: "Ichigo Kurosaki"
  },
  {
    title: "Ichigo Kurosaki vs Yhwach (Final)",
    slug: "ichigo-vs-yhwach-final-battle",
    type: FightType.DUEL,
    summary: "The ultimate final battle. With the help of Uryu's still silver arrow and Aizen's illusions, Ichigo manages to cut Yhwach down with his original Zangetsu form.",
    episodeNumber: null,
    arcSlug: "thousand-year-blood-war-the-calamity-arc",
    locationSlug: "royal-palace",
    winnerName: "Ichigo Kurosaki"
  },
  {
    title: "Ikkaku Madarame vs Ichigo Kurosaki",
    slug: "ikkaku-vs-ichigo",
    type: FightType.DUEL,
    summary: "The first fight of the Ryoka invasion. Ikkaku clashes with Ichigo in Seireitei and is defeated, warning Ichigo about Captain Zaraki.",
    episodeNumber: 26,
    arcSlug: "soul-society-the-sneak-entry-arc",
    locationSlug: "seireitei",
    winnerName: "Ichigo Kurosaki"
  },
  {
    title: "Hiyori Sarugaki vs Ichigo Kurosaki",
    slug: "hiyori-vs-ichigo-training",
    type: FightType.TRAINING,
    summary: "Hiyori spars with Ichigo to help him control his inner Hollow, prompting a sudden out-of-control Hollow transformation from Ichigo.",
    episodeNumber: 122,
    arcSlug: "arrancar-the-arrival-arc",
    locationSlug: "karakura-town",
    winnerName: null
  },
  // ==========================================
  // RUKIA KUCHIKI FIGHTS
  // ==========================================
  {
    title: "Rukia Kuchiki vs Di Roy Rinker",
    slug: "rukia-vs-di-roy",
    type: FightType.DUEL,
    summary: "Rukia showcases the beautiful ice abilities of her released Zanpakutō, Sode no Shirayuki, completely freezing the Arrancar Di Roy.",
    episodeNumber: 117,
    arcSlug: "arrancar-the-arrival-arc",
    locationSlug: "karakura-town",
    winnerName: "Rukia Kuchiki"
  },
  {
    title: "Rukia Kuchiki vs Aaroniero Arruruerie",
    slug: "rukia-vs-aaroniero",
    type: FightType.DUEL,
    summary: "Rukia faces the 9th Espada Aaroniero in Las Noches. Despite the psychological horror of him using Kaien Shiba's face and memories, Rukia defeats him with a third dance technique.",
    episodeNumber: 160,
    arcSlug: "arrancar-the-fierce-fight-arc",
    locationSlug: "las-noches",
    winnerName: "Rukia Kuchiki"
  },
  {
    title: "Rukia Kuchiki vs Rudbornn Chelute",
    slug: "rukia-vs-rudbornn",
    type: FightType.DUEL,
    summary: "Rukia fights Rudbornn Chelute, leader of the Exequias. She freezes his branch-spawning abilities until the battle is interrupted.",
    episodeNumber: 272,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "las-noches",
    winnerName: "Rukia Kuchiki"
  },
  {
    title: "Rukia Kuchiki vs Riruka Dokugamine",
    slug: "rukia-vs-riruka",
    type: FightType.DUEL,
    summary: "Rukia faces the Fullbringer Riruka Dokugamine. Riruka traps Rukia's soul inside a plush toy using her dollhouse Fullbring.",
    episodeNumber: 361,
    arcSlug: "the-lost-substitute-shinigami-arc",
    locationSlug: "karakura-town",
    winnerName: "Rukia Kuchiki"
  },
  {
    title: "Rukia Kuchiki vs Äs Nödt",
    slug: "rukia-vs-as-nodt",
    type: FightType.DUEL,
    summary: "Rukia faces Sternritter F Äs Nödt in the second invasion. Rukia overcomes his fear-based Schrift using absolute zero techniques, unleashing her stunning Bankai with Byakuya's support.",
    episodeNumber: 385,
    arcSlug: "thousand-year-blood-war-the-separation-arc",
    locationSlug: "seireitei",
    winnerName: "Rukia Kuchiki"
  },
  // ==========================================
  // ORIHIME INOUE FIGHTS
  // ==========================================
  {
    title: "Orihime Inoue vs Loly Aivirrne",
    slug: "orihime-vs-loly",
    type: FightType.DUEL,
    summary: "Loly Aivirrne attacks Orihime Inoue in her quarters in Las Noches due to jealousy. Orihime uses her Santen Keshun shield to block Loly's strikes, maintaining her pacifism until Grimmjow Jaegerjaquez arrives to intervene.",
    episodeNumber: 165,
    arcSlug: "arrancar-the-fierce-fight-arc",
    locationSlug: "las-noches",
    winnerName: null
  },
  // ==========================================
  // YASUTORA SADO (CHAD) FIGHTS
  // ==========================================
  {
    title: "Yasutora Sado vs Shrieker",
    slug: "chad-vs-shrieker",
    type: FightType.DUEL,
    summary: "Chad protects the soul of a young boy from a malicious bat-winged Hollow named Shrieker, discovering the explosive power of his right arm.",
    episodeNumber: 4,
    arcSlug: "substitute-shinigami-arc",
    locationSlug: "karakura-town",
    winnerName: "Yasutora Sado"
  },
  {
    title: "Yasutora Sado vs Shunsui Kyoraku",
    slug: "chad-vs-shunsui",
    type: FightType.DUEL,
    summary: "Chad encounters Captain Shunsui Kyoraku in Seireitei. Despite his powerful defense and strikes, Chad is effortlessly defeated by the Captain's superior speed and swordplay.",
    episodeNumber: 37,
    arcSlug: "soul-society-the-sneak-entry-arc",
    locationSlug: "seireitei",
    winnerName: "Shunsui Kyoraku"
  },
  {
    title: "Yasutora Sado vs Gantenbainne Mosqueda",
    slug: "chad-vs-gantenbainne",
    type: FightType.DUEL,
    summary: "Chad fights the Privaron Espada Gantenbainne. Chad awakens both Brazo Derecha de Gigante and Brazo Izquierda del Diablo, earning a hard-fought victory.",
    episodeNumber: 154,
    arcSlug: "arrancar-the-fierce-fight-arc",
    locationSlug: "las-noches",
    winnerName: "Yasutora Sado"
  },
  {
    title: "Yasutora Sado vs Nnoitra Gilga",
    slug: "chad-vs-nnoitra",
    type: FightType.DUEL,
    summary: "Directly after defeating Gantenbainne, Chad is confronted by Nnoitra Gilga. Nnoitra's hierarchical power and iron skin easily shatter Chad's arm shield, leaving him defeated.",
    episodeNumber: 157,
    arcSlug: "arrancar-the-fierce-fight-arc",
    locationSlug: "las-noches",
    winnerName: "Nnoitra Gilga"
  },
  // ==========================================
  // URYU ISHIDA FIGHTS
  // ==========================================
  {
    title: "Uryu Ishida vs Jirōbō Ikkanzaka",
    slug: "uryu-vs-jirobo",
    type: FightType.DUEL,
    summary: "Uryu quickly disarms the 4th Seat of Squad 7, Jirōbō, destroying his wind-scythe Shikai and severing his spirit energy points.",
    episodeNumber: 28,
    arcSlug: "soul-society-the-sneak-entry-arc",
    locationSlug: "seireitei",
    winnerName: "Uryu Ishida"
  },
  {
    title: "Uryu Ishida vs Mayuri Kurotsuchi",
    slug: "uryu-vs-mayuri",
    type: FightType.DUEL,
    summary: "Uryu battles Captain Mayuri Kurotsuchi to avenge his grandfather. Uryu uses Quincy Letzt Stil to shatter Mayuri's Bankai caterpillar, though losing his own Quincy powers in the process.",
    episodeNumber: 44,
    arcSlug: "soul-society-the-rescue-arc",
    locationSlug: "seireitei",
    winnerName: "Uryu Ishida"
  },
  {
    title: "Uryu Ishida vs Cirucci Sanderwicci",
    slug: "uryu-vs-cirucci",
    type: FightType.DUEL,
    summary: "Uryu faces the bird-like Privaron Espada Cirucci in Las Noches. Uryu defeats her using Seele Schneider, cutting through her iron wings.",
    episodeNumber: 155,
    arcSlug: "arrancar-the-fierce-fight-arc",
    locationSlug: "las-noches",
    winnerName: "Uryu Ishida"
  },
  {
    title: "Uryu Ishida & Renji Abarai vs Szayelaporro Granz",
    slug: "uryu-renji-vs-szayelaporro",
    type: FightType.TEAM_BATTLE,
    summary: "Uryu and Renji team up against the scientist Espada Szayelaporro Granz. Their combined combat effort is countered by Szayelaporro's doll manipulation, and they are saved by Mayuri.",
    episodeNumber: 195,
    arcSlug: "arrancar-vs-shinigami-arc",
    locationSlug: "las-noches",
    winnerName: null
  },
  {
    title: "Uryu Ishida vs Jugram Haschwalth",
    slug: "uryu-vs-haschwalth",
    type: FightType.DUEL,
    summary: "Uryu faces Yhwach's right hand, Jugram Haschwalth, during the final battle. Uryu fights using his Schrift, The Antithesis, transferring his damage onto Haschwalth.",
    episodeNumber: null,
    arcSlug: "thousand-year-blood-war-the-calamity-arc",
    locationSlug: "royal-palace",
    winnerName: null
  },
  // ==========================================
  // GENRYUSAI SHIGEKUNI YAMAMOTO FIGHTS
  // ==========================================
  {
    title: "Genryusai Shigekuni Yamamoto vs Shunsui Kyoraku & Jushiro Ukitake",
    slug: "yamamoto-vs-shunsui-ukitake",
    type: FightType.TEAM_BATTLE,
    summary: "The Head Captain battles his two oldest pupils. The clash of their legendary dual Shikais and Ryujin Jakka creates massive heat before being cut short.",
    episodeNumber: 55,
    arcSlug: "soul-society-the-rescue-arc",
    locationSlug: "seireitei",
    winnerName: null
  },
  {
    title: "Genryusai Shigekuni Yamamoto vs Ayon",
    slug: "yamamoto-vs-ayon",
    type: FightType.DUEL,
    summary: "Head Captain Yamamoto steps in to easily incinerate the chimera monster Ayon using only his Shikai and basic martial arts.",
    episodeNumber: 225,
    arcSlug: "arrancar-decisive-battle-of-karakura-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Genryusai Shigekuni Yamamoto"
  },
  {
    title: "Genryusai Shigekuni Yamamoto vs Wonderweiss Margela",
    slug: "yamamoto-vs-wonderweiss",
    type: FightType.DUEL,
    summary: "Wonderweiss, created specifically to extinguish Ryujin Jakka's flames, fights Yamamoto. Yamamoto defeats him using his bare fists, crushing the Arrancar.",
    episodeNumber: 294,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Genryusai Shigekuni Yamamoto"
  },
  {
    title: "Genryusai Shigekuni Yamamoto vs Driscoll Berci",
    slug: "yamamoto-vs-driscoll",
    type: FightType.DUEL,
    summary: "Yamamoto confronts the Sternritter who killed Chojiro Sasakibe. Outraged at the theft of his lieutenant's Bankai, Yamamoto completely incinerates Driscoll to ashes.",
    episodeNumber: 371,
    arcSlug: "thousand-year-blood-war-arc",
    locationSlug: "seireitei",
    winnerName: "Genryusai Shigekuni Yamamoto"
  },
  {
    title: "Genryusai Shigekuni Yamamoto vs Yhwach (Royd)",
    slug: "yamamoto-vs-fake-yhwach",
    type: FightType.DUEL,
    summary: "Yamamoto unleashes his ultimate Bankai: Zanka no Tachi, exhausting all its four directions to defeat who he believes is Yhwach. The opponent is revealed to be Royd Lloyd in disguise.",
    episodeNumber: 373,
    arcSlug: "thousand-year-blood-war-arc",
    locationSlug: "seireitei",
    winnerName: "Genryusai Shigekuni Yamamoto"
  },
  {
    title: "Sosuke Aizen vs Genryusai Shigekuni Yamamoto",
    slug: "aizen-vs-yamamoto",
    type: FightType.DUEL,
    summary: "Sosuke Aizen confronts Genryusai Shigekuni Yamamoto in Fake Karakura Town. Yamamoto attempts to trap Aizen in a suicide flame barrier, but Aizen's custom-engineered Arrancar, Wonderweiss Margela, seals Yamamoto's flames, forcing the Head Captain to fight bare-handed.",
    episodeNumber: 293,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Sosuke Aizen"
  },
  // ==========================================
  // SHUNSUI KYORAKU FIGHTS
  // ==========================================
  {
    title: "Shunsui Kyoraku vs Coyote Starrk (Team)",
    slug: "shunsui-ukitake-vs-starrk",
    type: FightType.TEAM_BATTLE,
    summary: "Shunsui and Ukitake clash with Primera Espada Coyote Starrk. The Arrancar releases Los Lobos, generating explosive wolf packs, and the battle is interrupted.",
    episodeNumber: 277,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "fake-karakura-town",
    winnerName: null
  },
  {
    title: "Shunsui Kyoraku vs Coyote Starrk (Final)",
    slug: "shunsui-vs-starrk-final",
    type: FightType.DUEL,
    summary: "Conclusive battle between Shunsui and Starrk. Shunsui uses his Shikai games to trick and fatally slash the Primera Espada, winning the duel.",
    episodeNumber: 283,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Shunsui Kyoraku"
  },
  {
    title: "Shunsui Kyoraku vs Lille Barro",
    slug: "shunsui-vs-lille-barro",
    type: FightType.DUEL,
    summary: "Shunsui faces Schutzstaffel Lille Barro. Cornered by Lille's absolute pierce Schrift, Shunsui activates his tragic Bankai: Katen Kyōkotsu: Karamatsu Shinjū.",
    episodeNumber: 395,
    arcSlug: "thousand-year-blood-war-the-conflict-arc",
    locationSlug: "royal-palace",
    winnerName: null
  },
  // ==========================================
  // JUSHIRO UKITAKE FIGHTS
  // ==========================================
  {
    title: "Jushiro Ukitake vs Lilynette Gingerbuck",
    slug: "ukitake-vs-lilynette",
    type: FightType.DUEL,
    summary: "Ukitake fights Starrk's Fracción Lilynette. Ukitake treats her like a child, refusing to use his sword and easily swatting away her weak headbutt/sword attempts.",
    episodeNumber: 224,
    arcSlug: "arrancar-decisive-battle-of-karakura-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Jushiro Ukitake"
  },
  // ==========================================
  // SAJIN KOMAMURA FIGHTS
  // ==========================================
  {
    title: "Sajin Komamura & Kaname Tosen vs Kenpachi Zaraki",
    slug: "komamura-tosen-vs-kenpachi",
    type: FightType.TEAM_BATTLE,
    summary: "Komamura and Tosen confront Kenpachi during the Ryoka invasion. Tosen releases his Bankai dome, and Komamura summons his giant armored samurai Bankai, but Kenpachi relishes the fight.",
    episodeNumber: 53,
    arcSlug: "soul-society-the-rescue-arc",
    locationSlug: "seireitei",
    winnerName: null
  },
  {
    title: "Sajin Komamura vs Sosuke Aizen",
    slug: "komamura-vs-aizen",
    type: FightType.DUEL,
    summary: "Komamura confronts Aizen at the execution stand after Aizen's betrayal. Aizen easily defeats Komamura's giant Bankai with a high-level black coffin Kido.",
    episodeNumber: 60,
    arcSlug: "soul-society-the-rescue-arc",
    locationSlug: "seireitei",
    winnerName: "Sosuke Aizen"
  },
  {
    title: "Sajin Komamura vs Choe Neng Poww",
    slug: "komamura-vs-poww",
    type: FightType.DUEL,
    summary: "Komamura fights the giant Arrancar Poww in Fake Karakura. Komamura calls upon Kokujō Tengen Myō'ō to punch and throw the giant Arrancar, crushing him.",
    episodeNumber: 220,
    arcSlug: "arrancar-decisive-battle-of-karakura-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Sajin Komamura"
  },
  {
    title: "Sajin Komamura vs Bambietta Basterbine",
    slug: "komamura-vs-bambietta",
    type: FightType.DUEL,
    summary: "Komamura fights Bambietta in the second invasion. Using his clan's Humanization Technique, he manifests an immortal heartless body to crush Bambietta's explosions.",
    episodeNumber: 383,
    arcSlug: "thousand-year-blood-war-the-separation-arc",
    locationSlug: "seireitei",
    winnerName: "Sajin Komamura"
  },
  {
    title: "Kaname Tosen vs Sajin Komamura & Shuhei Hisagi",
    slug: "tosen-vs-komamura-hisagi",
    type: FightType.TEAM_BATTLE,
    summary: "Tosen, using Hollowfication and Resurrección, fights Komamura and Hisagi in Fake Karakura. Hisagi blindsides Tosen with a fatal blade to the throat.",
    episodeNumber: 291,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Sajin Komamura"
  },
  // ==========================================
  // BYAKUYA KUCHIKI FIGHTS
  // ==========================================
  {
    title: "Byakuya Kuchiki vs Ganju Shiba",
    slug: "byakuya-vs-ganju",
    type: FightType.DUEL,
    summary: "Byakuya easily defeats Ganju Shiba near the repenting tower, using his Shikai scatter for the first time to shred Ganju's sand techniques.",
    episodeNumber: 28,
    arcSlug: "soul-society-the-sneak-entry-arc",
    locationSlug: "seireitei",
    winnerName: "Byakuya Kuchiki"
  },
  {
    title: "Byakuya Kuchiki vs Renji Abarai",
    slug: "byakuya-vs-renji-duel",
    type: FightType.DUEL,
    summary: "Renji challenges his captain to save Rukia. Byakuya releases his Bankai, Senbonzakura Kageyoshi, to crush Renji's newly achieved Bankai.",
    episodeNumber: 52,
    arcSlug: "soul-society-the-rescue-arc",
    locationSlug: "seireitei",
    winnerName: "Byakuya Kuchiki"
  },
  {
    title: "Byakuya Kuchiki vs Zommari Rureaux",
    slug: "byakuya-vs-zommari",
    type: FightType.DUEL,
    summary: "Byakuya faces the 7th Espada Zommari in Las Noches. Byakuya counters Zommari's control ability by severing his own tendons and shredding Zommari with Bankai.",
    episodeNumber: 198,
    arcSlug: "arrancar-vs-shinigami-arc",
    locationSlug: "las-noches",
    winnerName: "Byakuya Kuchiki"
  },
  {
    title: "Byakuya Kuchiki vs Shukuro Tsukishima",
    slug: "byakuya-vs-tsukishima",
    type: FightType.DUEL,
    summary: "Byakuya fights the Fullbringer Tsukishima. Despite Tsukishima inserting himself into Byakuya's past and knowing all his Bankai secrets, Byakuya outwits and kills him.",
    episodeNumber: 363,
    arcSlug: "the-lost-substitute-shinigami-arc",
    locationSlug: "karakura-town",
    winnerName: "Byakuya Kuchiki"
  },
  {
    title: "Byakuya Kuchiki vs Äs Nödt",
    slug: "byakuya-vs-as-nodt-first",
    type: FightType.DUEL,
    summary: "Byakuya is ambushed by Sternritter F Äs Nödt in the first Quincy invasion. Äs Nödt steals Byakuya's Bankai and brutally shreds him, leaving him near death.",
    episodeNumber: 371,
    arcSlug: "thousand-year-blood-war-arc",
    locationSlug: "seireitei",
    winnerName: "Äs Nödt"
  },
  {
    title: "Kenpachi Zaraki and Byakuya Kuchiki vs Yammy Llargo",
    slug: "kenpachi-byakuya-vs-yammy",
    type: FightType.TEAM_BATTLE,
    summary: "Captains Kenpachi Zaraki and Byakuya Kuchiki team up in Las Noches to fight the giant 0th Espada, Yammy Llargo. Despite their intense rivalry and bickering, the two captains combine their lethal powers to defeat the massive Espada.",
    episodeNumber: 310,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "las-noches",
    winnerName: null
  },
  {
    title: "Kenpachi Zaraki, Byakuya Kuchiki and Toshiro Hitsugaya vs Gerard Valkyrie",
    slug: "captains-vs-gerard",
    type: FightType.TEAM_BATTLE,
    summary: "An ultimate cooperative battle in the Royal Palace. Captains Kenpachi Zaraki, Byakuya Kuchiki, and Toshiro Hitsugaya combine their peak powers—including Kenpachi's berserk Bankai and Hitsugaya's adult Bankai—to battle the immortal giant Gerard Valkyrie.",
    episodeNumber: 405,
    arcSlug: "thousand-year-blood-war-the-conflict-arc",
    locationSlug: "royal-palace",
    winnerName: null
  },
  // ==========================================
  // KENPACHI ZARAKI FIGHTS
  // ==========================================
  {
    title: "Kenpachi Zaraki vs Ikkaku Madarame (Flashback)",
    slug: "kenpachi-vs-ikkaku-flashback",
    type: FightType.DUEL,
    summary: "A flashback fight in Rukongai showing how Kenpachi defeated Ikkaku, inspiring Ikkaku to join the Gotei 13 to serve under him.",
    episodeNumber: 39,
    arcSlug: "soul-society-the-sneak-entry-arc",
    locationSlug: "rukongai",
    winnerName: "Kenpachi Zaraki"
  },
  {
    title: "Kenpachi Zaraki vs Nnoitra Gilga",
    slug: "kenpachi-vs-nnoitra",
    type: FightType.DUEL,
    summary: "Kenpachi fights the 5th Espada Nnoitra Gilga. After suffering multiple slash wounds, Kenpachi uses two hands on his sword (kendo) to cut down the Espada.",
    episodeNumber: 202,
    arcSlug: "arrancar-vs-shinigami-arc",
    locationSlug: "las-noches",
    winnerName: "Kenpachi Zaraki"
  },
  {
    title: "Kenpachi Zaraki vs Giriko Kutsuzawa",
    slug: "kenpachi-vs-giriko",
    type: FightType.DUEL,
    summary: "Kenpachi instantly cuts the giant transformed Fullbringer Giriko Kutsuzawa in half, expressing boredom at the weak opponent.",
    episodeNumber: 363,
    arcSlug: "the-lost-substitute-shinigami-arc",
    locationSlug: "karakura-town",
    winnerName: "Kenpachi Zaraki"
  },
  {
    title: "Kenpachi Zaraki vs Yhwach (Royd)",
    slug: "kenpachi-vs-fake-yhwach",
    type: FightType.DUEL,
    summary: "Kenpachi attacks the Quincy Emperor after defeating three Sternritter off-screen. Royd Lloyd (posing as Yhwach) easily defeats Kenpachi.",
    episodeNumber: 373,
    arcSlug: "thousand-year-blood-war-arc",
    locationSlug: "seireitei",
    winnerName: "Royd Lloyd"
  },
  {
    title: "Kenpachi Zaraki vs Retsu Unohana",
    slug: "kenpachi-vs-unohana-final",
    type: FightType.DUEL,
    summary: "Kenpachi trains with Retsu Unohana (Yachiru, the first Kenpachi) in the Muken. She kills and revives him repeatedly to unlock his true power. Kenpachi kills her, inherits the title, and hears his sword.",
    episodeNumber: 382,
    arcSlug: "thousand-year-blood-war-the-separation-arc",
    locationSlug: "seireitei",
    winnerName: "Kenpachi Zaraki"
  },
  {
    title: "Kenpachi Zaraki vs Gremmy Thoumeaux",
    slug: "kenpachi-vs-gremmy",
    type: FightType.DUEL,
    summary: "Kenpachi fights Sternritter V Gremmy, who can materialize anything. Kenpachi releases his giant cleaver Shikai, Nozarashi, to slice Gremmy's giant meteor.",
    episodeNumber: 386,
    arcSlug: "thousand-year-blood-war-the-separation-arc",
    locationSlug: "seireitei",
    winnerName: "Kenpachi Zaraki"
  },
  // ==========================================
  // TOSHIRO HITSUGAYA FIGHTS
  // ==========================================
  {
    title: "Toshiro Hitsugaya vs Gin Ichimaru",
    slug: "hitsugaya-vs-gin",
    type: FightType.DUEL,
    summary: "Hitsugaya confronts Gin Ichimaru in Seireitei to protect Hinamori. Hitsugaya releases Hyorinmaru Shikai, but the fight is interrupted by Rangiku Matsumoto.",
    episodeNumber: 48,
    arcSlug: "soul-society-the-rescue-arc",
    locationSlug: "seireitei",
    winnerName: null
  },
  {
    title: "Toshiro Hitsugaya vs Shawlong Koufang",
    slug: "hitsugaya-vs-shawlong",
    type: FightType.DUEL,
    summary: "Hitsugaya battles Shawlong in Karakura Town. After receiving approval to release the captain's spiritual power limit, he defeats the Arrancar using Bankai.",
    episodeNumber: 121,
    arcSlug: "arrancar-the-arrival-arc",
    locationSlug: "karakura-town",
    winnerName: "Toshiro Hitsugaya"
  },
  {
    title: "Toshiro Hitsugaya vs Luppi Antenor",
    slug: "hitsugaya-vs-luppi",
    type: FightType.DUEL,
    summary: "Hitsugaya fights the temporary Sexta Espada Luppi. Hitsugaya uses his ice prison technique to trap and crush Luppi's eight tentacles.",
    episodeNumber: 139,
    arcSlug: "arrancar-the-hueco-mundo-sneak-entry-arc",
    locationSlug: "karakura-town",
    winnerName: "Toshiro Hitsugaya"
  },
  {
    title: "Toshiro Hitsugaya vs Tier Harribel",
    slug: "hitsugaya-vs-harribel",
    type: FightType.DUEL,
    summary: "Hitsugaya clashes with the 3rd Espada Tier Harribel. Hitsugaya uses ice mirrors and flowers to freeze her water Resurrección, but she breaks free.",
    episodeNumber: 276,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "fake-karakura-town",
    winnerName: null
  },
  {
    title: "Toshiro Hitsugaya vs Yukio Hans Vorarlberna",
    slug: "hitsugaya-vs-yukio",
    type: FightType.DUEL,
    summary: "Hitsugaya traps the digital Fullbringer Yukio in ice, forcing him to disable his dimension rooms.",
    episodeNumber: 362,
    arcSlug: "the-lost-substitute-shinigami-arc",
    locationSlug: "karakura-town",
    winnerName: "Toshiro Hitsugaya"
  },
  {
    title: "Toshiro Hitsugaya vs Cang Du",
    slug: "hitsugaya-vs-cang-du",
    type: FightType.DUEL,
    summary: "Hitsugaya recovers his stolen Bankai using Urahara's hollow pills and defeats Cang Du, trapping him in a beautiful giant cross of ice.",
    episodeNumber: 382,
    arcSlug: "thousand-year-blood-war-the-separation-arc",
    locationSlug: "seireitei",
    winnerName: "Toshiro Hitsugaya"
  },
  {
    title: "Mayuri Kurotsuchi vs Toshiro Hitsugaya (Zombie)",
    slug: "mayuri-vs-zombie-hitsugaya",
    type: FightType.DUEL,
    summary: "Mayuri faces the zombified Hitsugaya. Mayuri uses drugs and tactical science to trap Hitsugaya in a loop of time, eventually curing him.",
    episodeNumber: 390,
    arcSlug: "thousand-year-blood-war-the-separation-arc",
    locationSlug: "seireitei",
    winnerName: "Mayuri Kurotsuchi"
  },
  // ==========================================
  // HIYORI SARUGAKI FIGHTS
  // ==========================================
  {
    title: "Hiyori Sarugaki & Lisa Yadomaru vs Tier Harribel",
    slug: "hiyori-lisa-vs-harribel",
    type: FightType.TEAM_BATTLE,
    summary: "Hiyori, Lisa, and Hitsugaya team up to fight Harribel. They hold off the Espada until Aizen slashes Harribel to take over.",
    episodeNumber: 284,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "fake-karakura-town",
    winnerName: null
  },
  // ==========================================
  // SOI FON FIGHTS
  // ==========================================
  {
    title: "Soi Fon vs Yoruichi Shihoin",
    slug: "soifon-vs-yoruichi",
    type: FightType.DUEL,
    summary: "Emotional confrontation between Soi Fon and her former master Yoruichi. They clash using high-speed Shunko before Soi Fon breaks down in tears.",
    episodeNumber: 56,
    arcSlug: "soul-society-the-rescue-arc",
    locationSlug: "seireitei",
    winnerName: "Yoruichi Shihoin"
  },
  {
    title: "Soi Fon vs Ggio Vega",
    slug: "soifon-vs-ggio",
    type: FightType.DUEL,
    summary: "Soi Fon fights the Arrancar Ggio Vega, using her extreme speed and Shikai to strike him twice on the chest, triggering instant death.",
    episodeNumber: 221,
    arcSlug: "arrancar-decisive-battle-of-karakura-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Soi Fon"
  },
  {
    title: "Soi Fon, Marechiyo Omaeda & Hachigen Ushoda vs Baraggan Louisenbairn",
    slug: "soifon-omaeda-vs-baraggan",
    type: FightType.TEAM_BATTLE,
    summary: "Soi Fon and Omaeda face the 2nd Espada Baraggan. Baraggan's Resurrección aging aura decays everything, forcing Soi Fon to fire her giant missile Bankai. Hachigen Ushoda arrives and teleports his decaying arm inside Baraggan to destroy him.",
    episodeNumber: 277,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Hachigen Ushoda"
  },
  {
    title: "Soi Fon vs BG9",
    slug: "soifon-vs-bg9",
    type: FightType.DUEL,
    summary: "Soi Fon fights the robotic Sternritter BG9. She recovers her Bankai and fires a massive point-blank payload to blast him apart.",
    episodeNumber: 382,
    arcSlug: "thousand-year-blood-war-the-separation-arc",
    locationSlug: "seireitei",
    winnerName: "Soi Fon"
  },
  // ==========================================
  // MAYURI KUROTSUCHI FIGHTS
  // ==========================================
  {
    title: "Mayuri Kurotsuchi vs Szayelaporro Granz",
    slug: "mayuri-vs-szayelaporro",
    type: FightType.DUEL,
    summary: "Clash of scientists in Las Noches. Mayuri counters all of Szayelaporro's anatomical tricks and infects him with a superhuman drug that dilates time.",
    episodeNumber: 200,
    arcSlug: "arrancar-vs-shinigami-arc",
    locationSlug: "las-noches",
    winnerName: "Mayuri Kurotsuchi"
  },
  {
    title: "Mayuri Kurotsuchi & Nemu Kurotsuchi vs Pernida Parnkgjas",
    slug: "mayuri-nemu-vs-pernida",
    type: FightType.TEAM_BATTLE,
    summary: "Mayuri and Nemu fight the Left Arm of the Soul King. Nemu sacrifices herself, and Mayuri defeats Pernida by causing it to accelerate its cellular division to a fatal degree.",
    episodeNumber: 402,
    arcSlug: "thousand-year-blood-war-the-conflict-arc",
    locationSlug: "royal-palace",
    winnerName: "Mayuri Kurotsuchi"
  },
  {
    title: "Mayuri Kurotsuchi vs Giselle Gewelle",
    slug: "mayuri-vs-giselle",
    type: FightType.DUEL,
    summary: "Mayuri Kurotsuchi battles the Quincy Giselle Gewelle during the Wandenreich invasion. Giselle summons zombified Soul Reapers, but Mayuri counters with his zombified Arrancars (Luppi, Charlotte, Dordoni, Cirucci), neutralizing Giselle's control.",
    episodeNumber: 390,
    arcSlug: "thousand-year-blood-war-the-separation-arc",
    locationSlug: "seireitei",
    winnerName: "Mayuri Kurotsuchi"
  },
  // ==========================================
  // GIN ICHIMARU FIGHTS
  // ==========================================
  {
    title: "Gin Ichimaru vs Jidanbo Ikkanzaka",
    slug: "gin-vs-jidanbo",
    type: FightType.DUEL,
    summary: "Gin steps in as Jidanbo raises the gate for Ichigo, effortlessly slicing Jidanbo's arm using his Shikai to show the ruthlessness of Seireitei.",
    episodeNumber: 22,
    arcSlug: "soul-society-the-sneak-entry-arc",
    locationSlug: "seireitei",
    winnerName: "Gin Ichimaru"
  },
  {
    title: "Gin Ichimaru vs Sosuke Aizen",
    slug: "gin-vs-aizen",
    type: FightType.DUEL,
    summary: "Gin reveals his decades-long assassination plot against Aizen, using Kamishini no Yari to leave a deadly poison fragment in Aizen's chest, but is killed when Aizen evolves.",
    episodeNumber: 307,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "karakura-town",
    winnerName: "Sosuke Aizen"
  },
  // ==========================================
  // RENJI ABARAI FIGHTS
  // ==========================================
  {
    title: "Renji Abarai vs Jackie Tristan",
    slug: "renji-vs-jackie",
    type: FightType.DUEL,
    summary: "Renji easily handles the dirty-boot Fullbringer Jackie, showing the results of his training and refusing to kill her.",
    episodeNumber: 357,
    arcSlug: "the-lost-substitute-shinigami-arc",
    locationSlug: "karakura-town",
    winnerName: "Renji Abarai"
  },
  {
    title: "Renji Abarai vs Mask De Masculine",
    slug: "renji-vs-mask",
    type: FightType.DUEL,
    summary: "Renji enters the fray after the Visored captains fail. Renji activates his true Bankai: Sōō Zabimaru to incinerate the superstar Quincy.",
    episodeNumber: 384,
    arcSlug: "thousand-year-blood-war-the-separation-arc",
    locationSlug: "seireitei",
    winnerName: "Renji Abarai"
  },
  // ==========================================
  // IKKAKU MADARAME FIGHTS
  // ==========================================
  {
    title: "Ikkaku Madarame vs Edrad Liones",
    slug: "ikkaku-vs-edrad",
    type: FightType.DUEL,
    summary: "Ikkaku fights Grimmjow's Fracción Edrad Liones in Karakura Town, unleashing his secret Bankai for a narrow victory.",
    episodeNumber: 118,
    arcSlug: "arrancar-the-arrival-arc",
    locationSlug: "karakura-town",
    winnerName: "Ikkaku Madarame"
  },
  {
    title: "Ikkaku Madarame vs Moe Shishigawara",
    slug: "ikkaku-vs-moe",
    type: FightType.DUEL,
    summary: "Ikkaku fights the luck-manipulating Fullbringer Moe, winning the physical fistfight through sheer grit and headbutts.",
    episodeNumber: 362,
    arcSlug: "the-lost-substitute-shinigami-arc",
    locationSlug: "karakura-town",
    winnerName: "Ikkaku Madarame"
  },
  // ==========================================
  // SHUHEI HISAGI FIGHTS
  // ==========================================
  {
    title: "Yumichika Ayasegawa vs Shuhei Hisagi",
    slug: "yumichika-vs-hisagi",
    type: FightType.DUEL,
    summary: "Yumichika fights Hisagi in Seireitei. He secretly uses his true kido-type Shikai, Ruri'iro Kujaku, absorbing Hisagi's spiritual energy for victory.",
    episodeNumber: 36,
    arcSlug: "soul-society-the-sneak-entry-arc",
    locationSlug: "seireitei",
    winnerName: "Yumichika Ayasegawa"
  },
  // ==========================================
  // YUMICHIKA AYASEGAWA FIGHTS
  // ==========================================
  {
    title: "Yumichika Ayasegawa vs Charlotte Chuhlhourne",
    slug: "yumichika-vs-charlotte",
    type: FightType.DUEL,
    summary: "Yumichika is forced into a thorn-bush dome by Baraggan's flamboyant Fracción, using the darkness to hide and drain him with Ruri'iro Kujaku.",
    episodeNumber: 219,
    arcSlug: "arrancar-decisive-battle-of-karakura-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Yumichika Ayasegawa"
  },
  // ==========================================
  // RANGIKU MATSUMOTO FIGHTS
  // ==========================================
  {
    title: "Rangiku Matsumoto vs Izuru Kira",
    slug: "rangiku-vs-kira",
    type: FightType.DUEL,
    summary: "Rangiku intercepts Lieutenant Kira during the rescue confusion, using Haineko's ash cloud to block his gravity blade until interrupted.",
    episodeNumber: 46,
    arcSlug: "soul-society-the-rescue-arc",
    locationSlug: "seireitei",
    winnerName: null
  },
  {
    title: "Rangiku Matsumoto vs Nakeem Grindina",
    slug: "rangiku-vs-nakeem",
    type: FightType.DUEL,
    summary: "Rangiku unleashes the power limit release of Haineko to disintegrate the bulky Arrancar Nakeem in Karakura Town.",
    episodeNumber: 121,
    arcSlug: "arrancar-the-arrival-arc",
    locationSlug: "karakura-town",
    winnerName: "Rangiku Matsumoto"
  },
  // ==========================================
  // IZURU KIRA FIGHTS
  // ==========================================
  {
    title: "Izuru Kira vs Abirama Redder",
    slug: "kira-vs-abirama",
    type: FightType.DUEL,
    summary: "Kira fights the eagle Arrancar Abirama. Kira doubles the weight of his wings repeatedly, decapitating the grounded Arrancar.",
    episodeNumber: 218,
    arcSlug: "arrancar-decisive-battle-of-karakura-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Izuru Kira"
  },
  // ==========================================
  // SHUHEI HISAGI FIGHTS
  // ==========================================
  {
    title: "Shuhei Hisagi vs Findorr Calius",
    slug: "hisagi-vs-findorr",
    type: FightType.DUEL,
    summary: "Hisagi fights the crab-clawed Arrancar. Hisagi releases Kazeshini, expressing fear of his own weapon to outmaneuver Findorr.",
    episodeNumber: 219,
    arcSlug: "arrancar-decisive-battle-of-karakura-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Shuhei Hisagi"
  },
  // ==========================================
  // MARECHIYO OMAEDA FIGHTS
  // ==========================================
  {
    title: "Marechiyo Omaeda vs Nirgge Parduoc",
    slug: "omaeda-vs-nirgge",
    type: FightType.DUEL,
    summary: "Omaeda uses geishin tricks and speed to outpace the mammoth Arrancar Nirgge, smashing him with Gegetsuburi.",
    episodeNumber: 220,
    arcSlug: "arrancar-decisive-battle-of-karakura-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Marechiyo Omaeda"
  },
  // ==========================================
  // SHINJI HIRAKO FIGHTS
  // ==========================================
  {
    title: "Shinji Hirako vs Grimmjow Jaegerjaquez",
    slug: "shinji-vs-grimmjow",
    type: FightType.DUEL,
    summary: "Shinji steps in to save Ichigo in Karakura. He puts on his Hollow mask and fires a Cero that forces Grimmjow to retreat.",
    episodeNumber: 123,
    arcSlug: "arrancar-the-arrival-arc",
    locationSlug: "karakura-town",
    winnerName: null
  },
  {
    title: "Shinji Hirako vs Sosuke Aizen",
    slug: "shinji-vs-aizen",
    type: FightType.DUEL,
    summary: "Shinji uses Sakanade's directional inversion mist to disorient Aizen, though Aizen manages to adapt and slash him.",
    episodeNumber: 291,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "fake-karakura-town",
    winnerName: null
  },
  {
    title: "Shinji Hirako vs Bambietta Basterbine",
    slug: "shinji-vs-bambietta",
    type: FightType.DUEL,
    summary: "Shinji uses Sakanade to invert Bambietta's movements, but is defeated when she releases Vollständig and explodes the surrounding area.",
    episodeNumber: 382,
    arcSlug: "thousand-year-blood-war-the-separation-arc",
    locationSlug: "seireitei",
    winnerName: "Bambietta Basterbine"
  },
  {
    title: "Kisuke Urahara vs Shinji Hirako",
    slug: "urahara-vs-shinji-training",
    type: FightType.TRAINING,
    summary: "Flashback training duel between Kisuke Urahara and Shinji Hirako when Urahara was newly appointed as Captain of Squad 12. Shinji tests Urahara's combat readiness and helps him adjust to captainship.",
    episodeNumber: 206,
    arcSlug: "the-past-arc",
    locationSlug: "seireitei",
    winnerName: null
  },
  // ==========================================
  // LOVE AIKAWA FIGHTS
  // ==========================================
  {
    title: "Coyote Starrk vs Love Aikawa and Rojuro Otoribashi",
    slug: "starrk-vs-love-rose",
    type: FightType.TEAM_BATTLE,
    summary: "Visoreds Love Aikawa and Rojuro Otoribashi (Rose) don their Hollow masks to engage the Primera Espada Coyote Starrk. Starrk fights them using his wolf guns until Shunsui Kyoraku recovers and returns to the duel.",
    episodeNumber: 281,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "fake-karakura-town",
    winnerName: null
  },
  // ==========================================
  // ROSE OTORIBASHI FIGHTS
  // ==========================================
  {
    title: "Kensei Muguruma & Rojuro Otoribashi vs Mask De Masculine",
    slug: "kensei-rose-vs-mask",
    type: FightType.TEAM_BATTLE,
    summary: "Kensei and Rose fight the superstar Mask De Masculine. The Quincy's cheering fan heals his ruptured eardrums, allowing him to defeat both captains.",
    episodeNumber: 384,
    arcSlug: "thousand-year-blood-war-the-separation-arc",
    locationSlug: "seireitei",
    winnerName: "Mask De Masculine"
  },
  // ==========================================
  // KENSEI MUGURUMA FIGHTS
  // ==========================================
  {
    title: "Kensei Muguruma vs Wonderweiss Margela",
    slug: "kensei-vs-wonderweiss",
    type: FightType.DUEL,
    summary: "Kensei activates his explosive punch Bankai to save Mashiro, pummeling Wonderweiss in a duel that occurs off-screen.",
    episodeNumber: 290,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Wonderweiss Margela"
  },
  // ==========================================
  // YAMMY LLARGO FIGHTS
  // ==========================================
  {
    title: "Yoruichi Shihoin vs Yammy Llargo",
    slug: "yoruichi-vs-yammy",
    type: FightType.DUEL,
    summary: "Yoruichi uses her fast hand-to-hand combat to pummel Yammy upon his arrival, though she bruises her leg against his hard skin.",
    episodeNumber: 114,
    arcSlug: "arrancar-the-arrival-arc",
    locationSlug: "karakura-town",
    winnerName: "Yoruichi Shihoin"
  },
  // ==========================================
  // OTHER CANON FIGHTS
  // ==========================================
  {
    title: "Yoruichi Shihoin vs Askin Nakk Le Vaar",
    slug: "yoruichi-vs-askin",
    type: FightType.DUEL,
    summary: "Yoruichi fights the toxic Schutzstaffel Askin, unleashing her thunder god beast transformation before Urahara steps in.",
    episodeNumber: 405,
    arcSlug: "thousand-year-blood-war-the-conflict-arc",
    locationSlug: "royal-palace",
    winnerName: null
  },
  // ==========================================
  // KISUKE URAHARA FIGHTS
  // ==========================================
  {
    title: "Kisuke Urahara & Yoruichi & Isshin vs Sosuke Aizen",
    slug: "urahara-yoruichi-isshin-vs-aizen",
    type: FightType.TEAM_BATTLE,
    summary: "Urahara teams up with Yoruichi and Isshin Kurosaki to fight Aizen. Urahara uses various kido traps and seals, but they are all blown away.",
    episodeNumber: 297,
    arcSlug: "arrancar-downfall-arc",
    locationSlug: "fake-karakura-town",
    winnerName: "Sosuke Aizen"
  },
  // ==========================================
  // YAMMY LLARGO FIGHTS
  // ==========================================
  {
    title: "Kisuke Urahara vs Yammy Llargo",
    slug: "urahara-vs-yammy",
    type: FightType.DUEL,
    summary: "Urahara easily deflects Yammy's Cero blasts and fires a solid red laser from his Shikai Benihime to disarm the Arrancar.",
    episodeNumber: 114,
    arcSlug: "arrancar-the-arrival-arc",
    locationSlug: "karakura-town",
    winnerName: "Kisuke Urahara"
  },
  // ==========================================
  // KISUKE URAHARA FIGHTS
  // ==========================================
  {
    title: "Kisuke Urahara vs Askin Nakk Le Vaar",
    slug: "urahara-vs-askin",
    type: FightType.DUEL,
    summary: "Urahara fights the poison Quincy Askin. Blinded by Askin's poison ring, Urahara releases his restructuring Bankai to restructure the room.",
    episodeNumber: 406,
    arcSlug: "thousand-year-blood-war-the-conflict-arc",
    locationSlug: "royal-palace",
    winnerName: "Kisuke Urahara"
  },
  // ==========================================
  // ISSHIN KUROSAKI FIGHTS
  // ==========================================
  {
    title: "Isshin Kurosaki vs Grand Fisher",
    slug: "isshin-vs-grand-fisher",
    type: FightType.DUEL,
    summary: "Isshin Kurosaki confronts the evolved Arrancar Grand Fisher in Karakura Town. Revealing himself as a Captain-level Soul Reaper, Isshin defeats his wife's killer with a single slash from his sealed Zanpakutō.",
    episodeNumber: 111,
    arcSlug: "arrancar-the-arrival-arc",
    locationSlug: "karakura-town",
    winnerName: "Isshin Kurosaki"
  },
  // ==========================================
  // OETSU NIMAIYA FIGHTS
  // ==========================================
  {
    title: "Oetsu Nimaiya vs Schutzstaffel",
    slug: "oetsu-vs-schutzstaffel",
    type: FightType.TEAM_BATTLE,
    summary: "Oetsu Nimaiya of Squad Zero takes on the elite Schutzstaffel Quincy (Gerard Valkyrie, Lille Barro, Pernida Parnkgjas, and Askin Nakk Le Vaar) at the Royal Palace. Using his extremely sharp, one-cut blade Sayafushi, Oetsu swiftly cuts down the Quincy forces.",
    episodeNumber: 397,
    arcSlug: "thousand-year-blood-war-the-conflict-arc",
    locationSlug: "royal-palace",
    winnerName: "Oetsu Nimaiya"
  },
  // ==========================================
  // JUGRAM HASCHWALTH FIGHTS
  // ==========================================
  {
    title: "Jugram Haschwalth vs Bazz-B",
    slug: "haschwalth-vs-bazz-b",
    type: FightType.DUEL,
    summary: "Quincy childhood friends Jugram Haschwalth and Bazz-B clash in the Royal Palace. Bazz-B seeks to stop the execution of Quincy forces, but Haschwalth uses his Schrift, The Balance, to defeat his old friend in a tragic duel.",
    episodeNumber: 404,
    arcSlug: "thousand-year-blood-war-the-conflict-arc",
    locationSlug: "royal-palace",
    winnerName: "Jugram Haschwalth"
  },
  // ==========================================
  // YHWACH FIGHTS
  // ==========================================
  {
    title: "Sosuke Aizen vs Yhwach",
    slug: "aizen-vs-yhwach",
    type: FightType.DUEL,
    summary: "Sosuke Aizen confronts Yhwach during the final battle. Released from Muken, Aizen uses Kyōka Suigetsu to disrupt Yhwach's vision of the future (The Almighty), creating a critical opening for Ichigo Kurosaki to land the final strike.",
    episodeNumber: null,
    arcSlug: "thousand-year-blood-war-the-calamity-arc",
    locationSlug: "royal-palace",
    winnerName: null
  },
  {
    title: "Yhwach vs Ichibe Hyosube",
    slug: "yhwach-vs-ichibe",
    type: FightType.DUEL,
    summary: "Climactic battle in the Royal Palace between the progenitor of the Quincy, Yhwach, and the leader of Squad Zero, Ichibe Hyosube. Ichibe uses his ink-based Shikai and Bankai to strip Yhwach of his name and powers, but Yhwach activates The Almighty to overwrite his defeat and crush Ichibe.",
    episodeNumber: 397,
    arcSlug: "thousand-year-blood-war-the-conflict-arc",
    locationSlug: "royal-palace",
    winnerName: "Yhwach"
  },
  // ==========================================
  // NNOITRA GILGA FIGHTS
  // ==========================================
  {
    title: "Nelliel Tu Odelschwanck vs Nnoitra Gilga",
    slug: "neliel-vs-nnoitra",
    type: FightType.DUEL,
    summary: "Nelliel Tu Odelschwanck transforms back into her adult form to protect Ichigo and duels her former rival, the 5th Espada Nnoitra Gilga. Nelliel dominates the fight using her Resurrección Gamuza, but reverts to child form before she can finish him.",
    episodeNumber: 194,
    arcSlug: "arrancar-vs-shinigami-arc",
    locationSlug: "las-noches",
    winnerName: null
  }
];

export default bleachVerseFightSeedData;
