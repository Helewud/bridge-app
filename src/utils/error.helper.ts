import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

// Custom error class to distinguish application errors from standard errors
class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: keyof typeof StatusCodes) {
    super(message);
    this.statusCode =
      StatusCodes[statusCode] || StatusCodes.INTERNAL_SERVER_ERROR;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware to handle application errors
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Default error status code and message
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = ReasonPhrases.INTERNAL_SERVER_ERROR;

  // Handle known application errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Log the error
  console.error(err);

  // Send an error response to the client
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export { AppError, errorHandler };
