/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar actividades */
import { scheduleService as scheduleService } from "@/services/mongodb/form/schedule.service";
import { accessFactory } from "@/services/mongodb/auth/access.service";
import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { handlerResponse } from "@/errors/handler";
import ErrorAPI, { Forbidden } from "@/errors";
import { Schedule } from "form/schedule.type";
import { User } from "@/types/user/user.type";

import { Response, Request } from "express";

/**
 * Obtiene un cronograma específico por su ID.
 * Utiliza un patrón Strategy para aplicar la lógica de acceso según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación.
 * @param {Response} res - Objeto de respuesta Express, envía el cronograma encontrado o un mensaje de error.
 * @returns {Promise<void>} - Envía el cronograma encontrado o un mensaje de error.
 */
export const getSchedule = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Schedule>(scheduleService, 'schedule').create(user);
    const schedule = await accessService.getOne(user, params.id);
    if (!schedule.success) throw new ErrorAPI(schedule.error);
    send(res, 200, schedule.data);
  } catch (e) { handlerResponse(res, e, "obtener el cronograma") }
}

/**
 * Obtiene los cronogramas basado en el contexto del usuario.
 * Utiliza un patrón Strategy para aplicar la lógica de filtrado según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía los cronogramas filtrados o un mensaje de error.
 * @returns {Promise<void>} - Envía un objeto con los cronogramas filtrados
 */
export const getSchedules = async ({ query, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Schedule>(scheduleService, 'schedule').create(user);
    const schedules = await accessService.getAll(user, query);
    if (!schedules.success) throw new ErrorAPI(schedules.error);
    send(res, 200, schedules.data);
  } catch (e) { handlerResponse(res, e, "obtener los cronogramas") }
}

/**
 * Crea un nuevo cronograma.
 * Todos los usuarios autenticados pueden crear cronogramas.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía el cronograma creado o un mensaje de error
 */
export const createSchedule = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const schedule = await scheduleService.create(body);
    if (!schedule.success) throw new ErrorAPI(schedule.error);
    send(res, 201, schedule.data);
  } catch (e) { handlerResponse(res, e, "crear el cronograma") }
}

/**
 * Actualiza un cronograma existente.
 * Verifica los permisos del usuario antes de realizar la actualización.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía el cronograma actualizado o un mensaje de error
 * @returns {Promise<void>} - Envía el cronograma actualizado o un mensaje de error
 */
export const updateSchedule = async ({ params, body, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Schedule>(scheduleService, 'schedule').create(user);
    const canUpdate = await accessService.canUpdate(user, params.id);
    if (!canUpdate) throw new Forbidden({ message: "No tienes permisos para actualizar este cronograma" });
    const schedule = await scheduleService.update(params.id, body);
    if (!schedule.success) throw new ErrorAPI(schedule.error);
    send(res, 200, schedule.data);
  } catch (e) { handlerResponse(res, e, "actualizar el cronograma") }
}

/**
 * Elimina un cronograma existente.
 * Verifica los permisos del usuario antes de realizar la eliminación.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía un mensaje de confirmación o error
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error
 */
export const deleteSchedule = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Schedule>(scheduleService, 'schedule').create(user);
    const canDelete = await accessService.canDelete(user, params.id);
    if (!canDelete) throw new Forbidden({ message: "No tienes permisos para eliminar este cronograma" });
    const result = await scheduleService.delete(params.id);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, result.data);
  } catch (e) { handlerResponse(res, e, "eliminar el cronograma") }
}