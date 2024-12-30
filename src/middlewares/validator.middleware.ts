import { Request, Response, NextFunction } from "express"
import { handlerResponse } from "@/errors/handler"
import { ZodType } from "zod"

const validateSchema = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
  try { schema.parse(req.body); next() }
  catch (e: unknown) { handlerResponse(res, e, "validar esquema") }
}

export default validateSchema