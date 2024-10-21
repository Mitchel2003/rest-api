import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
declare const validateSchema: (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default validateSchema;
