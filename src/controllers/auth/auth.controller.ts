/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
import { authService as authFB, databaseService as database_FB } from "@/services/firebase.service"
import { generateAccessToken } from "@/services/jwt.service"

import { handlerErrorResponse } from "@/utils/handler"
import { send } from "@/interfaces/api.interface"

import { Request, Response } from "express"
/*--------------------------------------------------Essentials--------------------------------------------------*/
/**
 * Maneja el proceso de inicio de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @returns {Promise<void>} - Envía el usuario autenticado o un mensaje de error.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await authFB.verifyCredentials(email, password);
    if ('error' in user) return send(res, 401, user.error);
    const token = await generateAccessToken({ id: user.value.uid });
    setCookies(res, token);
    send(res, 200, user.value);
  } catch (e) { handlerErrorResponse(res, e, "iniciar sesión") }
}

/**
 * Maneja el proceso de registro de un nuevo usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username, role } = req.body;
    const auth = await authFB.registerAccount(username, email, password);
    if ('error' in auth) return send(res, 500, auth.error);

    const register = await database_FB.registerUserCredentials(auth.value, { role });
    if ('error' in register) return send(res, 500, register.error);

    const sendEmail = await authFB.sendEmailVerification();
    if ('error' in sendEmail) return send(res, 500, sendEmail.error);

    send(res, 200, 'Usuario registrado exitosamente, se ha enviado un correo de verificación');
  } catch (e) { handlerErrorResponse(res, e, "registrarse") }
}

/**
 * Maneja el proceso de cierre de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express.
 * @returns {Response<any>} - Envía una respuesta de éxito.
 */
export const logout = (req: Request, res: Response): void => {
  if (!req.cookies.token) return send(res, 200, 'Cierre de sesión exitoso');
  res.cookie('token', '', { expires: new Date(0) });
  send(res, 200, 'Cierre de sesión exitoso');
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Establece las cookies de autenticación en la respuesta HTTP.
 * @param {Response} res - Objeto de respuesta Express.
 * @param {string} token - Token de autenticación a establecer en las cookies.
 */
function setCookies(res: Response, token: string) {
  res.cookie('token', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  })
}
/*---------------------------------------------------------------------------------------------------------*/