/*
  Warnings:

  - You are about to drop the column `toughtId` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `toughtId` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `toughtId` on the `ReviewComment` table. All the data in the column will be lost.
  - You are about to drop the `Tought` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `thoughtId` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thoughtId` to the `ReviewComment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_toughtId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_toughtId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewComment" DROP CONSTRAINT "ReviewComment_toughtId_fkey";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "toughtId",
ADD COLUMN     "thoughtId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "toughtId",
ADD COLUMN     "thoughtId" INTEGER;

-- AlterTable
ALTER TABLE "ReviewComment" DROP COLUMN "toughtId",
ADD COLUMN     "thoughtId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Tought";

-- CreateTable
CREATE TABLE "Thought" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "reviewId" INTEGER,

    CONSTRAINT "Thought_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewComment" ADD CONSTRAINT "ReviewComment_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
