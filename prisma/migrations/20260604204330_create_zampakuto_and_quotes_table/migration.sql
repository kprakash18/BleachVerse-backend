-- CreateEnum
CREATE TYPE "ZanpakutoType" AS ENUM ('NORMAL', 'DUAL', 'HYBRID');

-- CreateEnum
CREATE TYPE "QuoteCategory" AS ENUM ('MOTIVATIONAL', 'PHILOSOPHICAL', 'COMEDY', 'THREAT', 'BATTLE', 'EMOTIONAL', 'OTHER');

-- AlterTable
ALTER TABLE "Transformation" ADD COLUMN     "zanpakutoId" TEXT;

-- CreateTable
CREATE TABLE "Zanpakuto" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ZanpakutoType" NOT NULL DEFAULT 'NORMAL',
    "releaseCommand" TEXT,
    "spiritName" TEXT,
    "description" TEXT,
    "characterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zanpakuto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "category" "QuoteCategory" NOT NULL DEFAULT 'OTHER',
    "characterId" TEXT NOT NULL,
    "episodeId" TEXT,
    "arcId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Zanpakuto_characterId_idx" ON "Zanpakuto"("characterId");

-- CreateIndex
CREATE INDEX "Zanpakuto_name_idx" ON "Zanpakuto"("name");

-- CreateIndex
CREATE INDEX "Quote_characterId_idx" ON "Quote"("characterId");

-- CreateIndex
CREATE INDEX "Quote_episodeId_idx" ON "Quote"("episodeId");

-- CreateIndex
CREATE INDEX "Quote_arcId_idx" ON "Quote"("arcId");

-- CreateIndex
CREATE INDEX "Quote_category_idx" ON "Quote"("category");

-- AddForeignKey
ALTER TABLE "Transformation" ADD CONSTRAINT "Transformation_zanpakutoId_fkey" FOREIGN KEY ("zanpakutoId") REFERENCES "Zanpakuto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zanpakuto" ADD CONSTRAINT "Zanpakuto_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_arcId_fkey" FOREIGN KEY ("arcId") REFERENCES "Arc"("id") ON DELETE SET NULL ON UPDATE CASCADE;
