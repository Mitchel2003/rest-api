import { authService as authFB } from "@/services/firebase/auth.service";
import { userService } from "@/services/mongodb/user/user.service"
import { ExtendsRequest, send } from "@/interfaces/api.interface"
import { handlerResponse } from "@/errors/handler";
import ErrorAPI from "@/errors";

import { Response, Request } from "express"
/**
 * Verifica el token de acceso del usuario (autenticación).
 * Extrae las credenciales del token (id_user), en caso de que token sea invalido, no se permitirá el acceso.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el token en token.
 * @returns {Promise<void>} - Envía los datos del usuario autenticado o un mensaje de error.
 */
export const verifyAuth = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const user = await userService.findById(req.user?.id || '');
    if (!user.success) throw new ErrorAPI(user.error);
    send(res, 200, user.data);
  } catch (e) { handlerResponse(res, e, "verificar token autenticación") }
}

/**
 * Verifica la acción del usuario (registro).
 * La solicitud puede ser de tipo verificación de correo electrónico o de cambio de contraseña.
 * En caso de que la solicitud sea de tipo verificación de correo electrónico, se esperan los datos de email, username y role.
 * En caso de que la solicitud sea de tipo restablecimiento de contraseña, se esperan los datos de oobCode y newPassword.s
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos de la solicitud en body y el modo de verificación en params.
 * @returns {Promise<void>} - Envía un mensaje de confirmación.
 */
export const verifyAction = async ({ body, params }: Request, res: Response): Promise<void> => {
  try {
    if (!params.mode) return;
    const result = params.mode === 'verifyEmail'
      ? await userService.create({ ...body })
      : await authFB.validateResetPassword(body.oobCode, body.password);

    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, result.data);
  } catch (e) { handlerResponse(res, e, "verificar acción") }
}//working here...