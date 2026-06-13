import { SourceMaterial, TransformationType } from "@prisma/client";

const transformations = [
  // Ichigo Kurosaki
  {
    name: "Shikai: Zangetsu",
    type: TransformationType.SHIKAI,
    description: "Ichigo's released form of Zangetsu, manifesting as a large oversized cleaver blade without a crossguard.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Ichigo Kurosaki",
    zanpakutoName: "Zangetsu",
    firstEpisodeNumber: 20
  },
  {
    name: "Bankai: Tensa Zangetsu",
    type: TransformationType.BANKAI,
    description: "Ichigo's Bankai form where the blade shrinks to a slender, pitch-black daitō, granting him immense speed.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Ichigo Kurosaki",
    zanpakutoName: "Zangetsu",
    firstEpisodeNumber: 58
  },
  {
    name: "Hollow Mask",
    type: TransformationType.HOLLOWFICATION,
    description: "Ichigo draws upon his inner Hollow, manifesting a skull-like mask that drastically boosts his strength, speed, and spiritual energy.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Ichigo Kurosaki",
    firstEpisodeNumber: 59
  },
  {
    name: "Saigo no Getsuga Tenshō",
    type: TransformationType.FINAL_FORM,
    description: "The Final Getsuga Tensho, where Ichigo becomes Getsuga itself, allowing the use of Mugetsu at the cost of all his Soul Reaper powers.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Ichigo Kurosaki",
    zanpakutoName: "Zangetsu",
    firstEpisodeNumber: 309
  },
  {
    name: "Fullbring: Clad-Type",
    type: TransformationType.FULLBRING,
    description: "Ichigo's Fullbring power fully activated, covering his body in a bone-like armor resembling his Shinigami form.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Ichigo Kurosaki",
    firstEpisodeNumber: 352
  },

  // Rukia Kuchiki
  {
    name: "Shikai: Sode no Shirayuki",
    type: TransformationType.SHIKAI,
    description: "Rukia's ice-type release, transforming the blade into pure white with a long ribbon trailing from the hilt.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Rukia Kuchiki",
    zanpakutoName: "Sode no Shirayuki",
    firstEpisodeNumber: 117
  },
  {
    name: "Bankai: Hakka no Togame",
    type: TransformationType.BANKAI,
    description: "Rukia's Bankai, freezing everything in a wide area around her to absolute zero, turning her into a white-clad snow princess.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Rukia Kuchiki",
    zanpakutoName: "Sode no Shirayuki",
    firstEpisodeNumber: 385
  },

  // Byakuya Kuchiki
  {
    name: "Shikai: Senbonzakura",
    type: TransformationType.SHIKAI,
    description: "Byakuya's blade scatters into thousands of microscopic, cherry blossom-petal-like fragments that shred opponents.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Byakuya Kuchiki",
    zanpakutoName: "Senbonzakura",
    firstEpisodeNumber: 16
  },
  {
    name: "Bankai: Senbonzakura Kageyoshi",
    type: TransformationType.BANKAI,
    description: "Byakuya's Bankai, creating giant blades from the ground that split into billions of cutting cherry blossom petals.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Byakuya Kuchiki",
    zanpakutoName: "Senbonzakura",
    firstEpisodeNumber: 52
  },

  // Renji Abarai
  {
    name: "Shikai: Zabimaru",
    type: TransformationType.SHIKAI,
    description: "Renji's sword transforms into a segmented whip-sword capable of extending and striking unpredictably.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Renji Abarai",
    zanpakutoName: "Zabimaru",
    firstEpisodeNumber: 16
  },
  {
    name: "Bankai: Hikō Zabimaru",
    type: TransformationType.BANKAI,
    description: "Renji's initial Bankai, summoning a massive skeletal snake-like structure that crushes targets and fires spiritual blasts.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Renji Abarai",
    zanpakutoName: "Zabimaru",
    firstEpisodeNumber: 52
  },
  {
    name: "Bankai: Sōō Zabimaru",
    type: TransformationType.BANKAI,
    description: "Renji's true Bankai, manifesting a skeletal gauntlet on one arm and a hood over his shoulder, combining extreme power and speed.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Renji Abarai",
    zanpakutoName: "Zabimaru",
    firstEpisodeNumber: 384
  },

  // Toshiro Hitsugaya
  {
    name: "Shikai: Hyorinmaru",
    type: TransformationType.SHIKAI,
    description: "Toshiro's blade unleashes a giant ice dragon, controlling the weather and freezing water-based targets.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Toshiro Hitsugaya",
    zanpakutoName: "Hyorinmaru",
    firstEpisodeNumber: 48
  },
  {
    name: "Bankai: Daiguren Hyorinmaru",
    type: TransformationType.BANKAI,
    description: "Toshiro gains wings of ice and an ice tail, with three flowers indicating the time limit of his immature Bankai.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Toshiro Hitsugaya",
    zanpakutoName: "Hyorinmaru",
    firstEpisodeNumber: 121
  },

  // Kisuke Urahara
  {
    name: "Shikai: Benihime",
    type: TransformationType.SHIKAI,
    description: "Kisuke's cane-sword transforms into a straight blade with a crimson hilt tassel, manipulating red energy constructs.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Kisuke Urahara",
    zanpakutoName: "Benihime",
    firstEpisodeNumber: 114
  },
  {
    name: "Bankai: Kannonbiraki Benihime Aratame",
    type: TransformationType.BANKAI,
    description: "Kisuke summons a giant woman who can restructure anything she touches, allowing for healing, reinforcement, or offensive alterations.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Kisuke Urahara",
    zanpakutoName: "Benihime",
    firstEpisodeNumber: 389
  },

  // Genryusai Shigekuni Yamamoto
  {
    name: "Shikai: Ryujin Jakka",
    type: TransformationType.SHIKAI,
    description: "The oldest and most powerful fire-element Zanpakuto, engulfing everything around it in intense, destructive flames.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Genryusai Shigekuni Yamamoto",
    zanpakutoName: "Ryujin Jakka",
    firstEpisodeNumber: 55
  },
  {
    name: "Bankai: Zanka no Tachi",
    type: TransformationType.BANKAI,
    description: "All of Yamamoto's flames are condensed into a charred blade, unleashing heat reaching 15 million degrees.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Genryusai Shigekuni Yamamoto",
    zanpakutoName: "Ryujin Jakka",
    firstEpisodeNumber: 373
  },

  // Shunsui Kyoraku
  {
    name: "Shikai: Katen Kyokotsu",
    type: TransformationType.SHIKAI,
    description: "Shunsui's dual blades manifest, bringing children's games to life and making the rules deadly reality for both parties.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Shunsui Kyoraku",
    zanpakutoName: "Katen Kyokotsu",
    firstEpisodeNumber: 55
  },
  {
    name: "Bankai: Katen Kyōkotsu: Karamatsu Shinjū",
    type: TransformationType.BANKAI,
    description: "Shunsui's dark and melancholy Bankai, dragging both wielder and opponent through a four-act play mirroring a tragic love story.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Shunsui Kyoraku",
    zanpakutoName: "Katen Kyokotsu",
    firstEpisodeNumber: 395
  },

  // Soi Fon
  {
    name: "Shikai: Suzumebachi",
    type: TransformationType.SHIKAI,
    description: "A gold-and-black stinger worn on Soi Fon's finger, capable of killing any target in two strikes at the exact same spot (Nigeki Kessatsu).",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Soi Fon",
    zanpakutoName: "Suzumebachi",
    firstEpisodeNumber: 56
  },
  {
    name: "Bankai: Jakuhō Raikōben",
    type: TransformationType.BANKAI,
    description: "A massive, heavy golden missile weapon attached to Soi Fon's right arm, firing a devastating explosive payload.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Soi Fon",
    zanpakutoName: "Suzumebachi",
    firstEpisodeNumber: 278
  },

  // Gin Ichimaru
  {
    name: "Shikai: Shinsō",
    type: TransformationType.SHIKAI,
    description: "Gin's blade extends at incredible speeds to stab targets from far away.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Gin Ichimaru",
    zanpakutoName: "Shinsō",
    firstEpisodeNumber: 22
  },
  {
    name: "Bankai: Kamishini no Yari",
    type: TransformationType.BANKAI,
    description: "Gin's Bankai, capable of extending up to 13 kilometers at 500 times the speed of sound, leaving a deadly dissolving poison in targets.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Gin Ichimaru",
    zanpakutoName: "Shinsō",
    firstEpisodeNumber: 300
  },

  // Retsu Unohana
  {
    name: "Shikai: Minazuki",
    type: TransformationType.SHIKAI,
    description: "Unohana's Zanpakuto transforms into a giant manta-ray-like flying creature that heals swallowed allies.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Retsu Unohana",
    zanpakutoName: "Minazuki",
    firstEpisodeNumber: 54
  },
  {
    name: "Bankai: Minazuki (Bankai)",
    type: TransformationType.BANKAI,
    description: "Unohana's blade oozes a dark, blood-like substance, turning the area into a slaughterhouse suited for her true nature as Yachiru.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Retsu Unohana",
    zanpakutoName: "Minazuki",
    firstEpisodeNumber: 382
  },

  // Sajin Komamura
  {
    name: "Shikai: Tenken",
    type: TransformationType.SHIKAI,
    description: "Sajin summons phantom giant limbs to mirror his physical sword swings.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Sajin Komamura",
    zanpakutoName: "Tenken",
    firstEpisodeNumber: 53
  },
  {
    name: "Bankai: Kokujō Tengen Myō'ō",
    type: TransformationType.BANKAI,
    description: "Sajin summons a gigantic armored samurai that mimics his movements, dealing colossal physical damage.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Sajin Komamura",
    zanpakutoName: "Tenken",
    firstEpisodeNumber: 53
  },

  // Kaname Tosen
  {
    name: "Shikai: Suzumushi",
    type: TransformationType.SHIKAI,
    description: "Kaname's blade emits high-pitched sonic frequencies to incapacitate enemies or create shockwaves.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Kaname Tosen",
    zanpakutoName: "Suzumushi",
    firstEpisodeNumber: 53
  },
  {
    name: "Bankai: Suzumushi Tsuishiki: Enma Kōro",
    type: TransformationType.BANKAI,
    description: "Kaname creates a large black dome that completely strips everyone inside of their senses (sight, hearing, smell, spiritual sense) except him.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Kaname Tosen",
    zanpakutoName: "Suzumushi",
    firstEpisodeNumber: 53
  },

  // Kenpachi Zaraki
  {
    name: "Shikai: Nozarashi",
    type: TransformationType.SHIKAI,
    description: "Kenpachi's Zanpakuto transforms into a massive, heavy executioner's cleaver capable of cutting through meteorites and space itself.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Kenpachi Zaraki",
    zanpakutoName: "Nozarashi",
    firstEpisodeNumber: 386
  },
  {
    name: "Bankai: Kenpachi Bankai",
    type: TransformationType.BANKAI,
    description: "Kenpachi turns into a red-skinned berserk demon, with his physical strength and cutting power boosted to astronomical levels.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Kenpachi Zaraki",
    zanpakutoName: "Nozarashi",
    firstEpisodeNumber: null
  },

  // Mayuri Kurotsuchi
  {
    name: "Shikai: Ashisogi Jizō",
    type: TransformationType.SHIKAI,
    description: "Mayuri's blade sprouts three prongs, paralyzing the limbs of anyone it cuts while preserving their pain receptors.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Mayuri Kurotsuchi",
    zanpakutoName: "Ashisogi Jizō",
    firstEpisodeNumber: 43
  },
  {
    name: "Bankai: Konjiki Ashisogi Jizō",
    type: TransformationType.BANKAI,
    description: "Mayuri summons a giant baby-headed caterpillar that breathes lethal poison gas and sprouts blades from its chest.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Mayuri Kurotsuchi",
    zanpakutoName: "Ashisogi Jizō",
    firstEpisodeNumber: 44
  },

  // Sosuke Aizen
  {
    name: "Shikai: Kyōka Suigetsu",
    type: TransformationType.SHIKAI,
    description: "Aizen's sword triggers complete hypnosis (Kanzen Saimin) in anyone who witnesses its release, manipulating all five senses.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Sosuke Aizen",
    zanpakutoName: "Kyōka Suigetsu",
    firstEpisodeNumber: 60
  },

  // Shinji Hirako
  {
    name: "Shikai: Sakanade",
    type: TransformationType.SHIKAI,
    description: "Shinji's blade has a ring-like hilt that spins to release a pink mist, reversing the target's directions (left/right, up/down, forward/backward, sight).",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Shinji Hirako",
    zanpakutoName: "Sakanade",
    firstEpisodeNumber: 291
  },
  {
    name: "Hollow Mask (Shinji)",
    type: TransformationType.HOLLOWFICATION,
    description: "Shinji dons his Hollow mask, increasing his speed and granting him Hollow abilities like Cero.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Shinji Hirako",
    firstEpisodeNumber: 121
  },
  {
    name: "Bankai: Sakasama Yokoshima Happō Fugarisagari",
    type: TransformationType.BANKAI,
    description: "Shinji's Bankai, reversing the perception of friend and foe in all surrounding targets, forcing them to slaughter each other.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Shinji Hirako",
    zanpakutoName: "Sakanade",
    firstEpisodeNumber: 382
  },

  // Grimmjow Jaegerjaquez
  {
    name: "Resurrección: Pantera",
    type: TransformationType.RESURRECCION,
    description: "Grimmjow returns to his predatory panther-like form, granting him razor-sharp claws, elbow missiles, and massive speed.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Grimmjow Jaegerjaquez",
    zanpakutoName: "Pantera",
    firstEpisodeNumber: 165
  },

  // Ulquiorra Cifer
  {
    name: "Resurrección: Murciélago",
    type: TransformationType.RESURRECCION,
    description: "Ulquiorra gains large black bat wings, allowing him to fly and utilize Lanza del Relámpago.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Ulquiorra Cifer",
    zanpakutoName: "Murciélago",
    firstEpisodeNumber: 269
  },
  {
    name: "Segunda Etapa",
    type: TransformationType.SEGUNDA_ETAPA,
    description: "Ulquiorra's unique second released form, turning him into a slender, long-tailed demonic creature with overwhelming spiritual pressure.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Ulquiorra Cifer",
    zanpakutoName: "Murciélago",
    firstEpisodeNumber: 270
  },

  // Nelliel Tu Odelschwanck
  {
    name: "Resurrección: Gamuza",
    type: TransformationType.RESURRECCION,
    description: "Nelliel transforms into a centaur-like knight with a massive lance, boosting her physical power.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Nelliel Tu Odelschwanck",
    zanpakutoName: "Gamuza",
    firstEpisodeNumber: 194
  },

  // Tier Harribel
  {
    name: "Resurrección: Tiburón",
    type: TransformationType.RESURRECCION,
    description: "Harribel transforms, gaining shark-themed armor and a large hollow blade to manipulate boiling sea water.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Tier Harribel",
    zanpakutoName: "Tiburón",
    firstEpisodeNumber: 275
  },

  // Coyote Starrk
  {
    name: "Resurrección: Los Lobos",
    type: TransformationType.RESURRECCION,
    description: "Starrk fuses with Lilynette to wield dual spiritual pistols that fire fast Cero blasts and spawn explosive spirit wolves.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Coyote Starrk",
    zanpakutoName: "Los Lobos",
    firstEpisodeNumber: 277
  },

  // Baraggan Louisenbairn
  {
    name: "Resurrección: Arrogante",
    type: TransformationType.RESURRECCION,
    description: "Baraggan transforms into a crown-wearing skeleton lich, releasing Respira, a purple mist that rapidly ages and rots everything it touches.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Baraggan Louisenbairn",
    zanpakutoName: "Arrogante",
    firstEpisodeNumber: 275
  },

  // Nnoitra Gilga
  {
    name: "Resurrección: Santa Teresa",
    type: TransformationType.RESURRECCION,
    description: "Nnoitra grows six arms, each wielding a large crescent scythe, with high physical regeneration and durability.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Nnoitra Gilga",
    zanpakutoName: "Santa Teresa",
    firstEpisodeNumber: 195
  },

  // Szayelaporro Granz
  {
    name: "Resurrección: Fornicarás",
    type: TransformationType.RESURRECCION,
    description: "Szayelaporro sprouts wings that drop droplets, allowing him to create target clones, voodoo dolls of his victims, or resurrect himself.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Szayelaporro Granz",
    zanpakutoName: "Fornicarás",
    firstEpisodeNumber: 191
  },

  // Zommari Rureaux
  {
    name: "Resurrección: Brujería",
    type: TransformationType.RESURRECCION,
    description: "Zommari's body gets covered in eyes, allowing him to take mental control (Amor) of any object or body part his eyes look at.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Zommari Rureaux",
    zanpakutoName: "Brujería",
    firstEpisodeNumber: 196
  },

  // Aaroniero Arruruerie
  {
    name: "Resurrección: Glotonería",
    type: TransformationType.RESURRECCION,
    description: "Aaroniero's arm transforms into a giant organic mass that can swallow and manifest the powers of all Hollows he has eaten.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Aaroniero Arruruerie",
    zanpakutoName: "Glotonería",
    firstEpisodeNumber: 159
  },

  // Yammy Llargo
  {
    name: "Resurrección: Ira",
    type: TransformationType.RESURRECCION,
    description: "Yammy becomes Espada number 0, growing to colossal size as his power increases with his growing anger.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Yammy Llargo",
    zanpakutoName: "Ira",
    firstEpisodeNumber: 275
  },

  // Kugo Ginjo
  {
    name: "Fullbring: Cross of Scaffold",
    type: TransformationType.FULLBRING,
    description: "Ginjo's sword-shaped Fullbring, formed from his saltire pendant, capable of firing energy beams.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Kugo Ginjo",
    firstEpisodeNumber: 347
  },
  {
    name: "Bankai: Ginjo",
    type: TransformationType.BANKAI,
    description: "Ginjo combines his Fullbring with stolen Shinigami powers, resulting in a dark skeleton-like armor and sword release.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Kugo Ginjo",
    firstEpisodeNumber: 363
  },

  // Yhwach
  {
    name: "The Almighty",
    type: TransformationType.OTHER,
    description: "Yhwach's signature ability, allowing him to foresee all future timelines and rewrite them as he sees fit.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Yhwach",
    firstEpisodeNumber: 385
  },

  // Quilge Opie
  {
    name: "Vollständig: Biskiel",
    type: TransformationType.VOLLSTANDIG,
    description: "Quilge's Quincy Vollständig form, granting him glowing angel wings and a halo, boosting his reishi absorption to extreme levels.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Quilge Opie",
    firstEpisodeNumber: 369
  }
];

export default transformations;
