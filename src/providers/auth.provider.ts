import { User } from "@prisma/client";
import express from "express";
import { injectable } from "inversify";
import { interfaces } from "inversify-express-utils";
import { AppError } from "../utils/error.helper";

@injectable()
export class AuthProvider implements interfaces.AuthProvider {
  async getUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<interfaces.Principal> {
    const bearerToken = String(req?.headers?.authorization);
    const token = bearerToken.split(" ")[1];

    if (!token) {
      next(new AppError("Invalid auth token!", "BAD_REQUEST"));
    }

    // decode the jwt
    // get the details

    const principal = new Principal({});
    return principal;
  }
}

class Principal<T> implements interfaces.Principal {
  public details: T;

  public constructor(details: T) {
    this.details = details;
  }

  public isAuthenticated(): Promise<boolean> {
    return Promise.resolve(false);
  }

  public isResourceOwner(resourceId: unknown): Promise<boolean> {
    return Promise.resolve(false);
  }

  public isInRole(role: string): Promise<boolean> {
    const user = this.details as User;

    return Promise.resolve(role === user.role);
  }
}
