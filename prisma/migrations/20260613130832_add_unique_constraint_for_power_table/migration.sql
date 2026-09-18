/*
  Warnings:

  - A unique constraint covering the columns `[characterId,name]` on the table `Power` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Power_characterId_name_key" ON "Power"("characterId", "name");
