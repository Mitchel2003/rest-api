import { userService as userService } from "@/services/mongodb/user/user.service"
import { authService as authFB } from "@/services/firebase/auth.service"

import { ExtendsRequest, send } from "@/interfaces/api.interface"
import { handlerResponse } from "@/errors/handler"
import ErrorAPI from "@/errors"

import { Response, Request } from "express"
/**
 * Verifica el token de acceso del usuario (autenticación).
 * Extrae las credenciales del token (id_user), en caso de que token sea invalido, no se permitirá el acceso.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el token en token.
 * @returns {Promise<void>} - Envía los datos del usuario autenticado o un mensaje de error.
 */
export const verifyAuth = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const user = await userService.findById(req.user?.id as string);
    if (!user.success) throw new ErrorAPI(user.error);
    send(res, 200, user.data);
  } catch (e) { handlerResponse(res, e, "verificar token autenticación") }
}

/**
 * Verifica la acción del usuario (registro).
 * La solicitud puede ser de tipo verificación de correo electrónico o de cambio de contraseña.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos de la solicitud en body y el modo de verificación en params.
 * @returns {Promise<void>} - Envía un mensaje de confirmación.
 * @link https://github.com/Mitchel2003/rest-api/blob/main/README.md#004
 * @example
 * "verifyEmail" => uid, email, username y role.
 * "resetPassword" => oobCode y password.
 */
export const verifyAction = async ({ body, params }: Request, res: Response): Promise<void> => {
  try {
    if (!params.mode) return;
    const result = params.mode !== 'verifyEmail'
      ? await authFB.validateResetPassword(body.oobCode, body.password)
      : await authFB.validateEmailVerification().then(() => userService.create(body))
    //send response
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, result.data);
  } catch (e) { handlerResponse(res, e, "verificar acción") }
}

/*--------------------------------------------------ResetPassword--------------------------------------------------*/
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
/*---------------------------------------------------------------------------------------------------------*/