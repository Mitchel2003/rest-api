import { Result, send } from "@/interfaces/api.interface";
import { FirebaseError } from "firebase/app";
import { MongooseError } from "mongoose";
import { Response } from "express";

/*--------------------------------------------------handlers--------------------------------------------------*/
/**
 * Nos ayuda a manejar las operaciones en los servicios.
 * Engloba un try catch para controlar los errores; se trabaja con un resultado de tipo Result<T>
 * @param {Function} operation - La operación a realizar.
 * @param {string} error - El contexto del error; brinda información sobre la operación que se está realizando.
 * @returns {Promise<Result<T>>} - El resultado de la operación (value o error)
 */
export const handlerService = async <T>(operation: () => Promise<T>, error: string): Promise<Result<T>> => {
  try {
    const result = await operation()
    return { value: result }
  } catch (e) { return { error: `Error al ${error}: ${e instanceof Error ? e.message : String(e)}` } }
}

/**
 * Nos permite manejar los errores que se puedan presentar al momento de ejecutar la solicitud
 * Este handler esta diseñado para solicitudes express (req, res), por tanto, es usual verle en los controladores
 * @param {Response} res - Objeto de respuesta Express.
 * @param {unknown} e - Error desconocido; puede ser de cualquier tipo.
 * @param {string} message - Mensaje que refiere a la solicitud en contexto fallida.
 * @example "crear departamento", "actualizar departamento" etc
 */
export const handlerErrorResponse = (res: Response, e: unknown, message: string) => {
  const path = `Error interno del servidor al ${message}`
  isMongooseError(res, e, path);
  isFirebaseError(res, e, path);
  isUnknownError(res, e, path);
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------errors response--------------------------------------------------*/
/**
 * Manejador de errores de mongoose
 * @param {Response} res - Objeto de respuesta Express.
 * @param {unknown} e - Error desconocido; puede ser de cualquier tipo.
 * @param {string} path - Mensaje que refiere a la procedencia de esta solicitud fallida
 */
export const isMongooseError = (res: Response, e: unknown, path: string) => {
  if (e instanceof MongooseError) return send(res, 500, `${path}: Error mongoose: ${e.name} => ${e.message}`)
}

/**
 * Manejador de errores de firebase
 * @param {Response} res - Objeto de respuesta Express.
 * @param {unknown} e - Error desconocido; puede ser de cualquier tipo.
 * @param {string} path - Mensaje que refiere a la procedencia de esta solicitud fallida
 */
export const isFirebaseError = (res: Response, e: unknown, path: string) => {
  if (e instanceof FirebaseError) return send(res, 500, `${path}: Error firebase(${e.code}): ${e.name} => ${e.message}`)
}

/**
 * Manejador de errores desconocidos
 * @param {Response} res - Objeto de respuesta Express.
 * @param {unknown} e - Error desconocido; puede ser de cualquier tipo.
 * @param {string} path - Mensaje que refiere a la procedencia de esta solicitud fallida
 */
export const isUnknownError = (res: Response, e: unknown, path: string) => {
  return send(res, 500, `${path}: ${e}`)
}
/*---------------------------------------------------------------------------------------------------------*/