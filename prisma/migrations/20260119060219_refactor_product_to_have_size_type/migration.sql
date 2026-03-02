-- CreateEnum
CREATE TYPE "SizeTypeEnum" AS ENUM ('Standard', 'ShoeSize', 'OneSize');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sizeType" "SizeTypeEnum";

-- DropEnum
DROP TYPE "SizeEnum";
