import { representativeHeadquarterService } from "@/services/mongodb/relation/representativeHeadquarter.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene una relación específica representante-sede por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la relación en params.id.
 * @returns {Promise<void>} - Envía la relación encontrada o un mensaje de error.
 */
export const getRepresentativeHeadquarter = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const relation = await representativeHeadquarterService.findById(params.id);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "obtener el representante-sede") }
}

/**
 * Obtiene todas las relaciones representante-sede.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con las relaciones.
 */
export const getRepresentativeHeadquarters = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const relations = await representativeHeadquarterService.find(body.query, body.populate);
    if (!relations.success) throw new ErrorAPI(relations.error);
    send(res, 200, relations.data);
  } catch (e) { handlerResponse(res, e, "obtener los representante-sede") }
}

/**
 * Crea una nueva relación representante-sede.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los IDs de representante y sede en el body.
 * @returns {Promise<void>} - Envía la relación creada o un mensaje de error.
 */
export const createRepresentativeHeadquarter = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const relation = await representativeHeadquarterService.create(body);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 201, relation.data);
  } catch (e) { handlerResponse(res, e, "crear el representante-sede") }
}

/**
 * Actualiza una relación representante-sede existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la relación en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía la relación actualizada o un mensaje de error.
 */
export const updateRepresentativeHeadquarter = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const relation = await representativeHeadquarterService.update(params.id, body);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "actualizar el representante-sede") }
}

/**
 * Elimina una relación representante-sede existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la relación a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteRepresentativeHeadquarter = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const relation = await representativeHeadquarterService.delete(params.id);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "eliminar el representante-sede") }
} 