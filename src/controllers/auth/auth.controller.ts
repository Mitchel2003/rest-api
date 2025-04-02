/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
import { authService as authFB } from "@/services/firebase/auth.service";
import { userService } from "@/services/mongodb/user/user.service";
import adminService from "@/services/firebase/admin.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";
/*--------------------------------------------------auth--------------------------------------------------*/
/**
 * Maneja el proceso de inicio de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @argument emailVerified - Hace parte del profile del usuario autenticado (lo usamos para la verificacion de email)
 * @returns {Promise<void>} - Envía el usuario autenticado (UserMDB) o un mensaje de error.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const auth = await authFB.login(email, password);
    if (!auth.success) throw new ErrorAPI(auth.error);
    const found = await userService.findOne({ uid: auth.data.uid });
    if (!found.success) throw new ErrorAPI(found.error);
    send(res, 200, found.data);
  } catch (e: unknown) { handlerResponse(res, e, "iniciar sesión") }
}
/**
 * Maneja el proceso de cierre de sesión del usuario.
 * tenemos metodos de verificacion como token 'jwt' o auth 'firebase'
 * @param {Request} req - Objeto de solicitud Express.
 * @returns {Response<any>} - Envía una respuesta de éxito.
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authFB.logout();
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, req.headers.authorization);
  } catch (e: unknown) { handlerResponse(res, e, "cerrar sesión") }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------verify--------------------------------------------------*/
/**
 * Nos permite obtener el estado de la autenticación del usuario arrojando el "uid"
 * con el cual podemos buscar las userCredencials (mongoDB)
 * @param {Request} req - Objeto de solicitud Express.
 * @argument req.headers.authorization - Procuramos usar el "req" para evitar errores de (never read)
 * @returns {Promise<void>} - Envía el usuario autenticado o un mensaje de error.
 */
export const getOnAuth = async ({ headers }: Request, res: Response): Promise<void> => {
  try {
    const result = authFB.onAuth();
    if (!result) return send(res, 200, null);
    const user = await userService.findOne({ uid: result.uid });
    if (!user.success) throw new ErrorAPI(user.error);
    headers.authorization = `Bearer ${user.data?.uid}`;
    send(res, 200, user.data);
  } catch (e) { handlerResponse(res, e, "obtener estado de usuario") }
}
/**
 * Maneja el proceso de restablecimiento de contraseña.
 * Envia un email con el token de restablecimiento de contraseña el cual expirará en 1 hora.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el email en el body.
 * @returns {Promise<void>} - Envía un mensaje de éxito si el email se envía correctamente.
 */
export const forgotPassword = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const result = await authFB.sendEmailResetPassword(body.email);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, 'Email enviado correctamente');
  } catch (e) { handlerResponse(res, e, "enviar email de restablecimiento de contraseña") }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------notifications--------------------------------------------------*/
/**
 * Nos permite enviar una notificación al usuario mediante Firebase Cloud Messaging (FCM).
 * @param {Request} req - Objeto de solicitud Express. Debe contener el id del usuario, el título y el cuerpo de la notificación en el body.
 * @returns {Promise<void>} - Envía un mensaje de éxito si la notificación se envía correctamente.
 */
export const sendNotification = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const result = await adminService.sendNotification(body.id, body.title, body.body);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, { message: "Notificación enviada con éxito" });
  } catch (e: unknown) { handlerResponse(res, e, "enviar notificación") }
}
/*---------------------------------------------------------------------------------------------------------*/