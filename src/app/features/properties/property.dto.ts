import { PropertyStatus } from "@prisma/client";
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
  isNotEmpty,
} from "class-validator";

export class AddPropertyDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumberString()
  @IsNotEmpty()
  numberOfRooms: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @ArrayNotEmpty()
  @IsString({ each: true })
  amenities: string[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ArrayNotEmpty()
  @IsString({ each: true })
  media: string[];
}

export class EditPropertyDto {
  @IsUUID()
  @IsOptional()
  propertyId: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsNumberString()
  @IsOptional()
  numberOfRooms?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @IsString({ each: true })
  @IsOptional()
  amenities?: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @IsOptional()
  media?: string[];
}

export class GetPropertiesDto {
  @IsEnum(PropertyStatus)
  @IsOptional()
  status?: PropertyStatus;

  @IsDateString()
  @IsNotEmpty()
  @ValidateIf((item) => isNotEmpty(item.endDate))
  startDate?: string;

  @IsDateString()
  @IsNotEmpty()
  @ValidateIf((item) => isNotEmpty(item.startDate))
  endDate?: string;

  @IsNumberString()
  @IsNotEmpty()
  @ValidateIf((item) => isNotEmpty(item.endPrice))
  startPrice?: string;

  @IsNumberString()
  @IsNotEmpty()
  @ValidateIf((item) => isNotEmpty(item.startPrice))
  endPrice?: string;

  @IsNumberString()
  @IsNotEmpty()
  @ValidateIf((item) => isNotEmpty(item.endNumberOfRooms))
  startNumberOfRooms?: string;

  @IsNumberString()
  @IsNotEmpty()
  @ValidateIf((item) => isNotEmpty(item.startNumberOfRooms))
  endNumberOfRooms?: string;

  @IsNumberString()
  @IsOptional()
  limit?: string;

  @IsNumberString()
  @IsOptional()
  page?: string;
}

export class GetPropertyByIdDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
