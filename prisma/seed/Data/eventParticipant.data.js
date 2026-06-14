import slugify from "slugify";

const bleachVerseEventParticipantSeedData = [
  // Masaki Kurosaki's Death
  {
    eventTitle: "Masaki Kurosaki's Death",
    characterName: "Masaki Kurosaki",
    role: "Victim / Mother of Ichigo"
  },
  {
    eventTitle: "Masaki Kurosaki's Death",
    characterName: "Ichigo Kurosaki",
    role: "Witness / Son"
  },
  {
    eventTitle: "Masaki Kurosaki's Death",
    characterName: "Grand Fisher",
    role: "Hollow killer"
  },

  // Ichigo Gains Soul Reaper Powers
  {
    eventTitle: "Ichigo Kurosaki Gains Soul Reaper Powers",
    characterName: "Ichigo Kurosaki",
    role: "Recipient of Soul Reaper powers"
  },
  {
    eventTitle: "Ichigo Kurosaki Gains Soul Reaper Powers",
    characterName: "Rukia Kuchiki",
    role: "Transferred her Soul Reaper powers"
  },

  // Rukia's Arrest
  {
    eventTitle: "Rukia Kuchiki's Arrest",
    characterName: "Rukia Kuchiki",
    role: "Arrested for transferring power to a human"
  },
  {
    eventTitle: "Rukia Kuchiki's Arrest",
    characterName: "Byakuya Kuchiki",
    role: "Arresting Captain"
  },
  {
    eventTitle: "Rukia Kuchiki's Arrest",
    characterName: "Renji Abarai",
    role: "Arresting Lieutenant"
  },
  {
    eventTitle: "Rukia Kuchiki's Arrest",
    characterName: "Ichigo Kurosaki",
    role: "Defended Rukia, severely injured by Byakuya"
  },
  {
    eventTitle: "Rukia Kuchiki's Arrest",
    characterName: "Uryu Ishida",
    role: "Defended Rukia, easily defeated by Renji"
  },

  // Ryoka Invasion
  {
    eventTitle: "Ryoka Invasion of Seireitei",
    characterName: "Ichigo Kurosaki",
    role: "Ryoka Infiltrator / Leader"
  },
  {
    eventTitle: "Ryoka Invasion of Seireitei",
    characterName: "Uryu Ishida",
    role: "Ryoka Infiltrator"
  },
  {
    eventTitle: "Ryoka Invasion of Seireitei",
    characterName: "Yasutora Sado",
    role: "Ryoka Infiltrator"
  },
  {
    eventTitle: "Ryoka Invasion of Seireitei",
    characterName: "Orihime Inoue",
    role: "Ryoka Infiltrator"
  },
  {
    eventTitle: "Ryoka Invasion of Seireitei",
    characterName: "Ganju Shiba",
    role: "Ryoka Infiltrator"
  },
  {
    eventTitle: "Ryoka Invasion of Seireitei",
    characterName: "Yoruichi Shihoin",
    role: "Ryoka Guide (Cat Form)"
  },

  // Rukia Kuchiki's Execution Ordered
  {
    eventTitle: "Rukia Kuchiki's Execution Ordered",
    characterName: "Rukia Kuchiki",
    role: "Subject of execution"
  },
  {
    eventTitle: "Rukia Kuchiki's Execution Ordered",
    characterName: "Sosuke Aizen",
    role: "Disguised mastermind who ordered the execution"
  },

  // Rukia Kuchiki's Execution Cancelled
  {
    eventTitle: "Rukia Kuchiki's Execution Cancelled",
    characterName: "Rukia Kuchiki",
    role: "Saved from execution"
  },
  {
    eventTitle: "Rukia Kuchiki's Execution Cancelled",
    characterName: "Ichigo Kurosaki",
    role: "Destroyed execution stand and saved Rukia"
  },
  {
    eventTitle: "Rukia Kuchiki's Execution Cancelled",
    characterName: "Shunsui Kyoraku",
    role: "Assisted in destroying scaffold"
  },
  {
    eventTitle: "Rukia Kuchiki's Execution Cancelled",
    characterName: "Jushiro Ukitake",
    role: "Assisted in destroying scaffold"
  },

  // Sosuke Aizen Reveals His Betrayal
  {
    eventTitle: "Sosuke Aizen Reveals His Betrayal",
    characterName: "Sosuke Aizen",
    role: "Traitor mastermind"
  },
  {
    eventTitle: "Sosuke Aizen Reveals His Betrayal",
    characterName: "Gin Ichimaru",
    role: "Accomplice"
  },
  {
    eventTitle: "Sosuke Aizen Reveals His Betrayal",
    characterName: "Kaname Tosen",
    role: "Accomplice"
  },
  {
    eventTitle: "Sosuke Aizen Reveals His Betrayal",
    characterName: "Retsu Unohana",
    role: "Discovered central 46 bodies"
  },
  {
    eventTitle: "Sosuke Aizen Reveals His Betrayal",
    characterName: "Isane Kotetsu",
    role: "Broadcasted betrayal message to Seireitei"
  },

  // Sosuke Aizen Defects from Soul Society
  {
    eventTitle: "Sosuke Aizen Defects from Soul Society",
    characterName: "Sosuke Aizen",
    role: "Traitor Captain / Mastermind"
  },
  {
    eventTitle: "Sosuke Aizen Defects from Soul Society",
    characterName: "Gin Ichimaru",
    role: "Traitor Captain / Accomplice"
  },
  {
    eventTitle: "Sosuke Aizen Defects from Soul Society",
    characterName: "Kaname Tosen",
    role: "Traitor Captain / Accomplice"
  },
  {
    eventTitle: "Sosuke Aizen Defects from Soul Society",
    characterName: "Rukia Kuchiki",
    role: "Target (Hogyoku extraction)"
  },
  {
    eventTitle: "Sosuke Aizen Defects from Soul Society",
    characterName: "Ichigo Kurosaki",
    role: "Defended Rukia from Aizen"
  },

  // Arrival of the Arrancar
  {
    eventTitle: "Arrival of the Arrancar",
    characterName: "Ulquiorra Cifer",
    role: "Invading Arrancar"
  },
  {
    eventTitle: "Arrival of the Arrancar",
    characterName: "Yammy Llargo",
    role: "Invading Arrancar"
  },
  {
    eventTitle: "Arrival of the Arrancar",
    characterName: "Ichigo Kurosaki",
    role: "Fought invaders"
  },
  {
    eventTitle: "Arrival of the Arrancar",
    characterName: "Yasutora Sado",
    role: "Defeated by Yammy"
  },
  {
    eventTitle: "Arrival of the Arrancar",
    characterName: "Orihime Inoue",
    role: "Defeated by Yammy"
  },
  {
    eventTitle: "Arrival of the Arrancar",
    characterName: "Kisuke Urahara",
    role: "Intervened and forced invaders to retreat"
  },
  {
    eventTitle: "Arrival of the Arrancar",
    characterName: "Yoruichi Shihoin",
    role: "Intervened and forced invaders to retreat"
  },

  // Orihime Inoue Kidnapped
  {
    eventTitle: "Orihime Inoue Kidnapped",
    characterName: "Orihime Inoue",
    role: "Target / Captured"
  },
  {
    eventTitle: "Orihime Inoue Kidnapped",
    characterName: "Ulquiorra Cifer",
    role: "Captor / Coerced Orihime"
  },

  // Vizards Begin Training Ichigo
  {
    eventTitle: "Vizards Begin Training Ichigo",
    characterName: "Ichigo Kurosaki",
    role: "Trainee"
  },
  {
    eventTitle: "Vizards Begin Training Ichigo",
    characterName: "Shinji Hirako",
    role: "Lead Trainer"
  },
  {
    eventTitle: "Vizards Begin Training Ichigo",
    characterName: "Hiyori Sarugaki",
    role: "Sparring Trainer"
  },
  {
    eventTitle: "Vizards Begin Training Ichigo",
    characterName: "Hachigen Ushoda",
    role: "Barrier Support"
  },
  {
    eventTitle: "Vizards Begin Training Ichigo",
    characterName: "Love Aikawa",
    role: "Trainer"
  },
  {
    eventTitle: "Vizards Begin Training Ichigo",
    characterName: "Kensei Muguruma",
    role: "Trainer"
  },

  // Ichigo Masters Hollow Mask
  {
    eventTitle: "Ichigo Masters Hollow Mask",
    characterName: "Ichigo Kurosaki",
    role: "Defeated inner Hollow to master mask"
  },
  {
    eventTitle: "Ichigo Masters Hollow Mask",
    characterName: "Shinji Hirako",
    role: "Trainer / Supervisor"
  },
  {
    eventTitle: "Ichigo Masters Hollow Mask",
    characterName: "Hiyori Sarugaki",
    role: "Trainer / Supervisor"
  },

  // Rescue Mission to Hueco Mundo
  {
    eventTitle: "Rescue Mission to Hueco Mundo",
    characterName: "Ichigo Kurosaki",
    role: "Rescuer / Leader"
  },
  {
    eventTitle: "Rescue Mission to Hueco Mundo",
    characterName: "Uryu Ishida",
    role: "Rescuer"
  },
  {
    eventTitle: "Rescue Mission to Hueco Mundo",
    characterName: "Yasutora Sado",
    role: "Rescuer"
  },
  {
    eventTitle: "Rescue Mission to Hueco Mundo",
    characterName: "Kisuke Urahara",
    role: "Opened Garganta gate"
  },

  // Neliel Tu Odelschwanck Reveals Her True Form
  {
    eventTitle: "Neliel Tu Odelschwanck Reveals Her True Form",
    characterName: "Nelliel Tu Odelschwanck",
    role: "Revealed adult Espada form"
  },
  {
    eventTitle: "Neliel Tu Odelschwanck Reveals Her True Form",
    characterName: "Ichigo Kurosaki",
    role: "Protected by Nelliel"
  },
  {
    eventTitle: "Neliel Tu Odelschwanck Reveals Her True Form",
    characterName: "Nnoitra Gilga",
    role: "Opponent / Former rival"
  },

  // Ichigo Undergoes Vasto Lorde Transformation
  {
    eventTitle: "Ichigo Undergoes Vasto Lorde Transformation",
    characterName: "Ichigo Kurosaki",
    role: "Transformed into mindless Vasto Lorde"
  },
  {
    eventTitle: "Ichigo Undergoes Vasto Lorde Transformation",
    characterName: "Ulquiorra Cifer",
    role: "Opponent"
  },
  {
    eventTitle: "Ichigo Undergoes Vasto Lorde Transformation",
    characterName: "Orihime Inoue",
    role: "Witness"
  },
  {
    eventTitle: "Ichigo Undergoes Vasto Lorde Transformation",
    characterName: "Uryu Ishida",
    role: "Witness / Injured by transformed Ichigo"
  },

  // Ulquiorra Cifer's Death
  {
    eventTitle: "Ulquiorra Cifer's Death",
    characterName: "Ulquiorra Cifer",
    role: "Victim of disintegration"
  },
  {
    eventTitle: "Ulquiorra Cifer's Death",
    characterName: "Ichigo Kurosaki",
    role: "Defeated Ulquiorra"
  },
  {
    eventTitle: "Ulquiorra Cifer's Death",
    characterName: "Orihime Inoue",
    role: "Witness"
  },

  // Battle of Fake Karakura Town
  {
    eventTitle: "Battle of Fake Karakura Town",
    characterName: "Genryusai Shigekuni Yamamoto",
    role: "Commander Defender"
  },
  {
    eventTitle: "Battle of Fake Karakura Town",
    characterName: "Sosuke Aizen",
    role: "Traitor Faction Leader"
  },
  {
    eventTitle: "Battle of Fake Karakura Town",
    characterName: "Shunsui Kyoraku",
    role: "Squad 8 Captain / Fought Starrk"
  },
  {
    eventTitle: "Battle of Fake Karakura Town",
    characterName: "Coyote Starrk",
    role: "1st Espada"
  },

  // Wonderweiss Seals Ryujin Jakka
  {
    eventTitle: "Wonderweiss Seals Ryujin Jakka",
    characterName: "Wonderweiss Margela",
    role: "Sealed Yamamoto's flames"
  },
  {
    eventTitle: "Wonderweiss Seals Ryujin Jakka",
    characterName: "Genryusai Shigekuni Yamamoto",
    role: "Target / Sealed captain"
  },

  // Gin Ichimaru Betrays Sosuke Aizen
  {
    eventTitle: "Gin Ichimaru Betrays Sosuke Aizen",
    characterName: "Gin Ichimaru",
    role: "Assassination Attempt"
  },
  {
    eventTitle: "Gin Ichimaru Betrays Sosuke Aizen",
    characterName: "Sosuke Aizen",
    role: "Target of betrayal"
  },
  {
    eventTitle: "Gin Ichimaru Betrays Sosuke Aizen",
    characterName: "Rangiku Matsumoto",
    role: "Witness"
  },

  // Gin Ichimaru's Death
  {
    eventTitle: "Gin Ichimaru's Death",
    characterName: "Gin Ichimaru",
    role: "Victim"
  },
  {
    eventTitle: "Gin Ichimaru's Death",
    characterName: "Sosuke Aizen",
    role: "Killer"
  },
  {
    eventTitle: "Gin Ichimaru's Death",
    characterName: "Rangiku Matsumoto",
    role: "Witness"
  },

  // Ichigo Uses Final Getsuga Tensho
  {
    eventTitle: "Ichigo Uses Final Getsuga Tensho",
    characterName: "Ichigo Kurosaki",
    role: "Released Mugetsu form"
  },
  {
    eventTitle: "Ichigo Uses Final Getsuga Tensho",
    characterName: "Sosuke Aizen",
    role: "Target"
  },

  // Sosuke Aizen's Defeat and Sealing
  {
    eventTitle: "Sosuke Aizen's Defeat and Sealing",
    characterName: "Ichigo Kurosaki",
    role: "Used Final Getsuga Tensho to weaken Aizen"
  },
  {
    eventTitle: "Sosuke Aizen's Defeat and Sealing",
    characterName: "Sosuke Aizen",
    role: "Defeated and sealed villain"
  },
  {
    eventTitle: "Sosuke Aizen's Defeat and Sealing",
    characterName: "Kisuke Urahara",
    role: "Created and activated the seal"
  },

  // Ichigo Kurosaki Loses Soul Reaper Powers
  {
    eventTitle: "Ichigo Kurosaki Loses Soul Reaper Powers",
    characterName: "Ichigo Kurosaki",
    role: "Loses all powers"
  },
  {
    eventTitle: "Ichigo Kurosaki Loses Soul Reaper Powers",
    characterName: "Rukia Kuchiki",
    role: "Witness / Friend"
  },

  // Ichigo Begins Fullbring Training
  {
    eventTitle: "Ichigo Begins Fullbring Training",
    characterName: "Ichigo Kurosaki",
    role: "Trainee"
  },
  {
    eventTitle: "Ichigo Begins Fullbring Training",
    characterName: "Kugo Ginjo",
    role: "Trainer / Xcution Leader"
  },
  {
    eventTitle: "Ichigo Begins Fullbring Training",
    characterName: "Riruka Dokugamine",
    role: "Trainer"
  },
  {
    eventTitle: "Ichigo Begins Fullbring Training",
    characterName: "Yukio Hans Vorarlberna",
    role: "Trainer / Game room provider"
  },
  {
    eventTitle: "Ichigo Begins Fullbring Training",
    characterName: "Yasutora Sado",
    role: "Witness / Supporter"
  },

  // Kugo Ginjo Betrays Ichigo Kurosaki
  {
    eventTitle: "Kugo Ginjo Betrays Ichigo Kurosaki",
    characterName: "Kugo Ginjo",
    role: "Traitor / Stole Ichigo's Fullbring"
  },
  {
    eventTitle: "Kugo Ginjo Betrays Ichigo Kurosaki",
    characterName: "Ichigo Kurosaki",
    role: "Target of betrayal"
  },
  {
    eventTitle: "Kugo Ginjo Betrays Ichigo Kurosaki",
    characterName: "Shukuro Tsukishima",
    role: "Accomplice"
  },

  // Ichigo Regains Soul Reaper Powers
  {
    eventTitle: "Ichigo Regains Soul Reaper Powers",
    characterName: "Ichigo Kurosaki",
    role: "Regained powers"
  },
  {
    eventTitle: "Ichigo Regains Soul Reaper Powers",
    characterName: "Rukia Kuchiki",
    role: "Stabbed Ichigo with reishi blade"
  },
  {
    eventTitle: "Ichigo Regains Soul Reaper Powers",
    characterName: "Kisuke Urahara",
    role: "Sword creator"
  },
  {
    eventTitle: "Ichigo Regains Soul Reaper Powers",
    characterName: "Isshin Kurosaki",
    role: "Accompanied Rukia"
  },

  // Kugo Ginjo's Death
  {
    eventTitle: "Kugo Ginjo's Death",
    characterName: "Kugo Ginjo",
    role: "Victim"
  },
  {
    eventTitle: "Kugo Ginjo's Death",
    characterName: "Ichigo Kurosaki",
    role: "Killer / Defeated Ginjo"
  },

  // Wandenreich Declares War
  {
    eventTitle: "Wandenreich Declares War",
    characterName: "Luders Friegen",
    role: "Quincy messenger declaring war"
  },
  {
    eventTitle: "Wandenreich Declares War",
    characterName: "Genryusai Shigekuni Yamamoto",
    role: "Head Captain receiving message"
  },

  // First Quincy Invasion of Soul Society
  {
    eventTitle: "First Quincy Invasion of Soul Society",
    characterName: "Yhwach",
    role: "Quincy Emperor / Invading Leader"
  },
  {
    eventTitle: "First Quincy Invasion of Soul Society",
    characterName: "Jugram Haschwalth",
    role: "Sternritter Grandmaster"
  },
  {
    eventTitle: "First Quincy Invasion of Soul Society",
    characterName: "Genryusai Shigekuni Yamamoto",
    role: "Gotei 13 Commander"
  },

  // Bankai Theft by the Sternritter
  {
    eventTitle: "Bankai Theft by the Sternritter",
    characterName: "Byakuya Kuchiki",
    role: "Squad 6 Captain / Bankai stolen"
  },
  {
    eventTitle: "Bankai Theft by the Sternritter",
    characterName: "Toshiro Hitsugaya",
    role: "Squad 10 Captain / Bankai stolen"
  },
  {
    eventTitle: "Bankai Theft by the Sternritter",
    characterName: "Soi Fon",
    role: "Squad 2 Captain / Bankai stolen"
  },
  {
    eventTitle: "Bankai Theft by the Sternritter",
    characterName: "Kensei Muguruma",
    role: "Squad 9 Captain / Bankai stolen"
  },
  {
    eventTitle: "Bankai Theft by the Sternritter",
    characterName: "Äs Nödt",
    role: "Sternritter who stole Byakuya's Bankai"
  },
  {
    eventTitle: "Bankai Theft by the Sternritter",
    characterName: "Cang Du",
    role: "Sternritter who stole Hitsugaya's Bankai"
  },
  {
    eventTitle: "Bankai Theft by the Sternritter",
    characterName: "BG9",
    role: "Sternritter who stole Soi Fon's Bankai"
  },

  // Death of Genryusai Shigekuni Yamamoto
  {
    eventTitle: "Death of Genryusai Shigekuni Yamamoto",
    characterName: "Genryusai Shigekuni Yamamoto",
    role: "Victim / Obliterated Gotei 13 Commander"
  },
  {
    eventTitle: "Death of Genryusai Shigekuni Yamamoto",
    characterName: "Yhwach",
    role: "Stole Bankai and executed Yamamoto"
  },
  {
    eventTitle: "Death of Genryusai Shigekuni Yamamoto",
    characterName: "Royd Lloyd",
    role: "Decoy that fought and exhausted Yamamoto first"
  },

  // Royal Guard Arrives
  {
    eventTitle: "Royal Guard Arrives",
    characterName: "Ichibe Hyosube",
    role: "Squad 0 Leader"
  },
  {
    eventTitle: "Royal Guard Arrives",
    characterName: "Oetsu Nimaiya",
    role: "Squad 0 Reforger"
  },
  {
    eventTitle: "Royal Guard Arrives",
    characterName: "Senjumaru Shutara",
    role: "Squad 0 Member"
  },
  {
    eventTitle: "Royal Guard Arrives",
    characterName: "Tenjiro Kirinji",
    role: "Squad 0 Healer"
  },
  {
    eventTitle: "Royal Guard Arrives",
    characterName: "Kirio Hikifune",
    role: "Squad 0 Cook"
  },
  {
    eventTitle: "Royal Guard Arrives",
    characterName: "Shunsui Kyoraku",
    role: "Squad 8 Captain welcoming them"
  },

  // Retsu Unohana Trains Kenpachi Zaraki
  {
    eventTitle: "Retsu Unohana Trains Kenpachi Zaraki",
    characterName: "Retsu Unohana",
    role: "Trainer"
  },
  {
    eventTitle: "Retsu Unohana Trains Kenpachi Zaraki",
    characterName: "Kenpachi Zaraki",
    role: "Trainee"
  },

  // Death of Retsu Unohana
  {
    eventTitle: "Death of Retsu Unohana",
    characterName: "Retsu Unohana",
    role: "Victim"
  },
  {
    eventTitle: "Death of Retsu Unohana",
    characterName: "Kenpachi Zaraki",
    role: "Killer"
  },

  // Kenpachi Zaraki Unlocks His True Power
  {
    eventTitle: "Kenpachi Zaraki Unlocks His True Power",
    characterName: "Kenpachi Zaraki",
    role: "Recipient / Unlocked potential"
  },
  {
    eventTitle: "Kenpachi Zaraki Unlocks His True Power",
    characterName: "Retsu Unohana",
    role: "Catalyst / Died to unlock his power"
  },

  // Ichigo Learns the Truth About His Origins
  {
    eventTitle: "Ichigo Learns the Truth About His Origins",
    characterName: "Ichigo Kurosaki",
    role: "Recipient of truth"
  },
  {
    eventTitle: "Ichigo Learns the Truth About His Origins",
    characterName: "Isshin Kurosaki",
    role: "Narrated truth"
  },
  {
    eventTitle: "Ichigo Learns the Truth About His Origins",
    characterName: "Masaki Kurosaki",
    role: "Subject of truth / Quincy Mother"
  },

  // Ichigo Awakens True Zangetsu
  {
    eventTitle: "Ichigo Awakens True Zangetsu",
    characterName: "Ichigo Kurosaki",
    role: "Reforged true dual blade Zangetsu"
  },
  {
    eventTitle: "Ichigo Awakens True Zangetsu",
    characterName: "Oetsu Nimaiya",
    role: "Reforged the blade in Hoohden"
  },

  // Second Quincy Invasion of Soul Society
  {
    eventTitle: "Second Quincy Invasion of Soul Society",
    characterName: "Yhwach",
    role: "Quincy Emperor"
  },
  {
    eventTitle: "Second Quincy Invasion of Soul Society",
    characterName: "Jugram Haschwalth",
    role: "Sternritter Invader"
  },
  {
    eventTitle: "Second Quincy Invasion of Soul Society",
    characterName: "Shunsui Kyoraku",
    role: "Captain-Commander / Defender Leader"
  },

  // Rukia Kuchiki Achieves Bankai
  {
    eventTitle: "Rukia Kuchiki Achieves Bankai",
    characterName: "Rukia Kuchiki",
    role: "Released Hakka no Togame"
  },
  {
    eventTitle: "Rukia Kuchiki Achieves Bankai",
    characterName: "Byakuya Kuchiki",
    role: "Witness / Guarded Rukia"
  },
  {
    eventTitle: "Rukia Kuchiki Achieves Bankai",
    characterName: "Äs Nödt",
    role: "Defeated opponent"
  },

  // Renji Abarai Achieves True Bankai
  {
    eventTitle: "Renji Abarai Achieves True Bankai",
    characterName: "Renji Abarai",
    role: "Released Soo Zabimaru"
  },
  {
    eventTitle: "Renji Abarai Achieves True Bankai",
    characterName: "Mask De Masculine",
    role: "Defeated opponent"
  },

  // Kenpachi Zaraki Achieves Bankai
  {
    eventTitle: "Kenpachi Zaraki Achieves Bankai",
    characterName: "Kenpachi Zaraki",
    role: "Released Bankai"
  },
  {
    eventTitle: "Kenpachi Zaraki Achieves Bankai",
    characterName: "Yachiru Kusajishi",
    role: "Catalyst / Manifested Bankai"
  },
  {
    eventTitle: "Kenpachi Zaraki Achieves Bankai",
    characterName: "Gerard Valkyrie",
    role: "Opponent"
  },

  // Soul King Killed
  {
    eventTitle: "Soul King Killed",
    characterName: "Ichigo Kurosaki",
    role: "Unwilling killer"
  },
  {
    eventTitle: "Soul King Killed",
    characterName: "Yhwach",
    role: "Manipulator of Quincy blood"
  },

  // Yhwach Absorbs the Soul King
  {
    eventTitle: "Yhwach Absorbs the Soul King",
    characterName: "Yhwach",
    role: "Absorbed Soul King and Mimihagi"
  },
  {
    eventTitle: "Yhwach Absorbs the Soul King",
    characterName: "Mimihagi",
    role: "Absorbed by Yhwach"
  },

  // Uryu Ishida Named Yhwach's Successor
  {
    eventTitle: "Uryu Ishida Named Yhwach's Successor",
    characterName: "Uryu Ishida",
    role: "Appointed Successor"
  },
  {
    eventTitle: "Uryu Ishida Named Yhwach's Successor",
    characterName: "Yhwach",
    role: "Appointed Uryu"
  },
  {
    eventTitle: "Uryu Ishida Named Yhwach's Successor",
    characterName: "Jugram Haschwalth",
    role: "Witness / Sternritter Grandmaster"
  },

  // Sosuke Aizen Released from Muken
  {
    eventTitle: "Sosuke Aizen Released from Muken",
    characterName: "Sosuke Aizen",
    role: "Released"
  },
  {
    eventTitle: "Sosuke Aizen Released from Muken",
    characterName: "Shunsui Kyoraku",
    role: "Released Aizen's seals"
  },

  // Yhwach Defeated
  {
    eventTitle: "Yhwach Defeated",
    characterName: "Ichigo Kurosaki",
    role: "Delivered final slash"
  },
  {
    eventTitle: "Yhwach Defeated",
    characterName: "Sosuke Aizen",
    role: "Decoy using Kyoka Suigetsu"
  },
  {
    eventTitle: "Yhwach Defeated",
    characterName: "Uryu Ishida",
    role: "Shot Still Silver arrow to disrupt Yhwach's powers"
  },
  {
    eventTitle: "Yhwach Defeated",
    characterName: "Yhwach",
    role: "Defeated god"
  },

  // Kazui Kurosaki Introduced
  {
    eventTitle: "Kazui Kurosaki Introduced",
    characterName: "Kazui Kurosaki",
    role: "Introduced child"
  },
  {
    eventTitle: "Kazui Kurosaki Introduced",
    characterName: "Ichigo Kurosaki",
    role: "Father"
  },
  {
    eventTitle: "Kazui Kurosaki Introduced",
    characterName: "Orihime Inoue",
    role: "Mother"
  },

  // Isshin Reveals His Past
  {
    eventTitle: "Isshin Reveals His Past",
    characterName: "Isshin Kurosaki",
    role: "Narrator / Former captain"
  },
  {
    eventTitle: "Isshin Reveals His Past",
    characterName: "Ichigo Kurosaki",
    role: "Listener / Son"
  },

  // Aizen Creates the Arrancar Army
  {
    eventTitle: "Aizen Creates the Arrancar Army",
    characterName: "Sosuke Aizen",
    role: "Creator using Hogyoku"
  },
  {
    eventTitle: "Aizen Creates the Arrancar Army",
    characterName: "Gin Ichimaru",
    role: "Accomplice"
  },
  {
    eventTitle: "Aizen Creates the Arrancar Army",
    characterName: "Kaname Tosen",
    role: "Accomplice"
  },

  // Soul King Palace Invasion
  {
    eventTitle: "Soul King Palace Invasion",
    characterName: "Yhwach",
    role: "Invading Leader"
  },
  {
    eventTitle: "Soul King Palace Invasion",
    characterName: "Jugram Haschwalth",
    role: "Invader"
  },
  {
    eventTitle: "Soul King Palace Invasion",
    characterName: "Uryu Ishida",
    role: "Invader"
  },
  {
    eventTitle: "Soul King Palace Invasion",
    characterName: "Ichibe Hyosube",
    role: "Defender Leader"
  },

  // Yhwach Kills Ichibe Hyosube
  {
    eventTitle: "Yhwach Kills Ichibe Hyosube",
    characterName: "Yhwach",
    role: "Killer / Activated 'The Almighty'"
  },
  {
    eventTitle: "Yhwach Kills Ichibe Hyosube",
    characterName: "Ichibe Hyosube",
    role: "Victim"
  },

  // Aizen Released from Chair-Sama Restrictions
  {
    eventTitle: "Aizen Released from Chair-Sama Restrictions",
    characterName: "Sosuke Aizen",
    role: "Released combatant"
  },
  {
    eventTitle: "Aizen Released from Chair-Sama Restrictions",
    characterName: "Yhwach",
    role: "Opponent / Trigger for release"
  },

  // Kazui Removes Yhwach Residual Reiatsu
  {
    eventTitle: "Kazui Removes Yhwach Residual Reiatsu",
    characterName: "Kazui Kurosaki",
    role: "Dispersed residual Reiatsu"
  },
  {
    eventTitle: "Kazui Removes Yhwach Residual Reiatsu",
    characterName: "Yhwach",
    role: "Source of residual Reiatsu"
  },

  // Sosuke Aizen Implants the Hogyoku into Rukia Kuchiki
  {
    eventTitle: "Sosuke Aizen Implants the Hogyoku into Rukia Kuchiki",
    characterName: "Sosuke Aizen",
    role: "Concealed the Hogyoku inside Rukia's soul"
  },
  {
    eventTitle: "Sosuke Aizen Implants the Hogyoku into Rukia Kuchiki",
    characterName: "Rukia Kuchiki",
    role: "Unwitting vessel of the Hogyoku"
  }
];

const eventParticipants = bleachVerseEventParticipantSeedData.map((item) => ({
  ...item,
  eventSlug: slugify(item.eventTitle, { lower: true, strict: true }),
  characterSlug: slugify(item.characterName, { lower: true, strict: true }),
}));

export default eventParticipants;


