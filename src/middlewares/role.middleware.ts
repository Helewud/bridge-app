import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error.helper";
import { BaseMiddleware } from "inversify-express-utils";
import { Roles } from "@prisma/client";

export class TenantRole extends BaseMiddleware {
  constructor() {
    super();
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== Roles.TENANT) {
        next(new AppError("User not cleared for this action!", "UNAUTHORIZED"));
      }

      next();
    } catch (error: any) {
      next(error);
    }
  }
}

export class LandlordRole extends BaseMiddleware {
  constructor() {
    super();
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== Roles.LANDLORD) {
        next(new AppError("User not cleared for this action!", "UNAUTHORIZED"));
      }

      next();
    } catch (error: any) {
      next(error);
    }
  }
}
