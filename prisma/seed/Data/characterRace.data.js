const characterRaces = [
  // Substitute Shinigami Arc (Episodes 1–20)
  {
    characterName: "Ichigo Kurosaki",
    races: ["Human", "Soul Reaper", "Quincy", "Hollow"],
  },
  {
    characterName: "Rukia Kuchiki",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Orihime Inoue",
    races: ["Human", "Fullbringer"],
  },
  {
    characterName: "Yasutora Sado",
    races: ["Human", "Fullbringer"],
  },
  {
    characterName: "Uryu Ishida",
    races: ["Quincy"],
  },
  {
    characterName: "Kon",
    races: ["Mod Soul"],
  },
  {
    characterName: "Kisuke Urahara",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Tessai Tsukabishi",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Yoruichi Shihoin",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Isshin Kurosaki",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Masaki Kurosaki",
    races: ["Quincy"],
  },
  {
    characterName: "Karin Kurosaki",
    races: ["Human"],
  },
  {
    characterName: "Yuzu Kurosaki",
    races: ["Human"],
  },
  {
    characterName: "Tatsuki Arisawa",
    races: ["Human"],
  },
  {
    characterName: "Keigo Asano",
    races: ["Human"],
  },
  {
    characterName: "Mizuiro Kojima",
    races: ["Human"],
  },
  {
    characterName: "Chizuru Honsho",
    races: ["Human"],
  },
  {
    characterName: "Jinta Hanakari",
    races: ["Human"],
  },
  {
    characterName: "Ururu Tsumugiya",
    races: ["Human"],
  },
  {
    characterName: "Don Kanonji",
    races: ["Human"],
  },
  {
    characterName: "Grand Fisher",
    races: ["Hollow"],
  },

  // Soul Society: Sneak Entry Arc
  {
    characterName: "Renji Abarai",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Byakuya Kuchiki",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Genryusai Shigekuni Yamamoto",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Shunsui Kyoraku",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Jushiro Ukitake",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Soi Fon",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Gin Ichimaru",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Retsu Unohana",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Sajin Komamura",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Kaname Tosen",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Toshiro Hitsugaya",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Kenpachi Zaraki",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Mayuri Kurotsuchi",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Sosuke Aizen",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Momo Hinamori",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Izuru Kira",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Rangiku Matsumoto",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Shuhei Hisagi",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Ikkaku Madarame",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Yachiru Kusajishi",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Nemu Kurotsuchi",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Chojiro Sasakibe",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Marechiyo Omaeda",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Hanataro Yamada",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Jidanbo Ikkanzaka",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Ganju Shiba",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Kukaku Shiba",
    races: ["Soul Reaper"],
  },

  // Bount Arc + Bount Assault on Soul Society Arc
  {
    characterName: "Jin Kariya",
    races: ["Bount"],
  },
  {
    characterName: "Yoshino Soma",
    races: ["Bount"],
  },
  {
    characterName: "Maki Ichinose",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Koga Go",
    races: ["Bount"],
  },
  {
    characterName: "Sawatari",
    races: ["Bount"],
  },
  {
    characterName: "Mabashi",
    races: ["Bount"],
  },
  {
    characterName: "Yoshi",
    races: ["Bount"],
  },
  {
    characterName: "Ugaki",
    races: ["Bount"],
  },
  {
    characterName: "Ririn",
    races: ["Mod Soul"],
  },
  {
    characterName: "Kurōdo",
    races: ["Mod Soul"],
  },
  {
    characterName: "Noba",
    races: ["Mod Soul"],
  },

  // Arrancar Arc
  {
    characterName: "Shinji Hirako",
    races: ["Soul Reaper", "Visored"],
  },
  {
    characterName: "Hiyori Sarugaki",
    races: ["Soul Reaper", "Visored"],
  },
  {
    characterName: "Love Aikawa",
    races: ["Soul Reaper", "Visored"],
  },
  {
    characterName: "Rojuro Otoribashi",
    races: ["Soul Reaper", "Visored"],
  },
  {
    characterName: "Kensei Muguruma",
    races: ["Soul Reaper", "Visored"],
  },
  {
    characterName: "Mashiro Kuna",
    races: ["Soul Reaper", "Visored"],
  },
  {
    characterName: "Lisa Yadomaru",
    races: ["Soul Reaper", "Visored"],
  },
  {
    characterName: "Hachigen Ushoda",
    races: ["Soul Reaper", "Visored"],
  },
  {
    characterName: "Yammy Llargo",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Ulquiorra Cifer",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Grimmjow Jaegerjaquez",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Wonderweiss Margela",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Aaroniero Arruruerie",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Szayelaporro Granz",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Zommari Rureaux",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Nnoitra Gilga",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Tier Harribel",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Nel Tu",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Nelliel Tu Odelschwanck",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Baraggan Louisenbairn",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Coyote Starrk",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Lilynette Gingerbuck",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Rudbornn Chelute",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Tesla Lindocruz",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Apache",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Mila Rose",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Sung-Sun",
    races: ["Hollow", "Arrancar"],
  },

  // Lost Substitute Shinigami Arc (Fullbring Arc)
  {
    characterName: "Kugo Ginjo",
    races: ["Human", "Fullbringer"],
  },
  {
    characterName: "Shukuro Tsukishima",
    races: ["Human", "Fullbringer"],
  },
  {
    characterName: "Riruka Dokugamine",
    races: ["Human", "Fullbringer"],
  },
  {
    characterName: "Yukio Hans Vorarlberna",
    races: ["Human", "Fullbringer"],
  },
  {
    characterName: "Jackie Tristan",
    races: ["Human", "Fullbringer"],
  },
  {
    characterName: "Giriko Kutsuzawa",
    races: ["Human", "Fullbringer"],
  },
  {
    characterName: "Moe Shishigawara",
    races: ["Human", "Fullbringer"],
  },

  // TYBW
  {
    characterName: "Yhwach",
    races: ["Quincy"],
  },
  {
    characterName: "Jugram Haschwalth",
    races: ["Quincy"],
  },
  {
    characterName: "Askin Nakk Le Vaar",
    races: ["Quincy"],
  },
  {
    characterName: "Bazz-B",
    races: ["Quincy"],
  },
  {
    characterName: "Bambietta Basterbine",
    races: ["Quincy"],
  },
  {
    characterName: "Candice Catnipp",
    races: ["Quincy"],
  },
  {
    characterName: "Liltotto Lamperd",
    races: ["Quincy"],
  },
  {
    characterName: "Meninas McAllon",
    races: ["Quincy"],
  },
  {
    characterName: "Giselle Gewelle",
    races: ["Quincy"],
  },
  {
    characterName: "Äs Nödt",
    races: ["Quincy"],
  },
  {
    characterName: "Mask De Masculine",
    races: ["Quincy"],
  },
  {
    characterName: "Quilge Opie",
    races: ["Quincy"],
  },
  {
    characterName: "Gremmy Thoumeaux",
    races: ["Quincy"],
  },
  {
    characterName: "Lille Barro",
    races: ["Quincy"],
  },
  {
    characterName: "Gerard Valkyrie",
    races: ["Quincy"],
  },
  {
    characterName: "Pernida Parnkgjas",
    races: ["Quincy"],
  },
  {
    characterName: "Royd Lloyd",
    races: ["Quincy"],
  },
  {
    characterName: "Loyd Lloyd",
    races: ["Quincy"],
  },
  {
    characterName: "Ichibe Hyosube",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Oetsu Nimaiya",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Senjumaru Shutara",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Tenjiro Kirinji",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Kirio Hikifune",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Robert Accutrone",
    races: ["Quincy"],
  },
  {
    characterName: "Cang Du",
    races: ["Quincy"],
  },
  {
    characterName: "BG9",
    races: ["Quincy"],
  },
  {
    characterName: "Driscoll Berci",
    races: ["Quincy"],
  },
  {
    characterName: "Nanana Najahkoop",
    races: ["Quincy"],
  },
  {
    characterName: "PePe Waccabrada",
    races: ["Quincy"],
  },
  {
    characterName: "Nianzol Weizol",
    races: ["Quincy"],
  },
  {
    characterName: "Jerome Guizbatt",
    races: ["Quincy"],
  },
  {
    characterName: "Berenice Gabrielli",
    races: ["Quincy"],
  },
  {
    characterName: "Luders Friegen",
    races: ["Quincy"],
  },
  {
    characterName: "Ebern Asguiaro",
    races: ["Hollow", "Arrancar"],
  },

  // Misc / Other
  {
    characterName: "Isane Kotetsu",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Tetsuzaemon Iba",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Akon",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Sentaro Kotsubaki",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Kiyone Kotetsu",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Kaien Shiba",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Miyako Shiba",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Ryuken Ishida",
    races: ["Quincy"],
  },
  {
    characterName: "Soken Ishida",
    races: ["Quincy"],
  },
  {
    characterName: "White",
    races: ["Hollow"],
  },
  {
    characterName: "Zangetsu",
    races: ["Soul Reaper"],
  },
  {
    characterName: "White Ichigo",
    races: ["Hollow"],
  },
  {
    characterName: "Old Man Zangetsu",
    races: ["Quincy"],
  },
  {
    characterName: "Luppi Antenor",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Charlotte Chuhlhourne",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Cirucci Sanderwicci",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Dordoni Alessandro Del Socaccio",
    races: ["Hollow", "Arrancar"],
  },
  {
    characterName: "Yushiro Shihoin",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Tokinada Tsunayashiro",
    races: ["Soul Reaper"],
  },
  {
    characterName: "Soul King",
    races: ["Soul King Fragment"],
  },
];

export default characterRaces;
