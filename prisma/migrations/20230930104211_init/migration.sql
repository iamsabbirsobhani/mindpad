-- DropForeignKey
ALTER TABLE "PadStyle" DROP CONSTRAINT "PadStyle_padId_fkey";

-- AlterTable
ALTER TABLE "PadStyle" ALTER COLUMN "padId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PadStyle" ADD CONSTRAINT "PadStyle_padId_fkey" FOREIGN KEY ("padId") REFERENCES "Pad"("id") ON DELETE SET NULL ON UPDATE CASCADE;
