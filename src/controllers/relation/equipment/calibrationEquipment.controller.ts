import { calibrationEquipmentService } from "@/services/mongodb/relation/equipment/calibrationEquipment.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene una calibración de equipo específica por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la calibración de equipo en params.id.
 * @returns {Promise<void>} - Envía la calibración de equipo encontrada o un mensaje de error.
 */
export const getCalibrationEquipment = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const calibrationEquipment = await calibrationEquipmentService.findById(params.id);
    if (!calibrationEquipment.success) throw new ErrorAPI(calibrationEquipment.error);
    send(res, 200, calibrationEquipment.data);
  } catch (e) { handlerResponse(res, e, "obtener la calibración de equipo") }
}

/**
 * Obtiene todas las calibraciones de equipo.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con las calibraciones de equipo.
 */
export const getCalibrationEquipments = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const calibrationEquipments = await calibrationEquipmentService.find(body.query, body.populate);
    if (!calibrationEquipments.success) throw new ErrorAPI(calibrationEquipments.error);
    send(res, 200, calibrationEquipments.data);
  } catch (e) { handlerResponse(res, e, "obtener las calibraciones de equipo") }
}

/**
 * Crear una nueva calibración de equipo
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos de la calibración de equipo en el body. 
 * @returns {Promise<void>} - Envía la calibración de equipo creada o un mensaje de error.
 */
export const createCalibrationEquipment = async (req: Request, res: Response): Promise<void> => {
  try {
    const calibrationEquipment = await calibrationEquipmentService.create(req.body);
    if (!calibrationEquipment.success) throw new ErrorAPI(calibrationEquipment.error);
    send(res, 201, calibrationEquipment.data);
  } catch (e) { handlerResponse(res, e, "crear la calibración de equipo") }
}

/**
 * Actualiza una calibración de equipo existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la calibración de equipo en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía la calibración de equipo actualizada o un mensaje de error.
 */
export const updateCalibrationEquipment = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const calibrationEquipment = await calibrationEquipmentService.update(params.id, body);
    if (!calibrationEquipment.success) throw new ErrorAPI(calibrationEquipment.error);
    send(res, 200, calibrationEquipment.data);
  } catch (e) { handlerResponse(res, e, "actualizar la calibración de equipo") }
}

/**
 * Elimina una calibración de equipo existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la calibración de equipo a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteCalibrationEquipment = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const calibrationEquipment = await calibrationEquipmentService.delete(params.id);
    if (!calibrationEquipment.success) throw new ErrorAPI(calibrationEquipment.error);
    send(res, 200, calibrationEquipment.data);
  } catch (e) { handlerResponse(res, e, "eliminar la calibración de equipo") }
} 