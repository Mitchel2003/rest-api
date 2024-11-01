import { Result, success, failure, send } from '@/interfaces/api.interface';
import HandlerErrorsMDB from '@/errors/mongodb.error';
import HandlerErrorsFB from '@/errors/firebase.error';
import ErrorAPI from '@/errors';

import { FirebaseError } from 'firebase/app';
import { MongooseError } from 'mongoose';
import { Response } from 'express';

/** Maneja errores en respuestas HTTP de manera consistente. */
export function handlerResponse(res: Response, e: unknown, context: string): void {
  const { message, statusCode, code, details } = normalizeError(e, context);
  send(res, statusCode, { message, code, details });
}

/** Maneja operaciones asíncronas y envuelve los resultados en un tipo Result. */
export async function handlerService<T>(operation: () => Promise<T>, context: string): Promise<Result<T>> {
  try {
    const result = await operation();
    return success(result);
  } catch (e: unknown) {
    const { message, code, details } = normalizeError(e, context);
    return failure(message, code, details);
  }
}

/** Normaliza diferentes tipos de errores a nuestro ErrorAPI. */
function normalizeError(e: unknown, context: string): ErrorAPI {
  if (e instanceof FirebaseError) return HandlerErrorsFB(e)
  if (e instanceof MongooseError) return HandlerErrorsMDB(e)
  return new ErrorAPI(`Error al ${context}: ${e instanceof Error ? e.message : String(e)}`)
}