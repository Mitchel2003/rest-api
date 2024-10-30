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

export type Result<T> = { value: T } | { error: Error } //type Either