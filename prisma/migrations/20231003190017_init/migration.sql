-- CreateTable
CREATE TABLE "file" (
    "id" SERIAL NOT NULL,
    "authorEmail" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileType" TEXT,
    "filesize" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);
