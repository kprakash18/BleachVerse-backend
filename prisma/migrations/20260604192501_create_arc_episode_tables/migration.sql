-- CreateEnum
CREATE TYPE "ArcType" AS ENUM ('CANON', 'MOVIE', 'FILLER', 'OVA');

-- CreateEnum
CREATE TYPE "EpisodeType" AS ENUM ('FILLER', 'CANON', 'MIXED', 'RECAP');

-- CreateTable
CREATE TABLE "Arc" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ArcType" NOT NULL,
    "description" TEXT,
    "startEpisodeNumber" INTEGER,
    "endEpisodeNumber" INTEGER,
    "startChapter" INTEGER,
    "endChapter" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Arc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "type" "EpisodeType" NOT NULL,
    "synopsis" TEXT,
    "airDate" TIMESTAMP(3),
    "arcId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Arc_type_idx" ON "Arc"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_number_key" ON "Episode"("number");

-- CreateIndex
CREATE INDEX "Episode_arcId_idx" ON "Episode"("arcId");

-- CreateIndex
CREATE INDEX "Episode_type_idx" ON "Episode"("type");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_arcId_fkey" FOREIGN KEY ("arcId") REFERENCES "Arc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
