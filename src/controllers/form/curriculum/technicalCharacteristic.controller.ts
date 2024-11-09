import { technicalCharacteristicService } from "@/services/mongodb/form/curriculum/technicalCharacteristic.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene una característica técnica específica por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la característica técnica en params.id.
 * @returns {Promise<void>} - Envía la característica técnica encontrada o un mensaje de error.
 */
export const getTechnicalCharacteristic = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const technicalCharacteristic = await technicalCharacteristicService.findById(params.id);
    if (!technicalCharacteristic.success) throw new ErrorAPI(technicalCharacteristic.error);
    send(res, 200, technicalCharacteristic.data);
  } catch (e) { handlerResponse(res, e, "obtener la característica técnica") }
}

/**
 * Obtiene todas las características técnicas.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con las características técnicas.
 */
export const getTechnicalCharacteristics = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const technicalCharacteristics = await technicalCharacteristicService.find(body.query, body.populate);
    if (!technicalCharacteristics.success) throw new ErrorAPI(technicalCharacteristics.error);
    send(res, 200, technicalCharacteristics.data);
  } catch (e) { handlerResponse(res, e, "obtener las características técnicas") }
}

/**
 * Crea una nueva característica técnica.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos de la característica técnica en el body.
 * @returns {Promise<void>} - Envía la característica técnica creada o un mensaje de error.
 */
export const createTechnicalCharacteristic = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const technicalCharacteristic = await technicalCharacteristicService.create(body);
    if (!technicalCharacteristic.success) throw new ErrorAPI(technicalCharacteristic.error);
    send(res, 201, technicalCharacteristic.data);
  } catch (e) { handlerResponse(res, e, "crear la característica técnica") }
}

/**
 * Actualiza una característica técnica existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la característica técnica en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía la característica técnica actualizada o un mensaje de error.
 */
export const updateTechnicalCharacteristic = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const technicalCharacteristic = await technicalCharacteristicService.update(params.id, body);
    if (!technicalCharacteristic.success) throw new ErrorAPI(technicalCharacteristic.error);
    send(res, 200, technicalCharacteristic.data);
  } catch (e) { handlerResponse(res, e, "actualizar la característica técnica") }
}

/**
 * Elimina una característica técnica existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la característica técnica a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteTechnicalCharacteristic = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const technicalCharacteristic = await technicalCharacteristicService.delete(params.id);
    if (!technicalCharacteristic.success) throw new ErrorAPI(technicalCharacteristic.error);
    send(res, 200, technicalCharacteristic.data);
  } catch (e) { handlerResponse(res, e, "eliminar la característica técnica") }
} 