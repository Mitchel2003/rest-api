import { maintenanceService } from "@/services/mongodb/form/maintenance/maintenance.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";
import { Request, Response } from "express";

/**
 * Obtiene un mantenimiento específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del mantenimiento en params.id.
 * @returns {Promise<void>} - Envía el mantenimiento encontrado o un mensaje de error.
 */
export const getMaintenance = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const maintenance = await maintenanceService.findById(params.id);
    if (!maintenance.success) throw new ErrorAPI(maintenance.error);
    send(res, 200, maintenance.data);
  } catch (e) { handlerResponse(res, e, "obtener el mantenimiento") }
}

/**
 * Obtiene todos los mantenimientos.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los mantenimientos.
 */
export const getMaintenances = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const maintenances = await maintenanceService.find(body.query, body.populate);
    if (!maintenances.success) throw new ErrorAPI(maintenances.error);
    send(res, 200, maintenances.data);
  } catch (e) { handlerResponse(res, e, "obtener los mantenimientos") }
}

/**
 * Crear un nuevo mantenimiento
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del mantenimiento en el body. 
 * @returns {Promise<void>} - Envía el mantenimiento creado o un mensaje de error.
 */
export const createMaintenance = async (req: Request, res: Response): Promise<void> => {
  try {
    const maintenance = await maintenanceService.create(req.body);
    if (!maintenance.success) throw new ErrorAPI(maintenance.error);
    send(res, 201, maintenance.data);
  } catch (e) { handlerResponse(res, e, "crear el mantenimiento") }
}

/**
 * Actualiza un mantenimiento existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del mantenimiento en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el mantenimiento actualizado o un mensaje de error.
 */
export const updateMaintenance = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const maintenance = await maintenanceService.update(params.id, body);
    if (!maintenance.success) throw new ErrorAPI(maintenance.error);
    send(res, 200, maintenance.data);
  } catch (e) { handlerResponse(res, e, "actualizar el mantenimiento") }
}

/**
 * Elimina un mantenimiento existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del mantenimiento a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteMaintenance = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const maintenance = await maintenanceService.delete(params.id);
    if (!maintenance.success) throw new ErrorAPI(maintenance.error);
    send(res, 200, maintenance.data);
  } catch (e) { handlerResponse(res, e, "eliminar el mantenimiento") }
}
