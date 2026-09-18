/*
  Warnings:

  - Added the required column `source` to the `Power` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PowerSource" AS ENUM ('ZANPAKUTO', 'KIDO', 'HOLLOW', 'QUINCY', 'FULLBRING', 'NATURAL', 'OTHER');

-- AlterTable
ALTER TABLE "Power" ADD COLUMN     "source" "PowerSource" NOT NULL;
