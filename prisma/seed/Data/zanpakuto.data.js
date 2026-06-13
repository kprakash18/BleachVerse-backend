import { ZanpakutoType } from "@prisma/client";

const zanpakutos = [
  {
    name: "Zangetsu",
    characterName: "Ichigo Kurosaki",
    type: ZanpakutoType.DUAL,
    releaseCommand: null,
    spiritName: "Zangetsu",
    description:
      "Ichigo Kurosaki's primary Zanpakuto, manifesting as dual black blades representing his inner hollow and Quincy powers.",
    aliases: ["True Zangetsu"],
  },
  {
    name: "Sode no Shirayuki",
    characterName: "Rukia Kuchiki",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Dance",
    spiritName: "Sode no Shirayuki",
    description:
      "Considered the most beautiful Zanpakuto in Soul Society, controlling ice and snow.",
    aliases: ["Beautiful Snow"],
  },
  {
    name: "Benihime",
    characterName: "Kisuke Urahara",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Awaken",
    spiritName: "Benihime",
    description:
      "A cane-sword that manipulates crimson energy for offensive and defensive techniques.",
    aliases: ["Crimson Princess", "Red Princess"],
  },
  {
    name: "Senbonzakura",
    characterName: "Byakuya Kuchiki",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Scatter",
    spiritName: "Senbonzakura",
    description:
      "Its blade divides into thousands of microscopic fragments that resemble cherry blossom petals.",
    aliases: ["Thousand Cherry Blossoms"],
  },
  {
    name: "Zabimaru",
    characterName: "Renji Abarai",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Howl",
    spiritName: "Zabimaru",
    description:
      "A snake-whip sword that can segment and extend to strike from a distance.",
    aliases: ["Snake Tail"],
  },
  {
    name: "Ryujin Jakka",
    characterName: "Genryusai Shigekuni Yamamoto",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Reduce All Creation to Ash",
    spiritName: "Ryujin Jakka",
    description:
      "The oldest and most powerful fire-type Zanpakuto in Soul Society.",
    aliases: ["Flowing Flame Blade"],
  },
  {
    name: "Katen Kyokotsu",
    characterName: "Shunsui Kyoraku",
    type: ZanpakutoType.DUAL,
    releaseCommand:
      "Flower Wind Rage and Flower God Weep, Heavenly Wind Rage and Heavenly Demon Laugh",
    spiritName: "Katen Kyokotsu",
    description:
      "One of the rare dual Zanpakuto, capable of bringing children's games to life with lethal consequences.",
    aliases: ["Flower Heaven Crazy Bone"],
  },
  {
    name: "Sogyo no Kotowari",
    characterName: "Jushiro Ukitake",
    type: ZanpakutoType.DUAL,
    releaseCommand:
      "All Waves, Rise and Become My Shield, All Lightning, Strike and Become My Sword",
    spiritName: "Sogyo no Kotowari",
    description:
      "A dual-blade Zanpakuto connected by a cord, capable of absorbing and reflecting attacks.",
    aliases: ["Truth of Pisces"],
  },
  {
    name: "Suzumebachi",
    characterName: "Soi Fon",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Sting all Enemies to Death",
    spiritName: "Suzumebachi",
    description:
      "A stinger-like weapon worn on the finger, capable of instant death upon a second strike on the same location.",
    aliases: ["Hornet"],
  },
  {
    name: "Shinsō",
    characterName: "Gin Ichimaru",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Shoot to Kill",
    spiritName: "Shinsō",
    description:
      "A short blade that can extend and contract at extreme speeds over long distances.",
    aliases: ["Sacred Spear"],
  },
  {
    name: "Minazuki",
    characterName: "Retsu Unohana",
    type: ZanpakutoType.NORMAL,
    releaseCommand: null,
    spiritName: "Minazuki",
    description:
      "A healing ray-like creature when in Shikai, and a blood-dripping blade in Bankai.",
    aliases: ["Flesh-Mimicker"],
  },
  {
    name: "Tenken",
    characterName: "Sajin Komamura",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Roar",
    spiritName: "Tenken",
    description:
      "Summons giant phantom limbs of an armored giant to mirror the wielder's attacks.",
    aliases: ["Heaven's Punishment"],
  },
  {
    name: "Suzumushi",
    characterName: "Kaname Tosen",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Cry",
    spiritName: "Suzumushi",
    description:
      "A sword with audio-centric powers, capable of creating debilitating high-pitched noises.",
    aliases: ["Bell Bug"],
  },
  {
    name: "Hyorinmaru",
    characterName: "Toshiro Hitsugaya",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Reign over the Frosted Heavens",
    spiritName: "Hyorinmaru",
    description:
      "The strongest ice-element Zanpakuto, creating a dragon of water and ice.",
    aliases: ["Ice Ring"],
  },
  {
    name: "Nozarashi",
    characterName: "Kenpachi Zaraki",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Drink",
    spiritName: "Nozarashi",
    description:
      "A giant cleaver-like blade capable of cutting through any physical or non-physical object.",
    aliases: ["Weather-Beaten"],
  },
  {
    name: "Ashisogi Jizō",
    characterName: "Mayuri Kurotsuchi",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Claw Out",
    spiritName: "Ashisogi Jizō",
    description:
      "A strange trident-like sword that secretes poison to paralyze the target's limbs.",
    aliases: ["Leg-Cutting Jizo"],
  },
  {
    name: "Kyōka Suigetsu",
    characterName: "Sosuke Aizen",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Shatter",
    spiritName: "Kyōka Suigetsu",
    description:
      "Controls all five senses to create perfect, unbreakable illusions.",
    aliases: ["Mirror Flower Water Moon"],
  },
  {
    name: "Tobiume",
    characterName: "Momo Hinamori",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Snap",
    spiritName: "Tobiume",
    description: "A blade with cross-guards that shoots explosive fireballs.",
    aliases: ["Flying Plum Tree"],
  },
  {
    name: "Wabisuke",
    characterName: "Izuru Kira",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Raise Your Head",
    spiritName: "Wabisuke",
    description:
      "A hook-bladed sword that doubles the weight of anything it strikes.",
    aliases: ["The Penitent One"],
  },
  {
    name: "Haineko",
    characterName: "Rangiku Matsumoto",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Growl",
    spiritName: "Haineko",
    description:
      "Turns its blade into a cloud of cutting ash controlled by the wielder.",
    aliases: ["Ash Cat"],
  },
  {
    name: "Kazeshini",
    characterName: "Shuhei Hisagi",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Reap",
    spiritName: "Kazeshini",
    description:
      "Two dual-bladed scythes connected by a chain, designed for unpredictable movement.",
    aliases: ["Wind Death"],
  },
  {
    name: "Hōzukimaru",
    characterName: "Ikkaku Madarame",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Split",
    spiritName: "Hōzukimaru",
    description: "A wooden spear that can split into a three-section staff.",
    aliases: ["Demon Light"],
  },
  {
    name: "Gonryōmaru",
    characterName: "Chojiro Sasakibe",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Pierce",
    spiritName: "Gonryōmaru",
    description:
      "A rapier-styled sword that controls massive lightning storms.",
    aliases: ["Solemn Beast"],
  },
  {
    name: "Gegetsuburi",
    characterName: "Marechiyo Omaeda",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Crush",
    spiritName: "Gegetsuburi",
    description:
      "A heavy, spiked metal ball and chain used for direct blunt-force strikes.",
    aliases: ["Five-Headed Flail"],
  },
  {
    name: "Hisagomaru",
    characterName: "Hanataro Yamada",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Fulfill",
    spiritName: "Hisagomaru",
    description:
      "A sword that absorbs the wounds of those it cuts, releasing the stored energy as an attack.",
    aliases: ["Gourd"],
  },
  {
    name: "Nejibana",
    characterName: "Kaien Shiba",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Rage Through the Seas and Skies",
    spiritName: "Nejibana",
    description:
      "A trident-like weapon that unleashes torrents of crashing water.",
    aliases: ["Twisted Flower"],
  },
  {
    name: "Sakanade",
    characterName: "Shinji Hirako",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Collapse",
    spiritName: "Sakanade",
    description:
      "A sword that creates an optical illusion reversing all senses of direction for the opponent.",
    aliases: ["Counter Stroke"],
  },
  {
    name: "Kubikiri Orochi",
    characterName: "Hiyori Sarugaki",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Chop Clean",
    spiritName: "Kubikiri Orochi",
    description: "A giant cleaver-like blade with jagged, serrated edges.",
    aliases: ["Head-Slicing Serpent"],
  },
  {
    name: "Tengumaru",
    characterName: "Love Aikawa",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Crush Down",
    spiritName: "Tengumaru",
    description:
      "A giant, heavy spiked club capable of generating bursts of flame.",
    aliases: ["Tengu Flail"],
  },
  {
    name: "Kinshara",
    characterName: "Rojuro Otoribashi",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Play",
    spiritName: "Kinshara",
    description:
      "A golden whip with a flower at its tip, capable of channeling music and sound waves.",
    aliases: ["Golden Sal Tree"],
  },
  {
    name: "Tachikaze",
    characterName: "Kensei Muguruma",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Blow it Away",
    spiritName: "Tachikaze",
    description:
      "A combat knife that releases high-pressure wind blasts and explosive shockwaves.",
    aliases: ["Earth-Severing Wind"],
  },
  {
    name: "Hagurobo",
    characterName: "Lisa Yadomaru",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Smash",
    spiritName: "Hagurobo",
    description:
      "A weapon that changes into a giant monk spade used for heavy sweeps.",
    aliases: ["Iron Dragonfly"],
  },
  {
    name: "Itegumo",
    characterName: "Isane Kotetsu",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Run",
    spiritName: "Itegumo",
    description:
      "A sword that sprouts three separate blades from the hilt when released.",
    aliases: ["Frozen Cloud"],
  },
  {
    name: "Pantera",
    characterName: "Grimmjow Jaegerjaquez",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Grind",
    spiritName: "Pantera",
    description:
      "Grimmjow's Resurrección sword, releasing his predatory, panther-like Hollow powers.",
    aliases: ["Panther"],
  },
  {
    name: "Murciélago",
    characterName: "Ulquiorra Cifer",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Confine",
    spiritName: "Murciélago",
    description:
      "Ulquiorra's Resurrección sword, releasing bat-like wings and dark spiritual energy.",
    aliases: ["Black-Winged Great Demon"],
  },
  {
    name: "Gamuza",
    characterName: "Nelliel Tu Odelschwanck",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Declare",
    spiritName: "Gamuza",
    description:
      "Nelliel's sword which transforms her into a centaur-like form with a giant lance.",
    aliases: ["Antelope Knight"],
  },
  {
    name: "Tiburón",
    characterName: "Tier Harribel",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Destroy",
    spiritName: "Tiburón",
    description:
      "Harribel's giant hollow sword, capable of manipulating massive amounts of boiling water.",
    aliases: ["Shark Emperor"],
  },
  {
    name: "Los Lobos",
    characterName: "Coyote Starrk",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Kick About",
    spiritName: "Lilynette",
    description:
      "Starrk's Zanpakuto, which takes the form of his partner Lilynette and turns into twin pistols.",
    aliases: ["The Wolves"],
  },
  {
    name: "Arrogante",
    characterName: "Baraggan Louisenbairn",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Rot",
    spiritName: "Arrogante",
    description:
      "A giant battleaxe that manifests aging and decay powers upon release.",
    aliases: ["Arrogant"],
  },
  {
    name: "Santa Teresa",
    characterName: "Nnoitra Gilga",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Pray",
    spiritName: "Santa Teresa",
    description:
      "A large crescent weapon that transforms wielder to have multiple arms and scythes.",
    aliases: ["Sacred Praying Mantis"],
  },
  {
    name: "Fornicarás",
    characterName: "Szayelaporro Granz",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Sip",
    spiritName: "Fornicarás",
    description:
      "Szayelaporro's sword, unleashing cloning, doll creation, and target organ control.",
    aliases: ["Fornicate"],
  },
  {
    name: "Brujería",
    characterName: "Zommari Rureaux",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Quell",
    spiritName: "Brujería",
    description:
      "Zommari's sword, covering his body in eyes that can control targets.",
    aliases: ["Witchcraft"],
  },
  {
    name: "Glotonería",
    characterName: "Aaroniero Arruruerie",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Devour",
    spiritName: "Glotonería",
    description:
      "Aaroniero's sword, transforming his arm into a massive tentacle that consumes other Hollows.",
    aliases: ["Gluttony"],
  },
  {
    name: "Ira",
    characterName: "Yammy Llargo",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Enrage",
    spiritName: "Ira",
    description:
      "Yammy's sword, which swells his size and strength in proportion to his anger.",
    aliases: ["Anger"],
  },
  {
    name: "Trepadora",
    characterName: "Luppi Antenor",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Choke",
    spiritName: "Trepadora",
    description: "Releases eight powerful tentacles from the wielder's back.",
    aliases: ["Vine"],
  },
  {
    name: "Golondrina",
    characterName: "Cirucci Sanderwicci",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Rip",
    spiritName: "Golondrina",
    description:
      "A massive bladed yo-yo that transforms into feather-like wing blades.",
    aliases: ["Swallow"],
  },
  {
    name: "Giralda",
    characterName: "Dordoni Alessandro Del Socaccio",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Kick",
    spiritName: "Giralda",
    description:
      "Two wind-exhaust horns on the boots that create storm cyclones.",
    aliases: ["Weathercock"],
  },
  {
    name: "Sanpo Kenjū",
    characterName: "Yachiru Kusajishi",
    type: ZanpakutoType.NORMAL,
    releaseCommand: null,
    spiritName: "Sanpo Kenjū",
    description:
      "Summons two invisible beasts that mimic Yachiru's sword swings from the front and back.",
    aliases: ["Three-Step Sword Beast"],
  },
  {
    name: "Nijigasumi",
    characterName: "Maki Ichinose",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Flash",
    spiritName: "Nijigasumi",
    description:
      "A light-based Zanpakuto capable of making the blade invisible or creating blinding light attacks.",
    aliases: ["Rainbow Mist"],
  },
  {
    name: "Reina de Rosas",
    characterName: "Charlotte Chuhlhourne",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Spin",
    spiritName: "Reina de Rosas",
    description: "Releases a flamboyantly rose-themed Resurrección.",
    aliases: ["Queen of Roses"],
  },
  {
    name: "Cierva",
    characterName: "Apache",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Thrust",
    spiritName: "Cierva",
    description:
      "Apache's crescent-shaped blade, which transforms her into a horned beast.",
    aliases: ["Doe"],
  },
  {
    name: "Leona",
    characterName: "Mila Rose",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Roar",
    spiritName: "Leona",
    description:
      "Mila Rose's sword, which transforms her into an armored warrior with lion features.",
    aliases: ["Lioness"],
  },
  {
    name: "Anaconda",
    characterName: "Sung-Sun",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Strangle",
    spiritName: "Anaconda",
    description:
      "Sung-Sun's sword, which she releases to transform into a half-snake form.",
    aliases: ["Anaconda"],
  },
  {
    name: "Extinguir",
    characterName: "Wonderweiss Margela",
    type: ZanpakutoType.NORMAL,
    releaseCommand: null,
    spiritName: "Extinguir",
    description:
      "Wonderweiss's Zanpakuto, specially designed to seal Ryujin Jakka's flames.",
    aliases: ["To Extinguish"],
  },
  {
    name: "Arbola",
    characterName: "Rudbornn Chelute",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Grow",
    spiritName: "Arbola",
    description:
      "Transforms the wielder, allowing them to spawn infinite skull soldiers (Calaveras) like branches.",
    aliases: ["Tree"],
  },
  {
    name: "Verruga",
    characterName: "Tesla Lindocruz",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Crush",
    spiritName: "Verruga",
    description:
      "Transforms Tesla into a giant, warthog-like beast with immense physical power.",
    aliases: ["Wart"],
  },
  {
    name: "Ichimonji",
    characterName: "Ichibe Hyosube",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Blacken",
    spiritName: "Ichimonji",
    description:
      "A large brush that writes names and uses black ink to erase the power and names of everything it covers.",
    aliases: ["One Character", "Straight Line"],
  },
  {
    name: "Sayafushi",
    characterName: "Oetsu Nimaiya",
    type: ZanpakutoType.NORMAL,
    releaseCommand: null,
    spiritName: "Sayafushi",
    description:
      "An extremely sharp sword that cannot be held in any sheath due to cutting through everything.",
    aliases: ["Sheath Dodger"],
  },
  {
    name: "Shigarami",
    characterName: "Senjumaru Shutara",
    type: ZanpakutoType.NORMAL,
    releaseCommand: null,
    spiritName: "Shigarami",
    description:
      "A needle-like weapon used to weave fabrics and alter reality or trap enemies.",
    aliases: ["Skein"],
  },
  {
    name: "Kinpika",
    characterName: "Tenjiro Kirinji",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Flash",
    spiritName: "Kinpika",
    description:
      "A wooden paddle-like sword that generates extremely bright, burning light.",
    aliases: ["Gilded"],
  },
  {
    name: "Kuten Kyōgoku",
    characterName: "Tokinada Tsunayashiro",
    type: ZanpakutoType.NORMAL,
    releaseCommand: null,
    spiritName: "Kuten Kyōgoku",
    description:
      "The Tsunayashiro family's ancestral Zanpakuto, capable of replicating the abilities of other Zanpakutos.",
    aliases: ["Enryokyō"],
  },
  {
    name: "Ruri'iro Kujaku",
    characterName: "Yumichika Ayasegawa",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Bloom",
    spiritName: "Ruri'iro Kujaku",
    description:
      "A kidō-type Zanpakutō capable of draining spiritual energy from opponents.",
    aliases: ["Azure Peacock"],
  },
  {
    name: "Kuna's Zanpakutō",
    characterName: "Mashiro Kuna",
    type: ZanpakutoType.NORMAL,
    releaseCommand: null,
    spiritName: null,
    description:
      "Mashiro's Zanpakutō, whose abilities remain largely unknown.",
    aliases: [],
  },
  {
    name: "Shinken Hakkyōken",
    characterName: "Nanao Ise",
    type: ZanpakutoType.NORMAL,
    releaseCommand: null,
    spiritName: null,
    description:
      "A divine heirloom sword capable of reflecting and dispersing god-like powers.",
    aliases: ["Divine Eight Mirror Sword"],
  },
  {
    name: "Ikomikidomoe",
    characterName: "Hikone Ubuginu",
    type: ZanpakutoType.HYBRID,
    releaseCommand: null,
    spiritName: "Ikomikidomoe",
    description:
      "Ancient Hollow-turned-Zanpakutō spirit bound to Hikone Ubuginu.",
    aliases: [],
  },
  {
    name: "Dragón",
    characterName: "Dordoni Alessandro Del Socaccio",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Spin",
    spiritName: "Dragón",
    description:
      "Dordoni's released form emphasizing aerial combat and wind attacks.",
    aliases: ["Dragon"],
  },
  {
    name: "Águila",
    characterName: "Loly Aivirrne",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Beat Down",
    spiritName: "Águila",
    description:
      "Loly's eagle-themed Resurrección.",
    aliases: ["Eagle"],
  },
  {
    name: "Mamba",
    characterName: "Menoly Mallia",
    type: ZanpakutoType.NORMAL,
    releaseCommand: "Twine",
    spiritName: "Mamba",
    description:
      "Menoly's snake-themed Resurrección.",
    aliases: [],
  },
];

export default zanpakutos;
