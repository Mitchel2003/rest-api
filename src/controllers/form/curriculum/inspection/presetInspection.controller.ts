import { presetInspectionService } from "@/services/mongodb/form/curriculum/inspection/presetInspection.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene una inspección predefinida específica por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la inspección predefinida en params.id.
 * @returns {Promise<void>} - Envía la inspección predefinida encontrada o un mensaje de error.
 */
export const getPresetInspection = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const presetInspection = await presetInspectionService.findById(params.id);
    if (!presetInspection.success) throw new ErrorAPI(presetInspection.error);
    send(res, 200, presetInspection.data);
  } catch (e) { handlerResponse(res, e, "obtener la inspección predefinida") }
}

/**
 * Obtiene todas las inspecciones predefinidas.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con las inspecciones predefinidas.
 */
export const getPresetInspections = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const presetInspections = await presetInspectionService.find(body.query);
    if (!presetInspections.success) throw new ErrorAPI(presetInspections.error);
    send(res, 200, presetInspections.data);
  } catch (e) { handlerResponse(res, e, "obtener las inspecciones predefinidas") }
}

/**
 * Crea una nueva inspección predefinida.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos de la inspección predefinida en el body.
 * @returns {Promise<void>} - Envía la inspección predefinida creada o un mensaje de error.
 */
export const createPresetInspection = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const presetInspection = await presetInspectionService.create(body);
    if (!presetInspection.success) throw new ErrorAPI(presetInspection.error);
    send(res, 201, presetInspection.data);
  } catch (e) { handlerResponse(res, e, "crear la inspección predefinida") }
}

/**
 * Actualiza una inspección predefinida existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la inspección predefinida en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía la inspección predefinida actualizada o un mensaje de error.
 */
export const updatePresetInspection = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const presetInspection = await presetInspectionService.update(params.id, body);
    if (!presetInspection.success) throw new ErrorAPI(presetInspection.error);
    send(res, 200, presetInspection.data);
  } catch (e) { handlerResponse(res, e, "actualizar la inspección predefinida") }
}

/**
 * Elimina una inspección predefinida existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la inspección predefinida a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deletePresetInspection = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const presetInspection = await presetInspectionService.delete(params.id);
    if (!presetInspection.success) throw new ErrorAPI(presetInspection.error);
    send(res, 200, presetInspection.data);
  } catch (e) { handlerResponse(res, e, "eliminar la inspección predefinida") }
} 