import { QuoteCategory, SourceMaterial } from "@prisma/client";

// Raw quote data — characterName and arcName are resolved at seed time via slugify.
// episodeId maps to the anime episode in which the quote was spoken (null if manga-only
// or the episode cannot be pinned precisely).
const bleachVerseQuoteSeedData = [
  // ─────────────────────────────────────────────────────────────────────────
  // ICHIGO KUROSAKI
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Ichigo Kurosaki",
    text: "If fate is a millstone, then we are the grist. There is nothing we can do. So I wish for strength. If I cannot protect them from the wheel, then give me a strong blade, and enough strength... to shatter fate.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 61,
  },
  {
    characterName: "Ichigo Kurosaki",
    text: "I'm not Superman, so I can't say anything big like I'll protect everyone on Earth. I'm not a modest guy who will say it's enough if I can protect as many people as my two hands can handle either. I want to protect a mountain-load of people.",
    category: QuoteCategory.MOTIVATIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 62,
  },
  {
    characterName: "Ichigo Kurosaki",
    text: "If you have enough time to fantasize about your own beautiful death, you should use that time to become stronger.",
    category: QuoteCategory.MOTIVATIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Arrival Arc",
    episodeId: 119,
  },
  {
    characterName: "Ichigo Kurosaki",
    text: "We are all like fireworks. We climb, shine, and always go our separate ways and become further apart. But even if that time comes, let's not disappear like a firework, and continue to shine... forever.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Substitute Shinigami Arc",
    episodeId: 4,
  },
  {
    characterName: "Ichigo Kurosaki",
    text: "Shut up. I'm not fighting because I think I can win. I'm fighting because I have to win.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 61,
  },
  {
    characterName: "Ichigo Kurosaki",
    text: "I've always known. The reason I could fight was not because I had something to protect. I kept fighting because I refused to lose.",
    category: QuoteCategory.MOTIVATIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: 291,
  },
  {
    characterName: "Ichigo Kurosaki",
    text: "If you were to turn into a snake tomorrow and began devouring humans, and from the same mouth you began calling for my help... I would still come and save you.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Substitute Shinigami Arc",
    episodeId: 6,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SOSUKE AIZEN
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Sosuke Aizen",
    text: "Fear is necessary for evolution. The fear that one could be destroyed at any moment.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: 308,
  },
  {
    characterName: "Sosuke Aizen",
    text: "All creatures want to believe in something greater than themselves. They cannot live without blind obedience. You too must have something — a God, an ideal, perhaps. Even a nightmare.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 58,
  },
  {
    characterName: "Sosuke Aizen",
    text: "I have no interest in a throne. I would not sit in the chair of God. I will stand on top of God.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 272,
  },
  {
    characterName: "Sosuke Aizen",
    text: "Since the beginning, no one has ever stood in the heavens. Neither you, nor I, nor even God. But that unbearable vacancy in the throne of heaven will be filled. From this day forward... I will stand in heaven.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: 309,
  },
  {
    characterName: "Sosuke Aizen",
    text: "The betrayal you can see is trivial. What is truly frightening — and truly breathtaking — is the betrayal that you don't see.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 58,
  },
  {
    characterName: "Sosuke Aizen",
    text: "Admirable. But there is one thing you have overlooked. The difference in our power.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: 291,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RUKIA KUCHIKI
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Rukia Kuchiki",
    text: "You know why big brothers are born first? To protect the little ones that come after them.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Substitute Shinigami Arc",
    episodeId: 43,
  },
  {
    characterName: "Rukia Kuchiki",
    text: "Hardship, fear, and hopelessness — these are your tools. Make them your wings.",
    category: QuoteCategory.MOTIVATIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 52,
  },
  {
    characterName: "Rukia Kuchiki",
    text: "Blooming in the snow, never wilting. That is the way of my blade.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    episodeId: null,
  },
  {
    characterName: "Rukia Kuchiki",
    text: "No matter what happens, no matter how hard it is, I will never forget the first time I met you.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Substitute Shinigami Arc",
    episodeId: 63,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // KENPACHI ZARAKI
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Kenpachi Zaraki",
    text: "I don't want to be invincible. I just want to find someone strong enough to kill me.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 40,
  },
  {
    characterName: "Kenpachi Zaraki",
    text: "The world is not beautiful, therefore it is.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 40,
  },
  {
    characterName: "Kenpachi Zaraki",
    text: "What's the point in fighting someone weak? There's no fun in that. What I want is someone who can actually kill me.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 38,
  },
  {
    characterName: "Kenpachi Zaraki",
    text: "Fear is not evil. It tells you what your weakness is. And once you know your weakness, you can become stronger as well as kinder.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War Arc",
    episodeId: null,
  },
  {
    characterName: "Kenpachi Zaraki",
    text: "If you are going to get scared, then don't fight.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 40,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BYAKUYA KUCHIKI
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Byakuya Kuchiki",
    text: "Trespassing upon the law is unforgivable. Violating the pride of the law is doubly unforgivable. Those who stand against the law must be punished, even if it costs me my life.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 53,
  },
  {
    characterName: "Byakuya Kuchiki",
    text: "I will show you... the difference in our ability. Scatter, Senbonzakura.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 54,
  },
  {
    characterName: "Byakuya Kuchiki",
    text: "A person who cannot feel the weight of their sword has no right to carry one.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 53,
  },
  {
    characterName: "Byakuya Kuchiki",
    text: "I have betrayed neither the law, nor Hisana, nor Rukia. I have merely betrayed my pride.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 62,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // KISUKE URAHARA
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Kisuke Urahara",
    text: "If you have time to think about a beautiful death, live beautifully until the end.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Substitute Shinigami Arc",
    episodeId: null,
  },
  {
    characterName: "Kisuke Urahara",
    text: "Sanity? Sorry, but I don't remember having such a useless thing in the first place.",
    category: QuoteCategory.COMEDY,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Substitute Shinigami Arc",
    episodeId: null,
  },
  {
    characterName: "Kisuke Urahara",
    text: "Whatever doesn't kill you... has made a grave mistake.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: null,
  },
  {
    characterName: "Kisuke Urahara",
    text: "To know the truth, sometimes you have to look beyond the lies you are told.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Substitute Shinigami Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GIN ICHIMARU
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Gin Ichimaru",
    text: "My sword is the longest. It can reach anywhere.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: 309,
  },
  {
    characterName: "Gin Ichimaru",
    text: "I'll kill you gently.",
    category: QuoteCategory.THREAT,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 27,
  },
  {
    characterName: "Gin Ichimaru",
    text: "You should be grateful. Not everyone gets to choose how they die.",
    category: QuoteCategory.THREAT,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: 305,
  },
  {
    characterName: "Gin Ichimaru",
    text: "I wanted to make you suffer as much as possible before you died. I'm sorry, Rangiku.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: 309,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // URYU ISHIDA
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Uryu Ishida",
    text: "A Quincy's pride is in their aim. A single arrow must never miss.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Substitute Shinigami Arc",
    episodeId: 13,
  },
  {
    characterName: "Uryu Ishida",
    text: "I am a Quincy. My pride lies in living and dying as one.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Hueco Mundo Sneak Entry Arc",
    episodeId: 148,
  },
  {
    characterName: "Uryu Ishida",
    text: "Don't be misled by appearances. What you see on the surface is only a fraction of the truth.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Sneak Entry Arc",
    episodeId: 25,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // TOSHIRO HITSUGAYA
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Toshiro Hitsugaya",
    text: "If you want to protect everything, then you must be prepared to have everything taken from you.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Arrival Arc",
    episodeId: 111,
  },
  {
    characterName: "Toshiro Hitsugaya",
    text: "You should not trust someone you know nothing about. You should not trust what you do not know.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Arrival Arc",
    episodeId: 110,
  },
  {
    characterName: "Toshiro Hitsugaya",
    text: "Grow up. Being a child is no excuse for being naive.",
    category: QuoteCategory.OTHER,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Arrival Arc",
    episodeId: 110,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ORIHIME INOUE
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Orihime Inoue",
    text: "If I were the rain that binds together the earth and the sky, whom in all eternity will never mingle — would I be able to bind two hearts together?",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Substitute Shinigami Arc",
    episodeId: null,
  },
  {
    characterName: "Orihime Inoue",
    text: "Even if I cannot be with you, I will always watch over you and keep you in my heart.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Hueco Mundo Sneak Entry Arc",
    episodeId: 142,
  },
  {
    characterName: "Orihime Inoue",
    text: "I don't want to be a burden. I want to be useful. I want to fight alongside everyone.",
    category: QuoteCategory.MOTIVATIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Hueco Mundo Sneak Entry Arc",
    episodeId: 145,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RENJI ABARAI
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Renji Abarai",
    text: "Get off your ass and fight! You call yourself a Shinigami?!",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 48,
  },
  {
    characterName: "Renji Abarai",
    text: "No matter how far apart we are, no matter how different our paths, I will always be connected to you. That's what it means to be a friend.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 60,
  },
  {
    characterName: "Renji Abarai",
    text: "Howl! Zabimaru!",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Sneak Entry Arc",
    episodeId: 41,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RANGIKU MATSUMOTO
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Rangiku Matsumoto",
    text: "There are no such things as useless struggles. Every effort you make will one day become your strength.",
    category: QuoteCategory.MOTIVATIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Arrival Arc",
    episodeId: 113,
  },
  {
    characterName: "Rangiku Matsumoto",
    text: "If you don't treat your own body as your greatest treasure, who's going to think of you as precious?",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Arrival Arc",
    episodeId: 114,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GRIMMJOW JAEGERJAQUEZ
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Grimmjow Jaegerjaquez",
    text: "Don't you dare look down on me! I am Grimmjow, the King!",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar vs. Shinigami Arc",
    episodeId: 163,
  },
  {
    characterName: "Grimmjow Jaegerjaquez",
    text: "I don't care about debts or honor. I just don't like leaving things unfinished.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: 276,
  },
  {
    characterName: "Grimmjow Jaegerjaquez",
    text: "You're not fighting me at full strength... I hate that. Fight me at your full power!",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar vs. Shinigami Arc",
    episodeId: 167,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ULQUIORRA CIFER
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Ulquiorra Cifer",
    text: "What is a heart? If I were to rip open your chest and take a look, would I find it there?",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Hueco Mundo Sneak Entry Arc",
    episodeId: 264,
  },
  {
    characterName: "Ulquiorra Cifer",
    text: "That is what I call despair.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: 269,
  },
  {
    characterName: "Ulquiorra Cifer",
    text: "Humans who have seen my resurrection are not allowed to live.",
    category: QuoteCategory.THREAT,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: 270,
  },
  {
    characterName: "Ulquiorra Cifer",
    text: "I see. So that thing... is what you humans call a heart.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: 271,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GENRYUSAI SHIGEKUNI YAMAMOTO
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Genryusai Shigekuni Yamamoto",
    text: "Those who do not know the power of the sword should not carry one.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 55,
  },
  {
    characterName: "Genryusai Shigekuni Yamamoto",
    text: "For a soldier, the most important thing is not to win — it is to be able to die for what he protects.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 262,
  },
  {
    characterName: "Genryusai Shigekuni Yamamoto",
    text: "No matter how powerful the enemy, the Gotei 13 shall not falter!",
    category: QuoteCategory.MOTIVATIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War Arc",
    episodeId: null,
  },
  {
    characterName: "Genryusai Shigekuni Yamamoto",
    text: "Reduce all creation to ash. Ryujin Jakka.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 193,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SHUNSUI KYORAKU
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Shunsui Kyoraku",
    text: "All I can do is keep moving forward. That's all there is to it.",
    category: QuoteCategory.MOTIVATIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 203,
  },
  {
    characterName: "Shunsui Kyoraku",
    text: "Even if our roles force us to stand on opposite sides of the field, only a fool would not see the beauty of the world.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 57,
  },
  {
    characterName: "Shunsui Kyoraku",
    text: "In battle, killing is unavoidable. But a true warrior knows when to stop.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 203,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // YORUICHI SHIHOIN
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Yoruichi Shihoin",
    text: "Speed is weight. Have you ever been hit by something that moves faster than sound?",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 50,
  },
  {
    characterName: "Yoruichi Shihoin",
    text: "Don't judge a book by its cover. Or in this case — a cat.",
    category: QuoteCategory.COMEDY,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Sneak Entry Arc",
    episodeId: 33,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RETSU UNOHANA
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Retsu Unohana",
    text: "Zaraki Kenpachi. You are the only person in this world who has the power to kill me. Therefore, I will train you until you reach that level.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War Arc",
    episodeId: null,
  },
  {
    characterName: "Retsu Unohana",
    text: "My only regret is not being able to see the full extent of your strength.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // COYOTE STARRK
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Coyote Starrk",
    text: "I just don't want to be alone anymore. That's why I fight. To protect the people beside me.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 293,
  },
  {
    characterName: "Coyote Starrk",
    text: "My power is so great it kills those around me. I wasn't looking for strength — I was looking for someone who could survive being near me.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 293,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NELLIEL TU ODELSCHWANCK
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Nelliel Tu Odelschwanck",
    text: "A sword by itself has no will. But when someone wields it with will — that's when it truly becomes a weapon.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar vs. Shinigami Arc",
    episodeId: 166,
  },
  {
    characterName: "Nelliel Tu Odelschwanck",
    text: "I do not fight to kill. I fight to protect.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar vs. Shinigami Arc",
    episodeId: 160,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // YHWACH
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Yhwach",
    text: "All things are born from darkness and all things return to darkness. The Soul King was no different.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Conflict Arc",
    episodeId: null,
  },
  {
    characterName: "Yhwach",
    text: "Every living being has a role. And the role of the weak is to fall before the strong.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War Arc",
    episodeId: null,
  },
  {
    characterName: "Yhwach",
    text: "A king who does not fear death has no right to rule.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    episodeId: null,
  },
  {
    characterName: "Yhwach",
    text: "The future belongs to me. I see all that will come to pass, and none of it includes your survival.",
    category: QuoteCategory.THREAT,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Conflict Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ISSHIN KUROSAKI
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Isshin Kurosaki",
    text: "If you advance, you will win. If you retreat, you will age. That is the law of the Shinigami.",
    category: QuoteCategory.MOTIVATIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: 290,
  },
  {
    characterName: "Isshin Kurosaki",
    text: "A man should be able to die with a smile. If you can't do that, it means you lived wrong.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Substitute Shinigami Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // JUGRAM HASCHWALTH
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Jugram Haschwalth",
    text: "Balance is everything. Where there is happiness, there must be misery. Where there is strength, there must be weakness.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    episodeId: null,
  },
  {
    characterName: "Jugram Haschwalth",
    text: "I do not fight for myself. I fight for His Majesty. That is my purpose.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // KANAME TOSEN
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Kaname Tosen",
    text: "The path with the least bloodshed is the path I must follow.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: null,
  },
  {
    characterName: "Kaname Tosen",
    text: "Justice is not something you can see with your eyes. It must be felt with your soul.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // KON
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Kon",
    text: "I'm a mod soul! I deserve to be treated with more respect!",
    category: QuoteCategory.COMEDY,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Substitute Shinigami Arc",
    episodeId: 8,
  },
  {
    characterName: "Kon",
    text: "Even I have things I want to protect. That's why I fight.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Substitute Shinigami Arc",
    episodeId: 12,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // JUSHIRO UKITAKE
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Jushiro Ukitake",
    text: "When people are protecting something truly precious to them, they truly can become... as strong as they need to be.",
    category: QuoteCategory.MOTIVATIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 62,
  },
  {
    characterName: "Jushiro Ukitake",
    text: "There are matters in this world that logic alone cannot explain.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 43,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SOI FON
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Soi Fon",
    text: "The Stealth Force exists to kill without being seen, without being heard. That is our pride.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 49,
  },
  {
    characterName: "Soi Fon",
    text: "If I sting you twice in the same spot, you die. That is the law of my Zanpakuto.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 50,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SAJIN KOMAMURA
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Sajin Komamura",
    text: "A man who runs from his emotions is no man at all.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 55,
  },
  {
    characterName: "Sajin Komamura",
    text: "I dedicate my life to the Head Captain. That is my resolve.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MAYURI KUROTSUCHI
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Mayuri Kurotsuchi",
    text: "A scientist who has no interest in the unknown is no scientist at all.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 139,
  },
  {
    characterName: "Mayuri Kurotsuchi",
    text: "Perfection is a disease. The moment you think you're perfect, you've stopped evolving.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar Downfall Arc",
    episodeId: 241,
  },
  {
    characterName: "Mayuri Kurotsuchi",
    text: "Experiments on a living subject — that is the pinnacle of science.",
    category: QuoteCategory.OTHER,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar vs. Shinigami Arc",
    episodeId: 159,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // IZURU KIRA
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Izuru Kira",
    text: "War is not heroic. War is not exhilarating. War is filled with despair.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 213,
  },
  {
    characterName: "Izuru Kira",
    text: "My blade is not one that brings victory in battle. It is one that drags the defeated into the pit of despair. That is Wabisuke.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 44,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SHUHEI HISAGI
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Shuhei Hisagi",
    text: "To know what you fear is the beginning of knowing what you are made of.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 213,
  },
  {
    characterName: "Shuhei Hisagi",
    text: "One who does not fear the sword he wields has no right to wield it.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 213,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // IKKAKU MADARAME
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Ikkaku Madarame",
    text: "I don't intend to die on any battlefield except under Captain Zaraki's command.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 265,
  },
  {
    characterName: "Ikkaku Madarame",
    text: "The point of battle is not to win. The point is to give it everything you've got.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 39,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // YUMICHIKA AYASEGAWA
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Yumichika Ayasegawa",
    text: "There are only two types of men who look good in battle — the ones who are beautiful, and the ones who are strong. I am both.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 30,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MOMO HINAMORI
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Momo Hinamori",
    text: "I will always believe in Captain Aizen. Even if the whole world is against him.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Rescue Arc",
    episodeId: 46,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // HANATARO YAMADA
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Hanataro Yamada",
    text: "I may not be strong, but I can still help. That has to mean something.",
    category: QuoteCategory.MOTIVATIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Soul Society: The Sneak Entry Arc",
    episodeId: 26,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SHINJI HIRAKO
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Shinji Hirako",
    text: "Power isn't determined by your size, but by the size of your heart and dreams.",
    category: QuoteCategory.MOTIVATIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Arrival Arc",
    episodeId: 204,
  },
  {
    characterName: "Shinji Hirako",
    text: "The key to controlling your Hollow is not suppression — it's domination. Make it kneel.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Arrival Arc",
    episodeId: 122,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // HIYORI SARUGAKI
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Hiyori Sarugaki",
    text: "Stop holding back! If you hold back in a fight you'll die!",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Arrival Arc",
    episodeId: 122,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LISA YADOMARU
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Lisa Yadomaru",
    text: "Reading is not an escape from reality. It is the only reality worth living in.",
    category: QuoteCategory.OTHER,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 229,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MASHIRO KUNA
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Mashiro Kuna",
    text: "My Hollow mask lasts way longer than Ichigo's! I'm totally the best Visored!",
    category: QuoteCategory.COMEDY,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 232,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RYUKEN ISHIDA
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Ryuken Ishida",
    text: "The last Quincy does not beg. He endures.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: The Arrival Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // TIER HARRIBEL
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Tier Harribel",
    text: "If it is for the sake of protecting those beneath me, I would gladly give my life.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 210,
  },
  {
    characterName: "Tier Harribel",
    text: "Power is not something you wield selfishly. It is something you carry for those who cannot.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 210,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BARAGGAN LOUISENBAIRN
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Baraggan Louisenbairn",
    text: "Time is the only absolute truth. All things age, all things decay, and all things die.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 206,
  },
  {
    characterName: "Baraggan Louisenbairn",
    text: "I am the God of Hueco Mundo. Do not mistake me for a servant.",
    category: QuoteCategory.THREAT,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 201,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NNOITRA GILGA
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Nnoitra Gilga",
    text: "The weak don't deserve to live. That's the only law that matters in Hueco Mundo.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar vs. Shinigami Arc",
    episodeId: 249,
  },
  {
    characterName: "Nnoitra Gilga",
    text: "I refuse to be pitied. I was born to be killed in battle — that is the death I deserve.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar vs. Shinigami Arc",
    episodeId: 254,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SZAYELAPORRO GRANZ
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Szayelaporro Granz",
    text: "I am the perfect being. There is nothing in this world I cannot analyze and replicate.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar vs. Shinigami Arc",
    episodeId: 241,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ZOMMARI RUREAUX
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Zommari Rureaux",
    text: "Speed belongs to me. I am the fastest Espada.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar vs. Shinigami Arc",
    episodeId: 233,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LILYNETTE GINGERBUCK
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Lilynette Gingerbuck",
    text: "Starrk and I are one. We fight together, and we fall together.",
    category: QuoteCategory.EMOTIONAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Arrancar: Decisive Battle of Karakura Arc",
    episodeId: 293,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // KUGO GINJO
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Kugo Ginjo",
    text: "The Soul Society never trusted you. They made you a Substitute — a tool they could discard.",
    category: QuoteCategory.OTHER,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "The Lost Substitute Shinigami Arc",
    episodeId: 343,
  },
  {
    characterName: "Kugo Ginjo",
    text: "Power doesn't belong to those who are chosen. It belongs to those who take it.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "The Lost Substitute Shinigami Arc",
    episodeId: 348,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SHUKURO TSUKISHIMA
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Shukuro Tsukishima",
    text: "I have already inserted myself into your past. Your memories of me are real — because I made them real.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "The Lost Substitute Shinigami Arc",
    episodeId: 354,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BAMBIETTA BASTERBINE
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Bambietta Basterbine",
    text: "Everything I touch explodes. That's my power. That's my pride.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CANDICE CATNIPP
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Candice Catnipp",
    text: "You think lightning is just electricity? Think again — it's my rage given form.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GISELLE GEWELLE
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Giselle Gewelle",
    text: "Once my blood touches you, you're mine forever. Isn't that the sweetest thing?",
    category: QuoteCategory.THREAT,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LILTOTTO LAMPERD
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Liltotto Lamperd",
    text: "Don't let the size fool you. I'll swallow you whole.",
    category: QuoteCategory.THREAT,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BAZZ-B
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Bazz-B",
    text: "My flames burn hotter than any Shinigami's. I'll prove it with your ashes.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War Arc",
    episodeId: null,
  },
  {
    characterName: "Bazz-B",
    text: "I joined the Sternritter for one reason — to kill Yhwach. Don't get in my way.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Conflict Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GREMMY THOUMEAUX
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Gremmy Thoumeaux",
    text: "Whatever I can imagine becomes reality. There is nothing I cannot destroy.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    episodeId: null,
  },
  {
    characterName: "Gremmy Thoumeaux",
    text: "I imagined myself as the most powerful being in existence. So I am.",
    category: QuoteCategory.BATTLE,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ICHIBE HYOSUBE
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Ichibe Hyosube",
    text: "In the beginning, there was only darkness and me. All names in existence were given by me.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    episodeId: null,
  },
  {
    characterName: "Ichibe Hyosube",
    text: "A thing that loses its name loses its power. That is the absolute truth of this world.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War: The Separation Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // OETSU NIMAIYA
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Oetsu Nimaiya",
    text: "A Zanpakuto chooses its master. If you can't hear its voice, you have no right to wield it.",
    category: QuoteCategory.PHILOSOPHICAL,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War Arc",
    episodeId: null,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // TENJIRO KIRINJI
  // ─────────────────────────────────────────────────────────────────────────
  {
    characterName: "Tenjiro Kirinji",
    text: "My hot springs have healed every injury since the dawn of Soul Society. Nothing your enemies can do to you is beyond my cure.",
    category: QuoteCategory.OTHER,
    isCanonical: true,
    sourceMaterial: SourceMaterial.MANGA,
    arcName: "Thousand-Year Blood War Arc",
    episodeId: null,
  },
];

export default bleachVerseQuoteSeedData;
