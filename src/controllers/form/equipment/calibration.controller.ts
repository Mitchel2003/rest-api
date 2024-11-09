import { calibrationService } from "@/services/mongodb/form/equipment/calibration.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene una calibración específica por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la calibración en params.id.
 * @returns {Promise<void>} - Envía la calibración encontrada o un mensaje de error.
 */
export const getCalibration = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const calibration = await calibrationService.findById(params.id);
    if (!calibration.success) throw new ErrorAPI(calibration.error);
    send(res, 200, calibration.data);
  } catch (e) { handlerResponse(res, e, "obtener la calibración") }
}

/**
 * Obtiene todas las calibraciones.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con las calibraciones.
 */
export const getCalibrations = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const calibrations = await calibrationService.find(body.query);
    if (!calibrations.success) throw new ErrorAPI(calibrations.error);
    send(res, 200, calibrations.data);
  } catch (e) { handlerResponse(res, e, "obtener las calibraciones") }
}

/**
 * Crear una nueva calibración
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos de la calibración en el body. 
 * @returns {Promise<void>} - Envía la calibración creada o un mensaje de error.
 */
export const createCalibration = async (req: Request, res: Response): Promise<void> => {
  try {
    const calibration = await calibrationService.create(req.body);
    if (!calibration.success) throw new ErrorAPI(calibration.error);
    send(res, 201, calibration.data);
  } catch (e) { handlerResponse(res, e, "crear la calibración") }
}

/**
 * Actualiza una calibración existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la calibración en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía la calibración actualizada o un mensaje de error.
 */
export const updateCalibration = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const calibration = await calibrationService.update(params.id, body);
    if (!calibration.success) throw new ErrorAPI(calibration.error);
    send(res, 200, calibration.data);
  } catch (e) { handlerResponse(res, e, "actualizar la calibración") }
}

/**
 * Elimina una calibración existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la calibración a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteCalibration = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const calibration = await calibrationService.delete(params.id);
    if (!calibration.success) throw new ErrorAPI(calibration.error);
    send(res, 200, calibration.data);
  } catch (e) { handlerResponse(res, e, "eliminar la calibración") }
} 