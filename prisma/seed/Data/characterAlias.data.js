const characterAliases = [
  {
    characterName: "Ichigo Kurosaki",
    aliases: ["Strawberry", "Ichi-ni", "Substitute Shinigami", "Deathberry"],
  },
  {
    characterName: "Rukia Kuchiki",
    aliases: ["Ruki-chan", "Chappy the Rabbit"],
  },
  {
    characterName: "Orihime Inoue",
    aliases: ["Inoue-san", "Princess"],
  },
  {
    characterName: "Yasutora Sado",
    aliases: ["Chad"],
  },
  {
    characterName: "Uryu Ishida",
    aliases: ["Megane-kun", "Quincy", "Prinz von Licht"],
  },
  {
    characterName: "Kon",
    aliases: ["King of New York", "Bostaff"],
  },
  {
    characterName: "Kisuke Urahara",
    aliases: ["Hat-and-Clogs", "Geta-Bōshi", "Sandals and Hat"],
  },
  {
    characterName: "Tessai Tsukabishi",
    aliases: ["Tessai-san"],
  },
  {
    characterName: "Yoruichi Shihoin",
    aliases: ["Flash Goddess", "Shunshin Yoruichi", "Black Cat"],
  },
  {
    characterName: "Isshin Kurosaki",
    aliases: ["Isshin Shiba", "Shiba Isshin"],
  },
  {
    characterName: "Masaki Kurosaki",
    aliases: ["Masaki-san"],
  },
  {
    characterName: "Karin Kurosaki",
    aliases: ["Karin-chan"],
  },
  {
    characterName: "Yuzu Kurosaki",
    aliases: ["Yuzu-chan"],
  },
  {
    characterName: "Tatsuki Arisawa",
    aliases: ["Tatsuki-chan"],
  },
  {
    characterName: "Keigo Asano",
    aliases: ["Keigo-kun"],
  },
  {
    characterName: "Mizuiro Kojima",
    aliases: ["Mizuiro-kun"],
  },
  {
    characterName: "Chizuru Honsho",
    aliases: ["Chizuru-san"],
  },
  {
    characterName: "Jinta Hanakari",
    aliases: ["Jinta-kun"],
  },
  {
    characterName: "Ururu Tsumugiya",
    aliases: ["Ururu-chan"],
  },
  {
    characterName: "Don Kanonji",
    aliases: ["Hero of the Spirits", "Kanonji"],
  },
  {
    characterName: "Grand Fisher",
    aliases: ["Hollow of the Butterfly Hook"],
  },
  {
    characterName: "Renji Abarai",
    aliases: ["Ren-chan", "Red Pineapple", "Pineapple Head"],
  },
  {
    characterName: "Byakuya Kuchiki",
    aliases: ["Byakuya-sama", "Captain Kuchiki", "Byaku-chan"],
  },
  {
    characterName: "Genryusai Shigekuni Yamamoto",
    aliases: ["Old Man Yama", "Yama-jii"],
  },
  {
    characterName: "Shunsui Kyoraku",
    aliases: ["Shunsui-taicho", "Kyoraku-san"],
  },
  {
    characterName: "Jushiro Ukitake",
    aliases: ["Ukitake-taicho", "Jushiro-san"],
  },
  {
    characterName: "Soi Fon",
    aliases: ["Sui-Feng", "Fon Shaolin"],
  },
  {
    characterName: "Gin Ichimaru",
    aliases: ["Gin-chan", "Fox Face"],
  },
  {
    characterName: "Retsu Unohana",
    aliases: ["Yachiru Unohana", "Unohana-taicho", "First Kenpachi"],
  },
  {
    characterName: "Sajin Komamura",
    aliases: ["Komamura-taicho", "Sajin-san"],
  },
  {
    characterName: "Kaname Tosen",
    aliases: ["Tosen-taicho", "Kaname-sama"],
  },
  {
    characterName: "Toshiro Hitsugaya",
    aliases: ["Shiro-chan", "Frost Captain", "Hitsugaya-taicho", "Chibi-captain"],
  },
  {
    characterName: "Kenpachi Zaraki",
    aliases: ["Kenny", "Zaraki-taicho", "Zaraki-san"],
  },
  {
    characterName: "Mayuri Kurotsuchi",
    aliases: ["Mayuri-taicho", "Kurotsuchi-taicho"],
  },
  {
    characterName: "Sosuke Aizen",
    aliases: ["Aizen-sama", "Captain Aizen"],
  },
  {
    characterName: "Momo Hinamori",
    aliases: ["Momo-chan", "Hinamori-kun"],
  },
  {
    characterName: "Izuru Kira",
    aliases: ["Kira-kun", "Izuru-san"],
  },
  {
    characterName: "Rangiku Matsumoto",
    aliases: ["Rangiku-san", "Matsumoto-san"],
  },
  {
    characterName: "Shuhei Hisagi",
    aliases: ["Hisagi-san", "Shuhei-kun"],
  },
  {
    characterName: "Ikkaku Madarame",
    aliases: ["Baldy", "Ikkaku-san"],
  },
  {
    characterName: "Yachiru Kusajishi",
    aliases: ["Yachiru-chan", "Pinky"],
  },
  {
    characterName: "Nemu Kurotsuchi",
    aliases: ["Nemu-chan", "Nanago Nemuri"],
  },
  {
    characterName: "Chojiro Sasakibe",
    aliases: ["Sasakibe-san"],
  },
  {
    characterName: "Marechiyo Omaeda",
    aliases: ["Omaeda-san", "Gegettebuki"],
  },
  {
    characterName: "Hanataro Yamada",
    aliases: ["Hanataro-kun", "Yamada-kun"],
  },
  {
    characterName: "Jidanbo Ikkanzaka",
    aliases: ["Jidanbo"],
  },
  {
    characterName: "Ganju Shiba",
    aliases: ["Ganju-kun"],
  },
  {
    characterName: "Kukaku Shiba",
    aliases: ["Kukaku-san"],
  },
  {
    characterName: "Jin Kariya",
    aliases: ["Eugene Currier"],
  },
  {
    characterName: "Yoshino Soma",
    aliases: ["Yoshino-san"],
  },
  {
    characterName: "Maki Ichinose",
    aliases: ["Ichinose-san"],
  },
  {
    characterName: "Koga Go",
    aliases: ["Koga-san"],
  },
  {
    characterName: "Sawatari",
    aliases: ["Sawatari-san"],
  },
  {
    characterName: "Mabashi",
    aliases: ["Mabashi-san"],
  },
  {
    characterName: "Yoshi",
    aliases: ["Yoshi-san"],
  },
  {
    characterName: "Ugaki",
    aliases: ["Ugaki-san"],
  },
  {
    characterName: "Ririn",
    aliases: ["Ririn-chan"],
  },
  {
    characterName: "Kurōdo",
    aliases: ["Claude"],
  },
  {
    characterName: "Noba",
    aliases: ["Nova"],
  },
  {
    characterName: "Shinji Hirako",
    aliases: ["Shinji-kun", "Hirako-taicho"],
  },
  {
    characterName: "Hiyori Sarugaki",
    aliases: ["Hiyori-chan"],
  },
  {
    characterName: "Love Aikawa",
    aliases: ["Love-san"],
  },
  {
    characterName: "Rojuro Otoribashi",
    aliases: ["Rose"],
  },
  {
    characterName: "Kensei Muguruma",
    aliases: ["Kensei-taicho", "Kensei-san"],
  },
  {
    characterName: "Mashiro Kuna",
    aliases: ["Mashiro-chan", "Super Lieutenant"],
  },
  {
    characterName: "Lisa Yadomaru",
    aliases: ["Lisa-chan"],
  },
  {
    characterName: "Hachigen Ushoda",
    aliases: ["Hachi"],
  },
  {
    characterName: "Yammy Llargo",
    aliases: ["Espada Number 10", "Espada Number 0"],
  },
  {
    characterName: "Ulquiorra Cifer",
    aliases: ["Espada Number 4", "Ulquiorra"],
  },
  {
    characterName: "Grimmjow Jaegerjaquez",
    aliases: ["Espada Number 6", "Grimmjow"],
  },
  {
    characterName: "Wonderweiss Margela",
    aliases: ["Wonderweiss"],
  },
  {
    characterName: "Aaroniero Arruruerie",
    aliases: ["Espada Number 9"],
  },
  {
    characterName: "Szayelaporro Granz",
    aliases: ["Espada Number 8"],
  },
  {
    characterName: "Zommari Rureaux",
    aliases: ["Espada Number 7"],
  },
  {
    characterName: "Nnoitra Gilga",
    aliases: ["Espada Number 5"],
  },
  {
    characterName: "Tier Harribel",
    aliases: ["Espada Number 3", "Harribel"],
  },
  {
    characterName: "Nel Tu",
    aliases: ["Nelliel"],
  },
  {
    characterName: "Nelliel Tu Odelschwanck",
    aliases: ["Nel", "Nel Tu", "Former Espada Number 3"],
  },
  {
    characterName: "Baraggan Louisenbairn",
    aliases: ["God of Hueco Mundo", "Espada Number 2"],
  },
  {
    characterName: "Coyote Starrk",
    aliases: ["Espada Number 1", "Starrk"],
  },
  {
    characterName: "Lilynette Gingerbuck",
    aliases: ["Lilynette"],
  },
  {
    characterName: "Rudbornn Chelute",
    aliases: ["Rudbornn"],
  },
  {
    characterName: "Tesla Lindocruz",
    aliases: ["Tesla"],
  },
  {
    characterName: "Apache",
    aliases: ["Emilou Apacci"],
  },
  {
    characterName: "Mila Rose",
    aliases: ["Franceska Mila Rose"],
  },
  {
    characterName: "Sung-Sun",
    aliases: ["Cyan Sung-Sun"],
  },
  {
    characterName: "Kugo Ginjo",
    aliases: ["Ginjo"],
  },
  {
    characterName: "Shukuro Tsukishima",
    aliases: ["Tsukishima"],
  },
  {
    characterName: "Riruka Dokugamine",
    aliases: ["Riruka"],
  },
  {
    characterName: "Yukio Hans Vorarlberna",
    aliases: ["Yukio"],
  },
  {
    characterName: "Jackie Tristan",
    aliases: ["Jackie"],
  },
  {
    characterName: "Giriko Kutsuzawa",
    aliases: ["Giriko"],
  },
  {
    characterName: "Moe Shishigawara",
    aliases: ["Shishigawara"],
  },
  {
    characterName: "Yhwach",
    aliases: ["The Almighty", "Emperor of Wandenreich", "Father of the Quincy"],
  },
  {
    characterName: "Jugram Haschwalth",
    aliases: ["Sternritter B", "The Balance", "Yhwach's Second-in-Command"],
  },
  {
    characterName: "Askin Nakk Le Vaar",
    aliases: ["Sternritter D", "The Deathdealing"],
  },
  {
    characterName: "Bazz-B",
    aliases: ["Sternritter H", "The Heat", "Bazzard Black"],
  },
  {
    characterName: "Bambietta Basterbine",
    aliases: ["Sternritter E", "The Explode", "Bambi"],
  },
  {
    characterName: "Candice Catnipp",
    aliases: ["Sternritter T", "The Thunderbolt"],
  },
  {
    characterName: "Liltotto Lamperd",
    aliases: ["Sternritter G", "The Glutton"],
  },
  {
    characterName: "Meninas McAllon",
    aliases: ["Sternritter P", "The Power"],
  },
  {
    characterName: "Giselle Gewelle",
    aliases: ["Sternritter Z", "The Zombie", "Gigi"],
  },
  {
    characterName: "Äs Nödt",
    aliases: ["Sternritter F", "The Fear"],
  },
  {
    characterName: "Mask De Masculine",
    aliases: ["Sternritter S", "The Superstar"],
  },
  {
    characterName: "Quilge Opie",
    aliases: ["Sternritter J", "The Jail"],
  },
  {
    characterName: "Gremmy Thoumeaux",
    aliases: ["Sternritter V", "The Visionary"],
  },
  {
    characterName: "Lille Barro",
    aliases: ["Sternritter X", "The X-Axis"],
  },
  {
    characterName: "Gerard Valkyrie",
    aliases: ["Sternritter M", "The Miracle"],
  },
  {
    characterName: "Pernida Parnkgjas",
    aliases: ["Sternritter C", "The Compulsory", "Left Arm of the Soul King"],
  },
  {
    characterName: "Royd Lloyd",
    aliases: ["Sternritter Y", "The Yourself (Royd)"],
  },
  {
    characterName: "Loyd Lloyd",
    aliases: ["Sternritter Y", "The Yourself (Loyd)"],
  },
  {
    characterName: "Ichibe Hyosube",
    aliases: ["Oshō", "Manako Oshō", "Monk of the Eyeball", "Leader of Squad Zero"],
  },
  {
    characterName: "Oetsu Nimaiya",
    aliases: ["God of the Sword", "Blade Creator", "Sword God"],
  },
  {
    characterName: "Senjumaru Shutara",
    aliases: ["Great Weave Guard", "Senjumaru"],
  },
  {
    characterName: "Tenjiro Kirinji",
    aliases: ["Hot Spring Demon", "Lightning Fast Tenjiro"],
  },
  {
    characterName: "Kirio Hikifune",
    aliases: ["Ruler of Grain", "Hikifune"],
  },
  {
    characterName: "Robert Accutrone",
    aliases: ["Sternritter N"],
  },
  {
    characterName: "Cang Du",
    aliases: ["Sternritter I", "The Iron"],
  },
  {
    characterName: "BG9",
    aliases: ["Sternritter K"],
  },
  {
    characterName: "Driscoll Berci",
    aliases: ["Sternritter O", "The Overkill"],
  },
  {
    characterName: "Nanana Najahkoop",
    aliases: ["Sternritter U", "The Underbelly"],
  },
  {
    characterName: "PePe Waccabrada",
    aliases: ["Sternritter L", "The Love"],
  },
  {
    characterName: "Nianzol Weizol",
    aliases: ["Sternritter W", "The Wind"],
  },
  {
    characterName: "Jerome Guizbatt",
    aliases: ["Sternritter R", "The Roar"],
  },
  {
    characterName: "Berenice Gabrielli",
    aliases: ["Sternritter Q", "The Question"],
  },
  {
    characterName: "Luders Friegen",
    aliases: ["Luders"],
  },
  {
    characterName: "Ebern Asguiaro",
    aliases: ["Ebern"],
  },
  {
    characterName: "Isane Kotetsu",
    aliases: ["Isane-san", "Captain Kotetsu"],
  },
  {
    characterName: "Tetsuzaemon Iba",
    aliases: ["Iba-san", "Captain Iba"],
  },
  {
    characterName: "Akon",
    aliases: ["Akon-san"],
  },
  {
    characterName: "Sentaro Kotsubaki",
    aliases: ["Sentaro"],
  },
  {
    characterName: "Kiyone Kotetsu",
    aliases: ["Kiyone"],
  },
  {
    characterName: "Kaien Shiba",
    aliases: ["Kaien-dono"],
  },
  {
    characterName: "Miyako Shiba",
    aliases: ["Miyako-san"],
  },
  {
    characterName: "Ryuken Ishida",
    aliases: ["Director Ishida", "The Last Quincy"],
  },
  {
    characterName: "Soken Ishida",
    aliases: ["Soken-san"],
  },
  {
    characterName: "White",
    aliases: ["Black Hollow"],
  },
  {
    characterName: "Zangetsu",
    aliases: ["Zangetsu"],
  },
  {
    characterName: "White Ichigo",
    aliases: ["Hollow Ichigo", "The Inner Hollow"],
  },
  {
    characterName: "Old Man Zangetsu",
    aliases: ["Yhwach (1000 Years Ago)"],
  },
  {
    characterName: "Luppi Antenor",
    aliases: ["Temporary Sexta Espada", "Luppi"],
  },
  {
    characterName: "Charlotte Chuhlhourne",
    aliases: ["Charlotte"],
  },
  {
    characterName: "Cirucci Sanderwicci",
    aliases: ["Cirucci", "Privaron Espada Number 105"],
  },
  {
    characterName: "Dordoni Alessandro Del Socaccio",
    aliases: ["Dordoni", "Privaron Espada Number 103"],
  },
  {
    characterName: "Yushiro Shihoin",
    aliases: ["Yushiro"],
  },
  {
    characterName: "Tokinada Tsunayashiro",
    aliases: ["Tokinada"],
  },
  {
    characterName: "Soul King",
    aliases: ["Reiō"],
  },
  {
    characterName: "Kukaku",
    aliases: ["Kukaku-san"],
  },
  {
    characterName: "Jidanbo",
    aliases: ["Jidanbo"],
  }
];

export default characterAliases;
