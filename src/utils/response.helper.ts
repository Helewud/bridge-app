import express from "express";
import { AppError } from "./error.helper";

export const resolve = async <T>(
  fn: Promise<Partial<T & { status: string; message: string }>>,
  res: express.Response
) => {
  try {
    const response = await fn;

    if (response.status === "error") {
      throw new AppError(
        response.message || "Something went wrong!",
        "BAD_REQUEST"
      );
    }

    return res.json(response);
  } catch (error) {
    throw new AppError(error as any, "BAD_REQUEST");
  }
};
