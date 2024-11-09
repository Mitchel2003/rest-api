import { inspectionHeadquarterService } from "@/services/mongodb/relation/curriculum/inspectionHeadquarter.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene una relación específica inspección-sede por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la relación en params.id.
 * @returns {Promise<void>} - Envía la relación encontrada o un mensaje de error.
 */
export const getInspectionHeadquarter = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const relation = await inspectionHeadquarterService.findById(params.id);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "obtener la inspección-sede") }
}

/**
 * Obtiene todas las relaciones inspección-sede.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con las relaciones.
 */
export const getInspectionHeadquarters = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const relations = await inspectionHeadquarterService.find(body.query, body.populate);
    if (!relations.success) throw new ErrorAPI(relations.error);
    send(res, 200, relations.data);
  } catch (e) { handlerResponse(res, e, "obtener las inspección-sede") }
}

/**
 * Crea una nueva relación inspección-sede.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los IDs de inspección y sede en el body.
 * @returns {Promise<void>} - Envía la relación creada o un mensaje de error.
 */
export const createInspectionHeadquarter = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const relation = await inspectionHeadquarterService.create(body);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 201, relation.data);
  } catch (e) { handlerResponse(res, e, "crear la inspección-sede") }
}

/**
 * Actualiza una relación inspección-sede existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la relación en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía la relación actualizada o un mensaje de error.
 */
export const updateInspectionHeadquarter = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const relation = await inspectionHeadquarterService.update(params.id, body);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "actualizar la inspección-sede") }
}

/**
 * Elimina una relación inspección-sede existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la relación a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteInspectionHeadquarter = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const relation = await inspectionHeadquarterService.delete(params.id);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "eliminar la inspección-sede") }
} 