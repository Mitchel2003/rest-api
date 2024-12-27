import { Request, Response } from "express"
import { User } from "firebase/auth"

/*--------------- request ---------------*/
export interface ExtendsRequest extends Request {
  user?: {
    email?: string,
    photoURL?: string,
    username?: string,
    emailVerified?: boolean,
  }
}
export const mapAuth = (decodedToken: User): ExtendsRequest['user'] => ({
  email: decodedToken.email || '',
  photoURL: decodedToken.photoURL || '',
  username: decodedToken.displayName || '',
  emailVerified: decodedToken.emailVerified,
})

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

type IError = { message: string, code?: string, details?: unknown, statusCode?: number }
export interface Success<T> { success: true, data: T }
export interface Failure { success: false; error: IError }

export type Result<T> = Success<T> | Failure //Result either
export const success = <T>(data: T): Success<T> => ({ success: true, data })
export const failure = (error: IError): Failure => ({ success: false, error })