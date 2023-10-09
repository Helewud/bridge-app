import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error.helper";
import { BaseMiddleware } from "inversify-express-utils";
import { inject } from "inversify";
import { Dependency } from "../utils/container.helper";
import { AuthService } from "../app/features/auth/auth.service";

export class Authenticate extends BaseMiddleware {
  constructor(
    @inject(Dependency.AuthService) private authService: AuthService
  ) {
    super();
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    try {
      const bearerToken = String(req?.headers?.authorization);
      const token = bearerToken.split(" ")[1];

      if (!token) {
        next(new AppError("Invalid or expired token!", "BAD_REQUEST"));
      }

      const payload = this.authService.validateJwtToken(token);
      const { data } = await this.authService.getUser(payload.id);

      if (!data.isVerified) {
        next(new AppError("Please verify account!", "UNAUTHORIZED"));
      }

      req.user = data;
      next();
    } catch (error: any) {
      next(error);
    }
  }
}
