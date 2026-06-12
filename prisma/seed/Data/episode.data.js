import { EpisodeType } from "@prisma/client";

// Arc slug ranges — matches startEpisodeNumber/endEpisodeNumber in arc.data.js
const arcRanges = [
  { slug: "substitute-shinigami-arc", start: 1, end: 20 },
  { slug: "soul-society-the-sneak-entry-arc", start: 21, end: 41 },
  { slug: "soul-society-the-rescue-arc", start: 42, end: 63 },
  { slug: "the-bount-arc", start: 64, end: 91 },
  { slug: "the-bount-assault-on-soul-society-arc", start: 92, end: 109 },
  { slug: "arrancar-the-arrival-arc", start: 110, end: 131 },
  { slug: "arrancar-the-hueco-mundo-sneak-entry-arc", start: 132, end: 151 },
  { slug: "arrancar-the-fierce-fight-arc", start: 152, end: 167 },
  { slug: "the-new-captain-shusuke-amagai-arc", start: 168, end: 189 },
  { slug: "arrancar-vs-shinigami-arc", start: 190, end: 205 },
  { slug: "the-past-arc", start: 206, end: 212 },
  { slug: "arrancar-decisive-battle-of-karakura-arc", start: 213, end: 229 },
  { slug: "zanpakuto-unknown-tales-arcbeast-swords-arc", start: 230, end: 265 },
  { slug: "arrancar-downfall-arc", start: 266, end: 316 },
  { slug: "the-gotei-13-invasion-arc", start: 317, end: 342 },
  { slug: "the-lost-substitute-shinigami-arc", start: 343, end: 366 },
  { slug: "thousand-year-blood-war-arc", start: 367, end: 379 },
  { slug: "thousand-year-blood-war-the-separation-arc", start: 380, end: 392 },
  { slug: "thousand-year-blood-war-the-conflict-arc", start: 393, end: 406 },
  { slug: "thousand-year-blood-war-the-calamity-arc", start: 407, end: 420 },
];

// Auto-assigns arcSlug based on episode number
function getArcSlug(episodeNumber) {
  const arc = arcRanges.find(
    (a) => episodeNumber >= a.start && episodeNumber <= a.end,
  );
  return arc?.slug ?? null;
}

