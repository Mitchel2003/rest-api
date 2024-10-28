/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
import { generateAccessToken } from "../../services/jwt.service"
import { auth, verify } from "../../services/auth.service"
import mailtrap from "../../services/mailtrap.service"

import { handlerErrorResponse } from "../../utils/handler"
import { send } from "../../interfaces/api.interface"

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
    const user = await verify.verifyCredentials(email, password);
    if ('error' in user) return send(res, 403, user.error);
    const token = await generateAccessToken({ id: user.value._id });
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
    const user = await auth.createUser(req);
    if ('error' in user) return send(res, 500, user.error);

    const emailSend = await mailtrap.sendVerificationEmail(user.value);
    if ('error' in emailSend) return send(res, 500, emailSend.error);

    //set cookies with token auth
    const token = await generateAccessToken({ id: user.value._id });
    setCookies(res, token);
    send(res, 200, user.value);
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
 * Establece las cookies de autenticación en la respuesta.
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