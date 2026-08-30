import { describe, it, expect } from "vitest";
import {
  BUILDERS_MAP,
  buildSemanticDocument,
  characterDocumentBuilder,
  fightDocumentBuilder,
  quoteDocumentBuilder,
  arcDocumentBuilder,
  organizationDocumentBuilder,
  powerDocumentBuilder,
  transformationDocumentBuilder,
} from "../../../src/semantic/builders/index.js";

describe("Semantic Document Builders", () => {
  describe("CharacterDocumentBuilder", () => {
    it("should build a complete semantic document from a hydrated character entity", () => {
      const mockCharacter = {
        id: "char-123-uuid",
        name: "Ichigo Kurosaki",
        slug: "ichigo-kurosaki",
        sex: "MALE",
        status: "ALIVE",
        description: "A high school student who becomes a Substitute Soul Reaper to protect his hometown Karakura Town.",
        aliases: [{ alias: "Strawberry" }, { alias: "Substitute Soul Reaper" }],
        races: [{ race: { name: "Human" } }, { race: { name: "Soul Reaper" } }, { race: { name: "Hollow" } }, { race: { name: "Quincy" } }],
        organizations: [{ organization: { name: "Gotei 13" }, role: "Allied Shinigami" }],
        zanpakutos: [{
          name: "Zangetsu",
          releaseCommand: "Roar",
          spiritName: "Old Man Zangetsu / Hollow Ichigo",
          description: "A massive cleaver-like blade that channels spiritual pressure.",
        }],
        powers: [
          { name: "Getsuga Tensho", type: "OFFENSIVE", description: "Fires a concentrated wave of spiritual energy." },
          { name: "Bankai Speed", type: "MOVEMENT", description: "Hyper-speed Shunpo movement." },
        ],
        transformations: [
          { name: "Bankai: Tensa Zangetsu", type: "BANKAI", description: "Compresses all spirit energy into a sleek daito." },
          { name: "Hollow Mask", type: "HOLLOWFICATION", description: "Augments physical and spiritual parameters." },
        ],
      };

      const doc = characterDocumentBuilder.build(mockCharacter);

      expect(doc.entityType).toBe("CHARACTER");
      expect(doc.entityId).toBe("char-123-uuid");
      expect(doc.metadata).toEqual({
        name: "Ichigo Kurosaki",
        slug: "ichigo-kurosaki",
        sex: "MALE",
        status: "ALIVE",
      });

      // Content verification
      expect(doc.content).toContain("# Character: Ichigo Kurosaki");
      expect(doc.content).toContain("Ichigo Kurosaki is a male character currently alive.");
      expect(doc.content).toContain("Strawberry, Substitute Soul Reaper");
      expect(doc.content).toContain("Human, Soul Reaper, Hollow, Quincy");
      expect(doc.content).toContain("Gotei 13 (Role: Allied Shinigami)");
      expect(doc.content).toContain("Name: Zangetsu");
      expect(doc.content).toContain('Release Command: "Roar"');
      expect(doc.content).toContain("Getsuga Tensho");
      expect(doc.content).toContain("Bankai: Tensa Zangetsu");
      expect(doc.content).toContain("Karakura Town");

      // Non-narrative internal field exclusion check
      expect(doc.content).not.toContain("createdAt");
      expect(doc.content).not.toContain("updatedAt");
    });

    it("should handle characters with minimal optional fields without crashing", () => {
      const minimalChar = {
        id: "char-min-uuid",
        name: "Generic Shinigami",
      };

      const doc = characterDocumentBuilder.build(minimalChar);
      expect(doc.entityType).toBe("CHARACTER");
      expect(doc.entityId).toBe("char-min-uuid");
      expect(doc.content).toContain("# Character: Generic Shinigami");
      expect(doc.metadata.name).toBe("Generic Shinigami");
    });
  });

  describe("FightDocumentBuilder", () => {
    it("should build a complete fight document", () => {
      const mockFight = {
        id: "fight-456-uuid",
        title: "Ichigo Kurosaki vs. Byakuya Kuchiki",
        slug: "ichigo-vs-byakuya",
        type: "DUEL",
        summary: "Climactic battle on the Sokyoku Hill during the Soul Society Rescue Arc.",
        arc: { name: "Soul Society: The Rescue" },
        location: { name: "Sokyoku Hill, Seireitei" },
        winner: { name: "Ichigo Kurosaki" },
        episode: { number: 59, title: "Conclusion of the Deathmatch! White Pride and Black Desire" },
        participants: [
          { character: { name: "Ichigo Kurosaki" }, outcome: "WIN" },
          { character: { name: "Byakuya Kuchiki" }, outcome: "LOSS" },
        ],
      };

      const doc = fightDocumentBuilder.build(mockFight);

      expect(doc.entityType).toBe("FIGHT");
      expect(doc.entityId).toBe("fight-456-uuid");
      expect(doc.metadata.title).toBe("Ichigo Kurosaki vs. Byakuya Kuchiki");
      expect(doc.metadata.winner).toBe("Ichigo Kurosaki");
      expect(doc.metadata.arc).toBe("Soul Society: The Rescue");

      expect(doc.content).toContain("# Fight: Ichigo Kurosaki vs. Byakuya Kuchiki");
      expect(doc.content).toContain("Soul Society: The Rescue");
      expect(doc.content).toContain("Sokyoku Hill, Seireitei");
      expect(doc.content).toContain("Winner\nIchigo Kurosaki");
      expect(doc.content).toContain("Episode 59 - \"Conclusion of the Deathmatch! White Pride and Black Desire\"");
      expect(doc.content).toContain("Climactic battle on the Sokyoku Hill");
    });
  });

  describe("QuoteDocumentBuilder", () => {
    it("should build a quote document with speaker and category context", () => {
      const mockQuote = {
        id: "quote-789-uuid",
        text: "Admiration is the state furthest from understanding.",
        category: "PHILOSOPHICAL",
        character: { name: "Sosuke Aizen" },
        arc: { name: "Soul Society Arc" },
        episode: { number: 60, title: "Despair, Shattered Kyoka Suigetsu" },
        sourceMaterial: "MANGA",
      };

      const doc = quoteDocumentBuilder.build(mockQuote);

      expect(doc.entityType).toBe("QUOTE");
      expect(doc.entityId).toBe("quote-789-uuid");
      expect(doc.metadata.characterName).toBe("Sosuke Aizen");
      expect(doc.metadata.category).toBe("PHILOSOPHICAL");

      expect(doc.content).toContain('"Admiration is the state furthest from understanding."');
      expect(doc.content).toContain("Speaker\nSosuke Aizen");
      expect(doc.content).toContain("Category\nPHILOSOPHICAL");
      expect(doc.content).toContain("Arc\nSoul Society Arc");
      expect(doc.content).toContain("Episode 60");
    });
  });

  describe("ArcDocumentBuilder", () => {
    it("should build an arc document with coverage boundaries and major fights", () => {
      const mockArc = {
        id: "arc-101-uuid",
        name: "Arrancar: Decisive Battle of Karakura",
        slug: "arrancar-karakura-battle",
        type: "CANON",
        description: "The Gotei 13 and Visored defend the Fake Karakura Town against Aizen and the top Espada.",
        startEpisodeNumber: 213,
        endEpisodeNumber: 229,
        startChapter: 316,
        endChapter: 340,
        fights: [
          { title: "Baraggan Louisenbairn vs. Soi Fon and Marechiyo Omaeda" },
          { title: "Tier Harribel vs. Toshiro Hitsugaya" },
        ],
      };

      const doc = arcDocumentBuilder.build(mockArc);

      expect(doc.entityType).toBe("ARC");
      expect(doc.entityId).toBe("arc-101-uuid");
      expect(doc.metadata.type).toBe("CANON");
      expect(doc.metadata.startEpisodeNumber).toBe(213);
      expect(doc.metadata.endEpisodeNumber).toBe(229);

      expect(doc.content).toContain("# Arc: Arrancar: Decisive Battle of Karakura");
      expect(doc.content).toContain("Episodes 213 - 229 | Chapters 316 - 340");
      expect(doc.content).toContain("Baraggan Louisenbairn vs. Soi Fon");
    });
  });

  describe("OrganizationDocumentBuilder", () => {
    it("should build an organization document with hierarchy and key members", () => {
      const mockOrg = {
        id: "org-202-uuid",
        name: "Gotei 13",
        slug: "gotei-13",
        type: "MILITARY",
        description: "The primary military branch of Soul Society tasked with defending Seireitei and purifying Hollows.",
        parent: { name: "Central 46" },
        children: [{ name: "Squad 1" }, { name: "Squad 2" }],
        members: [
          { character: { name: "Genryusai Shigekuni Yamamoto" }, role: "Captain-Commander" },
          { character: { name: "Shunsui Kyoraku" }, role: "Captain of Squad 8" },
        ],
      };

      const doc = organizationDocumentBuilder.build(mockOrg);

      expect(doc.entityType).toBe("ORGANIZATION");
      expect(doc.entityId).toBe("org-202-uuid");
      expect(doc.metadata.parent).toBe("Central 46");

      expect(doc.content).toContain("# Organization: Gotei 13");
      expect(doc.content).toContain("Parent Organization\nCentral 46");
      expect(doc.content).toContain("Sub-Divisions & Branches\nSquad 1, Squad 2");
      expect(doc.content).toContain("Genryusai Shigekuni Yamamoto (Captain-Commander)");
    });
  });

  describe("PowerDocumentBuilder", () => {
    it("should build a power document with wielder and mechanics", () => {
      const mockPower = {
        id: "power-303-uuid",
        name: "Hado #90: Kurohitsugi",
        type: "OFFENSIVE",
        source: "KIDO",
        description: "Envelops the target in a black box of gravitational force and impales them with torrents of needles.",
        character: { name: "Sosuke Aizen" },
        transformation: { name: "Hokyoku Fusion" },
      };

      const doc = powerDocumentBuilder.build(mockPower);

      expect(doc.entityType).toBe("POWER");
      expect(doc.entityId).toBe("power-303-uuid");
      expect(doc.metadata.name).toBe("Hado #90: Kurohitsugi");
      expect(doc.metadata.source).toBe("KIDO");

      expect(doc.content).toContain("# Power: Hado #90: Kurohitsugi");
      expect(doc.content).toContain("Type: OFFENSIVE | Source: KIDO");
      expect(doc.content).toContain("Wielded By\nSosuke Aizen");
      expect(doc.content).toContain("Unlocked In Transformation\nHokyoku Fusion");
      expect(doc.content).toContain("black box of gravitational force");
    });
  });

  describe("TransformationDocumentBuilder", () => {
    it("should build a transformation document with powers and debut info", () => {
      const mockTransformation = {
        id: "trans-404-uuid",
        name: "Resurreccion: Segunda Etapa",
        type: "SEGUNDA_ETAPA",
        description: "The second release state unique to Ulquiorra Cifer, unleashing immense spiritual density.",
        character: { name: "Ulquiorra Cifer" },
        zanpakuto: { name: "Murcielago" },
        powers: [{ name: "Lanza del Relampago", description: "A javelin of explosive green spiritual energy." }],
        firstEpisode: { number: 271, title: "Ichigo Dies! Orihime's Cry in Tears" },
        firstFight: { title: "Ichigo Kurosaki vs. Ulquiorra Cifer" },
      };

      const doc = transformationDocumentBuilder.build(mockTransformation);

      expect(doc.entityType).toBe("TRANSFORMATION");
      expect(doc.entityId).toBe("trans-404-uuid");
      expect(doc.metadata.name).toBe("Resurreccion: Segunda Etapa");
      expect(doc.metadata.type).toBe("SEGUNDA_ETAPA");

      expect(doc.content).toContain("# Transformation: Resurreccion: Segunda Etapa");
      expect(doc.content).toContain("Wielded By\nUlquiorra Cifer");
      expect(doc.content).toContain("Associated Zanpakuto\nMurcielago");
      expect(doc.content).toContain("**Lanza del Relampago**: A javelin of explosive green spiritual energy.");
      expect(doc.content).toContain("First Battle: \"Ichigo Kurosaki vs. Ulquiorra Cifer\"");
    });
  });

  describe("Builder Registry & Helper Function", () => {
    it("should register all 7 builders in BUILDERS_MAP", () => {
      const expectedKeys = [
        "CHARACTER",
        "FIGHT",
        "QUOTE",
        "ARC",
        "ORGANIZATION",
        "POWER",
        "TRANSFORMATION",
      ];
      expect(Object.keys(BUILDERS_MAP).sort()).toEqual(expectedKeys.sort());
    });

    it("should build a document via buildSemanticDocument helper function", () => {
      const doc = buildSemanticDocument("CHARACTER", {
        id: "reg-char-1",
        name: "Kisuke Urahara",
      });
      expect(doc.entityType).toBe("CHARACTER");
      expect(doc.entityId).toBe("reg-char-1");
      expect(doc.content).toContain("# Character: Kisuke Urahara");
    });

    it("should throw a clear error for unregistered entity type", () => {
      expect(() => buildSemanticDocument("UNKNOWN_TYPE", { id: "1" })).toThrow(
        'No document builder registered for entity type: "UNKNOWN_TYPE"'
      );
    });
  });
});
