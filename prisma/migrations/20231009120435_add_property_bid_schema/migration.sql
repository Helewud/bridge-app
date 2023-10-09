-- CreateEnum
CREATE TYPE "PropertyBidStatus" AS ENUM ('BID', 'ACCEPTED', 'REJECTED', 'REBID', 'COUNTER_BID');

-- CreateTable
CREATE TABLE "PropertyBid" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "propertyOwnerId" TEXT NOT NULL,
    "bidOwnerId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "index" INTEGER NOT NULL,
    "status" "PropertyBidStatus" NOT NULL,
    "rootBid" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyBid_id_key" ON "PropertyBid"("id");
