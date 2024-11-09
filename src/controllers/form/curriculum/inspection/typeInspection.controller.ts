import { typeInspectionService } from "@/services/mongodb/form/curriculum/inspection/typeInspection.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene un tipo de inspección específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del tipo de inspección en params.id.
 * @returns {Promise<void>} - Envía el tipo de inspección encontrado o un mensaje de error.
 */
export const getTypeInspection = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const typeInspection = await typeInspectionService.findById(params.id);
    if (!typeInspection.success) throw new ErrorAPI(typeInspection.error);
    send(res, 200, typeInspection.data);
  } catch (e) { handlerResponse(res, e, "obtener el tipo de inspección") }
}

/**
 * Obtiene todos los tipos de inspección.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los tipos de inspección.
 */
export const getTypeInspections = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const typeInspections = await typeInspectionService.find(body.query);
    if (!typeInspections.success) throw new ErrorAPI(typeInspections.error);
    send(res, 200, typeInspections.data);
  } catch (e) { handlerResponse(res, e, "obtener los tipos de inspección") }
}

/**
 * Crea un nuevo tipo de inspección.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del tipo de inspección en el body.
 * @returns {Promise<void>} - Envía el tipo de inspección creado o un mensaje de error.
 */
export const createTypeInspection = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const typeInspection = await typeInspectionService.create(body);
    if (!typeInspection.success) throw new ErrorAPI(typeInspection.error);
    send(res, 201, typeInspection.data);
  } catch (e) { handlerResponse(res, e, "crear el tipo de inspección") }
}

/**
 * Actualiza un tipo de inspección existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del tipo de inspección en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el tipo de inspección actualizado o un mensaje de error.
 */
export const updateTypeInspection = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const typeInspection = await typeInspectionService.update(params.id, body);
    if (!typeInspection.success) throw new ErrorAPI(typeInspection.error);
    send(res, 200, typeInspection.data);
  } catch (e) { handlerResponse(res, e, "actualizar el tipo de inspección") }
}

/**
 * Elimina un tipo de inspección existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del tipo de inspección a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteTypeInspection = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const typeInspection = await typeInspectionService.delete(params.id);
    if (!typeInspection.success) throw new ErrorAPI(typeInspection.error);
    send(res, 200, typeInspection.data);
  } catch (e) { handlerResponse(res, e, "eliminar el tipo de inspección") }
} 