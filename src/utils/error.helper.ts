import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ValidationError } from "class-validator";

class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: keyof typeof StatusCodes) {
    // Check if the message starts with "Error:" and remove it if present

    super(message);
    this.statusCode =
      StatusCodes[statusCode] || StatusCodes.INTERNAL_SERVER_ERROR;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

function transformClassValidatorErrors(errors: ValidationError[]) {
  const messages: string[] = [];

  for (const error of errors) {
    if (error.constraints) {
      messages.push(...Object.values(error.constraints));
    }

    if (error.children && error.children.length > 0) {
      const childMessages = transformClassValidatorErrors(error.children);
      messages.push(...childMessages);
    }
  }

  return messages;
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    console.error(err);
    return;
  }

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: any = ReasonPhrases.INTERNAL_SERVER_ERROR;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  if (Array.isArray(err) && err[0] instanceof ValidationError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = transformClassValidatorErrors(err as ValidationError[]);
  }

  console.error(err);

  const formattedMessage =
    typeof message === "string" && message.startsWith("Error:")
      ? message.substring("Error:".length).trim()
      : message;

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: formattedMessage,
  });
};

export { AppError, errorHandler };
