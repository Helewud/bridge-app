import express, { Request } from "express";
import { PassportStatic } from "passport";
import { Strategy, StrategyOptions, VerifiedCallback } from "passport-jwt";
import { User } from "@prisma/client";
import { IJwtPayload } from "../app/features/auth/auth.interface";
import envConfig from "../config/env.config";

export const passportConfig = (
  passport: PassportStatic,
  app: express.Application
) => {
  const tokenExtractor = () => {
    app.use(async (req, res, next) => {
      if (req.headers.authorization) {
        const bearerToken = String(req.headers.authorization);
        const token = bearerToken.split(" ")[1];
        req.headers.token = token;
      }
      next();
    });

    return (req: Request) => {
      let token = null;
      if (req && req.headers.token) token = String(req.headers.token);
      return token;
    };
  };

  const opts: StrategyOptions = {
    jwtFromRequest: tokenExtractor(),
    secretOrKey: envConfig.JWT_SECRET,
  };

  passport.use(
    new Strategy(
      opts,
      async (jwtPayload: IJwtPayload, done: VerifiedCallback) => {
        try {
          let user: User | undefined = undefined;
          if (jwtPayload.id) {
            //   const userServiceResponse = await userApiService.getUserById(
            //     jwtPayload.id,
            //     { handleNotFound: false }
            //   );
            //   if (userServiceResponse.data) user = userServiceResponse.data;
          }
          return done(null, user);
        } catch (error) {
          throw new Error("Passport initialization failed");
        }
      }
    )
  );
};
