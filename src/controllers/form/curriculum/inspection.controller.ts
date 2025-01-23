import { inspectionService } from "@/services/mongodb/form/curriculum/inspection.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene una inspección específica por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la inspección en params.id.
 * @returns {Promise<void>} - Envía la inspección encontrada o un mensaje de error.
 */
export const getInspection = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const inspection = await inspectionService.findById(params.id);
    if (!inspection.success) throw new ErrorAPI(inspection.error);
    send(res, 200, inspection.data);
  } catch (e) { handlerResponse(res, e, "obtener la inspección") }
}

/**
 * Obtiene todas las inspecciones.
 * @param {Request} req - Objeto de solicitud Express. Se espera query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con las inspecciones.
 */
export const getInspections = async ({ query }: Request, res: Response): Promise<void> => {
  try {
    const inspections = await inspectionService.find(query || {});
    if (!inspections.success) throw new ErrorAPI(inspections.error);
    send(res, 200, inspections.data);
  } catch (e) { handlerResponse(res, e, "obtener las inspecciones") }
}

/**
 * Crea una nueva inspección.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos de la inspección en el body.
 * @returns {Promise<void>} - Envía la inspección creada o un mensaje de error.
 */
export const createInspection = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const inspection = await inspectionService.create(body);
    if (!inspection.success) throw new ErrorAPI(inspection.error);
    send(res, 201, inspection.data);
  } catch (e) { handlerResponse(res, e, "crear la inspección") }
}

/**
 * Actualiza una inspección existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la inspección en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía la inspección actualizada o un mensaje de error.
 */
export const updateInspection = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const inspection = await inspectionService.update(params.id, body);
    if (!inspection.success) throw new ErrorAPI(inspection.error);
    send(res, 200, inspection.data);
  } catch (e) { handlerResponse(res, e, "actualizar la inspección") }
}

/**
 * Elimina una inspección existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la inspección a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteInspection = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const inspection = await inspectionService.delete(params.id);
    if (!inspection.success) throw new ErrorAPI(inspection.error);
    send(res, 200, inspection.data);
  } catch (e) { handlerResponse(res, e, "eliminar la inspección") }
} 