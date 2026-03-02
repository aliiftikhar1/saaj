/*
  Warnings:

  - You are about to drop the column `customerAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerEmail` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhone` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeSessionId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_customerEmail_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerAddress",
DROP COLUMN "customerEmail",
DROP COLUMN "customerName",
DROP COLUMN "customerPhone",
ADD COLUMN     "billingCity" TEXT,
ADD COLUMN     "billingCountry" TEXT,
ADD COLUMN     "billingName" TEXT,
ADD COLUMN     "billingPostcode" TEXT,
ADD COLUMN     "billingState" TEXT,
ADD COLUMN     "billingStreetAddress" TEXT,
ADD COLUMN     "delieveryName" TEXT,
ADD COLUMN     "deliveryCity" TEXT,
ADD COLUMN     "deliveryCountry" TEXT,
ADD COLUMN     "deliveryEmail" TEXT,
ADD COLUMN     "deliveryPhone" TEXT,
ADD COLUMN     "deliveryPostcode" TEXT,
ADD COLUMN     "deliveryState" TEXT,
ADD COLUMN     "deliveryStreetAddress" TEXT,
ADD COLUMN     "stripeSessionId" TEXT,
ALTER COLUMN "paymentMethod" SET DEFAULT 'STRIPE';

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeSessionId_key" ON "Order"("stripeSessionId");

-- CreateIndex
CREATE INDEX "Order_deliveryEmail_idx" ON "Order"("deliveryEmail");
