-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "numberOfRooms" TEXT NOT NULL,
    "amenities" TEXT[],
    "description" TEXT NOT NULL,
    "media" TEXT[],
    "status" "PropertyStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_id_key" ON "Property"("id");
