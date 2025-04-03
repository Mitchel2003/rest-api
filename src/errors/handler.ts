import { Result, success, failure, send } from '@/interfaces/api.interface';
import HandlerErrorsMDB from '@/errors/mongodb.error';
import HandlerErrorsFB from '@/errors/firebase.error';
import HandlerErrorsZod from '@/errors/zod.error';
import ErrorAPI from '@/errors';

import { MongooseError } from 'mongoose';
import { Response } from 'express';
import { ZodError } from 'zod';

/*--------------------------------------------------handlers--------------------------------------------------*/
/**
 * Maneja operaciones asíncronas de los servicios, devolviendo un Result<T> (success o failure).
 * @param {Function} operation - La operación asíncrona a ejecutar.
 * @param {string} context - Representa el contexto en el que ocurrió el error, suele referirse a la operación.
 * @returns {Promise<Result<T>>} - Un resultado que puede ser exitoso o fallido.
 */
export const handlerService = async <T>(operation: () => Promise<T>, context: string): Promise<Result<T>> => {
  try { return success(await operation()) }
  catch (e) { return failure(normalizeError(e, context)) }
}

/**
 * Maneja errores en respuestas HTTP de manera consistente.
 * Se halla implementado en los controladores.
 * @param {Response} res: respuesta HTTP
 * @param {unknown} e: error a normalizar
 * @param {string} context: contexto del error
 */
export const handlerResponse = (res: Response, e: unknown, context: string) => {
  const { message, code, details, statusCode } = normalizeError(e, context);
  send(res, statusCode, { message, code, details })
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Justifica el error en formato de ErrorAPI.
 * Normaliza nuestro "e" unknown a nuestro ErrorAPI.
 * @param {unknown} e - El error a normalizar, puede ser de tipo FirebaseError o MongooseError.
 * @param {string} context - Representa el contexto en el que ocurrió el error, suele referirse a la operación.
 * @returns {ErrorAPI} - El error normalizado al formato de ErrorAPI, si pertenece a ninguna instancia, se crea uno nuevo.
 * @example if (!result.success) throw new ErrorAPI({ message: 'Error de prueba', statusCode: 500 })
 */
export const normalizeError = (e: unknown, context: string): ErrorAPI => {
  if (typeof e === 'object' && e !== null && 'code' in e && typeof e.code === 'string' && e.code.startsWith('auth/')) return HandlerErrorsFB(e as any)
  if (e instanceof MongooseError) return HandlerErrorsMDB(e)
  if (e instanceof ZodError) return HandlerErrorsZod(e)
  if (e instanceof ErrorAPI) return e
  return new ErrorAPI({ message: `Error al ${context}: ${e instanceof Error ? e.message : String(e)}` })
}
/*---------------------------------------------------------------------------------------------------------*/