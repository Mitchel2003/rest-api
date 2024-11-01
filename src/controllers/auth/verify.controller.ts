import { ExtendsRequest, send } from "@/interfaces/api.interface"
import { handlerResponse } from "@/errors/handler";
import ErrorAPI from "@/errors";

import User from "@/models/user/user.model"
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
    if (!userFound) throw new ErrorAPI({ message: 'No autorizado', code: 'UNAUTHORIZED' });
    send(res, 200, userFound);
  } catch (e) { handlerResponse(res, e, "verificar token autenticación") }
}