/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar mantenimientos */
import { maintenanceService as mtService } from "@/services/mongodb/form/maintenance.service";
import { accessFactory } from "@/services/mongodb/auth/access.service";
import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { Maintenance } from "form/maintenance.type";
import { handlerResponse } from "@/errors/handler";
import ErrorAPI, { Forbidden } from "@/errors";
import { User } from "@/types/user/user.type";

import { Response, Request } from "express";

/**
 * Obtiene un mantenimiento específico por su ID.
 * Utiliza un patrón Strategy para aplicar la lógica de acceso según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express. Se espera que contenga el ID del mantenimiento en params.id.
 * @param {Response} res - Objeto de respuesta Express, envía el mantenimiento encontrado o un mensaje de error.
 * @returns {Promise<void>} - Envía el mantenimiento encontrado o un mensaje de error.
 */
export const getMaintenance = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Maintenance>(mtService, 'maintenance').create(user);
    const maintenance = await accessService.getOne(user, params.id);
    if (!maintenance.success) throw new ErrorAPI(maintenance.error);
    send(res, 200, maintenance.data);
  } catch (e) { handlerResponse(res, e, "obtener el mantenimiento") }
}

/**
 * Obtiene todos los mantenimientos.
 * Utiliza un patrón Strategy para aplicar la lógica de filtrado según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @param {Response} res - Objeto de respuesta Express, envía los mantenimientos filtrados o un mensaje de error.
 * @returns {Promise<void>} - Envía un objeto con los mantenimientos filtrados.
 */
export const getMaintenances = async ({ query, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Maintenance>(mtService, 'maintenance').create(user);
    const maintenances = await accessService.getAll(user, query);
    if (!maintenances.success) throw new ErrorAPI(maintenances.error);
    send(res, 200, maintenances.data);
  } catch (e) { handlerResponse(res, e, "obtener los mantenimientos") }
}

/**
 * Crea un nuevo mantenimiento.
 * Todos los usuarios autenticados pueden crear mantenimientos.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía el mantenimiento creado o un mensaje de error
 */
export const createMaintenance = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const maintenance = await mtService.create(body);
    if (!maintenance.success) throw new ErrorAPI(maintenance.error);
    send(res, 201, maintenance.data);
  } catch (e) { handlerResponse(res, e, "crear el mantenimiento") }
}

/**
 * Actualiza un mantenimiento existente.
 * Verifica los permisos del usuario antes de realizar la actualización.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía el mantenimiento actualizado o un mensaje de error
 * @returns {Promise<void>} - Envía el mantenimiento actualizado o un mensaje de error
 */
export const updateMaintenance = async ({ params, body, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Maintenance>(mtService, 'maintenance').create(user);
    const canUpdate = await accessService.canUpdate(user, params.id);
    if (!canUpdate) throw new Forbidden({ message: "No tienes permisos para actualizar este mantenimiento" });
    const maintenance = await mtService.update(params.id, body);
    if (!maintenance.success) throw new ErrorAPI(maintenance.error);
    send(res, 200, maintenance.data);
  } catch (e) { handlerResponse(res, e, "actualizar el mantenimiento") }
}

/**
 * Elimina un mantenimiento existente.
 * Verifica los permisos del usuario antes de realizar la eliminación.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error
 */
export const deleteMaintenance = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Maintenance>(mtService, 'maintenance').create(user);
    const canDelete = await accessService.canDelete(user, params.id);
    if (!canDelete) throw new Forbidden({ message: "No tienes permisos para eliminar este mantenimiento" });
    const result = await mtService.delete(params.id);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, result.data);
  } catch (e) { handlerResponse(res, e, "eliminar el mantenimiento") }
}