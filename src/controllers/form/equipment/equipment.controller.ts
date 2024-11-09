import { equipmentService } from "@/services/mongodb/form/equipment/equipment.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";
import { Request, Response } from "express";

/**
 * Obtiene un equipo específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del equipo en params.id.
 * @returns {Promise<void>} - Envía el equipo encontrado o un mensaje de error.
 */
export const getEquipment = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const equipment = await equipmentService.findById(params.id);
    if (!equipment.success) throw new ErrorAPI(equipment.error);
    send(res, 200, equipment.data);
  } catch (e) { handlerResponse(res, e, "obtener el equipo") }
}

/**
 * Obtiene todos los equipos.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los equipos.
 */
export const getEquipments = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const equipments = await equipmentService.find(body.query, body.populate);
    if (!equipments.success) throw new ErrorAPI(equipments.error);
    send(res, 200, equipments.data);
  } catch (e) { handlerResponse(res, e, "obtener los equipos") }
}

/**
 * Crear un nuevo equipo
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del equipo en el body. 
 * @returns {Promise<void>} - Envía el equipo creado o un mensaje de error.
 */
export const createEquipment = async (req: Request, res: Response): Promise<void> => {
  try {
    const equipment = await equipmentService.create(req.body);
    if (!equipment.success) throw new ErrorAPI(equipment.error);
    send(res, 201, equipment.data);
  } catch (e) { handlerResponse(res, e, "crear el equipo") }
}

/**
 * Actualiza un equipo existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del equipo en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el equipo actualizado o un mensaje de error.
 */
export const updateEquipment = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const equipment = await equipmentService.update(params.id, body);
    if (!equipment.success) throw new ErrorAPI(equipment.error);
    send(res, 200, equipment.data);
  } catch (e) { handlerResponse(res, e, "actualizar el equipo") }
}

/**
 * Elimina un equipo existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del equipo a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteEquipment = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const equipment = await equipmentService.delete(params.id);
    if (!equipment.success) throw new ErrorAPI(equipment.error);
    send(res, 200, equipment.data);
  } catch (e) { handlerResponse(res, e, "eliminar el equipo") }
} 