import { User } from "@/types/user/user.type"
import { Request, Response } from "express"
import admin from 'firebase-admin'

/*--------------------------------------------------response--------------------------------------------------*/
/** Extiende la interfaz Request de Express para incluir el usuario autenticado */
export interface ExtendsRequest extends Request { user?: User }
export type SendResponseProps = <T>(res: Response, status: number, data: T) => void
export type ApiResponse<T> = T | Error
export type Error = string
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------implements--------------------------------------------------*/
export interface AuthCredentials { email: any; password: any; displayName: any }
export interface IAdmin {
  getAuth(): admin.auth.Auth
  sendNotification(userId: string, title: string, body: string): Promise<Result<string>>
  createAccount(credentials: AuthCredentials): Promise<Result<admin.auth.UserRecord>>
  deleteAccount(uid: string): Promise<Result<void>>
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
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
/*---------------------------------------------------------------------------------------------------------*/