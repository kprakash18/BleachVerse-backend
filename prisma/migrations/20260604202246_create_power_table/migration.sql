-- CreateEnum
CREATE TYPE "PowerType" AS ENUM ('OFFENSIVE', 'DEFENSIVE', 'SUPPORT', 'HEALING', 'MOVEMENT', 'PASSIVE', 'OTHER');

-- CreateTable
CREATE TABLE "Power" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PowerType" NOT NULL,
    "description" TEXT,
    "characterId" TEXT NOT NULL,
    "transformationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Power_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Power_characterId_idx" ON "Power"("characterId");

-- CreateIndex
CREATE INDEX "Power_type_idx" ON "Power"("type");

-- AddForeignKey
ALTER TABLE "Power" ADD CONSTRAINT "Power_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Power" ADD CONSTRAINT "Power_transformationId_fkey" FOREIGN KEY ("transformationId") REFERENCES "Transformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
