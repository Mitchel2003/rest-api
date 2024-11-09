/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar areas */
import { areaService } from "@/services/mongodb/location/area.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface"
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene una area específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la area en params.id.
 * @returns {Promise<void>} - Envía el area encontrado o un mensaje de error.
 */
export const getArea = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const area = await areaService.findById(params.id);
    if (!area.success) throw new ErrorAPI(area.error);
    send(res, 200, area.data);
  } catch (e) { handlerResponse(res, e, "obtener el area") }
}

/**
 * Obtiene todas las areas.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con las areas.
 */
export const getAreas = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const areas = await areaService.find(body.query, body.populate);
    if (!areas.success) throw new ErrorAPI(areas.error);
    send(res, 200, areas.data);
  } catch (e) { handlerResponse(res, e, "obtener las areas") }
}

/**
 * Crear una nueva area
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos de la area en el body. 
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const createArea = async (req: Request, res: Response): Promise<void> => {
  try {
    const area = await areaService.create(req.body);
    if (!area.success) throw new ErrorAPI(area.error);
    send(res, 201, area.data);
  } catch (e) { handlerResponse(res, e, "crear el area") }
}

/**
 * Actualiza una area existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la area en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía la area actualizada o un mensaje de error.
 */
export const updateArea = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const area = await areaService.update(params.id, body);
    if (!area.success) throw new ErrorAPI(area.error);
    send(res, 200, area.data);
  } catch (e) { handlerResponse(res, e, "actualizar el area") }
}

/**
 * Elimina un area existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la area a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteArea = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const area = await areaService.delete(params.id);
    if (!area.success) throw new ErrorAPI(area.error);
    send(res, 200, area.data);
  } catch (e) { handlerResponse(res, e, "eliminar el area") }
}