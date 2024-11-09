/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar usuarios */
import { userService } from "@/services/mongodb/user/user.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface"
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene un usuario específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del usuario en params.id.
 * @returns {Promise<void>} - Envía el usuario encontrado o un mensaje de error.
 */
export const getUser = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.findById(params.id);
    if (!user.success) throw new ErrorAPI(user.error);
    send(res, 200, user.data);
  } catch (e) { handlerResponse(res, e, "obtener el usuario") }
}

/**
 * Obtiene todos los usuarios.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los usuarios.
 */
export const getUsers = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.find(body.query);
    if (!users.success) throw new ErrorAPI(users.error);
    send(res, 200, users.data);
  } catch (e) { handlerResponse(res, e, "obtener los usuarios") }
}

/**
 * Crear un nuevo usuario
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del usuario en el body. 
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.create(req.body);
    if (!user.success) throw new ErrorAPI(user.error);
    send(res, 201, user.data);
  } catch (e) { handlerResponse(res, e, "crear el usuario") }
}

/**
 * Actualiza un usuario existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del usuario en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el usuario actualizado o un mensaje de error.
 */
export const updateUser = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.update(params.id, body);
    if (!user.success) throw new ErrorAPI(user.error);
    send(res, 200, user.data);
  } catch (e) { handlerResponse(res, e, "actualizar el usuario") }
}

/**
 * Elimina un usuario existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del usuario a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteUser = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.delete(params.id);
    if (!user.success) throw new ErrorAPI(user.error);
    send(res, 200, user.data);
  } catch (e) { handlerResponse(res, e, "eliminar el usuario") }
}