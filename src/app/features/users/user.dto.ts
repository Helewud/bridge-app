import { IsUUID, IsNotEmpty } from "class-validator";

export class GetUserProfileDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
