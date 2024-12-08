import { userService as userService } from "@/services/mongodb/user/user.service"
import { authService as authFB } from "@/services/firebase/auth.service"

import { ExtendsRequest, send } from "@/interfaces/api.interface"
import { handlerResponse } from "@/errors/handler"
import ErrorAPI from "@/errors"

import { Response, Request } from "express"

/*--------------------------------------------------verification--------------------------------------------------*/
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
/*---------------------------------------------------------------------------------------------------------*/