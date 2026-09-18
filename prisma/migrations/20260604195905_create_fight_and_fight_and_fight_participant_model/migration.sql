-- CreateEnum
CREATE TYPE "FightType" AS ENUM ('DUEL', 'TEAM_BATTLE', 'WAR', 'TRAINING');

-- CreateEnum
CREATE TYPE "FightOutCome" AS ENUM ('WIN', 'LOSS', 'DRAW', 'INTERRUPTED', 'UNKNOWN');

-- CreateTable
CREATE TABLE "Fight" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "FightType" NOT NULL DEFAULT 'DUEL',
    "location" TEXT,
    "summary" TEXT,
    "episodeId" TEXT,
    "arcId" TEXT,
    "winnerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FightParticipant" (
    "id" TEXT NOT NULL,
    "fightId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "outcome" "FightOutCome" NOT NULL DEFAULT 'UNKNOWN',

    CONSTRAINT "FightParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Fight_episodeId_idx" ON "Fight"("episodeId");

-- CreateIndex
CREATE INDEX "Fight_arcId_idx" ON "Fight"("arcId");

-- CreateIndex
CREATE INDEX "Fight_winnerId_idx" ON "Fight"("winnerId");

-- CreateIndex
CREATE INDEX "Fight_type_idx" ON "Fight"("type");

-- CreateIndex
CREATE INDEX "FightParticipant_characterId_idx" ON "FightParticipant"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "FightParticipant_fightId_characterId_key" ON "FightParticipant"("fightId", "characterId");

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_arcId_fkey" FOREIGN KEY ("arcId") REFERENCES "Arc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightParticipant" ADD CONSTRAINT "FightParticipant_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FightParticipant" ADD CONSTRAINT "FightParticipant_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
