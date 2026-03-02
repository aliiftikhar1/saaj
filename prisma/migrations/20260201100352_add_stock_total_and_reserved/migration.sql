/*
  Warnings:

  - You are about to drop the column `stock` on the `Size` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Size" DROP COLUMN "stock",
ADD COLUMN     "stockReserved" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stockTotal" INTEGER NOT NULL DEFAULT 10;
