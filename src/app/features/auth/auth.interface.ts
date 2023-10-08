import { Roles } from "@prisma/client";
import { TokenType } from "../../../common/constant";

export interface IJwtPayload {
  email: string;
  id: string;
  role: Roles;
}

export interface Token {
  type: TokenType;
  identifier: string;
}
