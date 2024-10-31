import { Result, success, failure } from '@/interfaces/api.interface';
import HandlerErrorsFB from '@/errors/FirebaseError';
import ErrorAPI from '@/errors';

import { FirebaseError } from 'firebase/app';
import { MongooseError } from 'mongoose';
import { Response } from 'express';

/**
 * Maneja operaciones asíncronas y envuelve los resultados en un tipo Result.
 */
export async function handlerService<T>(
  operation: () => Promise<T>, 
  context: string
): Promise<Result<T>> {
  try {
    const result = await operation();
    return success(result);
  } catch (e: unknown) {
    const error = normalizeError(e, context);
    return failure(error.message, error.code, error.details);
  }
}

/**
 * Maneja errores en respuestas HTTP de manera consistente.
 */
export function handlerErrorResponse(res: Response, e: unknown, context: string): void {
  const error = normalizeError(e, context);
  send(res, error.statusCode, {
    message: error.message,
    code: error.code,
    details: error.details
  });
}

/**
 * Normaliza diferentes tipos de errores a nuestro ErrorAPI.
 */
function normalizeError(error: unknown, context: string): ErrorAPI {
  if (error instanceof FirebaseError) {
    return HandlerErrorsFB(error);
  }
  if (error instanceof MongooseError) {
    return new ErrorAPI(
      `Error de base de datos al ${context}: ${error.message}`,
      500,
      'DATABASE_ERROR'
    );
  }
  if (error instanceof ErrorAPI) {
    return error;
  }
  return new ErrorAPI(
    `Error al ${context}: ${error instanceof Error ? error.message : String(error)}`
  );
}