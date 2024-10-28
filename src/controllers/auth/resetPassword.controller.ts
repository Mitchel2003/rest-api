import { handlerErrorResponse } from "../../utils/handler"
import { send } from "../../interfaces/api.interface"

import mailtrap from "../../services/mailtrap.service"
import auth from "../../services/auth.service"
import { Request, Response } from "express"

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