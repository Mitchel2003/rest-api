import { reminderService } from "@/services/mongodb/form/equipment/reminder.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene un recordatorio específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del recordatorio en params.id.
 * @returns {Promise<void>} - Envía el recordatorio encontrado o un mensaje de error.
 */
export const getReminder = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const reminder = await reminderService.findById(params.id);
    if (!reminder.success) throw new ErrorAPI(reminder.error);
    send(res, 200, reminder.data);
  } catch (e) { handlerResponse(res, e, "obtener el recordatorio") }
}

/**
 * Obtiene todos los recordatorios.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los recordatorios.
 */
export const getReminders = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const reminders = await reminderService.find(body.query, body.populate);
    if (!reminders.success) throw new ErrorAPI(reminders.error);
    send(res, 200, reminders.data);
  } catch (e) { handlerResponse(res, e, "obtener los recordatorios") }
}

/**
 * Crear un nuevo recordatorio
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del recordatorio en el body. 
 * @returns {Promise<void>} - Envía el recordatorio creado o un mensaje de error.
 */
export const createReminder = async (req: Request, res: Response): Promise<void> => {
  try {
    const reminder = await reminderService.create(req.body);
    if (!reminder.success) throw new ErrorAPI(reminder.error);
    send(res, 201, reminder.data);
  } catch (e) { handlerResponse(res, e, "crear el recordatorio") }
}

/**
 * Actualiza un recordatorio existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del recordatorio en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el recordatorio actualizado o un mensaje de error.
 */
export const updateReminder = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const reminder = await reminderService.update(params.id, body);
    if (!reminder.success) throw new ErrorAPI(reminder.error);
    send(res, 200, reminder.data);
  } catch (e) { handlerResponse(res, e, "actualizar el recordatorio") }
}

/**
 * Elimina un recordatorio existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del recordatorio a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteReminder = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const reminder = await reminderService.delete(params.id);
    if (!reminder.success) throw new ErrorAPI(reminder.error);
    send(res, 200, reminder.data);
  } catch (e) { handlerResponse(res, e, "eliminar el recordatorio") }
} 