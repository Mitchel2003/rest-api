import { Result, success, failure, send } from '@/interfaces/api.interface';
import HandlerErrorsMDB from '@/errors/mongodb.error';
import HandlerErrorsFB from '@/errors/firebase.error';
import ErrorAPI from '@/errors';

import { FirebaseError } from 'firebase/app';
import { MongooseError } from 'mongoose';
import { Response } from 'express';

/**
 * Maneja errores en respuestas HTTP de manera consistente.
 * Se halla implementado en los controladores.
 * @param {Response} res: respuesta HTTP
 * @param {unknown} e: error a normalizar
 * @param {string} context: contexto del error
 */
export function handlerResponse(res: Response, e: unknown, context: string): void {
  console.log(e)
  const { message, statusCode, code, details } = normalizeError(e, context);
  console.log(message, statusCode, code, details)
  send(res, statusCode, { message, code, details });
}

/**
 * Maneja operaciones asíncronas de los servicios, devolviendo un Result<T> (success o failure).
 * @param {Function} operation - La operación asíncrona a ejecutar.
 * @param {string} context - Representa el contexto en el que ocurrió el error, suele referirse a la operación.
 * @returns {Promise<Result<T>>} - Un resultado que puede ser exitoso o fallido.
 * @example
 * const result = await handlerService(async () => {})
 * if (!result.success) throw new ErrorAPI(result.error.message)
 * const data = result.data
 */
export async function handlerService<T>(operation: () => Promise<T>, context: string): Promise<Result<T>> {
  try {
    const result = await operation()
    return success(result)
  } catch (e: unknown) {
    const error = normalizeError(e, context)
    return failure(error)
  }
}

/**
 * Normaliza diferentes tipos de errores a nuestro ErrorAPI.
 * @param {unknown} e - El error a normalizar, puede ser de tipo FirebaseError o MongooseError.
 * @param {string} context - Representa el contexto en el que ocurrió el error, suele referirse a la operación.
 * @returns {ErrorAPI} - El error normalizado al formato de ErrorAPI.
 * @example
 * normalizeError(new Error('Error de prueba'), 'obtener usuario')
 * return {
 *  message: 'Error al obtener usuario: Error de prueba',
 *  statusCode: 500,
 *  code: undefined,
 *  details: undefined
 * } as ErrorAPI
 */
function normalizeError(e: unknown, context: string): ErrorAPI {
  if (e instanceof FirebaseError) return HandlerErrorsFB(e)
  if (e instanceof MongooseError) return HandlerErrorsMDB(e)
  return new ErrorAPI({ message: `Error al ${context}: ${e instanceof Error ? e.message : String(e)}` })
}