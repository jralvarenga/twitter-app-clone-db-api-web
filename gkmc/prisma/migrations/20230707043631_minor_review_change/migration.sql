/*
  Warnings:

  - Made the column `reviewId` on table `Thought` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Thought" ALTER COLUMN "reviewId" SET NOT NULL;
