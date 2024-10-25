import { send } from "../interfaces/api.interface";
import { MongooseError } from "mongoose";
import { Response } from "express";

/*--------------------------------------------------handler--------------------------------------------------*/
/**
 * Nos permite manejar los errores que se puedan presentar al momento de ejecutar la solicitud
 * 
 * Este handler esta diseñado para solicitudes express (req, res), por tanto, es usual verle en los controladores
 * @param {Response} res - Objeto de respuesta Express.
 * @param {unknown} e - Error desconocido; puede ser de cualquier tipo.
 * @param {string} message - Mensaje que refiere a la procedencia de esta solicitud fallida
 * @example "crear departamento", "actualizar departamento" etc
 */
export const handlerErrorResponse = (res: Response, e: unknown, message: string) => {
  isMongooseError(res, e, message);
  isUnknownError(res, e, message);
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------errors response--------------------------------------------------*/
/**
 * Manejador de errores de mongoose
 * @param {Response} res - Objeto de respuesta Express.
 * @param {unknown} e - Error desconocido; puede ser de cualquier tipo.
 * @param {string} message - Mensaje que refiere a la procedencia de esta solicitud fallida
 */
export const isMongooseError = (res: Response, e: unknown, message: string) => {
  if (e instanceof MongooseError) return send(res, 500, `
    Error interno del servidor al ${message}: 
    Error mongoose: ${e.name} => ${e.message}
  `)
}

/**
 * Manejador de errores desconocidos
 * @param {Response} res - Objeto de respuesta Express.
 * @param {unknown} e - Error desconocido; puede ser de cualquier tipo.
 * @param {string} message - Mensaje que refiere a la procedencia de esta solicitud fallida
 */
export const isUnknownError = (res: Response, e: unknown, message: string) => {
  return send(res, 500, `Error interno del servidor al ${message}: ${e}`)
}
/*---------------------------------------------------------------------------------------------------------*/