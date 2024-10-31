import { SchemaID } from "@/interfaces/db.interface";
import { Request, Response } from "express"

/*--------------- request ---------------*/
export interface ExtendsRequest extends Request {
  user?: { id?: SchemaID };
}

/*--------------- response ---------------*/
export type Error = string
export type ApiResponse<T> = T | Error
export type SendResponseProps = <T>(
  res: Response,
  status: number,
  data: T
) => void

/*--------------- tools ---------------*/
/**
 * Envía una respuesta con el estado HTTP y el dato correspondiente.
 * @param {Response} res - Objeto de respuesta Express.
 * @param {number} status - Código de estado HTTP.
 * @param {T} data - Dato a enviar en la respuesta.
 */
export const send: SendResponseProps = (res, status, data) => {
  const response: ApiResponse<typeof data> = data;
  res.status(status).json(response);
}

/** Tipo para manejar resultados exitosos o errores de manera elegante */
export type Result<T> = Success<T> | Failure;

interface Success<T> {
  success: true;
  data: T;
}

interface Failure {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

/** Funciones auxiliares para crear resultados */
export const success = <T>(data: T): Success<T> => ({
  success: true,
  data
});

export const failure = (message: string, code?: string, details?: unknown): Failure => ({
  success: false,
  error: { message, code, details }
});

/** Función para enviar respuestas HTTP consistentes */
export const send = <T>(res: Response, status: number, data: T): void => {
  res.status(status).json(data);
};