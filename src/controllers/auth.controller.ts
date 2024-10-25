/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
import { generateAccessToken } from "../services/jwt.service"
import mailtrap from "../services/mailtrap.service"
import auth from "../services/auth.service"

import { ExtendsRequest, send } from "../interfaces/api.interface"
import { handlerErrorResponse } from "../utils/handler"
import User from "../models/user.model"

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
    const user = await auth.verifyCredentials(email, password);
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

/**
 * Obtiene el perfil del usuario autenticado.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del usuario en user.id.
 * @returns {Promise<void>} - Envía los datos del perfil del usuario o un mensaje de error.
 */
export const profile = async (req: ExtendsRequest, res: Response): Promise<void> => {
  const document = await User.findById(req.user?.id);
  if (!document) return send(res, 401, 'Usuario no encontrado');
  send(res, 200, document);
}
/*---------------------------------------------------------------------------------------------------------*/

/*---------------------------------------Reset credentials and verify---------------------------------------*/
/**
 * Verifica el token de acceso del usuario (autenticación).
 * Extrae las credenciales del token (id_user), en caso de que token sea invalido, no se permitirá el acceso.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el token en token.
 * @returns {Promise<void>} - Envía los datos del usuario autenticado o un mensaje de error.
 */
export const verifyAuth = async (req: ExtendsRequest, res: Response): Promise<void> => {
  const userFound = await User.findById(req.token?.id);
  if (!userFound) return send(res, 401, 'No autorizado');
  send(res, 200, userFound);
}

/**
 * Verifica el email del usuario actualizando las credenciales de acceso.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el código de verificación en el body.
 * @returns {Promise<void>} - Envía un mensaje de éxito si el email se verifica correctamente, caso contrario un mensaje de error.
 */
export const verifyEmail = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const result = await auth.verifyEmail(body.code);
    if ('error' in result) return send(res, 400, result.error);
    send(res, 200, 'Email verificado correctamente');
  } catch (e) { handlerErrorResponse(res, e, "verificar email") }
}

/**
 * Maneja el proceso de restablecimiento de contraseña.
 * Establece un token de restablecimiento de contraseña para el usuario
 * Envia un email con el token de restablecimiento de contraseña el cual expirará en 1 hora.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el email en el body.
 * @returns {Promise<void>} - Envía un mensaje de éxito si el email se envía correctamente.
 */
export const forgotPassword = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const result = await auth.resetTokenCredentials(body.email);
    if ('error' in result) return send(res, 400, result.error);

    const emailSend = await mailtrap.sendResetPasswordEmail(body.email, result.value);
    if ('error' in emailSend) return send(res, 500, emailSend.error);

    send(res, 200, 'Email enviado correctamente');
  } catch (e) { handlerErrorResponse(res, e, "enviar email de restablecimiento de contraseña") }
}

/**
 * Nos permite actualizar la contraseña del usuario.
 * Valida un token y su respectiva expiración.
 * Envia un email de éxito si la contraseña se actualiza correctamente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el token en los params y la nueva contraseña en el body.
 * @returns {Promise<void>} - Envía un mensaje de éxito si la contraseña se actualiza correctamente, caso contrario un mensaje de error.
 */
export const resetPassword = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const result = await auth.updatePassword(params.token, body.password);
    if ('error' in result) return send(res, 400, result.error);

    const emailSend = await mailtrap.sendResetSuccessEmail(result.value.email);
    if ('error' in emailSend) return send(res, 500, emailSend.error);

    send(res, 200, 'Contraseña restablecida correctamente');
  } catch (e) { handlerErrorResponse(res, e, "restablecer contraseña") }
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