import { authService as authFB } from "@/services/firebase/auth.service"
import { handlerResponse } from "@/errors/handler"
import { send } from "@/interfaces/api.interface"
import ErrorAPI from "@/errors"

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
    const result = await authFB.sendEmailResetPassword(body.email);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, 'Email enviado correctamente');
  } catch (e) { handlerResponse(res, e, "enviar email de restablecimiento de contraseña") }
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
    const result = await authFB.validateResetPassword(params.oobCode, body.password);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, 'Contraseña restablecida correctamente');
  } catch (e) { handlerResponse(res, e, "restablecer contraseña") }
}