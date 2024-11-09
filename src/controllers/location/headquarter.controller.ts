/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar sedes */
import { headquarterService } from "@/services/mongodb/location/headquarter.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface"
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene una sede específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la sede en params.id.
 * @returns {Promise<void>} - Envía el sede encontrado o un mensaje de error.
 */
export const getheadquarter = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const headquarter = await headquarterService.findById(params.id);
    if (!headquarter.success) throw new ErrorAPI(headquarter.error);
    send(res, 200, headquarter.data);
  } catch (e) { handlerResponse(res, e, "obtener la sede") }
}

/**
 * Obtiene todas las sedes.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con las sedes.
 */
export const getheadquarters = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const headquarters = await headquarterService.find(body.query, body.populate);
    if (!headquarters.success) throw new ErrorAPI(headquarters.error);
    send(res, 200, headquarters.data);
  } catch (e) { handlerResponse(res, e, "obtener las sedes") }
}

/**
 * Crear una nueva sede
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos de la sede en el body. 
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const createheadquarter = async (req: Request, res: Response): Promise<void> => {
  try {
    const headquarter = await headquarterService.create(req.body);
    if (!headquarter.success) throw new ErrorAPI(headquarter.error);
    send(res, 201, headquarter.data);
  } catch (e) { handlerResponse(res, e, "crear la sede") }
}

/**
 * Actualiza una sede existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la sede en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía la sede actualizada o un mensaje de error.
 */
export const updateheadquarter = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const headquarter = await headquarterService.update(params.id, body);
    if (!headquarter.success) throw new ErrorAPI(headquarter.error);
    send(res, 200, headquarter.data);
  } catch (e) { handlerResponse(res, e, "actualizar la sede") }
}

/**
 * Elimina un sede existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la sede a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteheadquarter = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const headquarter = await headquarterService.delete(params.id);
    if (!headquarter.success) throw new ErrorAPI(headquarter.error);
    send(res, 200, headquarter.data);
  } catch (e) { handlerResponse(res, e, "eliminar la sede") }
}