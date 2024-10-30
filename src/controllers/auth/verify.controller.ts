import { ExtendsRequest, send } from "@/interfaces/api.interface"
import User from "@/models/user/user.model"
import { handlerErrorResponse } from "@/utils/handler";
import { Response } from "express"

/**
 * Verifica el token de acceso del usuario (autenticación).
 * Extrae las credenciales del token (id_user), en caso de que token sea invalido, no se permitirá el acceso.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el token en token.
 * @returns {Promise<void>} - Envía los datos del usuario autenticado o un mensaje de error.
 */
export const verifyAuth = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    //TODO: implementar servicio de mongodb para obtener los datos del usuario (findById)
    const userFound = await User.findById(req.user?.id);
    if (!userFound) return send(res, 401, 'No autorizado');
    send(res, 200, userFound);
  } catch (e) { handlerErrorResponse(res, e, "Verificar token autenticación") }
}