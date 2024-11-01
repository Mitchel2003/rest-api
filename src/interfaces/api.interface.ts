import { Request, Response } from "express"

/*--------------- request ---------------*/
export interface ExtendsRequest extends Request { user?: { id?: string } }

/*--------------- response ---------------*/
export type Error = string
export type ApiResponse<T> = T | Error
export type SendResponseProps = <T>(res: Response, status: number, data: T) => void

/*--------------- tools ---------------*/
/**
 * Envía una respuesta con el estado HTTP y el dato correspondiente.
 * @param res - Objeto de respuesta Express.
 * @param status - Código de estado HTTP.
 * @param data - Dato a enviar en la respuesta.
 */
export const send: SendResponseProps = (res, status, data) => {
  const response: ApiResponse<typeof data> = data;
  res.status(status).json(response);
}

export type Result<T> = Success<T> | Failure //Result either

interface Success<T> { success: true, data: T }
export const success = <T>(data: T): Success<T> => ({ success: true, data })

type IError = {
  message: string,
  code?: string,
  details?: unknown,
  statusCode?: number
}
interface Failure { success: false; error: IError }
export const failure = (error: IError): Failure => ({ success: false, error })