/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `reviewedMusicId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `ReviewedMusic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `musicId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thoughtId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reviewedMusicId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "reviewId";

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "reviewId";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "description",
DROP COLUMN "reviewedMusicId",
DROP COLUMN "title",
ADD COLUMN     "musicId" INTEGER NOT NULL,
ADD COLUMN     "rankingId" INTEGER,
ADD COLUMN     "thoughtId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ReviewedMusic";

-- CreateTable
CREATE TABLE "Music" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ranking" (
    "id" SERIAL NOT NULL,
    "position" INTEGER NOT NULL,
    "song" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "musicId" INTEGER NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Music_name_key" ON "Music"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Music_artist_key" ON "Music"("artist");

-- CreateIndex
CREATE UNIQUE INDEX "Music_attachment_key" ON "Music"("attachment");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "Ranking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
