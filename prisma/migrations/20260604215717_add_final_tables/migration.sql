/*
  Warnings:

  - The values [CITY,BUILDING,DIMENSION] on the enum `LocationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `imageUrl` on the `Character` table. All the data in the column will be lost.
  - The primary key for the `CharacterOrganization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `outcome` column on the `FightParticipant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[slug]` on the table `Arc` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Arc` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Zanpakuto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Zanpakuto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Arc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Character` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `CharacterOrganization` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `slug` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Zanpakuto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SourceMaterial" AS ENUM ('MANGA', 'ANIME', 'MOVIE', 'OVA', 'NOVEL', 'GAME');

-- CreateEnum
CREATE TYPE "FightOutcome" AS ENUM ('WIN', 'LOSS', 'DRAW', 'INTERRUPTED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "CharacterImageType" AS ENUM ('PROFILE', 'ANIME', 'MANGA', 'BANKAI', 'SHIKAI', 'TYBW', 'PROMOTIONAL', 'OTHER');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('BATTLE', 'DEATH', 'REVEAL', 'BETRAYAL', 'TRANSFORMATION', 'POWER_GAIN', 'POWER_LOSS', 'RESCUE', 'INVASION', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "LocationType_new" AS ENUM ('WORLD', 'REGION', 'STRUCTURE', 'OTHER');
ALTER TABLE "Location" ALTER COLUMN "type" TYPE "LocationType_new" USING ("type"::text::"LocationType_new");
ALTER TYPE "LocationType" RENAME TO "LocationType_old";
ALTER TYPE "LocationType_new" RENAME TO "LocationType";
DROP TYPE "public"."LocationType_old";
COMMIT;

-- DropIndex
DROP INDEX "Zanpakuto_name_idx";

-- AlterTable
ALTER TABLE "Arc" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "imageUrl",
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CharacterOrganization" DROP CONSTRAINT "CharacterOrganization_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "CharacterOrganization_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "FightParticipant" DROP COLUMN "outcome",
ADD COLUMN     "outcome" "FightOutcome" NOT NULL DEFAULT 'UNKNOWN';

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Power" ADD COLUMN     "isCanonical" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sourceMaterial" "SourceMaterial" NOT NULL DEFAULT 'MANGA';

-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "isCanonical" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sourceMaterial" "SourceMaterial" NOT NULL DEFAULT 'MANGA';

-- AlterTable
ALTER TABLE "Transformation" ADD COLUMN     "isCanonical" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sourceMaterial" "SourceMaterial" NOT NULL DEFAULT 'MANGA';

-- AlterTable
ALTER TABLE "Zanpakuto" ADD COLUMN     "slug" TEXT NOT NULL;

-- DropEnum
DROP TYPE "FightOutCome";

-- CreateTable
CREATE TABLE "ZanpakutoAlias" (
    "id" TEXT NOT NULL,
    "zanpakutoId" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ZanpakutoAlias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterAppearance" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,
    "isFirstAppearance" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CharacterAppearance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterImage" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "type" "CharacterImageType" NOT NULL DEFAULT 'PROFILE',
    "source" TEXT,
    "altText" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "description" TEXT,
    "isCanonical" BOOLEAN NOT NULL DEFAULT true,
    "sourceMaterial" "SourceMaterial" NOT NULL DEFAULT 'MANGA',
    "episodeId" TEXT,
    "arcId" TEXT,
    "locationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventParticipant" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "role" TEXT,

    CONSTRAINT "EventParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ZanpakutoAlias_alias_idx" ON "ZanpakutoAlias"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "ZanpakutoAlias_zanpakutoId_alias_key" ON "ZanpakutoAlias"("zanpakutoId", "alias");

-- CreateIndex
CREATE INDEX "CharacterAppearance_characterId_idx" ON "CharacterAppearance"("characterId");

-- CreateIndex
CREATE INDEX "CharacterAppearance_episodeId_idx" ON "CharacterAppearance"("episodeId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterAppearance_characterId_episodeId_key" ON "CharacterAppearance"("characterId", "episodeId");

-- CreateIndex
CREATE INDEX "CharacterImage_characterId_idx" ON "CharacterImage"("characterId");

-- CreateIndex
CREATE INDEX "CharacterImage_type_idx" ON "CharacterImage"("type");

-- CreateIndex
CREATE INDEX "CharacterImage_isPrimary_idx" ON "CharacterImage"("isPrimary");

-- CreateIndex
CREATE INDEX "CharacterImage_characterId_isPrimary_idx" ON "CharacterImage"("characterId", "isPrimary");

-- CreateIndex
CREATE INDEX "Event_type_idx" ON "Event"("type");

-- CreateIndex
CREATE INDEX "Event_episodeId_idx" ON "Event"("episodeId");

-- CreateIndex
CREATE INDEX "Event_arcId_idx" ON "Event"("arcId");

-- CreateIndex
CREATE INDEX "Event_locationId_idx" ON "Event"("locationId");

-- CreateIndex
CREATE INDEX "EventParticipant_characterId_idx" ON "EventParticipant"("characterId");

-- CreateIndex
CREATE INDEX "EventParticipant_eventId_idx" ON "EventParticipant"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "EventParticipant_eventId_characterId_key" ON "EventParticipant"("eventId", "characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Arc_slug_key" ON "Arc"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Arc_name_key" ON "Arc"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Character_slug_key" ON "Character"("slug");

-- CreateIndex
CREATE INDEX "CharacterOrganization_characterId_idx" ON "CharacterOrganization"("characterId");

-- CreateIndex
CREATE INDEX "CharacterOrganization_organizationId_idx" ON "CharacterOrganization"("organizationId");

-- CreateIndex
CREATE INDEX "CharacterOrganization_characterId_leftAt_idx" ON "CharacterOrganization"("characterId", "leftAt");

-- CreateIndex
CREATE INDEX "CharacterOrganization_organizationId_leftAt_idx" ON "CharacterOrganization"("organizationId", "leftAt");

-- CreateIndex
CREATE INDEX "Episode_airDate_idx" ON "Episode"("airDate");

-- CreateIndex
CREATE INDEX "Fight_locationId_idx" ON "Fight"("locationId");

-- CreateIndex
CREATE INDEX "FightParticipant_fightId_idx" ON "FightParticipant"("fightId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_slug_key" ON "Location"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE INDEX "Power_source_idx" ON "Power"("source");

-- CreateIndex
CREATE INDEX "Power_transformationId_idx" ON "Power"("transformationId");

-- CreateIndex
CREATE INDEX "Transformation_firstEpisodeId_idx" ON "Transformation"("firstEpisodeId");

-- CreateIndex
CREATE INDEX "Transformation_firstFightId_idx" ON "Transformation"("firstFightId");

-- CreateIndex
CREATE INDEX "Transformation_zanpakutoId_idx" ON "Transformation"("zanpakutoId");

-- CreateIndex
CREATE UNIQUE INDEX "Zanpakuto_slug_key" ON "Zanpakuto"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Zanpakuto_name_key" ON "Zanpakuto"("name");

-- AddForeignKey
ALTER TABLE "ZanpakutoAlias" ADD CONSTRAINT "ZanpakutoAlias_zanpakutoId_fkey" FOREIGN KEY ("zanpakutoId") REFERENCES "Zanpakuto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAppearance" ADD CONSTRAINT "CharacterAppearance_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAppearance" ADD CONSTRAINT "CharacterAppearance_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterImage" ADD CONSTRAINT "CharacterImage_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_arcId_fkey" FOREIGN KEY ("arcId") REFERENCES "Arc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipant" ADD CONSTRAINT "EventParticipant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipant" ADD CONSTRAINT "EventParticipant_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
