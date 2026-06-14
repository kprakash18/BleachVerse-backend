const characterOrganizations = [
  // Gotei 13 / Soul Society
  {
    characterName: "Ichigo Kurosaki",
    organizationSlug: "gotei-13",
    role: "Substitute Soul Reaper",
  },
  {
    characterName: "Rukia Kuchiki",
    organizationSlug: "gotei-13",
    role: "Captain (Squad 13)",
  },
  {
    characterName: "Kisuke Urahara",
    organizationSlug: "gotei-13",
    role: "Former Captain (Squad 12)",
  },
  {
    characterName: "Tessai Tsukabishi",
    organizationSlug: "kido-corps",
    role: "Former Commander of the Kido Corps",
  },
  {
    characterName: "Yoruichi Shihoin",
    organizationSlug: "gotei-13",
    role: "Former Captain (Squad 2)",
  },
  {
    characterName: "Yoruichi Shihoin",
    organizationSlug: "stealth-force",
    role: "Former Commander-in-Chief",
  },
  {
    characterName: "Isshin Kurosaki",
    organizationSlug: "gotei-13",
    role: "Former Captain (Squad 10)",
  },
  {
    characterName: "Renji Abarai",
    organizationSlug: "gotei-13",
    role: "Lieutenant (Squad 6)",
  },
  {
    characterName: "Byakuya Kuchiki",
    organizationSlug: "gotei-13",
    role: "Captain (Squad 6)",
  },
  {
    characterName: "Genryusai Shigekuni Yamamoto",
    organizationSlug: "gotei-13",
    role: "Captain-Commander / Captain (Squad 1)",
  },
  {
    characterName: "Shunsui Kyoraku",
    organizationSlug: "gotei-13",
    role: "Captain-Commander / Captain (Squad 1)",
  },
  {
    characterName: "Jushiro Ukitake",
    organizationSlug: "gotei-13",
    role: "Captain (Squad 13)",
  },
  {
    characterName: "Soi Fon",
    organizationSlug: "gotei-13",
    role: "Captain (Squad 2)",
  },
  {
    characterName: "Soi Fon",
    organizationSlug: "stealth-force",
    role: "Commander-in-Chief",
  },
  {
    characterName: "Gin Ichimaru",
    organizationSlug: "gotei-13",
    role: "Former Captain (Squad 3)",
  },
  {
    characterName: "Retsu Unohana",
    organizationSlug: "gotei-13",
    role: "Captain (Squad 4)",
  },
  {
    characterName: "Sajin Komamura",
    organizationSlug: "gotei-13",
    role: "Captain (Squad 7)",
  },
  {
    characterName: "Kaname Tosen",
    organizationSlug: "gotei-13",
    role: "Former Captain (Squad 9)",
  },
  {
    characterName: "Toshiro Hitsugaya",
    organizationSlug: "gotei-13",
    role: "Captain (Squad 10)",
  },
  {
    characterName: "Kenpachi Zaraki",
    organizationSlug: "gotei-13",
    role: "Captain (Squad 11)",
  },
  {
    characterName: "Mayuri Kurotsuchi",
    organizationSlug: "gotei-13",
    role: "Captain (Squad 12)",
  },
  {
    characterName: "Sosuke Aizen",
    organizationSlug: "gotei-13",
    role: "Former Captain (Squad 5)",
  },
  {
    characterName: "Momo Hinamori",
    organizationSlug: "gotei-13",
    role: "Lieutenant (Squad 5)",
  },
  {
    characterName: "Izuru Kira",
    organizationSlug: "gotei-13",
    role: "Lieutenant (Squad 3)",
  },
  {
    characterName: "Rangiku Matsumoto",
    organizationSlug: "gotei-13",
    role: "Lieutenant (Squad 10)",
  },
  {
    characterName: "Shuhei Hisagi",
    organizationSlug: "gotei-13",
    role: "Lieutenant (Squad 9)",
  },
  {
    characterName: "Ikkaku Madarame",
    organizationSlug: "gotei-13",
    role: "Lieutenant (Squad 11)",
  },
  {
    characterName: "Yachiru Kusajishi",
    organizationSlug: "gotei-13",
    role: "Former Lieutenant (Squad 11)",
  },
  {
    characterName: "Nemu Kurotsuchi",
    organizationSlug: "gotei-13",
    role: "Lieutenant (Squad 12)",
  },
  {
    characterName: "Chojiro Sasakibe",
    organizationSlug: "gotei-13",
    role: "Lieutenant (Squad 1)",
  },
  {
    characterName: "Marechiyo Omaeda",
    organizationSlug: "gotei-13",
    role: "Lieutenant (Squad 2)",
  },
  {
    characterName: "Hanataro Yamada",
    organizationSlug: "gotei-13",
    role: "Co-3rd Seat (Squad 4)",
  },
  {
    characterName: "Nanao Ise",
    organizationSlug: "gotei-13",
    role: "Lieutenant (Squad 8)",
  },
  {
    characterName: "Yumichika Ayasegawa",
    organizationSlug: "gotei-13",
    role: "5th Seat (Squad 11)",
  },
  {
    characterName: "Jidanbo Ikkanzaka",
    organizationSlug: "seireitei-gate-guards",
    role: "West Gate Guardian",
  },
  {
    characterName: "Ganju Shiba",
    organizationSlug: "soul-society",
    role: "Member of the Shiba Noble House",
  },
  {
    characterName: "Kukaku Shiba",
    organizationSlug: "soul-society",
    role: "Head of the Shiba Noble House",
  },
  {
    characterName: "Isane Kotetsu",
    organizationSlug: "gotei-13",
    role: "Captain (Squad 4)",
  },
  {
    characterName: "Tetsuzaemon Iba",
    organizationSlug: "gotei-13",
    role: "Captain (Squad 7)",
  },
  {
    characterName: "Akon",
    organizationSlug: "gotei-13",
    role: "Lieutenant (Squad 12)",
  },
  {
    characterName: "Sentaro Kotsubaki",
    organizationSlug: "gotei-13",
    role: "Co-3rd Seat Officer (Squad 13)",
  },
  {
    characterName: "Kiyone Kotetsu",
    organizationSlug: "gotei-13",
    role: "Co-3rd Seat Officer (Squad 13)",
  },
  {
    characterName: "Kaien Shiba",
    organizationSlug: "gotei-13",
    role: "Former Lieutenant (Squad 13)",
  },
  {
    characterName: "Miyako Shiba",
    organizationSlug: "gotei-13",
    role: "Former 3rd Seat (Squad 13)",
  },
  {
    characterName: "Yushiro Shihoin",
    organizationSlug: "soul-society",
    role: "Head of the Shihoin Clan",
  },
  {
    characterName: "Tokinada Tsunayashiro",
    organizationSlug: "soul-society",
    role: "Head of the Tsunayashiro Clan",
  },
  {
    characterName: "Maki Ichinose",
    organizationSlug: "gotei-13",
    role: "Former 11th Division Member",
  },

  // Royal Guard
  {
    characterName: "Ichibe Hyosube",
    organizationSlug: "royal-guard",
    role: "Leader / Squad 0 Captain",
  },
  {
    characterName: "Oetsu Nimaiya",
    organizationSlug: "royal-guard",
    role: "Squad 0 Captain",
  },
  {
    characterName: "Senjumaru Shutara",
    organizationSlug: "royal-guard",
    role: "Squad 0 Captain",
  },
  {
    characterName: "Tenjiro Kirinji",
    organizationSlug: "royal-guard",
    role: "Squad 0 Captain",
  },
  {
    characterName: "Kirio Hikifune",
    organizationSlug: "royal-guard",
    role: "Squad 0 Captain",
  },

  // Bounts
  {
    characterName: "Jin Kariya",
    organizationSlug: "bounts",
    role: "Leader",
  },
  {
    characterName: "Yoshino Soma",
    organizationSlug: "bounts",
    role: "Member",
  },
  {
    characterName: "Koga Go",
    organizationSlug: "bounts",
    role: "Member",
  },
  {
    characterName: "Sawatari",
    organizationSlug: "bounts",
    role: "Member",
  },
  {
    characterName: "Mabashi",
    organizationSlug: "bounts",
    role: "Member",
  },
  {
    characterName: "Yoshi",
    organizationSlug: "bounts",
    role: "Member",
  },
  {
    characterName: "Ugaki",
    organizationSlug: "bounts",
    role: "Member",
  },

  // Arrancar Army / Espada / Las Noches
  {
    characterName: "Wonderweiss Margela",
    organizationSlug: "arrancar-army",
    role: "Modified Arrancar",
  },
  {
    characterName: "Yammy Llargo",
    organizationSlug: "espada",
    role: "10th / 0th Espada",
  },
  {
    characterName: "Ulquiorra Cifer",
    organizationSlug: "espada",
    role: "4th Espada",
  },
  {
    characterName: "Grimmjow Jaegerjaquez",
    organizationSlug: "espada",
    role: "6th Espada",
  },
  {
    characterName: "Aaroniero Arruruerie",
    organizationSlug: "espada",
    role: "9th Espada",
  },
  {
    characterName: "Szayelaporro Granz",
    organizationSlug: "espada",
    role: "8th Espada",
  },
  {
    characterName: "Zommari Rureaux",
    organizationSlug: "espada",
    role: "7th Espada",
  },
  {
    characterName: "Nnoitra Gilga",
    organizationSlug: "espada",
    role: "5th Espada",
  },
  {
    characterName: "Tier Harribel",
    organizationSlug: "espada",
    role: "3rd Espada / Ruler of Hueco Mundo",
  },
  {
    characterName: "Nel Tu",
    organizationSlug: "espada",
    role: "Former 3rd Espada",
  },
  {
    characterName: "Nelliel Tu Odelschwanck",
    organizationSlug: "espada",
    role: "Former 3rd Espada",
  },
  {
    characterName: "Baraggan Louisenbairn",
    organizationSlug: "espada",
    role: "2nd Espada / Former King of Hueco Mundo",
  },
  {
    characterName: "Coyote Starrk",
    organizationSlug: "espada",
    role: "1st Espada",
  },
  {
    characterName: "Lilynette Gingerbuck",
    organizationSlug: "fraccion",
    role: "Starrk's Fraccion",
  },
  {
    characterName: "Rudbornn Chelute",
    organizationSlug: "exequias",
    role: "Captain of the Exequias",
  },
  {
    characterName: "Tesla Lindocruz",
    organizationSlug: "fraccion",
    role: "Nnoitra's Fraccion",
  },
  {
    characterName: "Apache",
    organizationSlug: "fraccion",
    role: "Harribel's Fraccion",
  },
  {
    characterName: "Mila Rose",
    organizationSlug: "fraccion",
    role: "Harribel's Fraccion",
  },
  {
    characterName: "Sung-Sun",
    organizationSlug: "fraccion",
    role: "Harribel's Fraccion",
  },
  {
    characterName: "Luppi Antenor",
    organizationSlug: "espada",
    role: "Temporary 6th Espada",
  },
  {
    characterName: "Charlotte Chuhlhourne",
    organizationSlug: "fraccion",
    role: "Baraggan's Fraccion",
  },
  {
    characterName: "Cirucci Sanderwicci",
    organizationSlug: "privaron-espada",
    role: "105th Privaron Espada",
  },
  {
    characterName: "Dordoni Alessandro Del Socaccio",
    organizationSlug: "privaron-espada",
    role: "103rd Privaron Espada",
  },
  {
    characterName: "Ebern Asguiaro",
    organizationSlug: "arrancar-army",
    role: "Soldier",
  },

  // Wandenreich / Quincies
  {
    characterName: "Yhwach",
    organizationSlug: "wandenreich",
    role: "Emperor / Founder",
  },
  {
    characterName: "Jugram Haschwalth",
    organizationSlug: "sternritter",
    role: "Grandmaster",
  },
  {
    characterName: "Askin Nakk Le Vaar",
    organizationSlug: "schutzstaffel",
    role: "Sternritter 'D' / Schutzstaffel member",
  },
  {
    characterName: "Bazz-B",
    organizationSlug: "sternritter",
    role: "Sternritter 'H'",
  },
  {
    characterName: "Bambietta Basterbine",
    organizationSlug: "sternritter",
    role: "Sternritter 'E'",
  },
  {
    characterName: "Candice Catnipp",
    organizationSlug: "sternritter",
    role: "Sternritter 'T'",
  },
  {
    characterName: "Liltotto Lamperd",
    organizationSlug: "sternritter",
    role: "Sternritter 'G'",
  },
  {
    characterName: "Meninas McAllon",
    organizationSlug: "sternritter",
    role: "Sternritter 'P'",
  },
  {
    characterName: "Giselle Gewelle",
    organizationSlug: "sternritter",
    role: "Sternritter 'Z'",
  },
  {
    characterName: "Äs Nödt",
    organizationSlug: "sternritter",
    role: "Sternritter 'F'",
  },
  {
    characterName: "Mask De Masculine",
    organizationSlug: "sternritter",
    role: "Sternritter 'S'",
  },
  {
    characterName: "Quilge Opie",
    organizationSlug: "jagdarmee",
    role: "Executive Officer / Jagdarmee Commander",
  },
  {
    characterName: "Gremmy Thoumeaux",
    organizationSlug: "sternritter",
    role: "Sternritter 'V'",
  },
  {
    characterName: "Lille Barro",
    organizationSlug: "schutzstaffel",
    role: "Leader of the Schutzstaffel / Sternritter 'X'",
  },
  {
    characterName: "Gerard Valkyrie",
    organizationSlug: "schutzstaffel",
    role: "Schutzstaffel member / Sternritter 'M'",
  },
  {
    characterName: "Pernida Parnkgjas",
    organizationSlug: "schutzstaffel",
    role: "Schutzstaffel member / Sternritter 'C'",
  },
  {
    characterName: "Royd Lloyd",
    organizationSlug: "sternritter",
    role: "Sternritter 'Y'",
  },
  {
    characterName: "Loyd Lloyd",
    organizationSlug: "sternritter",
    role: "Sternritter 'Y'",
  },
  {
    characterName: "Robert Accutrone",
    organizationSlug: "sternritter",
    role: "Sternritter 'N'",
  },
  {
    characterName: "Cang Du",
    organizationSlug: "sternritter",
    role: "Sternritter 'I'",
  },
  {
    characterName: "BG9",
    organizationSlug: "sternritter",
    role: "Sternritter 'K'",
  },
  {
    characterName: "Driscoll Berci",
    organizationSlug: "sternritter",
    role: "Sternritter 'O'",
  },
  {
    characterName: "Nanana Najahkoop",
    organizationSlug: "sternritter",
    role: "Sternritter 'U'",
  },
  {
    characterName: "PePe Waccabrada",
    organizationSlug: "sternritter",
    role: "Sternritter 'L'",
  },
  {
    characterName: "Nianzol Weizol",
    organizationSlug: "sternritter",
    role: "Sternritter 'W'",
  },
  {
    characterName: "Jerome Guizbatt",
    organizationSlug: "sternritter",
    role: "Sternritter 'R'",
  },
  {
    characterName: "Berenice Gabrielli",
    organizationSlug: "sternritter",
    role: "Sternritter 'Q'",
  },
  {
    characterName: "Luders Friegen",
    organizationSlug: "wandenreich",
    role: "Quincy Officer",
  },

  // Visored
  {
    characterName: "Shinji Hirako",
    organizationSlug: "visored",
    role: "Leader",
  },
  {
    characterName: "Hiyori Sarugaki",
    organizationSlug: "visored",
    role: "Member",
  },
  {
    characterName: "Love Aikawa",
    organizationSlug: "visored",
    role: "Member",
  },
  {
    characterName: "Rojuro Otoribashi",
    organizationSlug: "visored",
    role: "Member",
  },
  {
    characterName: "Kensei Muguruma",
    organizationSlug: "visored",
    role: "Member",
  },
  {
    characterName: "Mashiro Kuna",
    organizationSlug: "visored",
    role: "Member",
  },
  {
    characterName: "Lisa Yadomaru",
    organizationSlug: "visored",
    role: "Member",
  },
  {
    characterName: "Hachigen Ushoda",
    organizationSlug: "visored",
    role: "Member",
  },

  // Xcution (Fullbringers)
  {
    characterName: "Kugo Ginjo",
    organizationSlug: "xcution",
    role: "Leader / Founder",
  },
  {
    characterName: "Shukuro Tsukishima",
    organizationSlug: "xcution",
    role: "Former Leader / Member",
  },
  {
    characterName: "Riruka Dokugamine",
    organizationSlug: "xcution",
    role: "Member",
  },
  {
    characterName: "Yukio Hans Vorarlberna",
    organizationSlug: "xcution",
    role: "Member",
  },
  {
    characterName: "Jackie Tristan",
    organizationSlug: "xcution",
    role: "Member",
  },
  {
    characterName: "Giriko Kutsuzawa",
    organizationSlug: "xcution",
    role: "Member",
  },
  {
    characterName: "Moe Shishigawara",
    organizationSlug: "xcution",
    role: "Associate",
  },
  {
    characterName: "Uryu Ishida",
    organizationSlug: "wandenreich",
    role: "Designated Successor",
  },
  {
    characterName: "Masaki Kurosaki",
    organizationSlug: "ishida-family",
    role: "Member",
  },
  {
    characterName: "Ryuken Ishida",
    organizationSlug: "ishida-family",
    role: "Head",
  },
  {
    characterName: "Uryu Ishida",
    organizationSlug: "ishida-family",
    role: "Heir",
  },
  // Sternritter members missing from data
  {
    characterName: "James",
    organizationSlug: "sternritter",
    role: "Member",
  },
  {
    characterName: "James",
    organizationSlug: "wandenreich",
    role: "Sternritter",
  },
  // Next-gen Soul Reapers
  {
    characterName: "Ichika Abarai",
    organizationSlug: "gotei-13",
    role: "Soul Reaper",
  },
  // Shiba Clan / misc
  {
    characterName: "Kukaku Shiba",
    organizationSlug: "soul-society",
    role: "Shiba Clan Head",
  },
  // Arrancar
  {
    characterName: "Menoly Mallia",
    organizationSlug: "arrancar-army",
    role: "Fraccion",
  },
];

export default characterOrganizations;
