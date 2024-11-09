import { checkMaintenanceService } from "@/services/mongodb/relation/maintenance/checkMaintenance.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene un checkMaintenance específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del checkMaintenance en params.id.
 * @returns {Promise<void>} - Envía el checkMaintenance encontrado o un mensaje de error.
 */
export const getCheckMaintenance = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const checkMaintenance = await checkMaintenanceService.findById(params.id);
    if (!checkMaintenance.success) throw new ErrorAPI(checkMaintenance.error);
    send(res, 200, checkMaintenance.data);
  } catch (e) { handlerResponse(res, e, "obtener el checkMaintenance") }
}

/**
 * Obtiene todos los checkMaintenances.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los checkMaintenances.
 */
export const getCheckMaintenances = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const checkMaintenances = await checkMaintenanceService.find(body.query, body.populate);
    if (!checkMaintenances.success) throw new ErrorAPI(checkMaintenances.error);
    send(res, 200, checkMaintenances.data);
  } catch (e) { handlerResponse(res, e, "obtener los checkMaintenances") }
}

/**
 * Crear un nuevo checkMaintenance
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del checkMaintenance en el body. 
 * @returns {Promise<void>} - Envía el checkMaintenance creado o un mensaje de error.
 */
export const createCheckMaintenance = async (req: Request, res: Response): Promise<void> => {
  try {
    const checkMaintenance = await checkMaintenanceService.create(req.body);
    if (!checkMaintenance.success) throw new ErrorAPI(checkMaintenance.error);
    send(res, 201, checkMaintenance.data);
  } catch (e) { handlerResponse(res, e, "crear el checkMaintenance") }
}

/**
 * Actualiza un checkMaintenance existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del checkMaintenance en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el checkMaintenance actualizado o un mensaje de error.
 */
export const updateCheckMaintenance = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const checkMaintenance = await checkMaintenanceService.update(params.id, body);
    if (!checkMaintenance.success) throw new ErrorAPI(checkMaintenance.error);
    send(res, 200, checkMaintenance.data);
  } catch (e) { handlerResponse(res, e, "actualizar el checkMaintenance") }
}

/**
 * Elimina un checkMaintenance existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del checkMaintenance a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteCheckMaintenance = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const checkMaintenance = await checkMaintenanceService.delete(params.id);
    if (!checkMaintenance.success) throw new ErrorAPI(checkMaintenance.error);
    send(res, 200, checkMaintenance.data);
  } catch (e) { handlerResponse(res, e, "eliminar el checkMaintenance") }
} 