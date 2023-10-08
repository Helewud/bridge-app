import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error.helper";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = String(req?.headers?.authorization);
  const token = bearerToken.split(" ")[1];

  if (!token) {
    next(new AppError("Invalid auth token!", "BAD_REQUEST"));
  }

  // decode the jwt
  // get the details

  req.user = {
    id: "123456",
  };
  next();
};

export { authenticate };
