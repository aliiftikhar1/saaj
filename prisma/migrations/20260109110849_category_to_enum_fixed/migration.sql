/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductCategoryEnum" AS ENUM ('DRESSES', 'OUTERWEAR', 'TOPS_BOTTOMS', 'BAGS_ACCESSORIES', 'SHOES');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId",
ADD COLUMN     "category" "ProductCategoryEnum" NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropEnum
DROP TYPE "CategoryEnum";
