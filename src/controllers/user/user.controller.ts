import { ExtendsRequest, send } from "@/interfaces/api.interface"
import User from "@/models/user/user.model"
import { Response } from "express"

/**
 * Obtiene el perfil del usuario autenticado.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del usuario en user.id.
 * @returns {Promise<void>} - Envía los datos del perfil del usuario o un mensaje de error.
 */
export const profile = async (req: ExtendsRequest, res: Response): Promise<void> => {
  const document = await User.findById(req.user?.id);
  if (!document) return send(res, 401, 'Usuario no encontrado');
  send(res, 200, document);
}

export const deleteUser = async (req: ExtendsRequest, res: Response): Promise<void> => {
  //first search user in mongoDB
  //if exist so extract uid_firebase
  //then delete user in auth and database on firebase
  //finally delete user in mongoDB

  //we need delete all related data in database (mongoDB and firebase)

  const document = await User.findByIdAndDelete(req.user?.id);
  if (!document) return send(res, 401, 'Usuario no encontrado');
  send(res, 200, document);
}
