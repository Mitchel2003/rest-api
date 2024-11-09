/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar representatives */
import { representativeService } from "@/services/mongodb/form/curriculum/stakeholder/representative.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene un representante específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del representante en params.id.
 * @returns {Promise<void>} - Envía el representante encontrado o un mensaje de error.
 */
export const getRepresentative = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const representative = await representativeService.findById(params.id);
    if (!representative.success) throw new ErrorAPI(representative.error);
    send(res, 200, representative.data);
  } catch (e) { handlerResponse(res, e, "obtener el representante") }
}

/**
 * Obtiene todos los representantes.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los representantes.
 */
export const getRepresentatives = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const representatives = await representativeService.find(body.query);
    if (!representatives.success) throw new ErrorAPI(representatives.error);
    send(res, 200, representatives.data);
  } catch (e) { handlerResponse(res, e, "obtener los representantes") }
}

/**
 * Crear un nuevo representante
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del representante en el body. 
 * @returns {Promise<void>} - Envía el representante creado o un mensaje de error.
 */
export const createRepresentative = async (req: Request, res: Response): Promise<void> => {
  try {
    const representative = await representativeService.create(req.body);
    if (!representative.success) throw new ErrorAPI(representative.error);
    send(res, 201, representative.data);
  } catch (e) { handlerResponse(res, e, "crear el representante") }
}

/**
 * Actualiza un representante existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del representante en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el representante actualizado o un mensaje de error.
 */
export const updateRepresentative = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const representative = await representativeService.update(params.id, body);
    if (!representative.success) throw new ErrorAPI(representative.error);
    send(res, 200, representative.data);
  } catch (e) { handlerResponse(res, e, "actualizar el representante") }
}

/**
 * Elimina un representante existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del representante a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteRepresentative = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const representative = await representativeService.delete(params.id);
    if (!representative.success) throw new ErrorAPI(representative.error);
    send(res, 200, representative.data);
  } catch (e) { handlerResponse(res, e, "eliminar el representante") }
}