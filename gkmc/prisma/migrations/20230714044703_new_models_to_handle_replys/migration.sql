/*
  Warnings:

  - You are about to drop the column `replyOf` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `quoteOf` on the `Quote` table. All the data in the column will be lost.
  - Added the required column `commentOfThoughtId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quoteOfThoughtId` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "replyOf",
ADD COLUMN     "commentOfThoughtId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "quoteOf",
ADD COLUMN     "quoteOfThoughtId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "QuoteOfThought" (
    "id" SERIAL NOT NULL,
    "thoughtId" INTEGER NOT NULL,

    CONSTRAINT "QuoteOfThought_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentOfThought" (
    "id" SERIAL NOT NULL,
    "thoughtId" INTEGER NOT NULL,

    CONSTRAINT "CommentOfThought_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuoteOfThought" ADD CONSTRAINT "QuoteOfThought_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_quoteOfThoughtId_fkey" FOREIGN KEY ("quoteOfThoughtId") REFERENCES "QuoteOfThought"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentOfThought" ADD CONSTRAINT "CommentOfThought_thoughtId_fkey" FOREIGN KEY ("thoughtId") REFERENCES "Thought"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentOfThoughtId_fkey" FOREIGN KEY ("commentOfThoughtId") REFERENCES "CommentOfThought"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
