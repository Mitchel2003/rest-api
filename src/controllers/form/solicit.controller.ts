/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar solicitudes */
import { solicitService as solicitService } from "@/services/mongodb/form/solicit.service";
import { accessFactory } from "@/services/mongodb/auth/access.service";
import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { handlerResponse } from "@/errors/handler";
import ErrorAPI, { Forbidden } from "@/errors";
import { User } from "@/types/user/user.type";
import { Solicit } from "form/solicit.type";

import { Response, Request } from "express";

/**
 * Obtiene una solicitud específico por su ID.
 * Utiliza un patrón Strategy para aplicar la lógica de acceso según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación.
 * @param {Response} res - Objeto de respuesta Express, envía la solicitud encontrada o un mensaje de error.
 * @returns {Promise<void>} - Envía la solicitud encontrada o un mensaje de error.
 */
export const getSolicit = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Solicit>(solicitService, 'solicit').create(user);
    const solicit = await accessService.getOne(user, params.id);
    if (!solicit.success) throw new ErrorAPI(solicit.error);
    send(res, 200, solicit.data);
  } catch (e) { handlerResponse(res, e, "obtener la solicitud") }
}

/**
 * Obtiene las solicitudes basado en el contexto del usuario.
 * Utiliza un patrón Strategy para aplicar la lógica de filtrado según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía las solicitudes filtradas o un mensaje de error.
 * @returns {Promise<void>} - Envía un objeto con las solicitudes filtradas
 */
export const getSolicits = async ({ query, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Solicit>(solicitService, 'solicit').create(user);
    const solicits = await accessService.getAll(user, query);
    if (!solicits.success) throw new ErrorAPI(solicits.error);
    send(res, 200, solicits.data);
  } catch (e) { handlerResponse(res, e, "obtener las solicitudes") }
}

/**
 * Crea una nueva solicitud.
 * Todos los usuarios autenticados pueden crear solicitudes.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía la solicitud creada o un mensaje de error
 */
export const createSolicit = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const solicit = await solicitService.create(body);
    if (!solicit.success) throw new ErrorAPI(solicit.error);
    send(res, 201, solicit.data);
  } catch (e) { handlerResponse(res, e, "crear la solicitud") }
}

/**
 * Actualiza una solicitud existente.
 * Verifica los permisos del usuario antes de realizar la actualización.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía la solicitud actualizada o un mensaje de error
 * @returns {Promise<void>} - Envía la solicitud actualizada o un mensaje de error
 */
export const updateSolicit = async ({ params, body, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Solicit>(solicitService, 'solicit').create(user);
    const canUpdate = await accessService.canUpdate(user, params.id);
    if (!canUpdate) throw new Forbidden({ message: "No tienes permisos para actualizar este solicit" });
    const solicit = await solicitService.update(params.id, body);
    if (!solicit.success) throw new ErrorAPI(solicit.error);
    send(res, 200, solicit.data);
  } catch (e) { handlerResponse(res, e, "actualizar la solicitud") }
}

/**
 * Elimina una solicitud existente.
 * Verifica los permisos del usuario antes de realizar la eliminación.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error
 */
export const deleteSolicit = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Solicit>(solicitService, 'solicit').create(user);
    const canDelete = await accessService.canDelete(user, params.id);
    if (!canDelete) throw new Forbidden({ message: "No tienes permisos para eliminar esta solicitud" });
    const result = await solicitService.delete(params.id);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, result.data);
  } catch (e) { handlerResponse(res, e, "eliminar la solicitud") }
}