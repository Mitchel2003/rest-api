/** Este módulo proporciona funciones para gestionar las relaciones entre usuarios y sedes */
import { serviceOfficeService } from "@/services/mongodb/relation/curriculum/serviceOffice.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface"
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene una relación específica consultorio-servicio por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la relación en params.id.
 * @returns {Promise<void>} - Envía la relación encontrada o un mensaje de error.
 */
export const getServiceOffice = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const relation = await serviceOfficeService.findById(params.id);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "obtener el consultorio-servicio") }
}

/**
 * Obtiene todas las relaciones consultorio-servicio.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con las relaciones.
 */
export const getServiceOffices = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const relations = await serviceOfficeService.find(body.query, body.populate);
    if (!relations.success) throw new ErrorAPI(relations.error);
    send(res, 200, relations.data);
  } catch (e) { handlerResponse(res, e, "obtener los consultorio-servicio") }
}

/**
 * Crea una nueva relación consultorio-servicio.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los IDs de usuario y sede en el body.
 * @returns {Promise<void>} - Envía la relación creada o un mensaje de error.
 */
export const createServiceOffice = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const relation = await serviceOfficeService.create(body);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 201, relation.data);
  } catch (e) { handlerResponse(res, e, "crear el consultorio-servicio") }
}

/**
 * Actualiza una relación consultorio-servicio existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la relación en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía la relación actualizada o un mensaje de error.
 */
export const updateServiceOffice = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const relation = await serviceOfficeService.update(params.id, body);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "actualizar el consultorio-servicio") }
}

/**
 * Elimina una relación consultorio-servicio existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la relación a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteServiceOffice = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const relation = await serviceOfficeService.delete(params.id);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "eliminar el consultorio-servicio") }
}