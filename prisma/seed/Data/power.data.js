import { PowerType, PowerSource, SourceMaterial } from "@prisma/client";

const powers = [
  // Ichigo Kurosaki
  {
    name: "Getsuga Tenshō",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Fires a blast of highly concentrated spiritual energy in the shape of a crescent moon.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Ichigo Kurosaki",
    transformationName: "Shikai: Zangetsu",
  },
  {
    name: "Getsuga Jūshō",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Fires a massive cross-shaped blast of spiritual energy using dual blades.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Ichigo Kurosaki",
    transformationName: "Shikai: Zangetsu",
  },
  {
    name: "Black Getsuga Tenshō",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "A pitch-black crescent energy blast fired from the Tensa Zangetsu blade.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Ichigo Kurosaki",
    transformationName: "Bankai: Tensa Zangetsu",
  },
  {
    name: "Mugetsu",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Unleashes a colossal veil of pitch-black spiritual energy that falls from the sky, slicing the target.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Ichigo Kurosaki",
    transformationName: "Saigo no Getsuga Tenshō",
  },
  {
    name: "Gran Rey Cero Getsuga Tenshō",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Merges a Gran Rey Cero with a Getsuga Tenshō to create a massive, reality-splitting energy blast.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Ichigo Kurosaki",
  },
  {
    name: "Blut Vene",
    type: PowerType.DEFENSIVE,
    source: PowerSource.QUINCY,
    description:
      "The defensive form of Blut, granting the user durability by circulating Reishi through their blood vessels.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Ichigo Kurosaki",
  },

  // Rukia Kuchiki
  {
    name: "Some no Mai: Tsukishiro",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Creates a circular pillar of light that freezes everything within it from the ground to the sky.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Rukia Kuchiki",
    transformationName: "Shikai: Sode no Shirayuki",
  },
  {
    name: "Tsugi no Mai: Hakuren",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Fires a massive, focused wave of ice and snow to freeze targets in front of her.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Rukia Kuchiki",
    transformationName: "Shikai: Sode no Shirayuki",
  },
  {
    name: "Hakka no Togame",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Instantly drops the surrounding temperature to absolute zero, shattering any targets in range.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Rukia Kuchiki",
    transformationName: "Bankai: Hakka no Togame",
  },

  // Orihime Inoue
  {
    name: "Santen Kesshun",
    type: PowerType.DEFENSIVE,
    source: PowerSource.NATURAL,
    description:
      "Creates a triangular barrier of spiritual energy that repels attacks.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Orihime Inoue",
  },
  {
    name: "Sōten Kishun",
    type: PowerType.HEALING,
    source: PowerSource.NATURAL,
    description:
      "Creates a half-egg-shaped barrier that rejects reality within it, returning any damaged target to its original state.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Orihime Inoue",
  },

  // Uryu Ishida
  {
    name: "Heilig Pfeil",
    type: PowerType.OFFENSIVE,
    source: PowerSource.QUINCY,
    description: "Fires spiritual arrows composed of gathered Reishi.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Uryu Ishida",
  },
  {
    name: "Licht Regen",
    type: PowerType.OFFENSIVE,
    source: PowerSource.QUINCY,
    description:
      "Fires a massive barrage of thousands of sacred arrows from the sky onto the target.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Uryu Ishida",
  },
  {
    name: "Sprenger",
    type: PowerType.OFFENSIVE,
    source: PowerSource.QUINCY,
    description:
      "A Quincy technique that uses Gintō to create a massive explosion using a drawing of a Quincy pentacle.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Uryu Ishida",
  },

  // Yasutora Sado (Chad)
  {
    name: "El Directo",
    type: PowerType.OFFENSIVE,
    source: PowerSource.FULLBRING,
    description:
      "Fires a massive blast of spiritual energy from his right arm.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Yasutora Sado",
  },
  {
    name: "La Muerte",
    type: PowerType.OFFENSIVE,
    source: PowerSource.FULLBRING,
    description:
      "Delivers a heavy, direct punch with his left arm, engraving a skull design onto the target area.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Yasutora Sado",
  },

  // Kisuke Urahara
  {
    name: "Nake, Benihime",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Fires a blast of crimson energy in the form of a slash or a beam.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Kisuke Urahara",
    transformationName: "Shikai: Benihime",
  },
  {
    name: "Chikasumi no Tate",
    type: PowerType.DEFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Creates a hexagonal barrier of crimson energy to block attacks.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Kisuke Urahara",
    transformationName: "Shikai: Benihime",
  },
  {
    name: "Kannonbiraki Benihime Aratame",
    type: PowerType.SUPPORT,
    source: PowerSource.ZANPAKUTO,
    description:
      "Restructures anything within its physical reach, enabling healing, paths, or structural enhancements.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Kisuke Urahara",
    transformationName: "Bankai: Kannonbiraki Benihime Aratame",
  },

  // Yoruichi Shihoin
  {
    name: "Shunkō",
    type: PowerType.OFFENSIVE,
    source: PowerSource.KIDO,
    description:
      "An advanced combat form combining Hakuda and Kidō, coating the user's back and arms in high-pressure lightning.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Yoruichi Shihoin",
  },
  {
    name: "Utsusemi",
    type: PowerType.MOVEMENT,
    source: PowerSource.NATURAL,
    description:
      "A legendary high-speed movement technique that leaves a false decoy or clothing article behind to deceive the opponent.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Yoruichi Shihoin",
  },

  // Isshin Kurosaki
  {
    name: "Getsuga Tenshō (Isshin)",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Fires a massive wave of crimson spiritual energy from his blade, Engetsu.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Isshin Kurosaki",
  },

  // Kon
  {
    name: "Modified Leg Strength",
    type: PowerType.PASSIVE,
    source: PowerSource.NATURAL,
    description:
      "Kon's modified legs grant him exceptional jumping ability and physical kicking power.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Kon",
  },

  // Genryusai Shigekuni Yamamoto
  {
    name: "Zanka no Tachi, Higashi: Kyokujitsujin",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Eliminates all flames, concentrating their destructive power on the tip of the blade to erase anything it cuts.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Genryusai Shigekuni Yamamoto",
    transformationName: "Bankai: Zanka no Tachi",
  },
  {
    name: "Zanka no Tachi, Nishi: Zanjitsu Gokui",
    type: PowerType.DEFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Coats Yamamoto's body in spiritual pressure reaching 15 million degrees, melting anything that approaches.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Genryusai Shigekuni Yamamoto",
    transformationName: "Bankai: Zanka no Tachi",
  },
  {
    name: "Zanka no Tachi, Minami: Kaka Jūmanokushi Daisōjin",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Summons the charred corpses and skeletons of those Yamamoto has killed to fight on his behalf.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Genryusai Shigekuni Yamamoto",
    transformationName: "Bankai: Zanka no Tachi",
  },
  {
    name: "Zanka no Tachi, Kita: Tenchi Kaijin",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "A single concentrated slash of heat that completely incinerates and erases whatever it touches.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Genryusai Shigekuni Yamamoto",
    transformationName: "Bankai: Zanka no Tachi",
  },

  // Chojiro Sasakibe
  {
    name: "Gonryōmaru Release",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Fires a powerful bolt of lightning from his rapier-styled Zanpakuto.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Chojiro Sasakibe",
  },

  // Soi Fon
  {
    name: "Nigeki Kessatsu",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Stings the opponent. If a second sting hits the same location, it results in instant death.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Soi Fon",
    transformationName: "Shikai: Suzumebachi",
  },

  // Marechiyo Omaeda
  {
    name: "Hohō Mastery",
    type: PowerType.MOVEMENT,
    source: PowerSource.NATURAL,
    description:
      "Despite his large build, Omaeda possesses exceptional speed and mastery of high-speed movement.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Marechiyo Omaeda",
  },

  // Gin Ichimaru
  {
    name: "Kamishini no Yari",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Leaves a tiny shard of the blade inside the target, which dissolves and destroys their cells on command.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Gin Ichimaru",
    transformationName: "Bankai: Kamishini no Yari",
  },

  // Izuru Kira
  {
    name: "Wabisuke",
    type: PowerType.SUPPORT,
    source: PowerSource.ZANPAKUTO,
    description:
      "Doubles the weight of anything struck by his hook-bladed Zanpakuto.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Izuru Kira",
  },

  // Retsu Unohana
  {
    name: "Minazuki",
    type: PowerType.HEALING,
    source: PowerSource.ZANPAKUTO,
    description:
      "Unohana's Shikai creature heals swallowed allies with special stomach acids.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Retsu Unohana",
    transformationName: "Shikai: Minazuki",
  },

  // Isane Kotetsu
  {
    name: "Itegumo Release",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Unleashes defensive ice/snow energy from three separate blades.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Isane Kotetsu",
  },

  // Sosuke Aizen
  {
    name: "Kanzen Saimin",
    type: PowerType.SUPPORT,
    source: PowerSource.ZANPAKUTO,
    description:
      "Completely controls the target's five senses to display perfect, indistinguishable illusions.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Sosuke Aizen",
    transformationName: "Shikai: Kyōka Suigetsu",
  },
  {
    name: "Hadō #90: Kurohitsugi",
    type: PowerType.OFFENSIVE,
    source: PowerSource.KIDO,
    description:
      "Envelopes the target in a black spiritual coffin that is pierced by dozens of gravity spears.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Sosuke Aizen",
  },

  // Momo Hinamori
  {
    name: "Tobiume Release",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description: "Shoots highly explosive fireballs from her Zanpakuto.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Momo Hinamori",
  },

  // Byakuya Kuchiki
  {
    name: "Senkei Senbonzakura Kageyoshi",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Condenses the cherry blossom petals into four rows of thousands of glowing swords surrounding both Byakuya and his foe.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Byakuya Kuchiki",
    transformationName: "Bankai: Senbonzakura Kageyoshi",
  },
  {
    name: "Shūkei: Hakuteiken",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Condenses all blade fragments into a single pure white sword, sprouting glowing wings of spiritual energy.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Byakuya Kuchiki",
    transformationName: "Bankai: Senbonzakura Kageyoshi",
  },

  // Renji Abarai
  {
    name: "Hikotsu Taihō",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Fires a dense blast of red spiritual energy from the mouth of the giant snake-skeleton Zabimaru.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Renji Abarai",
    transformationName: "Bankai: Hikō Zabimaru",
  },
  {
    name: "Zaga Teppō",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "A true Bankai technique summoning a massive jaw of spiritual energy that bites and incinerates the opponent.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Renji Abarai",
    transformationName: "Bankai: Sōō Zabimaru",
  },

  // Sajin Komamura
  {
    name: "Tenken Strike",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Directs a giant phantom samurai to mirror and land a devastating sword strike.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Sajin Komamura",
    transformationName: "Bankai: Kokujō Tengen Myō'ō",
  },

  // Tetsuzaemon Iba
  {
    name: "Zanjutsu Mastery",
    type: PowerType.PASSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Iba exhibits well-rounded proficiency in swordsmanship and physical Shinigami combat.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Tetsuzaemon Iba",
  },

  // Shunsui Kyoraku
  {
    name: "Kageoni",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Forces wielder and target to fight their shadows. Anyone standing on a shadow can be stabbed from it.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Shunsui Kyoraku",
    transformationName: "Shikai: Katen Kyokotsu",
  },
  {
    name: "Itokiribasami Chinosome no Nodofue",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "The Fourth Act of Shunsui's Bankai: wraps a thread of energy around the throat and slices it clean.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Shunsui Kyoraku",
    transformationName: "Bankai: Katen Kyōkotsu: Karamatsu Shinjū",
  },

  // Nanao Ise
  {
    name: "Shinken Hakkyōken Reflection",
    type: PowerType.DEFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Reflects and disperses god-like power using the mirror-like Shinken Hakkyōken.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Nanao Ise",
  },

  // Kaname Tosen
  {
    name: "Enma Kōro",
    type: PowerType.SUPPORT,
    source: PowerSource.ZANPAKUTO,
    description:
      "Creates a large black dome that completely strips everyone inside of their senses except him.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Kaname Tosen",
    transformationName: "Bankai: Suzumushi Tsuishiki: Enma Kōro",
  },

  // Shuhei Hisagi
  {
    name: "Kazeshini Release",
    type: PowerType.SUPPORT,
    source: PowerSource.ZANPAKUTO,
    description:
      "Uses Kazeshini's long chains to ensnare, bind, and pull opponents.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Shuhei Hisagi",
  },

  // Toshiro Hitsugaya
  {
    name: "Hyōten Hyakkasō",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Alters the weather to rain down snow, which immediately freezes everything it touches into giant ice flowers.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Toshiro Hitsugaya",
    transformationName: "Bankai: Daiguren Hyorinmaru",
  },

  // Rangiku Matsumoto
  {
    name: "Haineko Release",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Turns Haineko's blade into ash, which cuts targets wherever it settles.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Rangiku Matsumoto",
  },

  // Kenpachi Zaraki
  {
    name: "Nozarashi Release",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Unleashes a massive downward slash with Nozarashi that easily cuts through mountain-sized targets.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Kenpachi Zaraki",
    transformationName: "Shikai: Nozarashi",
  },

  // Yachiru Kusajishi
  {
    name: "Sanpo Kenjū",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Summons two beasts that swing their swords in front and behind Yachiru's own swings.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Yachiru Kusajishi",
  },

  // Ikkaku Madarame
  {
    name: "Ryūmon Hōzukimaru",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Unleashes a high-powered blunt force slam using a large three-piece spear and crest blade.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Ikkaku Madarame",
  },

  // Yumichika Ayasegawa
  {
    name: "Ruri'iro Kujaku",
    type: PowerType.SUPPORT,
    source: PowerSource.ZANPAKUTO,
    description:
      "Drains spiritual energy from target using peacock-feather-like vines.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Yumichika Ayasegawa",
  },

  // Mayuri Kurotsuchi
  {
    name: "Ashisogi Jizō",
    type: PowerType.SUPPORT,
    source: PowerSource.ZANPAKUTO,
    description:
      "Mayuri's blade sprouts three prongs, paralyzing the limbs of anyone it cuts.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Mayuri Kurotsuchi",
    transformationName: "Shikai: Ashisogi Jizō",
  },
  {
    name: "Konjiki Ashisogi Jizō",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Mayuri summons a giant baby-headed caterpillar that breathes lethal poison gas.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Mayuri Kurotsuchi",
    transformationName: "Bankai: Konjiki Ashisogi Jizō",
  },

  // Nemu Kurotsuchi
  {
    name: "Gōshi no Hō",
    type: PowerType.OFFENSIVE,
    source: PowerSource.NATURAL,
    description:
      "A soul-partitioning technique where Nemu sacrifices percentages of her soul to deliver attacks of extreme power.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Nemu Kurotsuchi",
  },

  // Jushiro Ukitake
  {
    name: "Sōgyo no Kotowari",
    type: PowerType.DEFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Absorbs the opponent's energy attack with one blade, channels and delays it through the connecting cord, and fires it back from the second blade.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Jushiro Ukitake",
  },

  // Shinji Hirako
  {
    name: "Sakanade",
    type: PowerType.SUPPORT,
    source: PowerSource.ZANPAKUTO,
    description:
      "Reverses the target's directions (left is right, up is down, forward is backward, sight, and hearing).",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Shinji Hirako",
    transformationName: "Shikai: Sakanade",
  },

  // Hiyori Sarugaki
  {
    name: "Kubikiri Orochi",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Unleashes a heavy jagged slash from her massive serrated cleaver.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Hiyori Sarugaki",
  },

  // Kensei Muguruma
  {
    name: "Tachikaze",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description: "Fires compressed air shockwaves that explode on impact.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Kensei Muguruma",
  },

  // Mashiro Kuna
  {
    name: "Mashiro Kick",
    type: PowerType.OFFENSIVE,
    source: PowerSource.HOLLOW,
    description:
      "A high-speed, Hollow-energy-infused kick that shatters defenses.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Mashiro Kuna",
  },

  // Love Aikawa
  {
    name: "Tengumaru",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Slamming a giant spiked club down to unleash a wave of flame.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Love Aikawa",
  },

  // Rojuro Otoribashi (Rose)
  {
    name: "Kinshara",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Unleashes music/sound wave blasts from the tip of his golden rose-whip.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Rojuro Otoribashi",
  },

  // Lisa Yadomaru
  {
    name: "Hagurobo",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "A sweeping, high-momentum strike using a giant heavy monk spade.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Lisa Yadomaru",
  },

  // Hachigen Ushoda
  {
    name: "Hachigyō Sōka",
    type: PowerType.DEFENSIVE,
    source: PowerSource.KIDO,
    description:
      "Constructs highly advanced multi-layered Kido barriers to trap or shield targets.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Hachigen Ushoda",
  },

  // Coyote Starrk
  {
    name: "Cero Metralleta",
    type: PowerType.OFFENSIVE,
    source: PowerSource.HOLLOW,
    description:
      "Fires thousands of Cero blasts simultaneously from his dual spiritual pistols.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Coyote Starrk",
    transformationName: "Resurrección: Los Lobos",
  },

  // Baraggan Louisenbairn
  {
    name: "Respira",
    type: PowerType.OFFENSIVE,
    source: PowerSource.HOLLOW,
    description:
      "Unleashes a dark purple wind that rapidly ages and rots everything it touches.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Baraggan Louisenbairn",
    transformationName: "Resurrección: Arrogante",
  },

  // Tier Harribel
  {
    name: "Cascada",
    type: PowerType.OFFENSIVE,
    source: PowerSource.HOLLOW,
    description:
      "Fires a massive, high-pressure wave of boiling water at the target.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Tier Harribel",
    transformationName: "Resurrección: Tiburón",
  },

  // Ulquiorra Cifer
  {
    name: "Cero Oscuras",
    type: PowerType.OFFENSIVE,
    source: PowerSource.HOLLOW,
    description:
      "Fires a pitch-black, highly concentrated Cero blast with massive destructive area.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Ulquiorra Cifer",
    transformationName: "Resurrección: Murciélago",
  },
  {
    name: "Lanza del Relámpago",
    type: PowerType.OFFENSIVE,
    source: PowerSource.HOLLOW,
    description:
      "Generates a double-ended spear of green spiritual energy that creates a colossal explosion when thrown.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Ulquiorra Cifer",
    transformationName: "Segunda Etapa",
  },

  // Nnoitra Gilga
  {
    name: "Six Arms Slash",
    type: PowerType.OFFENSIVE,
    source: PowerSource.HOLLOW,
    description:
      "Grows six arms to unleash a relentless barrage of crescent-axe slashes.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Nnoitra Gilga",
    transformationName: "Resurrección: Santa Teresa",
  },

  // Grimmjow Jaegerjaquez
  {
    name: "Desgarrón",
    type: PowerType.OFFENSIVE,
    source: PowerSource.HOLLOW,
    description:
      "Fires ten massive claws of blue spiritual energy that are flung at the opponent.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Grimmjow Jaegerjaquez",
    transformationName: "Resurrección: Pantera",
  },

  // Zommari Rureaux
  {
    name: "Amor",
    type: PowerType.SUPPORT,
    source: PowerSource.HOLLOW,
    description:
      "Uses eyes on his body to take control of whatever target or limb they look at.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Zommari Rureaux",
    transformationName: "Resurrección: Brujería",
  },

  // Szayelaporro Granz
  {
    name: "Carbon Copying",
    type: PowerType.SUPPORT,
    source: PowerSource.HOLLOW,
    description:
      "Sprouts fluid drops that clone the opponent or create voodoo dolls to manipulate their organs.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Szayelaporro Granz",
    transformationName: "Resurrección: Fornicarás",
  },

  // Aaroniero Arruruerie
  {
    name: "Glotonería",
    type: PowerType.OFFENSIVE,
    source: PowerSource.HOLLOW,
    description:
      "Transforms his arm into a giant tentacle to swallow and manifest the powers of eaten Hollows.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Aaroniero Arruruerie",
    transformationName: "Resurrección: Glotonería",
  },

  // Yammy Llargo
  {
    name: "Size and Strength Growth",
    type: PowerType.PASSIVE,
    source: PowerSource.HOLLOW,
    description:
      "Increases his physical scale and brute force proportional to his anger level.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Yammy Llargo",
    transformationName: "Resurrección: Ira",
  },

  // Nelliel Tu Odelschwanck
  {
    name: "Lanzador Verde",
    type: PowerType.OFFENSIVE,
    source: PowerSource.HOLLOW,
    description:
      "Nelliel throws a massive, high-speed drill-like green lance at the target.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Nelliel Tu Odelschwanck",
    transformationName: "Resurrección: Gamuza",
  },

  // Luppi Antenor
  {
    name: "Luppi's Tentacle Strike",
    type: PowerType.OFFENSIVE,
    source: PowerSource.HOLLOW,
    description:
      "Unleashes eight powerful tentacles from his back to crush the opponent.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Luppi Antenor",
  },

  // Wonderweiss Margela
  {
    name: "Extinguir",
    type: PowerType.SUPPORT,
    source: PowerSource.HOLLOW,
    description:
      "Seals away fire-element attacks, designed specifically to counter Ryujin Jakka.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Wonderweiss Margela",
  },

  // Kugo Ginjo
  {
    name: "Cross of Scaffold",
    type: PowerType.OFFENSIVE,
    source: PowerSource.FULLBRING,
    description: "Fires a massive beam of green energy from his broadsword.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Kugo Ginjo",
    transformationName: "Fullbring: Cross of Scaffold",
  },
  {
    name: "Bankai Getsuga Tenshō (Ginjo)",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "Fires a dark red Getsuga Tenshō using stolen Shinigami powers combined with Fullbring.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Kugo Ginjo",
    transformationName: "Bankai: Ginjo",
  },

  // Shukuro Tsukishima
  {
    name: "Book of the End",
    type: PowerType.SUPPORT,
    source: PowerSource.FULLBRING,
    description:
      "Inserts Tsukishima's presence into the victim's past history by cutting them.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Shukuro Tsukishima",
  },

  // Riruka Dokugamine
  {
    name: "Dollhouse",
    type: PowerType.SUPPORT,
    source: PowerSource.FULLBRING,
    description:
      "Shrinks targets and seals them inside miniature dollhouse containers.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Riruka Dokugamine",
  },

  // Yukio Hans Vorarlberna
  {
    name: "Digital Radial Invaders",
    type: PowerType.SUPPORT,
    source: PowerSource.FULLBRING,
    description:
      "Creates customized virtual dimensions to trap or shield targets inside his console.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Yukio Hans Vorarlberna",
  },

  // Giriko Kutsuzawa
  {
    name: "Time Tells No Lies",
    type: PowerType.SUPPORT,
    source: PowerSource.FULLBRING,
    description:
      "Applies binding rules and timers to targets, causing death if violated.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Giriko Kutsuzawa",
  },

  // Jackie Tristan
  {
    name: "Dirty Boots",
    type: PowerType.OFFENSIVE,
    source: PowerSource.FULLBRING,
    description:
      "Increases the wielder's physical kicking strength the dirtier her boots get.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Jackie Tristan",
  },

  // Ichibe Hyosube
  {
    name: "Ichimonji",
    type: PowerType.SUPPORT,
    source: PowerSource.ZANPAKUTO,
    description:
      "Coats the target in black ink, erasing their name and stripping them of their powers.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Ichibe Hyosube",
  },

  // Oetsu Nimaiya
  {
    name: "Sayafushi",
    type: PowerType.OFFENSIVE,
    source: PowerSource.ZANPAKUTO,
    description:
      "A single physical slash from an extremely sharp sword that cannot be sheathed.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Oetsu Nimaiya",
  },

  // Tenjiro Kirinji
  {
    name: "Shinten Seishō",
    type: PowerType.HEALING,
    source: PowerSource.NATURAL,
    description:
      "Channels the restorative hot spring waters of the Soul King palace to heal wounds and replenish spiritual energy.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Tenjiro Kirinji",
  },

  // Senjumaru Shutara
  {
    name: "Ouken Fabric",
    type: PowerType.SUPPORT,
    source: PowerSource.NATURAL,
    description:
      "Weaves special spiritual fabrics that can shape reality or trap targets.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Senjumaru Shutara",
  },

  // Kirio Hikifune
  {
    name: "Cage of Life",
    type: PowerType.DEFENSIVE,
    source: PowerSource.NATURAL,
    description:
      "Creates an unbreakable wooden cage made of tree branches that absorbs reishi.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Kirio Hikifune",
  },

  // Yhwach
  {
    name: "The Almighty",
    type: PowerType.PASSIVE,
    source: PowerSource.QUINCY,
    description:
      "Yhwach's signature ability, allowing him to foresee all future timelines and rewrite them as he sees fit.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Yhwach",
    transformationName: "The Almighty",
  },

  // Jugram Haschwalth
  {
    name: "The Balance",
    type: PowerType.SUPPORT,
    source: PowerSource.QUINCY,
    description:
      "Haschwalth's schrift ability, redirecting misfortune from himself onto his shield, and then transferring it to his opponent.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Jugram Haschwalth",
  },

  // Askin Nakk Le Vaar
  {
    name: "The Deathdealing",
    type: PowerType.SUPPORT,
    source: PowerSource.QUINCY,
    description:
      "Alters the lethal dosage of any substance he ingests (like blood or reishi) to poison the target or make himself immune.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Askin Nakk Le Vaar",
  },

  // Bambietta Basterbine
  {
    name: "The Explode",
    type: PowerType.OFFENSIVE,
    source: PowerSource.QUINCY,
    description:
      "Releases reishi drops that turn anything they touch into a bomb, causing it to explode.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Bambietta Basterbine",
  },

  // Äs Nödt
  {
    name: "The Fear",
    type: PowerType.SUPPORT,
    source: PowerSource.QUINCY,
    description:
      "Fires thorns that induce paralyzing, irrational fear in the target upon contact.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Äs Nödt",
  },

  // Bazz-B
  {
    name: "Burner Finger 1",
    type: PowerType.OFFENSIVE,
    source: PowerSource.QUINCY,
    description:
      "Fires a concentrated, laser-like beam of fire from his index finger.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Bazz-B",
  },

  // Quilge Opie
  {
    name: "Sklaverei (Reishi Slavery)",
    type: PowerType.OFFENSIVE,
    source: PowerSource.QUINCY,
    description:
      "Quilge's Quincy Vollständig form, granting him glowing angel wings and a halo, boosting his reishi absorption to extreme levels.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Quilge Opie",
    transformationName: "Vollständig: Biskiel",
  },

  // Gremmy Thoumeaux
  {
    name: "The Visionary",
    type: PowerType.SUPPORT,
    source: PowerSource.QUINCY,
    description:
      "Allows Gremmy to manifest anything he imagines into absolute reality.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Gremmy Thoumeaux",
  },

  // Gerard Valkyrie
  {
    name: "The Miracle",
    type: PowerType.PASSIVE,
    source: PowerSource.QUINCY,
    description:
      "Converts physical damage and odds of defeat into giant size and physical power.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Gerard Valkyrie",
  },

  // Lille Barro
  {
    name: "The X-Axis",
    type: PowerType.OFFENSIVE,
    source: PowerSource.QUINCY,
    description:
      "Allows Lille's rifle to pierce through any target between the muzzle and the target, bypassing all physical and energy defenses.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Lille Barro",
  },

  // Pernida Parnkgjas
  {
    name: "The Compulsory",
    type: PowerType.SUPPORT,
    source: PowerSource.QUINCY,
    description:
      "Extends invisible nerves to warp, compress, and control the target's body.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Pernida Parnkgjas",
  },

  // Masaki Kurosaki
  {
    name: "Heilig Pfeil",
    type: PowerType.OFFENSIVE,
    source: PowerSource.QUINCY,
    description:
      "Masaki's pure-blood Quincy arrows formed from gathered Reishi, fired with exceptional precision.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Masaki Kurosaki",
  },
  {
    name: "Hirenkyaku",
    type: PowerType.MOVEMENT,
    source: PowerSource.QUINCY,
    description:
      "A high-speed Quincy movement technique using a platform of Reishi under the feet.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Masaki Kurosaki",
  },
  {
    name: "Blut Vene",
    type: PowerType.DEFENSIVE,
    source: PowerSource.QUINCY,
    description:
      "Circulates Reishi through the blood vessels to grant exceptional defensive durability.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Masaki Kurosaki",
  },

  // Ryuken Ishida
  {
    name: "Heilig Pfeil",
    type: PowerType.OFFENSIVE,
    source: PowerSource.QUINCY,
    description:
      "Ryuken's high-precision sacred arrows fired as a pure-blood Quincy.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Ryuken Ishida",
  },
  {
    name: "Hirenkyaku",
    type: PowerType.MOVEMENT,
    source: PowerSource.QUINCY,
    description:
      "The Quincy high-speed movement technique used by Ryuken with master-level proficiency.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.ANIME,
    characterName: "Ryuken Ishida",
  },
  {
    name: "Ransōtengai",
    type: PowerType.SUPPORT,
    source: PowerSource.QUINCY,
    description:
      "A technique allowing Ryuken to control his body with Reishi threads even if his limbs are immobilized.",
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    characterName: "Ryuken Ishida",
  },
];

export default powers;
