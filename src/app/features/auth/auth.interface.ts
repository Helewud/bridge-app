import { Roles } from "@prisma/client";
import { TokenType } from "../../../common/constant";

export interface IJwtPayload {
  id: string;
  role: Roles;
}

export interface Token {
  type: TokenType;
  identifier: string;
  token: string;
}
