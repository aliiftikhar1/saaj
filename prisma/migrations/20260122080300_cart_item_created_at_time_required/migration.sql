/*
  Warnings:

  - Made the column `createdAt` on table `CartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uodatedAt` on table `CartItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "uodatedAt" SET NOT NULL;
