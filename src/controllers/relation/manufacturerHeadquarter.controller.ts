import { manufacturerHeadquarterService } from "@/services/mongodb/relation/manufacturerHeadquarter.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene una relación específica fabricante-sede por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la relación en params.id.
 * @returns {Promise<void>} - Envía la relación encontrada o un mensaje de error.
 */
export const getManufacturerHeadquarter = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const relation = await manufacturerHeadquarterService.findById(params.id);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "obtener el fabricante-sede") }
}

/**
 * Obtiene todas las relaciones fabricante-sede.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con las relaciones.
 */
export const getManufacturerHeadquarters = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const relations = await manufacturerHeadquarterService.find(body.query, body.populate);
    if (!relations.success) throw new ErrorAPI(relations.error);
    send(res, 200, relations.data);
  } catch (e) { handlerResponse(res, e, "obtener los fabricante-sede") }
}

/**
 * Crea una nueva relación fabricante-sede.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los IDs de fabricante y sede en el body.
 * @returns {Promise<void>} - Envía la relación creada o un mensaje de error.
 */
export const createManufacturerHeadquarter = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const relation = await manufacturerHeadquarterService.create(body);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 201, relation.data);
  } catch (e) { handlerResponse(res, e, "crear el fabricante-sede") }
}

/**
 * Actualiza una relación fabricante-sede existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la relación en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía la relación actualizada o un mensaje de error.
 */
export const updateManufacturerHeadquarter = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const relation = await manufacturerHeadquarterService.update(params.id, body);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "actualizar el fabricante-sede") }
}

/**
 * Elimina una relación fabricante-sede existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la relación a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteManufacturerHeadquarter = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const relation = await manufacturerHeadquarterService.delete(params.id);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "eliminar el fabricante-sede") }
} 