import { accessoryService } from "@/services/mongodb/form/curriculum/accessory.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import { Types } from "mongoose";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene un accesorio específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del accesorio en params.id.
 * @returns {Promise<void>} - Envía el accesorio encontrado o un mensaje de error.
 */
export const getAccessory = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const accessory = await accessoryService.findById(params.id);
    if (!accessory.success) throw new ErrorAPI(accessory.error);
    send(res, 200, accessory.data);
  } catch (e) { handlerResponse(res, e, "obtener el accesorio") }
}

/**
 * Obtiene todos los accesorios.
 * @param {Request} req - Objeto de solicitud Express. Se espera query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los accesorios.
 */
export const getAccessories = async ({ query }: Request, res: Response): Promise<void> => {
  try {
    const queryFormated = query.curriculum ? { curriculum: new Types.ObjectId(query.curriculum as string) } : {};
    const accessories = await accessoryService.find(queryFormated);
    if (!accessories.success) throw new ErrorAPI(accessories.error);
    send(res, 200, accessories.data);
  } catch (e) { handlerResponse(res, e, "obtener los accesorios") }
}

/**
 * Crea un nuevo accesorio.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del accesorio en el body.
 * @returns {Promise<void>} - Envía el accesorio creado o un mensaje de error.
 */
export const createAccessory = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const accessory = await accessoryService.create(body);
    if (!accessory.success) throw new ErrorAPI(accessory.error);
    send(res, 201, accessory.data);
  } catch (e) { handlerResponse(res, e, "crear el accesorio") }
}

/**
 * Actualiza un accesorio existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del accesorio en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el accesorio actualizado o un mensaje de error.
 */
export const updateAccessory = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const accessory = await accessoryService.update(params.id, body);
    if (!accessory.success) throw new ErrorAPI(accessory.error);
    send(res, 200, accessory.data);
  } catch (e) { handlerResponse(res, e, "actualizar el accesorio") }
}

/**
 * Elimina un accesorio existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del accesorio a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteAccessory = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const accessory = await accessoryService.delete(params.id);
    if (!accessory.success) throw new ErrorAPI(accessory.error);
    send(res, 200, accessory.data);
  } catch (e) { handlerResponse(res, e, "eliminar el accesorio") }
}