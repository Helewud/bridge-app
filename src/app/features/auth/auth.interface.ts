import { Roles } from "@prisma/client";

export interface IJwtPayload {
  email: string;
  id: string;
  role: Roles;
}
