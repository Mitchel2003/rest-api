import { Request, Response, NextFunction } from "express"
import { handlerResponse } from "@/errors/handler"
import { ZodType } from "zod"

/**
 * Middleware que valida los campos del body de la request.
 * usamos zod para el schema de validacion.
 * @param schema - Schema de Zod para validar
 * @returns continua el flujo de la request o envia un error
 */
const validateSchema = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
  try { schema.parse(req.body); next() }
  catch (e) { handlerResponse(res, e, "validar esquema") }
}

export default validateSchema