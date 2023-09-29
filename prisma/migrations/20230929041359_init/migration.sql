/*
  Warnings:

  - You are about to drop the column `authorId` on the `Pad` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[authorEmail]` on the table `Pad` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorEmail` to the `Pad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `Pad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Pad` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pad" DROP CONSTRAINT "Pad_authorId_fkey";

-- AlterTable
ALTER TABLE "Pad" DROP COLUMN "authorId",
ADD COLUMN     "authorEmail" TEXT NOT NULL,
ADD COLUMN     "authorName" TEXT NOT NULL,
ADD COLUMN     "authorProfilePhoto" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "PadStyle" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "hover" TEXT NOT NULL,
    "padId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PadStyle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pad_authorEmail_key" ON "Pad"("authorEmail");

-- AddForeignKey
ALTER TABLE "PadStyle" ADD CONSTRAINT "PadStyle_padId_fkey" FOREIGN KEY ("padId") REFERENCES "Pad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
