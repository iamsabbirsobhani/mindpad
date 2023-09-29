-- CreateTable
CREATE TABLE "Pad" (
    "id" SERIAL NOT NULL,
    "authorEmail" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorProfilePhoto" TEXT,
    "note" TEXT NOT NULL,
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pad_pkey" PRIMARY KEY ("id")
);

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

-- AddForeignKey
ALTER TABLE "PadStyle" ADD CONSTRAINT "PadStyle_padId_fkey" FOREIGN KEY ("padId") REFERENCES "Pad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
