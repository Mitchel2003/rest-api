/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar grupos */
import { groupService } from "@/services/mongodb/location/group.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface"
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene un grupo específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del grupo en params.id.
 * @returns {Promise<void>} - Envía el grupo encontrado o un mensaje de error.
 */
export const getGroup = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const group = await groupService.findById(params.id);
    if (!group.success) throw new ErrorAPI(group.error);
    send(res, 200, group.data);
  } catch (e) { handlerResponse(res, e, "obtener el grupo") }
}

/**
 * Obtiene todos los grupos.
 * @param {Request} req - Objeto de solicitud Express. Se espera query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los grupos.
 */
export const getGroups = async ({ query }: Request, res: Response): Promise<void> => {
  try {
    const groups = await groupService.find(query || {});
    if (!groups.success) throw new ErrorAPI(groups.error);
    send(res, 200, groups.data);
  } catch (e) { handlerResponse(res, e, "obtener los grupos") }
}

/**
 * Crear un nuevo grupo
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del grupo en el body. 
 * @returns {Promise<void>} - Envía el grupo creado o un mensaje de error.
 */
export const createGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const group = await groupService.create(req.body);
    if (!group.success) throw new ErrorAPI(group.error);
    send(res, 201, group.data);
  } catch (e) { handlerResponse(res, e, "crear el grupo") }
}

/**
 * Actualiza un grupo existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del grupo en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el grupo actualizado o un mensaje de error.
 */
export const updateGroup = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const group = await groupService.update(params.id, body);
    if (!group.success) throw new ErrorAPI(group.error);
    send(res, 200, group.data);
  } catch (e) { handlerResponse(res, e, "actualizar el grupo") }
}

/**
 * Elimina un grupo existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del grupo a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteGroup = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const group = await groupService.delete(params.id);
    if (!group.success) throw new ErrorAPI(group.error);
    send(res, 200, group.data);
  } catch (e) { handlerResponse(res, e, "eliminar el grupo") }
}