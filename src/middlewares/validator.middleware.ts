import { Request, Response, NextFunction } from "express"
import { send } from "../interfaces/api.interface"
import { ZodType, ZodError } from "zod"

const validateSchema = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body)
    next()
  } catch (e: unknown) {
    if (e instanceof ZodError) return send(res, 400, e.message.replace(/[\n\s]/g, ''))
    send(res, 500, `Error interno del servidor al validar el esquema: ${e}`)

    /*
    "[\n  {\n    \"code\": \"invalid_type\",\n    \"expected\": \"string\",\n    \"received\": \"undefined\",\n    \"path\": [\n      \"email\"\n    ],\n    \"message\": \"El correo electrónico es requerido\"\n  },\n  {\n    \"code\": \"invalid_type\",\n    \"expected\": \"string\",\n    \"received\": \"undefined\",\n    \"path\": [\n      \"password\"\n    ],\n    \"message\": \"La contraseña es requerida\"\n  }\n]"
     */
  }
}

export default validateSchema