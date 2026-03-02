/*
  Warnings:

  - Added the required column `blogImageUrl` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "blogImageUrl" TEXT NOT NULL;
