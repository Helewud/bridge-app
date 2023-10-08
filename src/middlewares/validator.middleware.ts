import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export const bodyValidator =
  (schema: new (...args: any[]) => any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!schema) {
        next();
        return;
      }

      const plainData = req.body;
      const obj = plainToClass(schema, plainData);

      const errors = await validate(obj);

      if (errors.length > 0) {
        next(errors as any);
        return;
      }

      req.body = obj;
      next();
    } catch (error) {
      next(error);
    }
  };

// export const paramsValidator =
//   (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
//     console.log(schema);

//     console.log(req.body);
//     schema.parse(req.body);
//   };

// export const queryValidator =
//   (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
//     console.log(schema);

//     console.log(req.body);
//     schema.parse(req.body);
//   };
