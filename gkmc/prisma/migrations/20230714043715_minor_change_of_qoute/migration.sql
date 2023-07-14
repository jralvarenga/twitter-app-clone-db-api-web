/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Quote` table. All the data in the column will be lost.
  - Added the required column `quoteOf` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_reviewId_fkey";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "reviewId",
ADD COLUMN     "quoteOf" INTEGER NOT NULL;