const rawEpisodes = [
  // Substitute Shinigami Arc (1–20)
  {
    number: 1,
    title: "The Day I Became a Shinigami",
    type: EpisodeType.CANON,
    airDate: new Date("2004-10-05"),
    synopsis:
      "Ichigo Kurosaki meets Rukia Kuchiki, a Soul Reaper, and accidentally absorbs her powers to save his family from a monstrous Hollow.",
  },
  {
    number: 2,
    title: "The Shinigami's Work",
    type: EpisodeType.CANON,
    airDate: new Date("2004-10-12"),
    synopsis:
      "Now a temporary Soul Reaper, Ichigo must balance high school life with his new duties of purifying Hollows and sending souls to the Soul Society.",
  },
  {
    number: 3,
    title: "The Older Brother's Wish, the Younger Sister's Wish",
    type: EpisodeType.CANON,
    airDate: new Date("2004-10-19"),
    synopsis:
      "Ichigo confronts the tragic ghost of Orihime's older brother, who has transformed into a Hollow due to his loneliness and attachment to his sister.",
  },
  {
    number: 4,
    title: "Cursed Parakeet",
    type: EpisodeType.CANON,
    airDate: new Date("2004-10-26"),
    synopsis:
      "Chad adopts a talking parakeet that is cursed by the soul of a young boy fleeing a relentless Hollow, prompting Ichigo and Rukia to intervene.",
  },
  {
    number: 5,
    title: "Beat the Invisible Enemy!",
    type: EpisodeType.CANON,
    airDate: new Date("2004-11-02"),
    synopsis:
      "Rukia and Chad team up to fight a devious Hollow named Shrieker, while Ichigo races to the scene to save the young boy's soul.",
  },
  {
    number: 6,
    title: "Fight to the Death! Ichigo vs. Ichigo",
    type: EpisodeType.CANON,
    airDate: new Date("2004-11-09"),
    synopsis:
      "Ichigo purchases a Modified Soul candy from Urahara's shop, which ends up occupying his body and causing havoc around town.",
  },
  {
    number: 7,
    title: "Greetings from a Stuffed Lion",
    type: EpisodeType.CANON,
    airDate: new Date("2004-11-16"),
    synopsis:
      "Ichigo places the Modified Soul into a stuffed lion named Kon, who joins them in defending the town from an unexpected Hollow threat.",
  },
  {
    number: 8,
    title: "June 17, Memories in the Rain",
    type: EpisodeType.MIXED,
    airDate: new Date("2004-11-23"),
    synopsis:
      "On the anniversary of his mother's death, Ichigo and his family visit her grave, unaware that the Hollow responsible for her death is waiting for them.",
  },
  {
    number: 9,
    title: "Unbeatable Enemy",
    type: EpisodeType.CANON,
    airDate: new Date("2004-11-30"),
    synopsis:
      "Ichigo battles Grand Fisher, the elusive Hollow that killed his mother, while dealing with the emotional weight of his tragic past.",
  },
  {
    number: 10,
    title: "Casual Soul Realm Assault Trip!",
    type: EpisodeType.CANON,
    airDate: new Date("2004-12-07"),
    synopsis:
      "Spiritual medium Don Kanonji accidentally accelerates a ghost's transformation into a Hollow during a live TV show, forcing Ichigo to step in.",
  },
  {
    number: 11,
    title: "The Legendary Quincy",
    type: EpisodeType.CANON,
    airDate: new Date("2004-12-14"),
    synopsis:
      "Ichigo meets Uryu Ishida, a classmate who reveals himself to be a Quincy, a member of a clan that historically hunts Hollows and hates Soul Reapers.",
  },
  {
    number: 12,
    title: "A Gentle Right Arm",
    type: EpisodeType.CANON,
    airDate: new Date("2004-12-21"),
    synopsis:
      "To prove Quincy superiority, Uryu challenges Ichigo to a Hollow-hunting contest, which triggers the awakening of Chad's dormant spiritual powers.",
  },
  {
    number: 13,
    title: "Flower and Hollow",
    type: EpisodeType.CANON,
    airDate: new Date("2004-12-28"),
    synopsis:
      "As Hollows swarm the city due to Uryu's challenge, Orihime awakens her own unique spiritual abilities, the Shun Shun Rikka, to protect her friends.",
  },
  {
    number: 14,
    title: "Back to Back, a Fight to the Death!",
    type: EpisodeType.CANON,
    airDate: new Date("2005-01-11"),
    synopsis:
      "Ichigo and Uryu are forced to pool their powers and fight together when an colossal Menos Grande appears in the sky above Karakura Town.",
  },
  {
    number: 15,
    title: "Kon's Great Plan",
    type: EpisodeType.CANON,
    airDate: new Date("2005-01-18"),
    synopsis:
      "Feeling unappreciated by Ichigo and Rukia, Kon runs away to find a better home, leading to a series of comedic misadventures.",
  },
  {
    number: 16,
    title: "The Encounter, Renji Abarai!",
    type: EpisodeType.CANON,
    airDate: new Date("2005-01-25"),
    synopsis:
      "Soul Reaper officers Byakuya Kuchiki and Renji Abarai arrive in the human world to arrest Rukia for the crime of giving her powers to a human.",
  },
  {
    number: 17,
    title: "Ichigo Dies!",
    type: EpisodeType.CANON,
    airDate: new Date("2005-02-01"),
    synopsis:
      "Ichigo tries to rescue Rukia but is defeated by Byakuya, who strips him of his borrowed Soul Reaper powers and leaves him for dead.",
  },
  {
    number: 18,
    title: "Reclaim! The Power of the Shinigami",
    type: EpisodeType.CANON,
    airDate: new Date("2005-02-08"),
    synopsis:
      "Kisuke Urahara agrees to train Ichigo to regain his own Soul Reaper powers so he can travel to the Soul Society and rescue Rukia.",
  },
  {
    number: 19,
    title: "Ichigo Becomes a Hollow!",
    type: EpisodeType.CANON,
    airDate: new Date("2005-02-15"),
    synopsis:
      "To unlock his true powers, Ichigo undergoes Shattered Shaft training, risking permanent transformation into a Hollow if he fails to emerge.",
  },
  {
    number: 20,
    title: "Gin Ichimaru's Shadow",
    type: EpisodeType.CANON,
    airDate: new Date("2005-02-22"),
    synopsis:
      "Ichigo successfully regains his powers and prepares to enter the Soul Society alongside Uryu, Chad, Orihime, and Yoruichi.",
  },

  // Soul Society: The Sneak Entry Arc (21–41)
  {
    number: 21,
    title: "Enter! The World of the Shinigami",
    type: EpisodeType.CANON,
    airDate: new Date("2005-03-01"),
    synopsis:
      "Ichigo and his friends arrive in the Soul Society's Rukongai district and attempt to breach the Seireitei, but are blocked by the giant gatekeeper Jidanbo.",
  },
  {
    number: 22,
    title: "The Man who Hates Shinigami",
    type: EpisodeType.CANON,
    airDate: new Date("2005-03-08"),
    synopsis:
      "After Jidanbo is defeated, Gin Ichimaru appears and forces the group back, leading them to seek help from Shiba Kukaku, a fireworks specialist who dislikes Soul Reapers.",
  },
  {
    number: 23,
    title: "14 Days Before Rukia's Execution",
    type: EpisodeType.CANON,
    airDate: new Date("2005-03-15"),
    synopsis:
      "Kukaku Shiba introduces the group to her brother Ganju, and they begin training to launch themselves into the Seireitei using a giant spirit cannon.",
  },
  {
    number: 24,
    title: "Assemble! The Gotei 13",
    type: EpisodeType.CANON,
    airDate: new Date("2005-03-22"),
    synopsis:
      "As tension rises among the Soul Reaper Captains, the execution date for Rukia is moved forward, and Ichigo's team completes their cannon launch training.",
  },
  {
    number: 25,
    title: "Penetrate the Center with an Enormous Bombshell?",
    type: EpisodeType.CANON,
    airDate: new Date("2005-03-29"),
    synopsis:
      "The group launches into the Seireitei through the spirit barrier, but a mishap splits them up into separate locations upon entry.",
  },
  {
    number: 26,
    title: "Formation! The Worst Tag",
    type: EpisodeType.CANON,
    airDate: new Date("2005-04-05"),
    synopsis:
      "Ichigo and Ganju Shiba are forced to work together to evade capture, while the other members of the group navigate the hostile Seireitei on their own.",
  },
  {
    number: 27,
    title: "Release the Death Blow!",
    type: EpisodeType.MIXED,
    airDate: new Date("2005-04-12"),
    synopsis:
      "Ichigo battles Ikkaku Madarame of the 11th Division, showing off his growth and gaining crucial information about Rukia's imprisonment.",
  },
  {
    number: 28,
    title: "Orihime Targeted",
    type: EpisodeType.CANON,
    airDate: new Date("2005-04-19"),
    synopsis:
      "Orihime and Uryu encounter members of the 12th Division, while Ichigo and Ganju take Hanataro Yamada hostage, who unexpectedly offers to help them save Rukia.",
  },
  {
    number: 29,
    title: "Breakthrough! The Shinigami's Encompassing Net",
    type: EpisodeType.CANON,
    airDate: new Date("2005-04-26"),
    synopsis:
      "Guided by Hanataro, Ichigo and Ganju navigate the underground sewer system to reach the Senzaikyu tower where Rukia is being held.",
  },
  {
    number: 30,
    title: "Renji's Confrontation",
    type: EpisodeType.CANON,
    airDate: new Date("2005-05-03"),
    synopsis:
      "Renji Abarai intercepts Ichigo in the Seireitei, initiating a fierce duel fueled by their conflicting feelings about Rukia's fate.",
  },
  {
    number: 31,
    title: "The Resolution to Kill",
    type: EpisodeType.CANON,
    airDate: new Date("2005-05-10"),
    synopsis:
      "As their fight reaches its climax, Renji recalls his childhood friendship with Rukia and begs Ichigo to save her as he falls in defeat.",
  },
  {
    number: 32,
    title: "The Star and the Stray Dog",
    type: EpisodeType.MIXED,
    airDate: new Date("2005-05-17"),
    synopsis:
      "Renji is hospitalized after his defeat, reflecting on his long-standing rivalry with Byakuya Kuchiki and how it drove him to his current path.",
  },
  {
    number: 33,
    title: "Miracle! The Mysterious New Hero",
    type: EpisodeType.FILLER,
    airDate: new Date("2005-05-26"),
    synopsis:
      "In Karakura Town, Kon assumes the role of a superhero named Karakuraizer to protect the town from Hollows in Ichigo's absence.",
  },
  {
    number: 34,
    title: "Tragedy of Dawn",
    type: EpisodeType.CANON,
    airDate: new Date("2005-06-01"),
    synopsis:
      "Ichigo is treated for his injuries by Hanataro while Byakuya Kuchiki decides to take matters into his own hands regarding the intruders.",
  },
  {
    number: 35,
    title: "Aizen Assassinated! The Darkness which Approaches",
    type: EpisodeType.CANON,
    airDate: new Date("2005-06-07"),
    synopsis:
      "The Seireitei is thrown into chaos when Captain Sosuke Aizen is found murdered, sparking immediate suspicion and paranoia among the Gotei 13.",
  },
  {
    number: 36,
    title: "Kenpachi Zaraki Approaches!",
    type: EpisodeType.CANON,
    airDate: new Date("2005-06-14"),
    synopsis:
      "Captain Kenpachi Zaraki of the 11th Division sets out to find and fight Ichigo, eager to test his strength against the powerful intruder.",
  },
  {
    number: 37,
    title: "Motive of the Fist",
    type: EpisodeType.CANON,
    airDate: new Date("2005-06-21"),
    synopsis:
      "Chad recalls his childhood promise to grandfather Oscar Joaquin de la Rosa about using his strength only for protection as he fights Captain Shunsui Kyoraku.",
  },
  {
    number: 38,
    title: "Desperation! The Broken Zangetsu",
    type: EpisodeType.CANON,
    airDate: new Date("2005-06-28"),
    synopsis:
      "Ichigo encounters Kenpachi Zaraki, but is overwhelmed by the Captain's monstrous spiritual energy, which easily shatters Zangetsu.",
  },
  {
    number: 39,
    title: "The Immortal Man",
    type: EpisodeType.CANON,
    airDate: new Date("2005-07-05"),
    synopsis:
      "After a spiritual reconciliation with Zangetsu, Ichigo fights back with renewed power, matching Kenpachi in a devastating clash of swords.",
  },
  {
    number: 40,
    title: "The Shinigami whom Ganju Met",
    type: EpisodeType.CANON,
    airDate: new Date("2005-07-12"),
    synopsis:
      "Ganju and Hanataro reach Rukia's cell, but Ganju is shocked to realize that Rukia is the Soul Reaper who killed his older brother, Kaien Shiba.",
  },
  {
    number: 41,
    title: "Reunion, Ichigo and Rukia",
    type: EpisodeType.CANON,
    airDate: new Date("2005-07-19"),
    synopsis:
      "Byakuya Kuchiki confronts Ganju and Hanataro at Rukia's cell, and Ichigo arrives just in time to save them from Byakuya's lethal attacks.",
  },

  // soul-society-the-resuce-arc
  {
    number: 42,
    title: "Yoruichi, Goddess of Flash, Dances!",
    type: EpisodeType.CANON,
    airDate: new Date("2005-07-26"),
    synopsis:
      "Yoruichi Shihoin uses her legendary speed to save Ichigo from Byakuya, escaping to a hidden training ground to teach Ichigo how to achieve Bankai.",
  },
  {
    number: 43,
    title: "The Despicable Shinigami",
    type: EpisodeType.CANON,
    airDate: new Date("2005-08-02"),
    synopsis:
      "Uryu and Orihime disguise themselves as Soul Reapers to reach Rukia, but are targeted by Captain Mayuri Kurotsuchi of the 12th Division.",
  },
  {
    number: 44,
    title: "Ishida, The Utomost Limits of Power!",
    type: EpisodeType.CANON,
    airDate: new Date("2005-08-09"),
    synopsis:
      "Uryu fights a desperate battle against Mayuri, utilizing the forbidden Quincy: Letzt Stil technique to overpower the captain at the cost of his Quincy powers.",
  },
  {
    number: 45,
    title: "Overcome Your Limits!",
    type: EpisodeType.CANON,
    airDate: new Date("2005-08-16"),
    synopsis:
      "Under Yoruichi's guidance, Ichigo begins intense training to manifest and defeat his Zanpakuto's spirit within three days to achieve Bankai.",
  },
  {
    number: 46,
    title: "Authentic Records! School of Shinigami",
    type: EpisodeType.MIXED,
    airDate: new Date("2005-08-23"),
    synopsis:
      "Momo Hinamori escapes from her cell after reading a letter left by Sosuke Aizen, which points to Toshiro Hitsugaya as Aizen's killer.",
  },
  {
    number: 47,
    title: "The Avengers",
    type: EpisodeType.CANON,
    airDate: new Date("2005-08-30"),
    synopsis:
      "Hinamori confronts Hitsugaya, believing he killed Aizen. Hitsugaya is forced to defend himself while realizing a deeper conspiracy is at play.",
  },
  {
    number: 48,
    title: "Hitsugaya Howls!",
    type: EpisodeType.CANON,
    airDate: new Date("2005-09-06"),
    synopsis:
      "Hitsugaya battles Gin Ichimaru, suspecting him of manipulating Hinamori and murdering Aizen, leading to a clash of ice and steel.",
  },
  {
    number: 49,
    title: "Rukia's Nightmare",
    type: EpisodeType.CANON,
    airDate: new Date("2005-09-13"),
    synopsis:
      "Rukia, awaiting her execution, recalls the tragic incident where she was forced to kill her mentor, Kaien Shiba, to save his soul from a Hollow.",
  },
  {
    number: 50,
    title: "The Reviving Lion",
    type: EpisodeType.FILLER,
    airDate: new Date("2005-09-20"),
    synopsis:
      "Back in Karakura Town, Kon and the Karakuraizers find themselves dealing with an unusual infestation of weak Hollows.",
  },
  {
    number: 51,
    title: "Morning of the Sentence",
    type: EpisodeType.CANON,
    airDate: new Date("2005-09-27"),
    synopsis:
      "As Rukia is escorted to the execution grounds on Sokyoku Hill, Ichigo continues his high-stakes Bankai training under Yoruichi.",
  },
  {
    number: 52,
    title: "Renji, Oath of the Soul! Death Match with Byakuya",
    type: EpisodeType.CANON,
    airDate: new Date("2005-10-04"),
    synopsis:
      "Renji recovers from his injuries and challenges Byakuya Kuchiki, unleashing his new Bankai, Hiko Zabimaru, in a fierce battle of resolve.",
  },
  {
    number: 53,
    title: "Gin Ichimaru's Temptation, Resolution Shattered",
    type: EpisodeType.CANON,
    airDate: new Date("2005-10-04"),
    synopsis:
      "Gin taunts Rukia on her way to the execution stand, cruelly offering her a false hope of survival to break her spirit.",
  },
  {
    number: 54,
    title: "An Accomplished Oath! Get Back Rukia!",
    type: EpisodeType.CANON,
    airDate: new Date("2005-10-18"),
    synopsis:
      "As the Sokyoku is released to execute Rukia, Ichigo makes a dramatic entrance, stopping the massive execution weapon with his bare sword.",
  },
  {
    number: 55,
    title:
      "The Strongest Shinigami! Ultimate Confrontation Between teacher and Students",
    type: EpisodeType.CANON,
    airDate: new Date("2005-10-25"),
    synopsis:
      "Captains Shunsui Kyoraku and Jushiro Ukitake destroy the Sokyoku, prompting Head Captain Yamamoto to pursue and engage them in battle.",
  },
  {
    number: 56,
    title: "Supersonic Battle! Determine the Goddess of Chivalry",
    type: EpisodeType.CANON,
    airDate: new Date("2005-11-01"),
    synopsis:
      "Yoruichi Shihoin engages in a high-speed battle of stealth and martial arts against her former student and successor, Captain Sui-Feng.",
  },
  {
    number: 57,
    title: "Senbonzakura, Crushed! Zangetsu Thrusts Through the Sky",
    type: EpisodeType.CANON,
    airDate: new Date("2005-11-08"),
    synopsis:
      "Ichigo battles Byakuya Kuchiki, demonstrating the incredible power of his newly trained Bankai, Tensa Zangetsu, to shatter Byakuya's defenses.",
  },
  {
    number: 58,
    title: "Unseal! The Black Blade, the Miraculous Power",
    type: EpisodeType.CANON,
    airDate: new Date("2005-11-15"),
    synopsis:
      "Byakuya releases the final form of his Bankai, Senbonzakura Kageyoshi, forcing Ichigo to fight at his absolute physical limits as his Hollow side starts to emerge.",
  },
  {
    number: 59,
    title: "Conclusion of the Death Match! White Pirde and Black Desire",
    type: EpisodeType.CANON,
    airDate: new Date("2005-11-22"),
    synopsis:
      "Ichigo defeats Byakuya in their final clash of wills, forcing Byakuya to accept his defeat and question his blind adherence to the law.",
  },
  {
    number: 60,
    title: "Reality of the Despair, the Assassin's Dagger is Swung",
    type: EpisodeType.CANON,
    airDate: new Date("2005-12-06"),
    synopsis:
      "Toshiro Hitsugaya and Rangiku Matsumoto discover that the Central 46 has been completely slaughtered, realizing the true mastermind is still alive.",
  },
  {
    number: 61,
    title: "Aizen Stands! Horrible Ambitions",
    type: EpisodeType.CANON,
    airDate: new Date("2005-12-13"),
    synopsis:
      "Sosuke Aizen reveals himself to be alive, explaining how he faked his death and manipulated everyone to extract the Hogyoku hidden within Rukia's soul.",
  },
  {
    number: 62,
    title: "Gather Together! Group of the Strongest Shinigami",
    type: EpisodeType.CANON,
    airDate: new Date("2005-12-20"),
    synopsis:
      "Aizen escapes to Hueco Mundo alongside Gin Ichimaru and Kaname Tosen, protected by Hollows, leaving the Soul Society to rebuild after the betrayal.",
  },
  {
    number: 63,
    title: "Rukia's Resolution, Ichigo's Feelings",
    type: EpisodeType.CANON,
    airDate: new Date("2006-01-10"),
    synopsis:
      "Before returning to the human world, Ichigo bids farewell to Rukia, who decides to stay in the Soul Society to heal and reconcile with Byakuya.",
  },

  // the-bount-arc
  {
    number: 64,
    title: "New School Term, Renji Has Come to the Human World?!",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-01-17"),
    synopsis:
      "As the new school term begins, Renji arrives in Karakura Town in gigai form, tasked with monitoring the human world for mysterious spirit entities.",
  },
  {
    number: 65,
    title: "Creeping Terror, the Second Victim",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-01-24"),
    synopsis:
      "Three modified souls—Ririn, Kurudo, and Noba—kidnap Chad, forcing Ichigo and his friends into a game of wits to save him.",
  },
  {
    number: 66,
    title: "Break Through! The Trap Hidden in the Labyrinth",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-01-31"),
    synopsis:
      "The mysterious game continues as Ichigo, Renji, Orihime, and Uryu are trapped in a museum-turned-labyrinth, forcing them to find a way out before time runs out.",
  },
  {
    number: 67,
    title: "Death Game! The Missing Classmate",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-02-07"),
    synopsis:
      "Ichigo and his friends discover that one of their classmates has been replaced by an impostor as part of the game's final challenge.",
  },
  {
    number: 68,
    title: "True Identity of the Devil, the Secret which is Revealed",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-02-14"),
    synopsis:
      "The mastermind behind the game is revealed to be Kisuke Urahara, who staged the events to test the group's combat readiness and teamwork.",
  },
  {
    number: 69,
    title: "Bount! The Ones Who Hunt Souls",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-02-14"),
    synopsis:
      "The group encounters the Bounts, an immortal clan that consumes human souls to gain eternal life, led by Yoshino Soma and Jin Kariya.",
  },
  {
    number: 70,
    title: "Rukia's Return! Revival of the Substitute Team!",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-02-21"),
    synopsis:
      "Rukia returns from the Soul Society to help Ichigo and Renji fight a pair of Bounts who use elemental Doll powers to attack them.",
  },
  {
    number: 71,
    title: "The Moment of Collision! An Evil Hand Draws Near to the Quincy",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-03-07"),
    synopsis:
      "Uryu Ishida is targeted by the Bounts, who wish to use his Quincy abilities to build a portal to the Soul Society.",
  },
  {
    number: 72,
    title: "Water Attack! Escape from the Shutdown Hospital",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-03-14"),
    synopsis:
      "Ririn, Kurudo, and Noba help the group escape a flooded hospital while fighting Bount twins Ho and Ban, who control water-based Dolls.",
  },
  {
    number: 73,
    title: "Gathering at the Place of Fortune! The Man Who Makes His Move",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-03-28"),
    synopsis:
      "The group retreats to Urahara's shop to plan their next move, while Bount leader Jin Kariya gathers his followers for a massive assault.",
  },
  {
    number: 74,
    title: "Memories of an Eternally Living Clan",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-03-28"),
    synopsis:
      "Yoshino Soma defects from the Bounts and shares the history of her tragic, immortal clan with Uryu, forming an unexpected bond.",
  },
  {
    number: 75,
    title:
      "Earth-Shattering Event at the 11th Division! The Shinigami who Rises Again",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-04-04"),
    synopsis:
      "In the Soul Society, news of the Bounts reaches the captains, prompting Kenpachi Zaraki's squad to begin investigative preparations.",
  },
  {
    number: 76,
    title: "Crashing force! Fried vs. Zangetsu",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-04-04"),
    synopsis:
      "Ichigo engages in a heavy battle against Bount member Utagawa, whose snake Doll Fried tests Ichigo's power limits.",
  },
  {
    number: 77,
    title: "Unfading Grudge! The Shinigami whom Kenpachi Killed",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-04-11"),
    synopsis:
      "Ex-Soul Reaper Maki Ichinose, who holds a deep grudge against Kenpachi Zaraki, is revealed to have allied himself with the Bounts.",
  },
  {
    number: 78,
    title: "Shocking Revelations for the Gotei 13! The Truth Buried in History",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-05-02"),
    synopsis:
      "Mayuri Kurotsuchi uncovers historical records revealing that the Bounts were created centuries ago during a failed Soul Society experiment.",
  },
  {
    number: 79,
    title: "Yoshino's Decision of Death",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-05-09"),
    synopsis:
      "Yoshino confronts Jin Kariya in a final, tragic battle, resulting in her death as Kariya uses her soul to create the Bitto pests.",
  },
  {
    number: 80,
    title: "Assault From a Formidable Enemy! A Tiny Final Line of Defense?!",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-05-16"),
    synopsis:
      "Swarms of Bitto spread across Karakura Town, draining human souls to refine a powerful elixir that amplifies the Bounts' power.",
  },
  {
    number: 81,
    title: "Hitsugaya Moves! The Attacked City",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-05-23"),
    synopsis:
      "Captain Hitsugaya is dispatched to the human world along with Rangiku, Ikkaku, and Yumichika to help Ichigo stop the Bitto threat.",
  },
  {
    number: 82,
    title: "Ichigo vs. Dalk! Appearance of the Faded Darkness",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-05-30"),
    synopsis:
      "Ichigo battles Bount member Koga Gou and his metal-controlling Doll Dalk, struggling due to his unstable inner Hollow.",
  },
  {
    number: 83,
    title: "Gray Shadow, the Secret of the Dolls",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-06-06"),
    synopsis:
      "Koga Gou reflects on his past, recalling how he reluctantly trained a young Bount named Cain, which ended in tragedy.",
  },
  {
    number: 84,
    title: "Dissension in the Substitute Team? Rukia's Betrayal",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-06-13"),
    synopsis:
      "Bount member Mabashi uses his brainwashing Doll Ritz to take control of Rukia, forcing her to attack her own friends.",
  },
  {
    number: 85,
    title: "Deadly Battle of Tears! Rukia vs. Orihime",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-06-13"),
    synopsis:
      "Orihime is forced to defend herself against the possessed Rukia, refusing to fight back while trying to find a way to save her friend.",
  },
  {
    number: 86,
    title: "Rangiku Dances! Slice the Invisible Enemy!",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-06-20"),
    synopsis:
      "Rangiku Matsumoto teams up with Chad, Noba, and Ururu to battle Bount member Sawatari and his giant rock-eating Doll Baura.",
  },
  {
    number: 87,
    title: "Byakuya is Summoned! The Gotei 13 Start to Move!",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-07-04"),
    synopsis:
      "Byakuya Kuchiki retrieves secret documents regarding the Bounts, while the other captains prepare for an imminent invasion.",
  },
  {
    number: 88,
    title: "Annihilation of the Lieutenants!? Trap in the Underground Cave",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-07-11"),
    synopsis:
      "The Soul Reaper lieutenants enter the Bounts' secret cave hideout, only to fall into a deadly trap set by the remaining Bount members.",
  },
  {
    number: 89,
    title: "Rematch?! Ishida vs. Nemu",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-07-18"),
    synopsis:
      "Nemu Kurotsuchi provides Uryu with a Quincy battle accessory, allowing him to temporarily restore his powers for the coming battle.",
  },
  {
    number: 90,
    title: "Renji Abarai, Bankai of the Soul!",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-07-25"),
    synopsis:
      "Renji fights a desperate battle in the underground cave, unleashing his Bankai to defend the injured lieutenants from Bount attacks.",
  },
  {
    number: 91,
    title: "Shinigami and Quincy, the Reviving Power",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-08-01"),
    synopsis:
      "Ichigo and an empowered Uryu arrive at the cave to support Renji, but Jin Kariya successfully opens the gateway to the Soul Society.",
  },

  // the bount assault on the soul society
  {
    number: 92,
    title: "Invasion of the Shinigami World, Again",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-08-08"),
    synopsis:
      "The Bounts successfully infiltrate the Soul Society, clashing with the gatekeepers and drawing the attention of the Gotei 13.",
  },
  {
    number: 93,
    title: "The Bount Assault! The Gotei 13's Destructive Earthquake",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-08-15"),
    synopsis:
      "Jin Kariya begins recruiting allies from the Kusajishi district of Rukongai, promising to tear down the oppressive walls of Seireitei.",
  },
  {
    number: 94,
    title: "Hitsugaya's Decision! The Clash Approaches",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-08-22"),
    synopsis:
      "Hitsugaya and his team attempt to track the Bounts in Rukongai, while Maki Ichinose continues his loyalty to Kariya.",
  },
  {
    number: 95,
    title:
      "Byakuya Takes the Field! Dance of the Wind-Splitting Cherry Blossoms",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-09-05"),
    synopsis:
      "Byakuya Kuchiki confronts Bount leader Jin Kariya in a forest, initiating a direct duel that showcases Kariya's wind-controlling powers.",
  },
  {
    number: 96,
    title: "Ichigo・Byakuya・Kariya, The Battle of the Three Extremes!",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-09-12"),
    synopsis:
      "Ichigo arrives at Byakuya's duel with Kariya, leading to a chaotic three-way confrontation that is interrupted by Ran'Tao, a mysterious figure from the past.",
  },
  {
    number: 97,
    title: "Hitsugaya Strikes! Slice the Enemy in the Middle of the Forest",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-09-19"),
    synopsis:
      "Hitsugaya confronts Bount member Koga Gou in the forest, unleashing his ice-based powers to freeze Koga's metal Doll Dalk.",
  },
  {
    number: 98,
    title: "Clash! Kenpachi Zaraki vs. Maki Ichinose",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-10-04"),
    synopsis:
      "Kenpachi Zaraki faces off against his former squad member Maki Ichinose in a battle of pure swordsmanship and spiritual pressure.",
  },
  {
    number: 99,
    title: "Shinigami Vs. Shinigami! The Uncontrollable Power",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-10-11"),
    synopsis:
      "As Kenpachi defeats Ichinose, Ran'Tao reveals to Ichigo that she was the scientist responsible for the creation of the Bounts.",
  },
  {
    number: 100,
    title: "Suì-Fēng Dies? The Last of the Special Forces",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-10-18"),
    synopsis:
      "Captain Sui-Feng is poisoned during her battle against Bount member Mabashi, forcing her to rely on her own tactical abilities to survive.",
  },
  {
    number: 101,
    title: "Mayuri's Bankai! Sawatari・Clash of the Demon",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-11-01"),
    synopsis:
      "Mayuri Kurotsuchi fights Sawatari in a battle of bizarre abilities, unleashing his Bankai, Konjiki Ashisogi Jizo, to purify Sawatari's Doll.",
  },
  {
    number: 102,
    title: "The Last Quincy! The Exploding Power",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-11-08"),
    synopsis:
      "Uryu Ishida battles Bount member Yoshi, who utilizes a fan-and-sword Doll that shifts forms to counter Uryu's arrows.",
  },
  {
    number: 103,
    title: "Ishida, Exceeding the Limits to Attack!",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-11-15"),
    synopsis:
      "Using the Quincy battle accessory, Uryu defeats Yoshi by finding a gap in her weapon shifts, but his temporary powers begin to fade.",
  },
  {
    number: 104,
    title: "10th Division's Death Struggle! The Release of Hyōrinmaru",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-11-22"),
    synopsis:
      "Hitsugaya leads a defensive force to protect the Seireitei from a coordinated Bount intrusion at the gates.",
  },
  {
    number: 105,
    title: "Kariya! Countdown to the Detonation",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-11-29"),
    synopsis:
      "Jin Kariya locates the Jokanhyo, a massive spiritual energy source beneath Seireitei, intending to detonate it and destroy the Soul Society.",
  },
  {
    number: 106,
    title: "Life and Revenge! Ishida, the Ultimate Choice",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-12-06"),
    synopsis:
      "Uryu tries to stop Kariya from detonating the Jokanhyo, but is defeated as Kariya absorbs the massive spiritual energy.",
  },
  {
    number: 107,
    title: "The Swung-Down Edge! The Moment of Ruin",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-12-13"),
    synopsis:
      "With Kariya possessing the power of the Jokanhyo, the Soul Reapers fight to disable the detonation seals scattered around Seireitei.",
  },
  {
    number: 108,
    title: "The Wailing Bount! The Last Clash",
    type: EpisodeType.FILLER,
    airDate: new Date("2006-12-20"),
    synopsis:
      "Ichigo Kurosaki engages in a final duel against Jin Kariya, utilizing his Bankai to match Kariya's wind-controlling powers and save the Soul Society.",
  },
  {
    number: 109,
    title: "Ichigo and Rukia, Thoughts in the Revolving Sky",
    type: EpisodeType.CANON,
    airDate: new Date("2007-01-04"),
    synopsis:
      "In the aftermath of the Bount crisis, Ichigo and his friends prepare to return to the human world, reflecting on their battles and bonds.",
  },

  // Arrancar: the arrivaL arc

  {
    number: 110,
    title:
      "Reopening of the Substitute Business! The Terrifying Transfer Student",
    type: EpisodeType.CANON,
    airDate: new Date("2007-01-10"),
    synopsis:
      "Ichigo returns to his duties as a Substitute Soul Reaper, but is approached by Shinji Hirako, a transfer student who reveals himself to be a Visored.",
  },
  {
    number: 111,
    title: "Shock! The True Characters of the Fathers",
    type: EpisodeType.MIXED,
    airDate: new Date("2007-01-17"),
    synopsis:
      "As Grand Fisher attacks Karakura Town as a primitive Arrancar, Isshin Kurosaki appears in Soul Reaper attire and easily defeats the beast.",
  },
  {
    number: 112,
    title: "The Commencement of War, Visored and Arrancar",
    type: EpisodeType.CANON,
    airDate: new Date("2007-01-24"),
    synopsis:
      "Shinji Hirako tries to recruit Ichigo to the Visoreds, while Uryu Ishida's father, Ryuken, offers to restore Uryu's Quincy powers under strict conditions.",
  },
  {
    number: 113,
    title: "Prelude to the Apocalypse, The Arrancar's Attack",
    type: EpisodeType.CANON,
    airDate: new Date("2007-01-31"),
    synopsis:
      "Two powerful Arrancars, Ulquiorra Cifer and Yammy Llargo, arrive in Karakura Town to assess Ichigo's power, easily overwhelming Chad and Orihime.",
  },
  {
    number: 114,
    title: "Reunion, Ichigo and Rukia and Shinigami",
    type: EpisodeType.CANON,
    airDate: new Date("2007-02-07"),
    synopsis:
      "Ichigo is saved by the arrival of a Soul Reaper strike force led by Hitsugaya and Rukia, who help push back the Arrancar threat.",
  },
  {
    number: 115,
    title: "Mission! The Shinigami Have Come",
    type: EpisodeType.CANON,
    airDate: new Date("2007-02-14"),
    synopsis:
      "The Soul Reaper strike force moves into Ichigo's house, explaining the nature of Aizen's Arrancar army, the Espada, to Ichigo and his friends.",
  },
  {
    number: 116,
    title: "The Evil Eye, Aizen Again",
    type: EpisodeType.MIXED,
    airDate: new Date("2007-02-21"),
    synopsis:
      "In Hueco Mundo, Aizen uses the Hogyoku to create new Arrancars, while Grimmjow Jaegerjaquez leads a rogue faction to launch an unauthorized attack on Karakura Town.",
  },
  {
    number: 117,
    title: "Rukia's Battle Commences! The Freezing White Blade",
    type: EpisodeType.CANON,
    airDate: new Date("2007-02-28"),
    synopsis:
      "Rukia engages in a fierce battle against Grimmjow's fraccion Di Roy, unleashing her Shikai, Sode no Shirayuki, to freeze the enemy.",
  },
  {
    number: 118,
    title: "Ikkaku's Bankai! The Power that Breaks Everything",
    type: EpisodeType.CANON,
    airDate: new Date("2007-03-07"),
    synopsis:
      "Ikkaku Madarame battles the Arrancar Edrad Liones, keeping his Bankai, Ryumon Hozukimaru, a secret from all but a few close allies.",
  },
  {
    number: 119,
    title: "Zaraki Division's Secret Story! The Lucky Men",
    type: EpisodeType.MIXED,
    airDate: new Date("2007-03-21"),
    synopsis:
      "Ikkaku recalls how he first met Kenpachi Zaraki, which inspired him to hide his Bankai so he could remain in the 11th Division forever.",
  },
  {
    number: 120,
    title: "Hitsugaya Scatters! The Broken Hyōrinmaru",
    type: EpisodeType.MIXED,
    airDate: new Date("2007-03-28"),
    synopsis:
      "Hitsugaya, Rangiku, and Renji struggle against Grimmjow's fraccion until they receive authorization to release their spiritual power limits.",
  },
  {
    number: 121,
    title: "Clash! The Person Who Protects vs. The Person Who Suffers",
    type: EpisodeType.CANON,
    airDate: new Date("2007-04-11"),
    synopsis:
      "Ichigo battles Grimmjow Jaegerjaquez, but is severely beaten due to the limits of his Bankai and the interference of his inner Hollow.",
  },
  {
    number: 122,
    title: "Visored! The Power of the Awakened",
    type: EpisodeType.CANON,
    airDate: new Date("2007-04-18"),
    synopsis:
      "Desperate to control his inner Hollow, Ichigo seeks out Shinji Hirako and the Visoreds, demanding they teach him how to control the beast.",
  },
  {
    number: 123,
    title: "Ichigo, complete Hollowfication!?",
    type: EpisodeType.CANON,
    airDate: new Date("2007-04-25"),
    synopsis:
      "Ichigo enters his inner world to battle his Hollow self, while the Visoreds take turns restraining his rampaging physical body.",
  },
  {
    number: 124,
    title: "Collision! Black Bankai and White Bankai",
    type: EpisodeType.MIXED,
    airDate: new Date("2007-05-02"),
    synopsis:
      "Ichigo confronts his inner Hollow in a fierce battle of wills and swordsmanship, ultimately asserting control over his dark power.",
  },
  {
    number: 125,
    title: "Urgent Report! Aizen's Terrifying Plan!",
    type: EpisodeType.CANON,
    airDate: new Date("2007-05-09"),
    synopsis:
      "Yamamoto contacts Hitsugaya to reveal Aizen's true goal: to create a Ouken, the Royal Key, by sacrificing Karakura Town's millions of souls.",
  },
  {
    number: 126,
    title: "Uryū vs. Ryūken! Clash of the parent-child Quincy",
    type: EpisodeType.CANON,
    airDate: new Date("2007-05-16"),
    synopsis:
      "Uryu undergoes harsh combat training under his father Ryuken, designed to push him to his absolute physical limits and restore his Quincy powers.",
  },
  {
    number: 127,
    title: "Urahara's Decision, Orihime's Thoughts",
    type: EpisodeType.CANON,
    airDate: new Date("2007-05-30"),
    synopsis:
      "Kisuke Urahara tells Orihime to stay out of the upcoming battle due to her healing abilities being targeted, leaving her feeling excluded.",
  },
  {
    number: 128,
    title: "The Nightmare Arrancar! Team Hitsugaya Moves Out",
    type: EpisodeType.FILLER,
    airDate: new Date("2007-06-06"),
    synopsis:
      "Hitsugaya's team investigates a series of strange spiritual anomalies in Karakura Town, encountering a rogue Arrancar named Patras.",
  },
  {
    number: 129,
    title:
      "The Swooping Descent of the Dark Emissary! The Propagation of Malice",
    type: EpisodeType.FILLER,
    airDate: new Date("2007-06-13"),
    synopsis:
      "Patras attempts to steal the Hogyoku from Kisuke Urahara, unaware that he is merely a pawn in Aizen's larger schemes.",
  },
  {
    number: 130,
    title: "The Invisible Enemy! Hitsugaya's Merciless Decision",
    type: EpisodeType.FILLER,
    airDate: new Date("2007-06-20"),
    synopsis:
      "Hitsugaya and his squad battle Patras and his allies, managing to defeat the invaders before they can cause widespread destruction.",
  },
  {
    number: 131,
    title: "Rangiku's Tears, the Sorrowful Parting of Brother and Sister",
    type: EpisodeType.FILLER,
    airDate: new Date("2007-06-27"),
    synopsis:
      "Rangiku helps a young soul find peace, reflecting on her own past bonds and the tragic nature of their departures.",
  },

  // Arrancar: The Hueco Mundo Sneak Entry Arc
  {
    number: 132,
    title: "Hitsugaya, Karin and Soccer Ball",
    type: EpisodeType.FILLER,
    airDate: new Date("2007-07-04"),
    synopsis:
      "Karin Kurosaki meets Toshiro Hitsugaya while playing soccer, convincing him to help her team win a match against a rival group of middle schoolers.",
  },
  {
    number: 133,
    title: "Ikkaku's Hot-Blooded Kendo Tale",
    type: EpisodeType.FILLER,
    airDate: new Date("2007-07-11"),
    synopsis:
      "Ikkaku Madarame is recruited to coach a high school Kendo club, training the students with his trademark intensity and martial values.",
  },
  {
    number: 134,
    title: "The Beautiful Patissier, Yumichika!",
    type: EpisodeType.FILLER,
    airDate: new Date("2007-07-18"),
    synopsis:
      "Yumichika Ayasegawa helps a young boy bake a special cake for his mother, demonstrating his hidden talents in culinary arts.",
  },
  {
    number: 135,
    title: "Kon is Deceived! Rangiku on the Lookout..",
    type: EpisodeType.FILLER,
    airDate: new Date("2007-07-25"),
    synopsis:
      "Kon is taken in by a young girl who names him Bostaff, unaware that a lingering Hollow is stalking her house.",
  },
  {
    number: 136,
    title: "Hueco Mundo Civil War! Ulquiorra's Death",
    type: EpisodeType.FILLER,
    airDate: new Date("2007-08-08"),
    synopsis:
      "While investigating Aizen's base, Las Noches, Ichigo's team learns of internal political conflict among the Hollow factions in Hueco Mundo.",
  },
  {
    number: 137,
    title: "Battle of Bad Faith, Aizen's Trap",
    type: EpisodeType.FILLER,
    airDate: new Date("2007-08-22"),
    synopsis:
      "Kisuke Urahara and his allies examine the coordinates of Aizen's portal, realizing the depth of the trap laid for the Soul Reapers.",
  },
  {
    number: 138,
    title: "Second Move of Hueco Mundo! Hitsugaya vs. Yammy",
    type: EpisodeType.CANON,
    airDate: new Date("2007-08-29"),
    synopsis:
      "The Espada launch a diversionary attack on Karakura Town, with Hitsugaya engaging the brute Yammy Llargo in the skies.",
  },
  {
    number: 139,
    title: "Ichigo vs. Grimmjow, 11 Second Battle!",
    type: EpisodeType.CANON,
    airDate: new Date("2007-09-05"),
    synopsis:
      "Ichigo battles Grimmjow using his new Hollow mask, but the mask breaks after only eleven seconds, putting him on the defensive.",
  },
  {
    number: 140,
    title: "Ulquiorra's Scheme, the Moment when the Sun Sets!",
    type: EpisodeType.CANON,
    airDate: new Date("2007-09-12"),
    synopsis:
      "Ulquiorra corners Orihime in a dimensional pocket, giving her an ultimatum to leave with him to Hueco Mundo or watch her friends die.",
  },
  {
    number: 141,
    title: "Goodbye..., Kurosaki",
    type: EpisodeType.MIXED,
    airDate: new Date("2007-09-19"),
    synopsis:
      "Orihime is allowed to say goodbye to one person without their knowledge, choosing to visit a sleeping Ichigo before departing for Hueco Mundo.",
  },
  {
    number: 142,
    title: "Order! Forbid Rescue of Orihime Inoue",
    type: EpisodeType.CANON,
    airDate: new Date("2007-09-26"),
    synopsis:
      "Head Captain Yamamoto declares Orihime a traitor and forbids any rescue mission, ordering Hitsugaya's team to return to the Soul Society.",
  },
  {
    number: 143,
    title: "Grimmjow Revived",
    type: EpisodeType.MIXED,
    airDate: new Date("2007-10-03"),
    synopsis:
      "Orihime heals Grimmjow's severed arm in Hueco Mundo to demonstrate her unique abilities, prompting Grimmjow to protect her from other Arrancars.",
  },
  {
    number: 144,
    title: "Ishida・Chad, the Quickening of a New Power",
    type: EpisodeType.CANON,
    airDate: new Date("2007-10-17"),
    synopsis:
      "Ichigo decides to rescue Orihime alone, but is joined by Uryu Ishida and Chad, who showcase their newly awakened abilities.",
  },
  {
    number: 145,
    title: "The Espada Gather! Aizen's Royal Assembly",
    type: EpisodeType.CANON,
    airDate: new Date("2007-10-24"),
    synopsis:
      "Ichigo, Uryu, and Chad successfully infiltrate Hueco Mundo, while Aizen holds a formal meeting with the ten Espadas to discuss the intruders.",
  },
  {
    number: 146,
    title: "Her Name is Nel! The Appearance of the Strange Arrancar",
    type: EpisodeType.MIXED,
    airDate: new Date("2007-10-31"),
    synopsis:
      "The group meets a child Arrancar named Nel Tu and her hollow guardians, who join them as they travel across the desert of Hueco Mundo.",
  },
  {
    number: 147,
    title: "Forest of Menos! The Search for the Missing Rukia",
    type: EpisodeType.FILLER,
    airDate: new Date("2007-11-07"),
    synopsis:
      "The group falls beneath the sands of Hueco Mundo into the Forest of Menos, a dangerous underground cavern swarming with Menos-class Hollows.",
  },
  {
    number: 148,
    title: "Ashido, the Shinigami Who Came from the Past",
    type: EpisodeType.FILLER,
    airDate: new Date("2007-11-14"),
    synopsis:
      "The group meets Ashido Kano, a Soul Reaper who has survived in the Forest of Menos for decades, fighting Hollows to protect his world.",
  },
  {
    number: 149,
    title: "Through the Crumbling Forest, a Million Menos",
    type: EpisodeType.FILLER,
    airDate: new Date("2007-11-21"),
    synopsis:
      "Ashido helps the group navigate the collapsing forest, sacrificing himself to stay behind and cover their escape to the surface.",
  },
  {
    number: 150,
    title: "Oath! Back Here Alive Again",
    type: EpisodeType.CANON,
    airDate: new Date("2007-11-28"),
    synopsis:
      "Ichigo and his friends reach the massive fortress of Las Noches, making a vow to return home alive together before choosing separate paths to enter.",
  },
  {
    number: 151,
    title: "The Raging Storm! Encounter with the Dancing Arrancar",
    type: EpisodeType.CANON,
    airDate: new Date("2007-12-05"),
    synopsis:
      "Ichigo battles Dordonii Alessandro Del Socaccio, a former Espada who utilizes wind-based kicks to force Ichigo into using his Hollow form.",
  },

  // Arrancar: The Fierce Fight Arc
  {
    number: 152,
    title: "Ichigo Strikes Back! This is my Bankai",
    type: EpisodeType.CANON,
    airDate: new Date("2007-12-12"),
    synopsis:
      "Ichigo defeats Dordonii in their battle, while Nel Tu reveals her hidden healing abilities by consuming and spitting back Hollow spiritual blasts.",
  },
  {
    number: 153,
    title: "The Devilish Research! Szayelaporro's Plan",
    type: EpisodeType.CANON,
    airDate: new Date("2007-12-19"),
    synopsis:
      "Rukia Kuchiki encounters the Espada Aaroniero Arruruerie, while Uryu Ishida and Pesche Guatiche face off against the 8th Espada, Szayelaporro Granz.",
  },
  {
    number: 154,
    title: "Rukia and Kaien, the Sorrowful Reunion",
    type: EpisodeType.CANON,
    airDate: new Date("2007-12-26"),
    synopsis:
      "Aaroniero removes his mask to reveal the face of Kaien Shiba, Rukia's former mentor, claiming that his soul survived and seeking her allegiance.",
  },
  {
    number: 155,
    title: "Rukia Retaliates! Release the Desperate Kidō",
    type: EpisodeType.CANON,
    airDate: new Date("2008-01-09"),
    synopsis:
      "Realizing the deception, Rukia battles Aaroniero, utilizing high-level Kidō spells to counter his copycat water-based abilities.",
  },
  {
    number: 156,
    title: "Ishida & Pesche, the United Attack of Friendship?",
    type: EpisodeType.MIXED,
    airDate: new Date("2008-01-16"),
    synopsis:
      "Uryu and Pesche try to find a weakness in Szayelaporro's research laboratory, attempting a series of chaotic and comedic tag-team attacks.",
  },
  {
    number: 157,
    title: "Ishida's Trump Card, the Cutter of Souls",
    type: EpisodeType.CANON,
    airDate: new Date("2008-01-23"),
    synopsis:
      "Uryu utilizes a specialized Quincy blade, the Seele Schneider, to establish a powerful pentagram trap to destroy Szayelaporro.",
  },
  {
    number: 158,
    title: "Right Arm of the Giant, Left Arm of the Devil",
    type: EpisodeType.CANON,
    airDate: new Date("2008-01-30"),
    synopsis:
      "Chad battles the Espada Gantenbainne Mosqueda, unlocking the true forms of both his arms to unleash massive power and achieve victory.",
  },
  {
    number: 159,
    title: "Yasutora Sado dies! Orihime's Tears",
    type: EpisodeType.CANON,
    airDate: new Date("2008-02-06"),
    synopsis:
      "After defeating Gantenbainne, Chad is ambushed and defeated by the 5th Espada Nnoitra Gilga, leaving Orihime in tears at his defeat.",
  },
  {
    number: 160,
    title: "Testament, Your Heart is Right Here...",
    type: EpisodeType.CANON,
    airDate: new Date("2008-02-13"),
    synopsis:
      "Rukia recalls Kaien Shiba's teachings about the heart existing between two people as she delivers a final, decisive strike to Aaroniero.",
  },
  {
    number: 161,
    title: "The Cruel Arrancar, Ulquiorra's Provocation",
    type: EpisodeType.MIXED,
    airDate: new Date("2008-02-20"),
    synopsis:
      "Ulquiorra confronts Ichigo, revealing that he was the one who brought Orihime to Hueco Mundo, successfully baiting Ichigo into a furious duel.",
  },
  {
    number: 162,
    title: "Szayelaporro Laughs, The Net Trapping Renji is Complete",
    type: EpisodeType.CANON,
    airDate: new Date("2008-02-27"),
    synopsis:
      "Renji Abarai arrives to help Uryu, but Szayelaporro uses his research data to disable Renji's Bankai, rendering him completely powerless.",
  },
  {
    number: 163,
    title: "Shinigami and Quincy, the Battle of Madness",
    type: EpisodeType.CANON,
    airDate: new Date("2008-03-05"),
    synopsis:
      "Renji and Uryu combine their powers in a desperate attempt to break out of Szayelaporro's laboratory before he can analyze their remaining options.",
  },
  {
    number: 164,
    title: "Ishida's Strategy, the 20-second Offense and Defense",
    type: EpisodeType.CANON,
    airDate: new Date("2008-03-12"),
    synopsis:
      "Uryu coordinates a high-speed strategy with Renji to catch Szayelaporro off-guard, but the Espada reveals his own release state, Fornicaras.",
  },
  {
    number: 165,
    title: "Murderous Intent! The Joyful Grimmjow",
    type: EpisodeType.CANON,
    airDate: new Date("2008-03-19"),
    synopsis:
      "Grimmjow rescues Orihime from her captors and brings her to heal Ichigo, eager to have a fair rematch with his rival.",
  },
  {
    number: 166,
    title: "Desperate Effort vs. Desperate Effort! The Hollowfied Ichigo",
    type: EpisodeType.CANON,
    airDate: new Date("2008-04-09"),
    synopsis:
      "Ichigo battles Grimmjow in a high-stakes, destructive duel, utilizing his Hollow mask to match the Espada's released form, Pantera.",
  },
  {
    number: 167,
    title: "The Moment of Conclusion, the End of Grimmjow",
    type: EpisodeType.CANON,
    airDate: new Date("2008-04-16"),
    synopsis:
      "Ichigo defeats Grimmjow after a grueling clash of powers, resolving to protect Orihime and Nel as he prepares to find a way out of Las Noches.",
  },

  // The New Captain Shūsuke Amagai arc (Episodes 168–189)

  {
    number: 168,
    title: "The New Captain Appears! His Name is Shūsuke Amagai",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-04-23"),
    synopsis:
      "Shūsuke Amagai is appointed as the new captain of the 3rd Division and attempts to earn the trust of his squad, starting with lieutenant Izuru Kira.",
  },
  {
    number: 169,
    title: "New Development, the Dangerous Transfer Student Appears!",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-05-07"),
    synopsis:
      "Princess Rurichiyo Kasumiōji and her two Shinigami guardians arrive in the human world, enrolling as transfer students in Ichigo's class while fleeing assassins.",
  },
  {
    number: 170,
    title:
      "Desperate Struggle Under the Moonlit Night, the Mysterious Assassin and Zanpakutō",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-05-14"),
    synopsis:
      "An assassin attacks the princess using a strange weapon called a Bakkōto, which absorbs the spiritual energy of its user to unleash immense power.",
  },
  {
    number: 171,
    title: "The Profusion of Blooming Crimson Flowers",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-05-21"),
    synopsis:
      "Ichigo and Rukia learn more about the Kasumiōji clan's internal strife and resolve to act as bodyguards to protect Princess Rurichiyo from further ambushes.",
  },
  {
    number: 172,
    title: "Kibune Goes to War! The Violent Wind that Rages",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-05-28"),
    synopsis:
      "The 3rd Division's new third-seat officer, Makoto Kibune, demonstrates ruthless efficiency during a Hollow attack, raising suspicions from Kira.",
  },
  {
    number: 173,
    title:
      "The Appearance of the Great Evil! The Darkness in the House of Kasumiōji",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-06-04"),
    synopsis:
      "Gyaku Kumoi, the man orchestrating the conspiracy to usurp the Kasumiōji clan, deploys more powerful assassins to eliminate Rurichiyo.",
  },
  {
    number: 174,
    title: "Break the Mirror's Boundary! Ichigo's Captivity",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-06-11"),
    synopsis:
      "Ichigo gets trapped inside a mirror-like barrier during an assassin attack and must find a way to shatter the dimension before Rurichiyo is captured.",
  },
  {
    number: 175,
    title: "The Revenging Assassin, Ichigo is Targeted",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-06-18"),
    synopsis:
      "An assassin seeking revenge targets Ichigo directly, showcasing the dangerous capabilities and corrupting influence of the Bakkōto weapons.",
  },
  {
    number: 176,
    title: "Mystery! The Sword-Consuming Assassin",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-06-25"),
    synopsis:
      "Ichigo faces off against a dangerous assassin whose Bakkōto literally consumes other swords and spiritual energy to amplify its own strike.",
  },
  {
    number: 177,
    title: "The Reversal of Rukia, the Rampaging Blade",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-06-25"),
    synopsis:
      "Rukia steps into the spotlight to counter an ambush, pushing her tactical abilities and Kidō skills to turn the tide against the rampaging assassins.",
  },
  {
    number: 178,
    title: "The Nightmare Which is Shown, Ichigo's Inside the Mirror",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-07-02"),
    synopsis:
      "Ichigo battles a psychological illusion inside an assassin's mirror trap, confronting internal representations of his inner Hollow and fears.",
  },
  {
    number: 179,
    title: "Confrontation?! Amagai vs. Gotei 13",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-07-09"),
    synopsis:
      "Captain Amagai proposes a joint training exercise between the divisions, raising eyebrows among the other Gotei 13 captains regarding his true motivations.",
  },
  {
    number: 180,
    title: "The Princess' Decision, the Sorrowful Bride",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-07-16"),
    synopsis:
      "Rurichiyo decides to return to Soul Society to agree to an arranged marriage in a desperate bid to stop the conflict and protect her friends.",
  },
  {
    number: 181,
    title: "The 2nd Division Sorties! Ichigo is Surrounded",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-07-23"),
    synopsis:
      "Ichigo sneaks into Soul Society to disrupt the wedding but finds himself hunted and surrounded by Suì-Fēng and the elite Stealth Force.",
  },
  {
    number: 182,
    title: "Amagai's True Strength, Zanpakutō is released!",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-07-30"),
    synopsis:
      "Captain Amagai intervenes in the chaos, releasing his Zanpakutō to stand alongside Ichigo and Rukia once he learns the truth behind the conspiracy.",
  },
  {
    number: 183,
    title: "The Darkness Which Moves! Kibune's True Colors",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-08-06"),
    synopsis:
      "Kira discovers definitive proof that his squadmate Makoto Kibune is a traitor working secretly for Kumoi and wielding a dangerous Bakkōto.",
  },
  {
    number: 184,
    title: "Kira and Kibune, Offense and Defense of 3rd Division",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-08-20"),
    synopsis:
      "A fierce battle erupts within the 3rd Division barracks as Kira fights Kibune to the death, eventually sending Kibune's corrupt weapon to the Captain-Commander.",
  },
  {
    number: 185,
    title: "Ice and Flame! Fierce Fight of Amagai vs. Hitsugaya",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-08-27"),
    synopsis:
      "As the Gotei 13 uncovers the corruption, Captain Amagai engages Captain Hitsugaya in a fiery elemental clash of blades to keep the investigation moving forward.",
  },
  {
    number: 186,
    title: "Sortie Orders! Suppress the House of Kasumiōji",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-09-03"),
    synopsis:
      "Captain-Commander Yamamoto issues official tactical orders for the Gotei 13 squads to storm and suppress the treacherous House of Kasumiōji.",
  },
  {
    number: 187,
    title: "Ichigo Rages! The Assassin's Secret",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-09-10"),
    synopsis:
      "Ichigo pushes past the compound lines in a rage, finally cornering Kumoi, only for Amagai to unexpectedly slay the conspirator himself and kidnap Rurichiyo.",
  },
  {
    number: 188,
    title: "Duel! Amagai vs. Ichigo",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-09-17"),
    synopsis:
      "Amagai reveals himself as the true mastermind who used Kumoi's plot to target Yamamoto for revenge. Ichigo steps up to stop Amagai's personal vendetta.",
  },
  {
    number: 189,
    title: "The Fallen Shinigami's Pride",
    type: EpisodeType.FILLER,
    airDate: new Date("2008-10-07"),
    synopsis:
      "Following a grueling final duel with Ichigo, Amagai learns the tragic truth behind his father's death, choosing to end his own life to preserve his pride.",
  },

  // Arrancar vs. Shinigami Arc (Episodes 190–205)
  {
    number: 190,
    title: "Hueco Mundo Chapter, Restart!",
    type: EpisodeType.MIXED,
    synopsis:
      "A recap of the climactic events leading up to Ichigo's victory over Grimmjow, followed by a transition back into the main story as a new threat approaches.",
    airDate: new Date("2008-10-14"),
  },
  {
    number: 191,
    title: "The Frightening Banquet, Szayelaporro Theater",
    type: EpisodeType.CANON,
    synopsis:
      "Nnoitra Gilga ambushes a heavily wounded Grimmjow, while Szayelaporro Granz showcases his complete control over his battle arena against Renji.",
    airDate: new Date("2008-10-21"),
  },
  {
    number: 192,
    title: "Nel's Secret, a Big-Breasted Beauty Joins the Battle!?",
    type: EpisodeType.CANON,
    synopsis:
      "As Ichigo is brutally overpowered by Nnoitra, the shock triggers Nel's transformation back into her original, adult Espada form.",
    airDate: new Date("2008-10-28"),
  },
  {
    number: 193,
    title: "Irresistible, Puppet Show of Terror",
    type: EpisodeType.MIXED,
    synopsis:
      "Nelliel engages Nnoitra to protect Ichigo, while Uryū and Renji struggle against Szayelaporro's terrifying, clone-creating capabilities.",
    airDate: new Date("2008-11-04"),
  },
  {
    number: 194,
    title: "Nelliel's Past",
    type: EpisodeType.CANON,
    synopsis:
      "A flashback reveals Nelliel's history as the former 3rd Espada and her past rivalry with Nnoitra, who engineered her betrayal and memory loss.",
    airDate: new Date("2008-11-11"),
  },
  {
    number: 195,
    title: "The Ultimate Union! Pesche's Seriousness",
    type: EpisodeType.CANON,
    synopsis:
      "Pesche and Dondochakka reveal their true identities as Nelliel's former Fracción and launch a surprise combined assault on Szayelaporro.",
    airDate: new Date("2008-11-18"),
  },
  {
    number: 196,
    title: "Joining the Battle! The Strongest Shinigami Army Appears",
    type: EpisodeType.CANON,
    synopsis:
      "With Ichigo's group on the brink of total annihilation, four powerful Soul Reaper captains arrive in Hueco Mundo as reinforcements.",
    airDate: new Date("2008-11-25"),
  },
  {
    number: 197,
    title: "Byakuya's Bankai, the Quiet Anger",
    type: EpisodeType.CANON,
    synopsis:
      "Captain Byakuya Kuchiki confronts Espada Zommari Rureaux, countering the Espada's absolute control ability with his Bankai.",
    airDate: new Date("2008-12-02"),
  },
  {
    number: 198,
    title: "The Two Scientists, Mayuri's Trap",
    type: EpisodeType.CANON,
    synopsis:
      "Captain Mayuri Kurotsuchi steps into the battle against Szayelaporro, setting up a battle of wits and scientific traps between the two twisted minds.",
    airDate: new Date("2008-12-09"),
  },
  {
    number: 199,
    title: "Holy Birth, the Resurrected Szayelaporro",
    type: EpisodeType.CANON,
    synopsis:
      "Szayelaporro uses his terrifying organ-crushing voodoo dolls, but Mayuri counters with a drug that modifies his own biological layout.",
    airDate: new Date("2008-12-16"),
  },
  {
    number: 200,
    title: "The Hardest Body!? Cut Down Nnoitra!",
    type: EpisodeType.CANON,
    synopsis:
      "Captain Kenpachi Zaraki takes over the battle against Nnoitra, finding himself thrilled by the challenge of cutting through the Espada's legendary Hierro.",
    airDate: new Date("2008-12-23"),
  },
  {
    number: 201,
    title: "Nnoitra Released! Multiplying Arms",
    type: EpisodeType.CANON,
    synopsis:
      "Nnoitra releases his Resurrección form, sprouting multiple arms to overwhelm Kenpachi in a savage, bloodthirsty display of raw power.",
    airDate: new Date("2009-01-06"),
  },
  {
    number: 202,
    title: "Fierce Fighting Conclusion! Who's the Strongest?",
    type: EpisodeType.CANON,
    synopsis:
      "Kenpachi resorts to using two hands on his sword for Kendo, dealing a decisive, fatal strike to Nnoitra to conclude their duel.",
    airDate: new Date("2009-01-13"),
  },
  {
    number: 203,
    title: "Karakura Town Gathers! Aizen Versus Shinigami",
    type: EpisodeType.CANON,
    synopsis:
      "Coyote Starrk captures Orihime and brings her back to Aizen, who traps the Captains in Hueco Mundo and departs to destroy the real Karakura Town.",
    airDate: new Date("2009-01-20"),
  },
  {
    number: 204,
    title: "Ichigo's Stomach-cutting Persuasion Strategy",
    type: EpisodeType.FILLER,
    synopsis:
      "A standalone comedic filler episode where a rogue soul causes trouble in the Living World, prompting Ichigo to use unconventional methods to resolve it.",
    airDate: new Date("2009-01-27"),
  },
  {
    number: 205,
    title: "Thump! A Kemari Tournament Filled with Hollows",
    type: EpisodeType.FILLER,
    synopsis:
      "The Shinigami and souls in the Living World participate in a chaotic Kemari tournament that gets unexpectedly crashed by a group of Hollows.",
    airDate: new Date("2009-02-03"),
  },

  // The Past Arc (Episodes 206–212)
  {
    number: 206,
    title: "The Past Chapter Begins! The Truth from 110 Years Ago",
    type: EpisodeType.MIXED,
    synopsis:
      "The story flashes back 110 years into the past of Soul Society, introducing Shinji Hirako as the Captain of the 5th Division and his newly appointed, suspicious lieutenant, Sōsuke Aizen.",
    airDate: new Date("2009-02-10"),
  },
  {
    number: 207,
    title: "12th Division's New Captain, Urahara Kisuke",
    type: EpisodeType.MIXED,
    synopsis:
      "Kisuke Urahara is nominated by Yoruichi to become the new Captain of the 12th Division, though his eccentric demeanor leaves his new lieutenant, Hiyori Sarugaki, completely unimpressed.",
    airDate: new Date("2009-02-17"),
  },
  {
    number: 208,
    title: "Aizen and the Genius Boy",
    type: EpisodeType.CANON,
    synopsis:
      "Urahara establishes the Technological Development Department and recruits a young Mayuri Kurotsuchi from the Nest of Maggots, while a young Gin Ichimaru displays his deadly genius to Aizen.",
    airDate: new Date("2009-02-24"),
  },
  {
    number: 209,
    title: "Muguruma's 9th Division, Moves Out",
    type: EpisodeType.MIXED,
    synopsis:
      "Captain Kensei Muguruma leads the 9th Division to investigate a series of mysterious disappearances in the Rukongai, crossing paths with a young, endangered Mashiro Kuna.",
    airDate: new Date("2009-03-03"),
  },
  {
    number: 210,
    title: "Hiyori dies? The Beginning of Tragedy",
    type: EpisodeType.CANON,
    synopsis:
      "When Kensei's vanguard squad vanishes entirely, an emergency investigation team of Captains and Lieutenants is sent out, while Hiyori walks directly into an ambush.",
    airDate: new Date("2009-03-10"),
  },
  {
    number: 211,
    title: "Betrayal! Aizen's Secret Maneuvers",
    type: EpisodeType.CANON,
    synopsis:
      "The rescue team finds themselves violently transformed by a strange hollowfication process, discovering too late that Aizen has been pulling the strings from the darkness.",
    airDate: new Date("2009-03-17"),
  },
  {
    number: 212,
    title: "Rescue Hirako! Aizen vs. Urahara",
    type: EpisodeType.CANON,
    synopsis:
      "Urahara and Tessai arrive to find their infected comrades on the brink of death. Trapped by Central 46 for Aizen's crimes, Urahara and Yoruichi are forced to stage a desperate escape to the Living World.",
    airDate: new Date("2009-03-24"),
  },

  // Arrancar: Decisive Battle of Karakura arc (Episodes 213–229)
  {
    number: 213,
    title: "The Soul Burial Detective, Karakuraizer is Born",
    type: EpisodeType.FILLER,
    synopsis:
      "With Ichigo and his core allies trapped away in Hueco Mundo, Kon is chosen by Kisuke Urahara to lead a superhero team tasked with defending Karakura Town.",
    airDate: new Date("2009-03-31"),
  },
  {
    number: 214,
    title: "Karakuraizer's Last Day",
    type: EpisodeType.FILLER,
    synopsis:
      "The Karakuraizer team faces a massive onslaught from a giant Hollow threat, rallying their unconventional powers to protect the town before the real battlefield shifts.",
    airDate: new Date("2009-04-07"),
  },
  {
    number: 215,
    title: "Defend Karakura Town! Entire Appearance of the Shinigami",
    type: EpisodeType.CANON,
    synopsis:
      "Sōsuke Aizen arrives in the Living World with his top three Espada, only to discover that Urahara has swapped the real Karakura Town with a replica, surrounded by the Gotei 13 Captains.",
    airDate: new Date("2009-04-14"),
  },
  {
    number: 216,
    title: "Elite! The Four Shinigami",
    type: EpisodeType.CANON,
    synopsis:
      "To prevent Aizen's forces from destroying the pillars anchoring the real Karakura Town, four elite Soul Reapers are assigned to guard them, prompting the Arrancar to send out their vanguard.",
    airDate: new Date("2009-04-21"),
  },
  {
    number: 217,
    title: "Beautiful Little Devil Charlotte",
    type: EpisodeType.CANON,
    synopsis:
      "Yumichika Ayasegawa engages in a flamboyant and highly unusual duel against Baraggan's Fracción, Charlotte Chuhlhourne, pushing Yumichika to hide his true abilities.",
    airDate: new Date("2009-04-28"),
  },
  {
    number: 218,
    title: "Kira, The Battle Within Despair",
    type: EpisodeType.CANON,
    synopsis:
      "Izuru Kira faces off against the avian Arrancar Avirama Redder, demonstrating the grim weight and psychological toll of his squad's philosophies through his Zanpakutō, Wabisuke.",
    airDate: new Date("2009-05-05"),
  },
  {
    number: 219,
    title: "Hisagi's Shikai! The Name is...",
    type: EpisodeType.CANON,
    synopsis:
      "Shūhei Hisagi struggles against the swift attacks of Findorr Calius, eventually being forced to release his Shikai, Kazeshini, despite his deep-seated dislike for its violent nature.",
    airDate: new Date("2009-05-12"),
  },
  {
    number: 220,
    title: "Ikkaku Falls! The Shinigami's Crisis",
    type: EpisodeType.CANON,
    synopsis:
      "Ikkaku Madarame stubbornly refuses to use his Bankai to defend his assigned pillar, resulting in his defeat at the hands of Choe Neng Poww and leaving the town's safety in jeopardy.",
    airDate: new Date("2009-05-19"),
  },
  {
    number: 221,
    title: "The Full Showdown! Shinigami vs. Espada",
    type: EpisodeType.CANON,
    synopsis:
      "Captain Sajin Komamura steps in to destroy Poww and secure the crumbling defense, signaling the official start of the direct clashes between the remaining Captains and the top-tier Espada.",
    airDate: new Date("2009-05-26"),
  },
  {
    number: 222,
    title: "The Most Evil Tag!? Suì-Fēng & Ōmaeda",
    type: EpisodeType.MIXED,
    synopsis:
      "Captain Suì-Fēng and her cowardly lieutenant, Marechiyo Ōmaeda, work together through a rocky dynamic to deal with the overwhelming speed and strategy of Ggio Vega.",
    airDate: new Date("2009-06-02"),
  },
  {
    number: 223,
    title: "A Miraculous Body! Ggio Releases",
    type: EpisodeType.MIXED,
    synopsis:
      "Ggio Vega releases his Resurrección form to crush the 2nd Division leaders, prompting Suì-Fēng to stop holding back and unveil her destructive Bankai, Jakuhō Raikoben.",
    airDate: new Date("2009-06-09"),
  },
  {
    number: 224,
    title: "3 vs. 1 Battle! Rangiku's Crisis",
    type: EpisodeType.CANON,
    synopsis:
      "Rangiku Matsumoto holds her own against Tier Harribel's three loyal Fracción, but the women merge their left arms to summon a terrifying construct known as Ayon.",
    airDate: new Date("2009-06-16"),
  },
  {
    number: 225,
    title: "All Lieutenants Annihilated! The Terrifying Demonic Beast",
    type: EpisodeType.CANON,
    synopsis:
      "The beast Ayon single-handedly tears through the Soul Reaper lieutenants with monstrous physical strength, forcing Captain-Commander Yamamoto to enter the fray personally.",
    airDate: new Date("2009-06-23"),
  },
  {
    number: 226,
    title: "Fierce Fighting Concludes? Towards a New Battle!",
    type: EpisodeType.CANON,
    synopsis:
      "Yamamoto effortlessly incinerates Ayon and neutralizes the remaining Fracción, clearing the path for the definitive battles against Starrk, Baraggan, and Harribel.",
    airDate: new Date("2009-06-30"),
  },
  {
    number: 227,
    title: "Wonderful Error",
    type: EpisodeType.CANON,
    synopsis:
      "A special canonical vignette set right before the start of the series, showing the interactions, lives, and perspectives of Ichigo and his classmates in Karakura Town.",
    airDate: new Date("2009-07-07"),
  },
  {
    number: 228,
    title: "Summer! Sea! Swimsuit Festival!!",
    type: EpisodeType.FILLER,
    synopsis:
      "A comedic beachside filler episode where the female Soul Reapers from the Women's Shinigami Association travel to the Living World for a vacation that gets interrupted by a Hollow.",
    airDate: new Date("2009-07-14"),
  },
  {
    number: 229,
    title: "Cry of the Soul? The Rug Shinigami is Born!",
    type: EpisodeType.FILLER,
    synopsis:
      "Ikkaku and Yumichika find themselves in an absurd predicament involving a runaway soul and a sentient rug wig, trying to wrap up the investigation quietly.",
    airDate: new Date("2009-07-21"),
  },

  // zampakuto unknown tales arc/beast sword arc

  {
    number: 230,
    title: "A New Enemy! The Materialization of Zanpakutō",
    type: EpisodeType.FILLER,
    synopsis:
      "A mysterious man named Muramasa arrives in the Seireitei and frees the spirits of the Gotei 13's Zanpakutō, causing them to turn violently against their own masters.",
    airDate: new Date("2009-07-28"),
  },
  {
    number: 231,
    title: "Byakuya, Disappearing with the Cherry Blossoms",
    type: EpisodeType.FILLER,
    synopsis:
      "As the Soul Reapers scramble to deal with their rogue weapons, Captain Byakuya Kuchiki confronts his own manifested Zanpakutō, Senbonzakura, before mysteriously vanishing.",
    airDate: new Date("2009-08-04"),
  },
  {
    number: 232,
    title: "Sode no Shirayuki vs. Rukia! Delusion of the Heart",
    type: EpisodeType.FILLER,
    synopsis:
      "Rukia is tracked down and attacked by the materialized form of Sode no Shirayuki, struggling to fight back against the beautiful but icy personification of her own sword.",
    airDate: new Date("2009-08-11"),
  },
  {
    number: 233,
    title: "Zangetsu Becomes an Enemy",
    type: EpisodeType.FILLER,
    synopsis:
      "Ichigo travels to Soul Society to assist and finds himself pulled into his inner world, only to discover that Muramasa has successfully brainwashed and materialized Zangetsu against him.",
    airDate: new Date("2009-08-18"),
  },
  {
    number: 234,
    title: "Renji Surprised?! The Two Zabimaru",
    type: EpisodeType.FILLER,
    synopsis:
      "Renji finds himself cornered by the materialized form of Zabimaru, who oddly manifests as both a playful monkey woman and a snake boy linked together by a chain.",
    airDate: new Date("2009-08-25"),
  },
  {
    number: 235,
    title: "Clash! Hisagi vs. Kazeshini",
    type: EpisodeType.FILLER,
    synopsis:
      "Shūhei Hisagi engages in a brutal showdown with Kazeshini, a dark shadow-like entity that embodies all the violent, lethal traits Hisagi actively tries to suppress.",
    airDate: new Date("2009-09-01"),
  },
  {
    number: 236,
    title: "Release! The New Getsuga Tenshō",
    type: EpisodeType.FILLER,
    synopsis:
      "Ichigo struggles intensely in his battle against Zangetsu, ultimately forcing a breakthrough to reclaim his weapon and release a devastating blow against Muramasa's illusions.",
    airDate: new Date("2009-09-08"),
  },
  {
    number: 237,
    title: "Suì-Fēng, Surround the Zanpakutō",
    type: EpisodeType.FILLER,
    synopsis:
      "Captain Suì-Fēng uses her tactical agility and elite Stealth Force members to trap and corner the materialized rogue Zanpakutō spirits roaming the Seireitei.",
    airDate: new Date("2009-09-15"),
  },
  {
    number: 238,
    title: "Friendship? Hatred? Haineko & Tobiume",
    type: EpisodeType.FILLER,
    synopsis:
      "Haineko and Tobiume get separated from the main group of rogue spirits, bickering endlessly through a rocky dynamic while being pursued by their former masters.",
    airDate: new Date("2009-09-22"),
  },
  {
    number: 239,
    title: "The Awakening Hyōrinmaru! Hitsugaya's Fierce Fight",
    type: EpisodeType.FILLER,
    synopsis:
      "Captain Hitsugaya tracks down the materialized Hyōrinmaru, who has completely lost his memories and wanders blindly as a tall, quiet man cloaked in ice.",
    airDate: new Date("2009-09-29"),
  },
  {
    number: 240,
    title: "Byakuya's Betrayal",
    type: EpisodeType.FILLER,
    synopsis:
      "To the absolute horror of the Gotei 13, Byakuya Kuchiki suddenly reappears alongside Muramasa, actively turning on his comrades to protect his family's hidden legacy.",
    airDate: new Date("2009-10-06"),
  },
  {
    number: 241,
    title: "For the Sake of Pride! Byakuya vs. Renji",
    type: EpisodeType.FILLER,
    synopsis:
      "Renji confronts his missing captain in an emotional clash of blades, demanding answers for why Byakuya has thrown his pride away to ally with Muramasa.",
    airDate: new Date("2009-10-13"),
  },
  {
    number: 242,
    title: "Shinigami and Zanpakutō, Total Sortie",
    type: EpisodeType.FILLER,
    synopsis:
      "The conflict scales up to a massive all-out war across the Seireitei as all remaining Soul Reapers deploy to neutralize the army of liberated spirits.",
    airDate: new Date("2009-10-20"),
  },
  {
    number: 243,
    title: "One-on-one! Ichigo vs. Senbonzakura",
    type: EpisodeType.FILLER,
    synopsis:
      "Ichigo steps in to intercept Byakuya's weapon, matching his Bankai speed against Senbonzakura's storms of razor-sharp cherry blossom fragments.",
    airDate: new Date("2009-10-27"),
  },
  {
    number: 244,
    title: "The long awaited... Kenpachi appears!",
    type: EpisodeType.FILLER,
    synopsis:
      "Kenpachi Zaraki crashes into the battlefield looking for a worthy fight, thrilled to test his raw physical power against the materialized spirits.",
    airDate: new Date("2009-11-03"),
  },
  {
    number: 245,
    title: "Pursue Byakuya! The Confused Gotei Divisions",
    type: EpisodeType.FILLER,
    synopsis:
      "The squads are left in complete chaos attempting to trace Byakuya's steps, while Muramasa's core plan finally begins to center on the underground chambers.",
    airDate: new Date("2009-11-10"),
  },
  {
    number: 246,
    title: "Special Mission! Rescue Captain-Commander Yamamoto!",
    type: EpisodeType.FILLER,
    synopsis:
      "An elite strike team infiltrates the rogue compound on a high-stakes mission to break through the defensive barriers and rescue Genryūsai Yamamoto.",
    airDate: new Date("2009-11-17"),
  },
  {
    number: 247,
    title: "Deceived Shinigami! The World Collapse Crisis",
    type: EpisodeType.FILLER,
    synopsis:
      "Muramasa's true intentions are laid bare: he used the Zanpakutō rebellion as a distraction to access Yamamoto's mind and break a catastrophic seal.",
    airDate: new Date("2009-11-24"),
  },
  {
    number: 248,
    title: "Dragon of Ice and Dragon of Flame! The Strongest Showdown!",
    type: EpisodeType.FILLER,
    synopsis:
      "A spectacular elemental clash unfolds in the sky as Hitsugaya's icy Hyōrinmaru faces off against the intense flames of Ryūjin Jakka.",
    airDate: new Date("2009-12-01"),
  },
  {
    number: 249,
    title: "Senbonzakura's Bankai! Offense and Defense of the Living World",
    type: EpisodeType.FILLER,
    synopsis:
      "The spillover from the conflict threatens the Living World as Senbonzakura unleashes his Bankai, forcing the nearby defenders into a tight corner.",
    airDate: new Date("2009-12-08"),
  },
  {
    number: 250,
    title: "That Man, For the Sake of the Kuchiki",
    type: EpisodeType.FILLER,
    synopsis:
      "A deep dive into history reveals the truth behind Kōga Kuchiki—Byakuya's ancestor—and the dark origin story of his relationship with Muramasa.",
    airDate: new Date("2009-12-15"),
  },
  {
    number: 251,
    title: "Dark History! The Worst Shinigami is Born",
    type: EpisodeType.FILLER,
    synopsis:
      "The historical tragedy concludes as Kōga succumbs to his own internal rage, breaking his bond with Muramasa and cementing his status as a traitor.",
    airDate: new Date("2009-12-22"),
  },
  {
    number: 252,
    title: "Byakuya, the Truth Behind his Betrayal",
    type: EpisodeType.FILLER,
    synopsis:
      "Byakuya finally reveals his endgame: he only feigned an alliance with Muramasa to personally track down, corner, and eliminate the rogue soul of Kōga Kuchiki.",
    airDate: new Date("2010-01-05"),
  },
  {
    number: 253,
    title: "Muramasa's True Identity Revealed",
    type: EpisodeType.FILLER,
    synopsis:
      "Devastated by Kōga's ultimate rejection, a mutating Muramasa loses control of his powers and transforms into a chaotic mass of unstable Hollow energy.",
    airDate: new Date("2010-01-12"),
  },
  {
    number: 254,
    title: "Byakuya and Renji, the 6th Division Returns",
    type: EpisodeType.FILLER,
    synopsis:
      "With the conspiracy unraveled, Byakuya and Renji re-establish order in the 6th Division while rallying the remaining forces for one final cleanup.",
    airDate: new Date("2010-01-19"),
  },
  {
    number: 255,
    title: "Final Chapter·Zanpakutō Unknown Tales",
    type: EpisodeType.FILLER,
    synopsis:
      "Ichigo enters a final mental duel against the tragic remains of Muramasa, bringing a definitive end to the weapon rebellion and restoring peace to the swords.",
    airDate: new Date("2010-01-26"),
  },
  {
    number: 256,
    title: "Byakuya's Anger, Collapse of the Kuchiki Family",
    type: EpisodeType.FILLER,
    synopsis:
      "The Seireitei experiences a brief period of peace until a newly mutated breed of rogue Zanpakutō spirits, known as 'Toju' (Beast Swords), begins aggressively running wild.",
    airDate: new Date("2010-02-02"),
  },
  {
    number: 257,
    title: "A New Enemy! The True Nature of the Beast Swords",
    type: EpisodeType.FILLER,
    synopsis:
      "Ichigo and Renji pursue a rampaging rogue spirit into the human world, discovering that these wild weapons have lost their minds and are acting entirely on instinct.",
    airDate: new Date("2010-02-09"),
  },
  {
    number: 258,
    title: "Stray Snake, Tortured Monkey",
    type: EpisodeType.FILLER,
    synopsis:
      "Zabimaru's humanized monkey and snake manifestations track down a rogue Toju spirit, finding themselves in a fierce fight to protect nearby civilians.",
    airDate: new Date("2010-02-16"),
  },
  {
    number: 259,
    title: "Terror! The Monster That Lurks Underground",
    type: EpisodeType.FILLER,
    synopsis:
      "An underground investigation gets underway when several lower-seat Soul Reapers disappear into the Seireitei's sewage grid, pointing to a nesting Beast Sword.",
    airDate: new Date("2010-02-23"),
  },
  {
    number: 260,
    title: "Conclusion?! Hisagi vs. Kazeshini",
    type: EpisodeType.FILLER,
    synopsis:
      "Kazeshini resurfaces and targets Hisagi once again, but their lethal encounter is cut short when they are both ambushed by a completely mutated rogue sword.",
    airDate: new Date("2010-03-02"),
  },
  {
    number: 261,
    title: "The Person with the Unknown Ability! Orihime is Targeted",
    type: EpisodeType.FILLER,
    synopsis:
      "A rogue Beast Sword manifests in Karakura Town and targets Orihime, forcing her to rely on her defensive spiritual abilities to survive the sudden ambush.",
    airDate: new Date("2010-03-09"),
  },
  {
    number: 262,
    title: "The Tragic Sword Fiend! Haineko Cries!",
    type: EpisodeType.FILLER,
    synopsis:
      "Haineko crosses paths with a physically attractive Beast Sword spirit named Narunosuke, developing deep feelings for him despite knowing his unstable state will lead to a tragedy.",
    airDate: new Date("2010-03-16"),
  },
  {
    number: 263,
    title: "Imprisonment?! Senbonzakura & Zabimaru",
    type: EpisodeType.FILLER,
    synopsis:
      "Senbonzakura and Zabimaru get trapped inside a tight barrier generated by an elusive Beast Sword, trying to work past their bickering dynamics to find a clean exit.",
    airDate: new Date("2010-03-23"),
  },
  {
    number: 264,
    title: "Battle of the Females? Katen Kyōkotsu vs. Nanao!",
    type: EpisodeType.FILLER,
    synopsis:
      "Nanao Ise spends time interacting with the eccentric, dual-natured manifestation of Katen Kyōkotsu, gaining a deeper strategic understanding of the weapon's identity.",
    airDate: new Date("2010-03-30"),
  },
  {
    number: 265,
    title: "Evolution?! The Menace of the Final Sword Fiend",
    type: EpisodeType.FILLER,
    synopsis:
      "The remnants of the wild Toju merge into a massive, unstable entity, forcing Ichigo and the combined forces of the Soul Reapers to execute a definitive final cleanup.",
    airDate: new Date("2010-04-06"),
  },

  // Arrancar: Downfall arc (Episodes 266–316)
  {
    number: 266,
    title: "Ichigo VS Ulquiorra, Restart!",
    type: EpisodeType.FILLER,
    synopsis:
      "A recap episode highlighting the intense encounters and prior clashes between Ichigo and Ulquiorra before transitioning back into their current standoff.",
    airDate: new Date("2010-04-13"),
  },
  {
    number: 267,
    title: "Connected Hearts! The Left Fist Prepared for Death!",
    type: EpisodeType.MIXED,
    synopsis:
      "Ichigo and Ulquiorra resume their high-stakes duel, while nearby, Uryū and Renji work to find an opening to break past the structural defenses of Las Noches.",
    airDate: new Date("2010-04-20"),
  },
  {
    number: 268,
    title: "Hatred and Jealousy, Orihime's Dilemma",
    type: EpisodeType.MIXED,
    synopsis:
      "Orihime finds herself mentally targeted and physically cornered by Loly and Menoly, who are driven by jealousy over Aizen's apparent special treatment of her.",
    airDate: new Date("2010-04-27"),
  },
  {
    number: 269,
    title: "Ichigo and Uryū, Bonded Back to Back",
    type: EpisodeType.CANON,
    synopsis:
      "Uryū rushes to the canopy of Las Noches to offer defensive support, standing back-to-back with Ichigo to hold off the surrounding hostile forces.",
    airDate: new Date("2010-05-04"),
  },
  {
    number: 270,
    title: "Beginning of Despair...Ichigo, the Unreachable Blade",
    type: EpisodeType.CANON,
    synopsis:
      "Ulquiorra brings Ichigo to the absolute top of the Las Noches dome and releases his Resurrección, Murciélago, showcasing a terrifying gap in absolute power.",
    airDate: new Date("2010-05-11"),
  },
  {
    number: 271,
    title: "Ichigo Dies! Orihime, the Cry of Sorrow!",
    type: EpisodeType.CANON,
    synopsis:
      "Ulquiorra fires a fatal grand blast through Ichigo's chest. Orihime's absolute despair and cries of grief trigger a monstrous, complete Hollowfication transformation in Ichigo.",
    airDate: new Date("2010-05-18"),
  },
  {
    number: 272,
    title: "Ichigo vs. Ulquiorra, Conclusion!",
    type: EpisodeType.CANON,
    synopsis:
      "The completely unhinged, wild Hollow form of Ichigo savagely dismantles Ulquiorra's final form, bringing a tragic, lingering end to their ideological battle.",
    airDate: new Date("2010-05-25"),
  },
  {
    number: 273,
    title: "Fury of the Shark! Harribel Releases",
    type: EpisodeType.CANON,
    synopsis:
      "The scene shifts back to the replica Fake Karakura Town, where Tier Harribel releases her massive water-manipulating blade form to swamp Captain Hitsugaya.",
    airDate: new Date("2010-06-01"),
  },
  {
    number: 274,
    title: "Hitsugaya, the Suicidal Frozen Heavens Hundred Flowers Funeral!",
    type: EpisodeType.MIXED,
    synopsis:
      "Pushed to his limits by Harribel's cascading tides, Hitsugaya relies on weather control to execute his highly advanced ice prison technique.",
    airDate: new Date("2010-06-08"),
  },
  {
    number: 275,
    title: "The Approaching Breath of Death, the King Who Rules Over Death!",
    type: EpisodeType.CANON,
    synopsis:
      "Baraggan Louisenbairn unveils his Resurrección, Arrogante, releasing a terrifying aura of absolute aging and decay that withers everything it touches.",
    airDate: new Date("2010-06-15"),
  },
  {
    number: 276,
    title: "One Hit Kill, Suì-Fēng, Bankai!",
    type: EpisodeType.MIXED,
    synopsis:
      "With Baraggan's lethal rot creeping closer, Suì-Fēng enlists the help of Ōmaeda to buy enough distance to anchor and fire her high-impact artillery Bankai.",
    airDate: new Date("2010-06-22"),
  },
  {
    number: 277,
    title: "Climax! Kyōraku vs. Starrk!",
    type: EpisodeType.CANON,
    synopsis:
      "Captain Shunsui Kyōraku engages in a smooth but highly tactical duel against Coyote Starrk, who finally splits his own soul to release his gunslinger form.",
    airDate: new Date("2010-06-29"),
  },
  {
    number: 278,
    title: "The Nightmare Returns...Revival of the Espada",
    type: EpisodeType.CANON,
    synopsis:
      "Just as the Soul Reapers think they have gained the upper hand against the top three Espada, the massive Wonderweiss arrives to disrupt the tactical layout.",
    airDate: new Date("2010-07-06"),
  },
  {
    number: 279,
    title: "Hirako and Aizen...the Reunion of Fate!",
    type: EpisodeType.CANON,
    synopsis:
      "The Visored faction arrives dramatically on the battlefield, picking sides to settle their century-old score directly against Aizen's commanding inner circle.",
    airDate: new Date("2010-07-13"),
  },
  {
    number: 280,
    title: "Hisagi and Tōsen, the Moment of Parting",
    type: EpisodeType.CANON,
    synopsis:
      "Shūhei Hisagi and Captain Komamura stand together to confront Kaname Tōsen, heartbroken by the complete biological modifications Tōsen accepted from Aizen.",
    airDate: new Date("2010-07-20"),
  },
  {
    number: 281,
    title: "Crown of Lies, Baraggan's Grudge",
    type: EpisodeType.CANON,
    synopsis:
      "Hachigen Ushōda collaborates with Suì-Fēng, utilizing high-level tactical barrier placement to turn Baraggan's own decaying power back inside his hollow skeletal core.",
    airDate: new Date("2010-07-27"),
  },
  {
    number: 282,
    title: "Power of the Soul! Los Lobos, Attack!",
    type: EpisodeType.CANON,
    synopsis:
      "Starrk deploys his dangerous pack of spiritual wolves against the Visored defenders Love and Rose, pressing them hard with explosive, continuous detonations.",
    airDate: new Date("2010-08-03"),
  },
  {
    number: 283,
    title: "Starrk, the Lone Battle",
    type: EpisodeType.CANON,
    synopsis:
      "Kyōraku slips back out from the shadows to utilize the lethal, reality-bending rules of his Shikai games, dealing a decisive closing strike to the lonely 1st Espada.",
    airDate: new Date("2010-08-10"),
  },
  {
    number: 284,
    title: "Chain of Sacrifice...Harribel's Past",
    type: EpisodeType.MIXED,
    synopsis:
      "A detailed flashback outlines Tier Harribel's history as a shark-like Vasto Lorde in Hueco Mundo, explaining her protective dynamic over her loyal Fracción.",
    airDate: new Date("2010-08-17"),
  },
  {
    number: 285,
    title: "The Hundred-Year Grudge...Hiyori's Revenge",
    type: EpisodeType.MIXED,
    synopsis:
      "Aizen ruthlessly strikes down Harribel himself as obsolete. Meanwhile, Gin Ichimaru uses a psychological taunt to bait a furious Hiyori into a reckless forward charge.",
    airDate: new Date("2010-08-24"),
  },
  {
    number: 286,
    title: "Protect Karakura Town! Ichigo, towards the Real World!",
    type: EpisodeType.CANON,
    synopsis:
      "With the help of Unohana clearing a pathway through the Garganta, a recovered Ichigo rushes back into the Living World to assist the exhausted main line.",
    airDate: new Date("2010-08-31"),
  },
  {
    number: 287,
    title: "Side Story...Ichigo and the Magic Lamp",
    type: EpisodeType.FILLER,
    synopsis:
      "An alternate-universe comedic dream sequence where the main characters are recast into an Arabian Nights-inspired fantasy tale involving a magic lamp.",
    airDate: new Date("2010-09-07"),
  },
  {
    number: 288,
    title: "The Final Trump Card! Ichigo, Towards the Decisive Battle",
    type: EpisodeType.MIXED,
    synopsis:
      "While running through the void, Unohana evaluates Ichigo's massive remaining Captain-level spiritual reserve, validating him as the key weapon against Aizen.",
    airDate: new Date("2010-09-14"),
  },
  {
    number: 289,
    title: "Byakuya vs. Kenpachi?! The Melee Commences",
    type: EpisodeType.CANON,
    synopsis:
      "Back in Hueco Mundo, Byakuya and Kenpachi bicker endlessly while simultaneously crushing the massive multi-legged form of Yammy Llargo.",
    airDate: new Date("2010-09-21"),
  },
  {
    number: 290,
    title: "For the Sake of Justice?! The Man Who Deserted the Shinigami",
    type: EpisodeType.MIXED,
    synopsis:
      "Tōsen completes his full insectoid Hollowfication mask transformation, claiming that his newly gained literal vision allows him to see the ultimate path to true justice.",
    airDate: new Date("2010-09-28"),
  },
  {
    number: 291,
    title: "Desperate Struggle with Aizen! Hirako, Shikai!",
    type: EpisodeType.MIXED,
    synopsis:
      "Shinji Hirako releases his inverted Zanpakutō, Sakanade, to completely reverse Aizen's sensory orientation, giving the allied group a temporary combat advantage.",
    airDate: new Date("2010-10-05"),
  },
  {
    number: 292,
    title: "All Out War! Aizen vs. Shinigami",
    type: EpisodeType.CANON,
    synopsis:
      "The Captains and Visored seamlessly coordinate their ultimate physical strikes and elemental barriers in an attempt to lock down and overwhelm Aizen.",
    airDate: new Date("2010-10-12"),
  },
  {
    number: 293,
    title: "Hitsugaya, Enraged! Blade of Hatred!",
    type: EpisodeType.CANON,
    synopsis:
      "Aizen turns Kyōka Suigetsu's absolute hypnosis on the defenders, cruelly tricking a charging Hitsugaya into stabbing Momo Hinamori instead of him.",
    airDate: new Date("2010-10-19"),
  },
  {
    number: 294,
    title: "Impossible to Attack? The Sealed Genryūsai!",
    type: EpisodeType.CANON,
    synopsis:
      "Yamamoto steps up to incinerate the arena, but Wonderweiss' specific purpose is revealed: he absorbs and seals the flames of Ryūjin Jakka within his own shell.",
    airDate: new Date("2010-10-26"),
  },
  {
    number: 295,
    title: "It's All A Trap...Engineered Bonds!",
    type: EpisodeType.MIXED,
    synopsis:
      "Aizen systematically breaks down Ichigo's psychology, revealing that he has personally engineered, monitored, and steered every single major duel in Ichigo's life.",
    airDate: new Date("2010-11-02"),
  },
  {
    number: 296,
    title: "The Shocking Truth...The Mysterious Power Within Ichigo!",
    type: EpisodeType.MIXED,
    synopsis:
      "Isshin Kurosaki crashes onto the scene in full Shinigami gear to block Aizen, providing a much-needed mental and physical break for his completely stunned son.",
    airDate: new Date("2010-11-09"),
  },
  {
    number: 297,
    title: "The Extending Blade?! Ichigo vs. Gin!",
    type: EpisodeType.CANON,
    synopsis:
      "While Isshin battles a transforming Aizen, Ichigo matches blade speed against Gin Ichimaru, who reveals the terrifying length and speed of his Kamishini no Yari.",
    airDate: new Date("2010-11-16"),
  },
  {
    number: 298,
    title: "Film! Festival! Shinigami Film Festival!",
    type: EpisodeType.FILLER,
    synopsis:
      "A special standalone comedic filler episode highlighting the Gotei 13 squads attempting to script, shoot, and direct their own movies for a grand festival.",
    airDate: new Date("2010-11-23"),
  },
  {
    number: 299,
    title: "Theatre Opening Commemoration! Hell Chapter・Prologue",
    type: EpisodeType.FILLER,
    synopsis:
      "A tie-in promotional episode that serves as the narrative prologue setting the scene for the theatrical release of the movie *Bleach: Hell Verse*.",
    airDate: new Date("2010-11-30"),
  },
  {
    number: 300,
    title: "Urahara Appears! Stop Aizen!",
    type: EpisodeType.CANON,
    synopsis:
      "Kisuke Urahara enters the battlefield alongside Yoruichi, utilizing complex high-level containment seals and Kido blasts to compromise Aizen's armored Chrysalis state.",
    airDate: new Date("2010-12-07"),
  },
  {
    number: 301,
    title: "Ichigo Loses His Fighting Spirit!? Gin's Expectation!",
    type: EpisodeType.CANON,
    synopsis:
      "Observing Aizen effortlessly transcend past Shinigami limits via the Hōgyoku, Ichigo begins to panic and lose his resolve, drawing sharp criticism from Gin.",
    airDate: new Date("2010-12-14"),
  },
  {
    number: 302,
    title: "The Final Getsuga Tenshō!? Ichigo's Training!",
    type: EpisodeType.CANON,
    synopsis:
      "Aizen and Gin depart for the real, dormant Karakura Town. Isshin drags Ichigo into the localized time distortion of the Dangai to teach him the ultimate, final technique.",
    airDate: new Date("2010-12-21"),
  },
  {
    number: 303,
    title: "Real World and Shinigami! The New Year Special!",
    type: EpisodeType.FILLER,
    synopsis:
      "A celebratory, festive standalone New Year's filler sequence focusing on comedic misadventures and standard interactions between the groups.",
    airDate: new Date("2011-01-04"),
  },
  {
    number: 304,
    title: "Gaiden Again! This Time's Enemy Is A Monster?",
    type: EpisodeType.FILLER,
    synopsis:
      "An alternate-universe fantasy filler sequence where the characters are trapped inside an elaborate horror-themed fairy tale mansion infested with monsters.",
    airDate: new Date("2011-01-11"),
  },
  {
    number: 305,
    title: "Delusion Roars! Hisagi, Towards the Hot Springs Inn!",
    type: EpisodeType.FILLER,
    synopsis:
      "A comedic focus on Shūhei Hisagi and his wild romantic delusions regarding Rangiku Matsumoto during a brief downtime assignment at a hot springs inn.",
    airDate: new Date("2011-01-18"),
  },
  {
    number: 306,
    title: "For the Sake of Protecting! Ichigo vs. Tensa Zangetsu!",
    type: EpisodeType.CANON,
    synopsis:
      "Inside his inner world, a young Tensa Zangetsu collaborates with Ichigo's inner White Hollow to test Ichigo's emotional willingness to accept the cost of the final move.",
    airDate: new Date("2011-01-25"),
  },
  {
    number: 307,
    title: "Emergency Situation! Aizen, New Evolution!",
    type: EpisodeType.CANON,
    synopsis:
      "In the human world, Tatsuki and Ichigo's remaining classmates flee a terrifying, multi-winged evolved Aizen, who toys with them until Gin makes a sudden, shocking move.",
    airDate: new Date("2011-02-01"),
  },
  {
    number: 308,
    title: "Goodbye...Rangiku",
    type: EpisodeType.CANON,
    synopsis:
      "Gin's true multi-decade deception is unveiled: he stabs Aizen and steals the Hōgyoku to save Rangiku, only for a mutating Aizen to violently cut him down.",
    airDate: new Date("2011-02-08"),
  },
  {
    number: 309,
    title: "Fierce Fighting Conclusion! Release, the Final Getsuga Tenshō!",
    type: EpisodeType.CANON,
    synopsis:
      "An older, vastly strengthened Ichigo steps out of the Dangai and completely overpowers Aizen, unleashing the reality-severing black blade of Mugetsu.",
    airDate: new Date("2011-02-15"),
  },
  {
    number: 310,
    title: "Ichigo's Resolution! The Price of the Fierce Battle",
    type: EpisodeType.MIXED,
    synopsis:
      "Urahara's custom sealing seal successfully activates to capture a weakened Aizen. In the quiet aftermath, Ichigo feels his personal spiritual pressure beginning to rapidly fade away.",
    airDate: new Date("2011-02-22"),
  },
  {
    number: 311,
    title: "The Soul Detective ・ Karakuraizer Takes Off Again!",
    type: EpisodeType.FILLER,
    synopsis:
      "A brief, lighthearted return to the superhero format featuring Kon and the Karakuraizer crew cleaning up loose spiritual anomalies around town.",
    airDate: new Date("2011-03-01"),
  },
  {
    number: 312,
    title: "Inauguration! The Brand New 2nd Division Captain!",
    type: EpisodeType.FILLER,
    synopsis:
      "A comedic focus on Marechiyo Ōmaeda finding himself caught up in an absurd series of misunderstandings regarding his status and rank within the division.",
    airDate: new Date("2011-03-08"),
  },
  {
    number: 313,
    title: "The Man Who Risks His Life in the 11th Division!",
    type: EpisodeType.FILLER,
    synopsis:
      "An inspirational focus on a dedicated lower-seat squad member in Squad 11 trying to prove his combat worth to his brutal, respect-driven peers.",
    airDate: new Date("2011-03-15"),
  },
  {
    number: 314,
    title: "Kon is Seen! Secret of a Beautiful Office Lady",
    type: EpisodeType.FILLER,
    synopsis:
      "Kon runs away and gets adopted by a kind, glamorous office worker, trying his hardest to hide his stuffed animal nature to maintain his cozy situation.",
    airDate: new Date("2011-03-22"),
  },
  {
    number: 315,
    title: "Yachiru's Friend! The Shinigami of Justice Appears!",
    type: EpisodeType.FILLER,
    synopsis:
      "Yachiru Kusajishi runs into a gentle, justice-seeking rogue Soul Reaper, helping him clear his name and resolve a past misunderstanding within the squads.",
    airDate: new Date("2011-03-29"),
  },
  {
    number: 316,
    title: "Tōshirō Hitsugaya's Holiday!",
    type: EpisodeType.FILLER,
    synopsis:
      "Hitsugaya takes a formal day off to visit an elderly grandmother in the Human World, getting briefly dragged into a local family's lighthearted issues.",
    airDate: new Date("2011-04-05"),
  },

  // Gotei 13 Invading Army Arc (Episodes 317–342)
  {
    number: 317,
    title: "Unusual Incident in Seireitei?! Gotei 13 Invading Army Arc!",
    type: EpisodeType.FILLER,
    synopsis:
      "Ichigo and Rukia investigate a strange distortion in the Dangai precipice world, while a massive conspiracy unfolds in the Seireitei as Soul Reapers begin mysteriously disappearing.",
    airDate: new Date("2011-04-12"),
  },
  {
    number: 318,
    title: "Renji vs. Rukia?! Battle With Comrades!",
    type: EpisodeType.FILLER,
    synopsis:
      "Ichigo is suddenly branded a criminal by the Seireitei. As he flees, he is shocked to find clones of Rukia and Renji attacking him without mercy.",
    airDate: new Date("2011-04-19"),
  },
  {
    number: 319,
    title: "Ichigo's Capture Net! Escape From Soul Society!",
    type: EpisodeType.FILLER,
    synopsis:
      "With the help of a mysterious, fugitive scientist named Nozomi Kujō, Ichigo evades an elaborate capture net set up by the rogue Gotei 13 clone units.",
    airDate: new Date("2011-04-26"),
  },
  {
    number: 320,
    title: "Gotei 13, Gathering in the Real World!",
    type: EpisodeType.FILLER,
    synopsis:
      "The real, uncorrupted members of the Gotei 13 retreat to the Living World, setting up a temporary command base at Urahara's shop to plan a counter-offensive.",
    airDate: new Date("2011-05-03"),
  },
  {
    number: 321,
    title: "Showdown of Mutual Self, Ikkaku vs. Ikkaku!",
    type: EpisodeType.FILLER,
    synopsis:
      "The real Soul Reapers launch an infiltration to reclaim Seireitei, leading to a brutal, pride-driven duel between Ikkaku Madarame and his own clone replica.",
    airDate: new Date("2011-05-10"),
  },
  {
    number: 322,
    title: "Clash! Rukia vs. Rukia!",
    type: EpisodeType.FILLER,
    synopsis:
      "Rukia confronts her clone double, Reigai-Rukia, in a tactical elemental struggle of ice and Kidō spells, testing her mental resolve.",
    airDate: new Date("2011-05-17"),
  },
  {
    number: 323,
    title: "Protect Ichigo! Nozomi's Determination",
    type: EpisodeType.FILLER,
    synopsis:
      "As Ichigo struggles with his rapidly depleting spiritual pressure, Nozomi steps up to protect him, revealing her unique ability to absorb and channel spiritual attacks.",
    airDate: new Date("2011-05-24"),
  },
  {
    number: 324,
    title: "Recapture Seireitei! The Captains Move!",
    type: EpisodeType.FILLER,
    synopsis:
      "The remaining real Captains join the front lines in Soul Society, unleashing their heavy-hitting abilities to break past the clone army guards.",
    airDate: new Date("2011-05-31"),
  },
  {
    number: 325,
    title: "For the Sake of the Believers! Byakuya vs. Hitsugaya!",
    type: EpisodeType.FILLER,
    synopsis:
      "A high-stakes tactical misunderstanding pits clone variations of Byakuya and Hitsugaya against the real defenders in a destructive display of Bankai powers.",
    airDate: new Date("2011-06-07"),
  },
  {
    number: 326,
    title: "The Two Hinamoris, Hitsugaya's Resolution",
    type: EpisodeType.FILLER,
    synopsis:
      "Hitsugaya finds himself in a psychological trap when he is forced to determine which Momo Hinamori is the real one and which is the hostile clone.",
    airDate: new Date("2011-06-14"),
  },
  {
    number: 327,
    title: "Pride of the Kuchiki Family! Byakuya vs. Byakuya!",
    type: EpisodeType.FILLER,
    synopsis:
      "Byakuya Kuchiki engages his clone replica, staging a masterclass of Senbonzakura strategies to prove that a clone can never replicate true artistic sword pride.",
    airDate: new Date("2011-06-21"),
  },
  {
    number: 328,
    title: "Defeat Kagerōza! Shinigami, All-Out War!",
    type: EpisodeType.FILLER,
    synopsis:
      "The mastermind behind the entire incident, Kagerōza Inaba, is cornered by the combined forces of the Soul Reapers as his reality-warping Zanpakutō powers are exposed.",
    airDate: new Date("2011-06-28"),
  },
  {
    number: 329,
    title: "The Forbidden Research...Nozomi's Hidden Secret!",
    type: EpisodeType.FILLER,
    synopsis:
      "Urahara uncovers the dark history of Kagerōza's research, revealing that both Kagerōza and Nozomi were originally split from the soul of a single, brilliant scientist.",
    airDate: new Date("2011-07-05"),
  },
  {
    number: 330,
    title: "I Want to Live...! Nozomi's Zanpakutō",
    type: EpisodeType.FILLER,
    synopsis:
      "Rallying her emotional resolve to survive and defend her friends, Nozomi successfully awakens her own unique, light-absorbing Zanpakutō, Arazome Shigure.",
    airDate: new Date("2011-07-12"),
  },
  {
    number: 331,
    title: "For the Sake of Fighting! The Awakening Nozomi!",
    type: EpisodeType.FILLER,
    synopsis:
      "Nozomi joins Ichigo on the battlefield, using her newly awakened blade to turn Kagerōza's overwhelming spatial-manipulation attacks right back at him.",
    airDate: new Date("2011-07-19"),
  },
  {
    number: 332,
    title: "The Most Evil Reigai, Appears in the Real World!",
    type: EpisodeType.FILLER,
    synopsis:
      "Kagerōza escalates the conflict by unleashing his final wave of highly optimized clone Captains directly into Karakura Town to reclaim Nozomi.",
    airDate: new Date("2011-07-26"),
  },
  {
    number: 333,
    title: "Destroy Nozomi?! Genryūsai's Decision",
    type: EpisodeType.FILLER,
    synopsis:
      "Recognizing that Kagerōza's ultimate fusion plan will cause a total collapse of reality, Captain-Commander Yamamoto considers a grim executive order to eliminate Nozomi.",
    airDate: new Date("2011-08-02"),
  },
  {
    number: 334,
    title: "The Depleting Reiatsu! Ichigo, Death Struggle of the Soul",
    type: EpisodeType.FILLER,
    synopsis:
      "Ichigo pushes his failing, unstable spiritual pressure to the absolute absolute limit to intercept Kagerōza, but his hollow powers violently collapse mid-fight.",
    airDate: new Date("2011-08-09"),
  },
  {
    number: 335,
    title: "Hiding in the Dangai? Ichigo is Alone?!",
    type: EpisodeType.FILLER,
    synopsis:
      "Following his defeat, Ichigo finds himself trapped alone inside the spatial current of the Dangai, fighting to pull his shattered spirit back together.",
    airDate: new Date("2011-08-16"),
  },
  {
    number: 336,
    title:
      "Pursue Kagerōza! Technological Development Department, Infiltration!",
    type: EpisodeType.FILLER,
    synopsis:
      "An elite breakout team coordinates a final, desperate infiltration into Kagerōza's laboratory core to disrupt the synchronization process before it finishes.",
    airDate: new Date("2011-08-23"),
  },
  {
    number: 337,
    title: "The Developer of the Modified Souls",
    type: EpisodeType.FILLER,
    synopsis:
      "Kagerōza and Nozomi are forcefully fused back into their original persona: Ōuko Yushima. Yushima awakens with immense power, easily neutralizing the strike team.",
    airDate: new Date("2011-08-30"),
  },
  {
    number: 338,
    title: "Kon's Thoughts, Nozomi's Thoughts",
    type: EpisodeType.FILLER,
    synopsis:
      "Kon stages a highly emotional attempt to appeal directly to Nozomi's suppressed consciousness within Yushima's fused, destructive physical body.",
    airDate: new Date("2011-09-06"),
  },
  {
    number: 339,
    title: "Protect Ichigo! The Bonds of Friends!",
    type: EpisodeType.FILLER,
    synopsis:
      "Ichigo miraculously returns to the battlefield with unstable, flickering powers. His friends and the real Gotei 13 members form a protective wall to buy him an opening.",
    airDate: new Date("2011-09-13"),
  },
  {
    number: 340,
    title: "Reigai vs. Original, The Fierce Fighting for Gambled Pride!",
    type: EpisodeType.FILLER,
    synopsis:
      "The definitive, chaotic showdown peaks as the remaining real Captains push past their injuries to completely annihilate their clone counterparts once and for all.",
    airDate: new Date("2011-09-20"),
  },
  {
    number: 341,
    title: "Invading Army Arc, Final Conclusion!",
    type: EpisodeType.FILLER,
    synopsis:
      "Ichigo delivers a final strike that fractures Yushima's configuration. Nozomi successfully reclaims temporary internal control, choosing to fade away peacefully to stop the weapon forever.",
    airDate: new Date("2011-09-27"),
  },
  {
    number: 342,
    title: "Thank You",
    type: EpisodeType.MIXED,
    synopsis:
      "In this emotional transitional episode, Ichigo spends his last remaining days of fading spiritual awareness hanging out with Rukia around town before his powers completely disappear.",
    airDate: new Date("2011-10-04"),
  },

  // The Lost Substitute Shinigami Arc (Episodes 343–366)

  {
    number: 343,
    title:
      "3rd Year High School Student! Dressed Up, and a New Chapter Begins!",
    type: EpisodeType.MIXED,
    synopsis:
      "Seventeen months after losing his Soul Reaper powers, Ichigo is a third-year high school student adjusting to normal civilian life, until a mysterious man named Kūgo Ginjō approaches him.",
    airDate: new Date("2011-10-11"),
  },
  {
    number: 344,
    title: "A Dispute in School?! Ichigo and Uryū, Fight Together!",
    type: EpisodeType.CANON,
    synopsis:
      "Ichigo deals with a gang of local ruffians targeting him at school, while Uryū senses a strange spiritual presence lingering around town and steps in to investigate.",
    airDate: new Date("2011-10-18"),
  },
  {
    number: 345,
    title: "Uryū is Attacked, A Threat Draws Near the Friends!",
    type: EpisodeType.MIXED,
    synopsis:
      "Uryū is violently ambushed and severely wounded by an unknown culprit, landing him in the hospital and sending a wave of panic and paranoia through Ichigo's circle of friends.",
    airDate: new Date("2011-10-25"),
  },
  {
    number: 346,
    title: "The Fullbring User·Kūgo Ginjō",
    type: EpisodeType.CANON,
    synopsis:
      "Ginjō introduces Ichigo to Xcution, a secret society of humans possessing 'Fullbring' powers derived from Hollow energy, who offer to help Ichigo restore his lost Soul Reaper abilities.",
    airDate: new Date("2011-11-01"),
  },
  {
    number: 347,
    title: "A Creeping Danger in the Kurosaki Family?! Ichigo's Confusion!",
    type: EpisodeType.MIXED,
    synopsis:
      "Ichigo struggles internally with his choice to trust Xcution, while subtle anomalies start creeping closer to his home, putting his family's daily life at risk.",
    airDate: new Date("2011-11-08"),
  },
  {
    number: 348,
    title: "Power of the Substitute Badge, Ichigo's 'Pride'!",
    type: EpisodeType.CANON,
    synopsis:
      "Under Ginjō's guidance, Ichigo begins his training to tap into his own Fullbring energy, choosing to anchor his power within his old Substitute Shinigami badge.",
    airDate: new Date("2011-11-15"),
  },
  {
    number: 349,
    title: "Next Target, The Devil's Hand Aims at Orihime!",
    type: EpisodeType.CANON,
    synopsis:
      "An erratic Fullbring user named Shūkurō Tsukishima makes his presence known, setting his sights directly on Orihime to draw out Ichigo and Xcution.",
    airDate: new Date("2011-11-22"),
  },
  {
    number: 350,
    title:
      "The Man Who Killed A Shinigami Substitute?! Tsukishima Makes His Move",
    type: EpisodeType.CANON,
    synopsis:
      "Tsukishima corners Orihime and slashes her with his unique bookmark blade, 'Book of the End', leaving her oddly confused without any visible physical wounds.",
    airDate: new Date("2011-11-29"),
  },
  {
    number: 351,
    title: "Fullbring, The Detested Power!",
    type: EpisodeType.MIXED,
    synopsis:
      "Ichigo escalates his combat training inside a localized game dimension created by Riruka Dokugamine, pushing his spiritual focus to achieve a raw form for his Fullbring armor.",
    airDate: new Date("2011-12-06"),
  },
  {
    number: 352,
    title: "Tsukishima Attacks! The Training Has Been Thwarted",
    type: EpisodeType.CANON,
    synopsis:
      "Tsukishima abruptly breaches Xcution's underground sanctuary, disrupting Ichigo's focus and initiating a destructive skirmish within the training quarters.",
    airDate: new Date("2011-12-13"),
  },
  {
    number: 353,
    title: "Ichigo, Mastering the Fullbring!",
    type: EpisodeType.CANON,
    synopsis:
      "Ginjō takes Ichigo to a secondary compound to finalize his training, pushing Ichigo to complete the evolution of his full clad-type Fullbring armor form.",
    airDate: new Date("2011-12-20"),
  },
  {
    number: 354,
    title: "Ichigo vs. Ginjō! To the Game's Space",
    type: EpisodeType.CANON,
    synopsis:
      "Ichigo tests his newly completed combat capabilities in an all-out mock duel against Ginjō inside a miniature digitized arena generated by Yukio.",
    airDate: new Date("2011-12-27"),
  },
  {
    number: 355,
    title: "The Shinigami Enter Battle! Seireitei Also Has a New Year Special!",
    type: EpisodeType.FILLER,
    synopsis:
      "A standalone festive New Year's filler episode taking a comedic break from the main plot to check in on the daily routines of the Gotei 13 squads in the Seireitei.",
    airDate: new Date("2012-01-10"),
  },
  {
    number: 356,
    title: "Foe or Friend?! Ginjō's Unseen Heart!",
    type: EpisodeType.CANON,
    synopsis:
      "Ichigo returns to the surface world looking for validation, only to find that Tsukishima has already infiltrated his core social circle through subtle psychological tricks.",
    airDate: new Date("2012-01-17"),
  },
  {
    number: 357,
    title: "Creeping Menace...Tsukishima's Ability!",
    type: EpisodeType.MIXED,
    synopsis:
      "Ichigo is horrified to discover that Chad and Orihime's past memories have been completely rewritten by Tsukishima, causing them to treat the villain as a lifelong, cherished friend.",
    airDate: new Date("2012-01-24"),
  },
  {
    number: 358,
    title: "Clash?! Xcution Attacks Ginjō",
    type: EpisodeType.CANON,
    synopsis:
      "Driven to the brink of panic by his altered friends, Ichigo flees with Ginjō, only to find that the remaining Xcution members have also fallen under Tsukishima's spell.",
    airDate: new Date("2012-01-31"),
  },
  {
    number: 359,
    title: "The Sorrowful Battle! Ichigo vs. Sado & Orihime!",
    type: EpisodeType.CANON,
    synopsis:
      "Trapped at Tsukishima's mansion, a heartbroken Ichigo is forced into a defensive struggle against Chad and Orihime, who are desperately trying to protect the villain.",
    airDate: new Date("2012-02-07"),
  },
  {
    number: 360,
    title: "Ichigo vs Uryū?! Who is the Traitor?!",
    type: EpisodeType.CANON,
    synopsis:
      "A recovered Uryū arrives on the scene to reveal the real mastermind: Ginjō has been pulling the strings all along, turning on Ichigo to violently siphon his completed Fullbring.",
    airDate: new Date("2012-02-14"),
  },
  {
    number: 361,
    title: "A New Appearance! Meet the Gotei 13!",
    type: EpisodeType.CANON,
    synopsis:
      "As Ichigo falls into complete despair, a doorway opens and Rukia impales him with a special reishi sword, backed by a vanguard of elite Soul Reaper Captains.",
    airDate: new Date("2012-02-21"),
  },
  {
    number: 362,
    title: "Revival! Substitute Shinigami･Ichigo Kurosaki!",
    type: EpisodeType.CANON,
    synopsis:
      "Infused with the combined spiritual energies of the Gotei 13 elite, Ichigo breaks through his human limitations to fully restore his true, augmented Soul Reaper powers.",
    airDate: new Date("2012-02-28"),
  },
  {
    number: 363,
    title: "Fierce Fight! Shinigami vs. XCUTION!",
    type: EpisodeType.CANON,
    synopsis:
      "Ginjō distributes Ichigo's stolen energy to upgrade the Xcution members, prompting Yukio to split the battlefield into distinct digital arenas for a series of one-on-one duels.",
    airDate: new Date("2012-03-06"),
  },
  {
    number: 364,
    title: "Desperate Struggle!? Byakuya's Troubled Memories",
    type: EpisodeType.CANON,
    synopsis:
      "Byakuya Kuchiki engages Tsukishima in a high-stakes duel, systematically working past the villain's attempt to edit and exploit Byakuya's personal history and combat records.",
    airDate: new Date("2012-03-13"),
  },
  {
    number: 365,
    title: "Ichigo vs. Ginjō! The Secret of the Substitute Badge",
    type: EpisodeType.CANON,
    synopsis:
      "Ichigo engages Ginjō in a heavy elemental clash, as Ginjō reveals the dark corporate surveillance history and hidden suppressive purposes of the Substitute Shinigami badge.",
    airDate: new Date("2012-03-20"),
  },
  {
    number: 366,
    title: "Changing History, Unchanging Heart",
    type: EpisodeType.CANON,
    synopsis:
      "Ichigo rejects Ginjō's cynicism and slays him in a final Bankai duel. With the conflict resolved, Ichigo visits the Seireitei to claim Ginjō's body, reaffirming his loyalty as a Substitute.",
    airDate: new Date("2012-03-27"),
  },

  // Thousand-Year Blood War Arc (Episodes 367–379)

  {
    number: 367,
    title: "THE BLOOD WARFARE",
    type: EpisodeType.CANON,
    synopsis:
      "Peace is suddenly shattered when a mysterious group of masked individuals unloads a lethal surprise attack inside the Seireitei, while a new breed of aggressive enemies appears before Ichigo in the Living World.",
    airDate: new Date("2022-10-11"),
  },
  {
    number: 368,
    title: "Foundation Stones",
    type: EpisodeType.CANON,
    synopsis:
      "The Soul Reapers learn that their attackers belong to the Wandenreich, a hidden empire of surviving Quincies. Meanwhile, Ichigo receives an urgent distress call from Hueco Mundo, which has been forcefully overtaken.",
    airDate: new Date("2022-10-18"),
  },
  {
    number: 369,
    title: "March of the StarCross",
    type: EpisodeType.CANON,
    synopsis:
      "Ichigo clashes with the Quincy Quilge Opie in Hueco Mundo, discovering that his opponent can absorb nearby spirit particles. Back in Soul Society, a massive pillar of blue flame heralds the full-scale invasion of the Seireitei.",
    airDate: new Date("2022-10-25"),
  },
  {
    number: 370,
    title: "Kill The Shadow",
    type: EpisodeType.CANON,
    synopsis:
      "The Sternritter launch a savage assault against the Gotei 13. The Captains deploy their ultimate weapons, only to suffer a horrifying tactical blow when the Quincies effortlessly steal their Bankai.",
    airDate: new Date("2022-11-01"),
  },
  {
    number: 371,
    title: "Wrath as a Lightning",
    type: EpisodeType.CANON,
    synopsis:
      "Captain Suì-Fēng and Captain Hitsugaya struggle to cope without their Bankai. Meanwhile, Vice-Captain Chōjirō Sasakibe's past is brought to light as Captain-Commander Yamamoto steps onto the front lines in a blaze of fury.",
    airDate: new Date("2022-11-08"),
  },
  {
    number: 372,
    title: "The Fire",
    type: EpisodeType.CANON,
    synopsis:
      "An enraged Yamamoto confronts the leader of the Quincies, Yhwach. The Captain-Commander unleashes his devastating, long-dormant Bankai, Zanka no Tachi, threatening to incinerate the entirety of Soul Society.",
    airDate: new Date("2022-11-15"),
  },
  {
    number: 373,
    title: "BORN IN THE DARK",
    type: EpisodeType.CANON,
    synopsis:
      "The tragic outcome of Yamamoto's duel leaves the Seireitei in utter ruin. Ichigo finally breaks free from Quilge's prison cage and arrives in Soul Society, launching an immediate, desperate attack against Yhwach.",
    airDate: new Date("2022-11-22"),
  },
  {
    number: 374,
    title: "The Shooting Star Project (ZERO MIX)",
    type: EpisodeType.CANON,
    synopsis:
      "The Quincy forces withdraw as the elite Royal Guard, Squad Zero, arrives in the Seireitei. Recognizing that standard healing will not suffice, they transport Ichigo, Rukia, Renji, and Byakuya up to the Soul King Palace.",
    airDate: new Date("2022-11-29"),
  },
  {
    number: 375,
    title: "THE DROP",
    type: EpisodeType.CANON,
    synopsis:
      "Ichigo and Renji undergo unique, grueling physical recovery regimes across the floating cities of Squad Zero, while Shunsui Kyōraku is officially appointed as the new Captain-Commander of the Gotei 13.",
    airDate: new Date("2022-12-06"),
  },
  {
    number: 376,
    title: "The Battle",
    type: EpisodeType.CANON,
    synopsis:
      "Unohana unveils her dark historical identity as the first Kenpachi, engaging Kenpachi Zaraki in a relentless, blood-soaked duel to the death designed to unlock his true, suppressed mental potential.",
    airDate: new Date("2022-12-13"),
  },
  {
    number: 377,
    title: "Everything But the Rain",
    type: EpisodeType.CANON,
    synopsis:
      "Failing his trial with the sword-creator Ōetsu Nimaiya, Ichigo is sent back to the Living World. There, Isshin finally sits down to reveal the complex history of how he met Ichigo's Quincy mother, Masaki Kurosaki.",
    airDate: new Date("2022-12-20"),
  },
  {
    number: 378,
    title: "EVERYTHING BUT THE RAIN “June Truth”",
    type: EpisodeType.CANON,
    synopsis:
      "The flashback details the tragic circumstances of Masaki's past hollow infection and the sacrificial bond Isshin accepted to save her, illuminating the source of Ichigo's dual heritage.",
    airDate: new Date("2022-12-27"),
  },
  {
    number: 379,
    title: "THE BLADE IS ME",
    type: EpisodeType.CANON,
    synopsis:
      "Armed with the absolute truth of his origin, Ichigo returns to the forge. He bids farewell to the old manifestations of his power and successfully welds his true, newly balanced dual-blade Zanpakutō.",
    airDate: new Date("2022-12-27"),
  },

  // Thousand-Year Blood War: The Separation Arc (Episodes 380–392)
  {
    number: 380,
    title: "THE LAST 9DAYS",
    type: EpisodeType.CANON,
    synopsis:
      "The Wandenreich returns to cast Seireitei into the shadows, initiating their second invasion. Meanwhile, Yhwach shocks his followers by naming Uryū Ishida as his official successor.",
    airDate: new Date("2023-07-08"),
  },
  {
    number: 381,
    title: "Peace from Shadows",
    type: EpisodeType.CANON,
    synopsis:
      "As the Wandenreich's spatial swap traps the Soul Reapers inside their own domain, the Sternritter quickly overwhelm the defenseless Captains who lack their Bankai.",
    airDate: new Date("2023-07-15"),
  },
  {
    number: 382,
    title: "The Fundamental Virulence",
    type: EpisodeType.MIXED,
    synopsis:
      "Kisuke Urahara delivers a breakthrough solution using 'Hollow pills' to temporarily infect and reclaim the stolen Bankai, allowing Hitsugaya and Suì-Fēng to turn the tide.",
    airDate: new Date("2023-07-22"),
  },
  {
    number: 383,
    title: "HEART of WOLF",
    type: EpisodeType.CANON,
    synopsis:
      "Captain Sajin Komamura activates his clan's secret Human Transformation Technique, sacrificing his heart for immortal physical strength to dismantle Sternritter Bambietta Basterbine.",
    airDate: new Date("2023-07-29"),
  },
  {
    number: 384,
    title: "Rages at Ringside",
    type: EpisodeType.CANON,
    synopsis:
      "The wrestler-themed Sternritter Mask de Masculine brutally defeats several Lieutenants, prompting a newly trained Renji Abarai to step up and showcase his true Bankai, Sōō Zabimaru.",
    airDate: new Date("2023-08-05"),
  },
  {
    number: 385,
    title: "The White Haze",
    type: EpisodeType.CANON,
    synopsis:
      "Rukia Kuchiki faces the terrifying psychological fears generated by Äs Nödt, overcoming her limits to unveil her beautiful and hazardous absolute-zero Bankai, Hakka no Togame.",
    airDate: new Date("2023-08-12"),
  },
  {
    number: 386,
    title: "I AM THE EDGE",
    type: EpisodeType.CANON,
    synopsis:
      "The reality-warping Sternritter Gremmy Thoumeaux materializes any fantasy he imagines into existence, engaging a liberated Kenpachi Zaraki in a catastrophic duel of raw power.",
    airDate: new Date("2023-08-19"),
  },
  {
    number: 387,
    title: "The Headless Star",
    type: EpisodeType.MIXED,
    synopsis:
      "Ichigo Kurosaki descends from the Royal Palace clad in advanced garments, effortlessly handling a group of elite Sternritter before realizing Yhwach is heading for the heavens.",
    airDate: new Date("2023-08-26"),
  },
  {
    number: 388,
    title: "Marching Out the ZOMBIES",
    type: EpisodeType.CANON,
    synopsis:
      "Giselle Gewelle uses lethal blood contamination to turn fallen Soul Reapers into mindless puppets, forcing a ruthless Mayuri Kurotsuchi to introduce his own modified Arrancar warriors.",
    airDate: new Date("2023-09-09"),
  },
  {
    number: 389,
    title: "Marching Out the ZOMBIES 2",
    type: EpisodeType.CANON,
    synopsis:
      "Mayuri outmaneuvers Giselle's puppet squad using custom neurological drugs. Concurrently, Byakuya Kuchiki single-handedly manages a multi-front ambush from the remaining Sternritter.",
    airDate: new Date("2023-09-16"),
  },
  {
    number: 390,
    title: "Too Early to Win, Too Late to Know",
    type: EpisodeType.CANON,
    synopsis:
      "Yhwach penetrates the Soul King Palace alongside his elite guard, the Schutzstaffel. Squad Zero unfolds their custom defense installations to block the intruders.",
    airDate: new Date("2023-09-23"),
  },
  {
    number: 391,
    title: "THE MASTER",
    type: EpisodeType.CANON,
    synopsis:
      "Yhwach revives and empowers his elite guards via the Auswällen light. In response, Squad Zero's sword-creator Nimaiya falls, forcing Ichibē Hyōsube to confront the Quincy King.",
    airDate: new Date("2023-09-30"),
  },
  {
    number: 392,
    title: "BLACK",
    type: EpisodeType.MIXED,
    synopsis:
      "Ichibē activates his conceptual ink ability, Shirafude Ichimonji, to strip Yhwach of his identity, but Yhwach activates his true power, 'The Almighty,' to completely shatter the Royal Guard.",
    airDate: new Date("2023-09-30"),
  },

  // Thousand-Year Blood War: The Conflict Arc (Episodes 393–406)
  {
    number: 393,
    title: '"A"',
    type: EpisodeType.MIXED,
    synopsis:
      "The conflict peaks at the Soul King Palace. Yhwach confronts his own history and prepares to execute a landscape-shattering move against the core of reality, while the remaining Gotei 13 try to establish a doorway to follow.",
    airDate: new Date("2024-10-05"),
  },
  {
    number: 394,
    title: "KILL THE KING",
    type: EpisodeType.MIXED,
    synopsis:
      "Ichigo and his group scale the palace walls to intercept Yhwach, only to walk directly into a horrific psychological trap as the absolute fate of the Soul King hangs in the balance.",
    airDate: new Date("2024-10-12"),
  },
  {
    number: 395,
    title: "The Dark Arm",
    type: EpisodeType.MIXED,
    synopsis:
      "A catastrophe unfolds as the foundational pillars of the worlds begin to tear apart. Jūshirō Ukitake unleashes his secret, life-sacrificing Kamikake ritual to release the Dark Arm of Mimihagi.",
    airDate: new Date("2024-10-19"),
  },
  {
    number: 396,
    title: "The Betrayer",
    type: EpisodeType.MIXED,
    synopsis:
      "The tactical landscape is shattered by a shocking defection within the inner circle. Ichigo and his group struggle to contain the emotional fallback while confronting a heavily mutated Yhwach.",
    airDate: new Date("2024-10-26"),
  },
  {
    number: 397,
    title: "AGAINST THE JUDGEMENT",
    type: EpisodeType.CANON,
    synopsis:
      "Back down in the ruined Seireitei, Shunsui Kyōraku visits the deepest underground chambers of Muken to make a dangerous tactical alliance with the imprisoned Sōsuke Aizen.",
    airDate: new Date("2024-11-02"),
  },
  {
    number: 398,
    title: "THE HOLY NEWBORN",
    type: EpisodeType.CANON,
    synopsis:
      "The remaining elite Captains and Visored join forces to launch a collective barrier raid into the palace void, facing off against the overwhelming vanguard of the Schutzstaffel.",
    airDate: new Date("2024-11-09"),
  },
  {
    number: 399,
    title: "GATE OF THE SUN",
    type: EpisodeType.MIXED,
    synopsis:
      "The battle splits into high-stakes corridors. Elite Quincy forces showcase their reality-bending Vollständig attributes, trapping the incoming Soul Reaper vanguard squads in severe duels.",
    airDate: new Date("2024-11-16"),
  },
  {
    number: 400,
    title: "BABY, HOLD YOUR HAND",
    type: EpisodeType.CANON,
    synopsis:
      "Captain Mayuri Kurotsuchi and Nemu Kurotsuchi engage the grotesque, multiplying nerve-networks of Pernida Parnkgjas—the Left Arm of the Soul King—in a bizarre battle of biology.",
    airDate: new Date("2024-11-23"),
  },
  {
    number: 401,
    title: "DON’T CHASE A SHADOW",
    type: EpisodeType.CANON,
    synopsis:
      "Mayuri alters his tactical neurological layout to handle Pernida's evolving cellular mimicry, pushing his scientific adaptations to the absolute maximum to save his division assets.",
    airDate: new Date("2024-11-30"),
  },
  {
    number: 402,
    title: "BABY, HOLD YOUR HAND 2 [Never Ending My Dream]",
    type: EpisodeType.CANON,
    synopsis:
      "Nemu Kurotsuchi overrides her own cellular limitations, sacrificing her biological core to deliver a high-yield soul blast to consume Pernida, leaving Mayuri to salvage her remains.",
    airDate: new Date("2024-12-07"),
  },
  {
    number: 403,
    title: "SHADOWS GONE",
    type: EpisodeType.CANON,
    synopsis:
      "The scene shifts to the upper palace city layout. Shunsui Kyōraku coordinates structural shadow movements to corner Lille Barro, the sniper leader of the elite guard.",
    airDate: new Date("2024-12-14"),
  },
  {
    number: 404,
    title: "friend",
    type: EpisodeType.CANON,
    synopsis:
      "Lille Barro releases his multi-winged divine form, piercing through Kyōraku's standard defenses. Nanao Ise steps up to uncover a hidden, god-slaying familial Zanpakutō legacy.",
    airDate: new Date("2024-12-21"),
  },
  {
    number: 405,
    title: "The Visible Answer",
    type: EpisodeType.CANON,
    synopsis:
      "Kyōraku and Nanao seamlessly harmonize their blade techniques to fragment Lille Barro's regular layout, while down below, a massive giant threat begins to stir the rubble.",
    airDate: new Date("2024-12-28"),
  },
  {
    number: 406,
    title: "MY LAST WORDS",
    type: EpisodeType.CANON,
    synopsis:
      "As the remaining defenders rally for a final advance toward the throne room, deep systemic shifts across Yhwach's structural layout hint at the catastrophic finale yet to come.",
    airDate: new Date("2024-12-28"),
  },
];

// Auto-assign arcSlug from episode number range
const EpisodeData = rawEpisodes.map((ep) => ({
  ...ep,
  arcSlug: getArcSlug(ep.number),
}));

export default EpisodeData;
