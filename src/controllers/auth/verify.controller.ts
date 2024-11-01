import { ExtendsRequest, send } from "@/interfaces/api.interface"
import { db } from "@/services/mongodb/database.service"
import { handlerResponse } from "@/errors/handler";
import ErrorAPI from "@/errors";

import { Response } from "express"
/**
 * Verifica el token de acceso del usuario (autenticación).
 * Extrae las credenciales del token (id_user), en caso de que token sea invalido, no se permitirá el acceso.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el token en token.
 * @returns {Promise<void>} - Envía los datos del usuario autenticado o un mensaje de error.
 */
export const verifyAuth = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const user = await db.findUserById(req.user?.id as string);
    if (!user.success) throw new ErrorAPI(user.error);
    send(res, 200, user.data);
  } catch (e) { handlerResponse(res, e, "verificar token autenticación") }
}