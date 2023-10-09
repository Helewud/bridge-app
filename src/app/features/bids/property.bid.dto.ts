import { PropertyBidStatus } from "@prisma/client";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateIf,
} from "class-validator";

export class TenantBidActionto {
  @IsUUID()
  @IsNotEmpty()
  propertyId: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class LandlordBidActionDto {
  @IsUUID()
  @IsNotEmpty()
  bidId: string;

  @IsEnum({
    COUNTER_BID: PropertyBidStatus.COUNTER_BID,
    REJECTED: PropertyBidStatus.REJECTED,
    ACCEPTED: PropertyBidStatus.ACCEPTED,
  })
  @IsNotEmpty()
  bidAction: string;

  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((item) => item.bidAction === PropertyBidStatus.COUNTER_BID)
  price?: number;
}

export class GetBidInfoDto {
  @IsUUID()
  @IsNotEmpty()
  bidId: string;
}
