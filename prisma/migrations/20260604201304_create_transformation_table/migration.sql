-- CreateEnum
CREATE TYPE "TransformationType" AS ENUM ('SHIKAI', 'BANKAI', 'RESURRECCION', 'SEGUNDA_ETAPA', 'HOLLOWFICATION', 'VOLLSTANDIG', 'FULLBRING', 'FINAL_FORM', 'OTHER');

-- CreateTable
CREATE TABLE "Transformation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TransformationType" NOT NULL,
    "description" TEXT,
    "characterId" TEXT NOT NULL,
    "firstEpisodeId" TEXT,
    "firstFightId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Transformation_characterId_idx" ON "Transformation"("characterId");

-- CreateIndex
CREATE INDEX "Transformation_type_idx" ON "Transformation"("type");

-- AddForeignKey
ALTER TABLE "Transformation" ADD CONSTRAINT "Transformation_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transformation" ADD CONSTRAINT "Transformation_firstEpisodeId_fkey" FOREIGN KEY ("firstEpisodeId") REFERENCES "Episode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transformation" ADD CONSTRAINT "Transformation_firstFightId_fkey" FOREIGN KEY ("firstFightId") REFERENCES "Fight"("id") ON DELETE SET NULL ON UPDATE CASCADE;
