/*
  Warnings:

  - You are about to drop the column `customName` on the `Size` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Size` table. All the data in the column will be lost.
  - Added the required column `label` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Size" DROP COLUMN "customName",
DROP COLUMN "name",
ADD COLUMN     "label" TEXT NOT NULL,
ALTER COLUMN "stock" SET DEFAULT 10;
