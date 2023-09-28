/*
  Warnings:

  - You are about to drop the column `important` on the `Pad` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pad" DROP COLUMN "important",
ADD COLUMN     "isImportant" BOOLEAN NOT NULL DEFAULT false;
