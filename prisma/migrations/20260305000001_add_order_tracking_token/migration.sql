-- Add trackingToken to Order for customer-facing order tracking
ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "trackingToken" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "Order_trackingToken_key" ON "Order"("trackingToken");
