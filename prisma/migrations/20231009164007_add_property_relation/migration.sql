-- AddForeignKey
ALTER TABLE "PropertyBid" ADD CONSTRAINT "PropertyBid_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
