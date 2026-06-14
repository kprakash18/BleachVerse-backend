import { CharacterStatus, Sex } from "@prisma/client";
import { SERVFAIL } from "node:dns";
import slugify from "slugify";

const character = [
  // Substitute Shinigami Arc (Episodes 1–20)
  {
    name: "Ichigo Kurosaki",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Substitute Shinigami and protagonist of Bleach",
  },
  {
    name: "Rukia Kuchiki",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Soul Reaper who transfers her powers to Ichigo",
  },
  {
    name: "Orihime Inoue",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Ichigo's classmate with healing and defensive powers",
  },

  {
    name: "Yasutora Sado",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Ichigo's close friend also known as Chad",
  },

  {
    name: "Uryu Ishida",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "A Quincy and one of Ichigo's closest allies",
  },

  {
    name: "Kon",
    sex: Sex.UNKNOWN,
    status: CharacterStatus.ALIVE,
    description: "Modified soul residing in a stuffed lion",
  },

  {
    name: "Kisuke Urahara",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Former captain of Squad 12 and owner of Urahara Shop",
  },

  {
    name: "Tessai Tsukabishi",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Former Captain of the Kido Corps and assistant to Urahara",
  },

  {
    name: "Yoruichi Shihoin",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Former captain of Squad 2 known as the Flash Goddess",
  },

  {
    name: "Isshin Kurosaki",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Ichigo's father and former captain of Squad 10",
  },

  {
    name: "Masaki Kurosaki",
    sex: Sex.FEMALE,
    status: CharacterStatus.DEAD,
    description: "Ichigo's mother who died protecting her son",
  },

  {
    name: "Karin Kurosaki",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Ichigo's younger sister with spiritual awareness",
  },

  {
    name: "Yuzu Kurosaki",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Ichigo's younger sister known for her caring nature",
  },

  {
    name: "Tatsuki Arisawa",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Orihime's best friend and Ichigo's childhood friend",
  },

  {
    name: "Keigo Asano",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "One of Ichigo's energetic classmates",
  },

  {
    name: "Mizuiro Kojima",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "A calm and intelligent classmate of Ichigo",
  },

  {
    name: "Chizuru Honsho",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Orihime's eccentric classmate and friend",
  },

  {
    name: "Jinta Hanakari",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Employee of Urahara Shop known for his short temper",
  },

  {
    name: "Ururu Tsumugiya",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Quiet employee of Urahara Shop with hidden combat abilities",
  },

  {
    name: "Don Kanonji",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Popular television spiritualist and entertainer",
  },

  {
    name: "Grand Fisher",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Powerful Hollow responsible for Masaki Kurosaki's death",
  },
  // soul-society sneak entry arc
  {
    name: "Renji Abarai",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Lieutenant of Squad 6 and Rukia's childhood friend",
  },

  {
    name: "Byakuya Kuchiki",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Captain of Squad 6 and head of the Kuchiki Clan",
  },

  {
    name: "Genryusai Shigekuni Yamamoto",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Founder of the Gotei 13 and Captain-Commander",
  },

  {
    name: "Shunsui Kyoraku",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Captain of Squad 8 who later becomes Captain-Commander",
  },

  {
    name: "Jushiro Ukitake",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Captain of Squad 13 and one of the oldest captains",
  },

  {
    name: "Soi Fon",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Captain of Squad 2 and commander of the Onmitsukido",
  },

  {
    name: "Gin Ichimaru",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Captain of Squad 3 known for his enigmatic smile",
  },

  {
    name: "Retsu Unohana",
    sex: Sex.FEMALE,
    status: CharacterStatus.DEAD,
    description: "Captain of Squad 4 and the first Kenpachi",
  },

  {
    name: "Sajin Komamura",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Captain of Squad 7 and loyal ally of Yamamoto",
  },

  {
    name: "Kaname Tosen",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Captain of Squad 9 who later defects to Aizen",
  },

  {
    name: "Toshiro Hitsugaya",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Captain of Squad 10 and child prodigy Soul Reaper",
  },

  {
    name: "Kenpachi Zaraki",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Captain of Squad 11 who lives for battle",
  },

  {
    name: "Mayuri Kurotsuchi",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description:
      "Captain of Squad 12 and head of the Research and Development Institute",
  },

  {
    name: "Sosuke Aizen",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description:
      "Former captain of Squad 5 and mastermind behind many events in Bleach",
  },

  {
    name: "Momo Hinamori",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Lieutenant of Squad 5 and childhood friend of Hitsugaya",
  },

  {
    name: "Izuru Kira",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Lieutenant of Squad 3 known for his melancholy personality",
  },

  {
    name: "Rangiku Matsumoto",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Lieutenant of Squad 10 and Hitsugaya's trusted subordinate",
  },

  {
    name: "Shuhei Hisagi",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description:
      "Lieutenant of Squad 9 recognized by the 69 tattoo on his face",
  },

  {
    name: "Ikkaku Madarame",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Third Seat of Squad 11 and loyal follower of Kenpachi",
  },

  {
    name: "Yachiru Kusajishi",
    sex: Sex.FEMALE,
    status: CharacterStatus.UNKNOWN,
    description: "Lieutenant of Squad 11 and Kenpachi's constant companion",
  },

  {
    name: "Nemu Kurotsuchi",
    sex: Sex.FEMALE,
    status: CharacterStatus.DEAD,
    description: "Artificial soul created by Mayuri and lieutenant of Squad 12",
  },

  {
    name: "Chojiro Sasakibe",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Lieutenant of Squad 1 and longtime aide to Yamamoto",
  },

  {
    name: "Marechiyo Omaeda",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Lieutenant of Squad 2 serving under Soi Fon",
  },

  {
    name: "Hanataro Yamada",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description:
      "Member of Squad 4 who assists Ichigo during the Soul Society rescue mission",
  },

  {
    name: "Nanao Ise",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description:
      "Lieutenant of Squad 8 who later serves under Captain-Commander Kyoraku",
  },

  {
    name: "Yumichika Ayasegawa",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "5th Seat of Squad 11 and close friend of Ikkaku Madarame",
  },

  {
    name: "Jidanbo Ikkanzaka",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Guardian of the White Road Gate leading into Seireitei",
  },

  {
    name: "Ganju Shiba",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Member of the Shiba Clan who helps Ichigo enter Soul Society",
  },

  {
    name: "Kukaku Shiba",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description:
      "Head of the Shiba household and master of spiritual artillery",
  },

  // Bount arc + Bount assault on soul society arc
  {
    name: "Jin Kariya",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Leader of the Bounts who seeks revenge against Soul Society",
  },

  {
    name: "Yoshino Soma",
    sex: Sex.FEMALE,
    status: CharacterStatus.DEAD,
    description: "A Bount who opposes Kariya's plans and aids Ichigo",
  },

  {
    name: "Maki Ichinose",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Former Soul Reaper who joins Jin Kariya's faction",
  },

  {
    name: "Koga Go",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "A powerful Bount serving under Jin Kariya",
  },

  {
    name: "Sawatari",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "A Bount who controls the Doll Baura",
  },

  {
    name: "Mabashi",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "A Bount capable of manipulating others through his Doll Ritz",
  },

  {
    name: "Yoshi",
    sex: Sex.FEMALE,
    status: CharacterStatus.DEAD,
    description: "A Bount allied with Jin Kariya",
  },

  {
    name: "Ugaki",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description:
      "A Bount who participates in Kariya's campaign against Soul Society",
  },

  {
    name: "Ririn",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description:
      "A Modified Soul created to assist Soul Reapers in tracking Bounts",
  },

  {
    name: "Kurōdo",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "A Modified Soul with shape-shifting abilities",
  },

  {
    name: "Noba",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "A Modified Soul capable of creating dimensional portals",
  },
  // arrancar arc
  {
    name: "Shinji Hirako",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Leader of the Visored and former captain of Squad 5",
  },

  {
    name: "Hiyori Sarugaki",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "A hot-tempered Visored and former lieutenant of Squad 12",
  },

  {
    name: "Love Aikawa",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "A Visored and former captain of Squad 7",
  },

  {
    name: "Rojuro Otoribashi",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Also known as Rose, a Visored and former captain of Squad 3",
  },

  {
    name: "Kensei Muguruma",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "A Visored and former captain of Squad 9",
  },

  {
    name: "Mashiro Kuna",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "A Visored known for her powerful Hollow mask abilities",
  },

  {
    name: "Lisa Yadomaru",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "A Visored and former lieutenant of Squad 8",
  },

  {
    name: "Hachigen Ushoda",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "A Visored specializing in Kido techniques",
  },

  {
    name: "Yammy Llargo",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "The first Arrancar encountered by Ichigo and his allies",
  },

  {
    name: "Ulquiorra Cifer",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "The Fourth Espada known for his emotionless demeanor",
  },

  {
    name: "Grimmjow Jaegerjaquez",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "The Sexta Espada and one of Ichigo's greatest rivals",
  },

  {
    name: "Wonderweiss Margela",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "An Arrancar specially created by Aizen to counter Yamamoto",
  },

  {
    name: "Aaroniero Arruruerie",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "The Noveno Espada with the ability to absorb Hollows",
  },

  {
    name: "Szayelaporro Granz",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "The Octava Espada and a brilliant scientist",
  },

  {
    name: "Zommari Rureaux",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "The Septima Espada with the power to control targets",
  },

  {
    name: "Nnoitra Gilga",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "The Quinta Espada obsessed with strength and battle",
  },

  {
    name: "Tier Harribel",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "The Tercera Espada who later becomes ruler of Hueco Mundo",
  },

  {
    name: "Nel Tu",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Child form of former Espada Nelliel Tu Odelschwanck",
  },

  {
    name: "Nelliel Tu Odelschwanck",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Former Tres Espada and ally of Ichigo",
  },

  {
    name: "Baraggan Louisenbairn",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "The Segunda Espada and former king of Hueco Mundo",
  },

  {
    name: "Coyote Starrk",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "The Primera Espada possessing immense spiritual power",
  },

  {
    name: "Lilynette Gingerbuck",
    sex: Sex.FEMALE,
    status: CharacterStatus.DEAD,
    description: "The other half of Coyote Starrk's soul",
  },

  {
    name: "Rudbornn Chelute",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Leader of the Exequias in Las Noches",
  },

  {
    name: "Tesla Lindocruz",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Fraccion and loyal subordinate of Nnoitra Gilga",
  },

  {
    name: "Apache",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "One of Harribel's trusted Fraccion",
  },

  {
    name: "Mila Rose",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "A powerful Fraccion serving Tier Harribel",
  },

  {
    name: "Sung-Sun",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "A calm and intelligent Fraccion of Harribel",
  },
  // Lost Substitute Shinigami Arc (Fullbring Arc) — Episodes 343–366
  {
    name: "Kugo Ginjo",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "The first Substitute Shinigami and leader of Xcution",
  },

  {
    name: "Shukuro Tsukishima",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description:
      "A Fullbringer whose power allows him to insert himself into people's pasts",
  },

  {
    name: "Riruka Dokugamine",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description:
      "A Fullbringer and member of Xcution with a tsundere personality",
  },

  {
    name: "Yukio Hans Vorarlberna",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "A Fullbringer who can create digital dimensions",
  },

  {
    name: "Jackie Tristan",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "A former Fullbringer and member of Xcution",
  },

  {
    name: "Giriko Kutsuzawa",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "A Fullbringer whose powers revolve around time and contracts",
  },

  {
    name: "Moe Shishigawara",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "A Fullbringer loyal to Tsukishima with luck-based abilities",
  },

  // tybw
  {
    name: "Yhwach",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Emperor of the Wandenreich and progenitor of the Quincy",
  },

  {
    name: "Jugram Haschwalth",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Grandmaster of the Sternritter and Yhwach's other half",
  },

  {
    name: "Askin Nakk Le Vaar",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'D' The Deathdealing",
  },

  {
    name: "Bazz-B",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'H' The Heat and former friend of Haschwalth",
  },

  {
    name: "Bambietta Basterbine",
    sex: Sex.FEMALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'E' The Explode",
  },

  {
    name: "Candice Catnipp",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Sternritter 'T' The Thunderbolt",
  },

  {
    name: "Liltotto Lamperd",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Sternritter 'G' The Glutton",
  },

  {
    name: "Meninas McAllon",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Sternritter 'P' The Power",
  },

  {
    name: "Giselle Gewelle",
    sex: Sex.UNKNOWN,
    status: CharacterStatus.ALIVE,
    description: "Sternritter 'Z' The Zombie",
  },

  {
    name: "Äs Nödt",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'F' The Fear",
  },

  {
    name: "Mask De Masculine",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'S' The Superstar",
  },

  {
    name: "Quilge Opie",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'J' The Jail and administrator of Hueco Mundo",
  },

  {
    name: "Gremmy Thoumeaux",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'V' The Visionary",
  },

  {
    name: "Lille Barro",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Leader of the Schutzstaffel and Sternritter 'X' The X-Axis",
  },

  {
    name: "Gerard Valkyrie",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'M' The Miracle",
  },

  {
    name: "Pernida Parnkgjas",
    sex: Sex.UNKNOWN,
    status: CharacterStatus.DEAD,
    description:
      "Sternritter 'C' The Compulsory and the Left Arm of the Soul King",
  },

  {
    name: "Royd Lloyd",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description:
      "One of the Lloyd twins capable of copying memories and appearance",
  },

  {
    name: "Loyd Lloyd",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "One of the Lloyd twins capable of copying abilities",
  },
  {
    name: "Ichibe Hyosube",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description:
      "Leader of Squad Zero and monk who governs names throughout Soul Society",
  },

  {
    name: "Oetsu Nimaiya",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Member of Squad Zero and creator of all Zanpakuto",
  },

  {
    name: "Senjumaru Shutara",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Member of Squad Zero known as the Great Weave Guard",
  },

  {
    name: "Tenjiro Kirinji",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description:
      "Member of Squad Zero and inventor of Soul Society's healing hot springs",
  },

  {
    name: "Kirio Hikifune",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description:
      "Member of Squad Zero who created the concept of artificial souls",
  },

  {
    name: "Robert Accutrone",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'N' who serves directly under Yhwach",
  },

  {
    name: "Cang Du",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'I' The Iron",
  },

  {
    name: "BG9",
    sex: Sex.UNKNOWN,
    status: CharacterStatus.DEAD,
    description: "Mechanical Sternritter who battles Soi Fon",
  },

  {
    name: "Driscoll Berci",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description:
      "Sternritter 'O' The Overkill responsible for killing Chojiro Sasakibe",
  },

  {
    name: "Nanana Najahkoop",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Sternritter 'U' The Underbelly",
  },

  {
    name: "PePe Waccabrada",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'L' The Love",
  },

  {
    name: "Nianzol Weizol",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'W' The Wind",
  },

  {
    name: "Jerome Guizbatt",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'R' The Roar",
  },

  {
    name: "Berenice Gabrielli",
    sex: Sex.FEMALE,
    status: CharacterStatus.DEAD,
    description: "Sternritter 'Q' The Question",
  },

  {
    name: "Luders Friegen",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Quincy officer executed by Yhwach during the first invasion",
  },

  {
    name: "Ebern Asguiaro",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Arrancar serving the Wandenreich who attacks Ichigo",
  },

  // misc
  {
    name: "Isane Kotetsu",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Former lieutenant of Squad 4 who later becomes its captain",
  },

  {
    name: "Tetsuzaemon Iba",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Former lieutenant of Squad 7 who later becomes its captain",
  },

  {
    name: "Akon",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description:
      "Senior officer of the Shinigami Research and Development Institute",
  },

  {
    name: "Sentaro Kotsubaki",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Third Seat of Squad 13 and close subordinate of Ukitake",
  },

  {
    name: "Kiyone Kotetsu",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Third Seat of Squad 13 and younger sister of Isane Kotetsu",
  },

  {
    name: "Kaien Shiba",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Former lieutenant of Squad 13 and member of the Shiba Clan",
  },

  {
    name: "Miyako Shiba",
    sex: Sex.FEMALE,
    status: CharacterStatus.DEAD,
    description: "Wife of Kaien Shiba and former member of Squad 13",
  },

  {
    name: "Ryuken Ishida",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Father of Uryu Ishida and head of the Ishida family",
  },

  {
    name: "Soken Ishida",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Grandfather of Uryu Ishida who taught him Quincy techniques",
  },

  {
    name: "White",
    sex: Sex.UNKNOWN,
    status: CharacterStatus.DEAD,
    description:
      "Experimental Hollow created by Aizen and source of Ichigo's Hollow powers",
  },

  {
    name: "Zangetsu",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Manifestation of Ichigo's Soul Reaper powers",
  },

  {
    name: "White Ichigo",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Manifestation of Ichigo's inner Hollow",
  },

  {
    name: "Old Man Zangetsu",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Manifestation of Ichigo's Quincy powers resembling Yhwach",
  },

  {
    name: "Luppi Antenor",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Temporary Sexta Espada who replaced Grimmjow",
  },

  {
    name: "Charlotte Chuhlhourne",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Fraccion of Baraggan known for his flamboyant personality",
  },

  {
    name: "Cirucci Sanderwicci",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "Former Privaron Espada defeated by Uryu Ishida",
  },

  {
    name: "Dordoni Alessandro Del Socaccio",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Former Privaron Espada who battles Ichigo",
  },
  {
    name: "Yushiro Shihoin",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Younger brother of Yoruichi Shihoin",
  },

  {
    name: "Tokinada Tsunayashiro",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Head of the Tsunayashiro Clan",
  },
  {
    name: "Soul King",
    sex: Sex.UNKNOWN,
    status: CharacterStatus.DEAD,
    description:
      "The linchpin of reality who maintains the balance between the Human World, Soul Society, and Hueco Mundo.",
  },
  {
    name: "Di Roy Rinker",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Arrancar Number 16 in Grimmjow's Fracción.",
  },
  {
    name: "Shrieker",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "A bat-winged Hollow who commits cruel acts.",
  },
  {
    name: "Gantenbainne Mosqueda",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "Former Privaron Espada Number 107.",
  },
  {
    name: "Jirobo Ikkanzaka",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description: "The Fourth Seat of Squad 7 and younger brother of Jidanbo.",
  },
  {
    name: "Ayon",
    sex: Sex.UNKNOWN,
    status: CharacterStatus.DEAD,
    description:
      "A chimera monster created by Emilou Apacci, Franceska Mila Rose, and Cyan Sung-Sun.",
  },
  {
    name: "Choe Neng Poww",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Arrancar Number 25 and Fracción of Baraggan Louisenbairn.",
  },
  {
    name: "Shawlong Koufang",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Arrancar Number 11 and leader of Grimmjow's Fracción.",
  },
  {
    name: "Ggio Vega",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Arrancar Number 26 and Fracción of Baraggan Louisenbairn.",
  },
  {
    name: "Abirama Redder",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Arrancar Number 22 and Fracción of Baraggan Louisenbairn.",
  },
  {
    name: "Findorr Calius",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Arrancar Number 24 and Fracción of Baraggan Louisenbairn.",
  },
  {
    name: "Nirgge Parduoc",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Arrancar Number 27 and Fracción of Baraggan Louisenbairn.",
  },
  {
    name: "Edrad Liones",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Arrancar Number 13 and Fracción of Grimmjow Jaegerjaquez.",
  },
  {
    name: "Loly Aivirrne",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description: "An Arrancar who serves under Sosuke Aizen in Las Noches.",
  },
  {
    name: "Nakeem Grindina",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description: "Arrancar Number 14 in Grimmjow's Fracción.",
  },
  {
    name: "Kazui Kurosaki",
    sex: Sex.MALE,
    status: CharacterStatus.ALIVE,
    description:
      "Son of Ichigo Kurosaki and Orihime Inoue who possesses hybrid spiritual powers.",
  },
  {
    name: "Mimihagi",
    sex: Sex.UNKNOWN,
    status: CharacterStatus.DEAD,
    description:
      "The fallen right arm of the Soul King representing stillness.",
  },
  {
    name: "James",
    sex: Sex.MALE,
    status: CharacterStatus.DEAD,
    description:
      "Sternritter Superstar James, loyal partner and cheerleader of Mask De Masculine who empowers him through his cheers.",
  },
  {
    name: "Ichika Abarai",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description:
      "Daughter of Renji Abarai and Rukia Kuchiki, a young Soul Reaper of the next generation.",
  },

  {
    name: "Hikone Ubuginu",
    sex: Sex.UNKNOWN,
    status: CharacterStatus.ALIVE,
    description:
      "A mysterious Soul Reaper artificially created by Tokinada Tsunayashiro, wielding the monstrous Zanpakuto Ikomikidomoe.",
  },
  {
    name: "Menoly Mallia",
    sex: Sex.FEMALE,
    status: CharacterStatus.ALIVE,
    description:
      "An Arrancar serving under Sosuke Aizen in Hueco Mundo, one of the Fraccion assigned to Las Noches.",
  },
];

// slug
const characters = character.map((char) => ({
  ...char,
  slug: slugify(char.name, { lower: true, strict: true }),
}));

export default characters;
