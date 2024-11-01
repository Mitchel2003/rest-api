/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
import { authService as authFB, databaseService as databaseFB } from "@/services/firebase.service"
import { generateAccessToken } from "@/services/jwt.service"

import { send } from "@/interfaces/api.interface"
import { handlerResponse } from "@/utils/handler"
import { Request, Response } from "express"
import ErrorAPI from "@/errors"

/*--------------------------------------------------Authentication--------------------------------------------------*/
/**
 * Maneja el proceso de inicio de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @returns {Promise<void>} - Envía el usuario autenticado o un mensaje de error.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await authFB.verifyCredentials(email, password);
    if (!user.success) throw new ErrorAPI(user.error.message);
    const token = await generateAccessToken({ id: user.data.uid });
    setCookies(res, token);
    send(res, 200, user.data);
  } catch (e) { handlerResponse(res, e, "iniciar sesión") }
}

/**
 * Maneja el proceso de registro de un nuevo usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username, role } = req.body;
    const result = await authFB.registerAccount(username, email, password);
    if (!result.success) throw new ErrorAPI(result.error.message, 400, result.error.code);

    const register = await databaseFB.registerUserCredentials(result.data, { role });
    if (!register.success) throw new ErrorAPI(register.error.message);

    const sendEmail = await authFB.sendEmailVerification();
    if (!sendEmail.success) throw new ErrorAPI(sendEmail.error.message);

    send(res, 200, { message: 'Usuario registrado exitosamente, se ha enviado un correo de verificación' });
  } catch (e) { handlerResponse(res, e, "registrarse") }
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