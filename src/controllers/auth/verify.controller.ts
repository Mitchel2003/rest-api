import { ExtendsRequest, send } from "../../interfaces/api.interface"
import { handlerErrorResponse } from "../../utils/handler"
import User from "../../models/user/user.model"
import auth from "../../services/auth.service"
import { Request, Response } from "express"

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