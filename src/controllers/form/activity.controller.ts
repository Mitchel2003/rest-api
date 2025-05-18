/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar actividades */
import { activityService as activityService } from "@/services/mongodb/form/activity.service";
import { accessFactory } from "@/services/mongodb/auth/access.service";
import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { handlerResponse } from "@/errors/handler";
import ErrorAPI, { Forbidden } from "@/errors";
import { Activity } from "form/activity.type";
import { User } from "@/types/user/user.type";

import { Response, Request } from "express";

/**
 * Obtiene una actividad específico por su ID.
 * Utiliza un patrón Strategy para aplicar la lógica de acceso según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación.
 * @param {Response} res - Objeto de respuesta Express, envía la actividad encontrada o un mensaje de error.
 * @returns {Promise<void>} - Envía la actividad encontrada o un mensaje de error.
 */
export const getActivity = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Activity>(activityService, 'activity').create(user);
    const activity = await accessService.getOne(user, params.id);
    if (!activity.success) throw new ErrorAPI(activity.error);
    send(res, 200, activity.data);
  } catch (e) { handlerResponse(res, e, "obtener la actividad") }
}

/**
 * Obtiene las actividades basado en el contexto del usuario.
 * Utiliza un patrón Strategy para aplicar la lógica de filtrado según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía las actividades filtradas o un mensaje de error.
 * @returns {Promise<void>} - Envía un objeto con las actividades filtradas
 */
export const getActivities = async ({ query, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Activity>(activityService, 'activity').create(user);
    const activities = await accessService.getAll(user, query);
    if (!activities.success) throw new ErrorAPI(activities.error);
    send(res, 200, activities.data);
  } catch (e) { handlerResponse(res, e, "obtener las actividades") }
}

/**
 * Crea una nueva actividad.
 * Todos los usuarios autenticados pueden crear actividades.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía la actividad creada o un mensaje de error
 */
export const createActivity = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const activity = await activityService.create(body);
    if (!activity.success) throw new ErrorAPI(activity.error);
    send(res, 201, activity.data);
  } catch (e) { handlerResponse(res, e, "crear la actividad") }
}

/**
 * Actualiza una actividad existente.
 * Verifica los permisos del usuario antes de realizar la actualización.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía la actividad actualizada o un mensaje de error
 * @returns {Promise<void>} - Envía la actividad actualizada o un mensaje de error
 */
export const updateActivity = async ({ params, body, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Activity>(activityService, 'activity').create(user);
    const canUpdate = await accessService.canUpdate(user, params.id);
    if (!canUpdate) throw new Forbidden({ message: "No tienes permisos para actualizar esta actividad" });
    const activity = await activityService.update(params.id, body);
    if (!activity.success) throw new ErrorAPI(activity.error);
    send(res, 200, activity.data);
  } catch (e) { handlerResponse(res, e, "actualizar la actividad") }
}

/**
 * Elimina una actividad existente.
 * Verifica los permisos del usuario antes de realizar la eliminación.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía un mensaje de confirmación o error
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error
 */
export const deleteActivity = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Activity>(activityService, 'activity').create(user);
    const canDelete = await accessService.canDelete(user, params.id);
    if (!canDelete) throw new Forbidden({ message: "No tienes permisos para eliminar esta actividad" });
    const result = await activityService.delete(params.id);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, result.data);
  } catch (e) { handlerResponse(res, e, "eliminar la actividad") }
}