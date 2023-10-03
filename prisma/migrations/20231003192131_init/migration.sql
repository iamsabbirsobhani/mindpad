/*
  Warnings:

  - You are about to drop the column `name` on the `file` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" DROP COLUMN "name",
ADD COLUMN     "fileName" TEXT NOT NULL;
