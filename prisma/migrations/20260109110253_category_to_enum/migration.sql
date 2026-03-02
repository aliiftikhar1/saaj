/*
  Warnings:

  - Changed the type of `slug` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CategoryEnum" AS ENUM ('DRESSES', 'OUTERWEAR', 'TOPS_BOTTOMS', 'BAGS_ACCESSORIES', 'SHOES');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "slug",
ADD COLUMN     "slug" "CategoryEnum" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
