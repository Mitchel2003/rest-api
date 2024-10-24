import { Request, Response, NextFunction } from "express"
import { send } from "../interfaces/api.interface"
import { ZodType, ZodError } from "zod"

const validateSchema = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body)
    next()
  } catch (e: unknown) {
    if (e instanceof ZodError) return send(res, 400, e.message)
    send(res, 500, `Error interno del servidor al validar el esquema: ${e}`)
  }
}

export default validateSchema