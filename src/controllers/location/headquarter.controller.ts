/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar sedes */
import { headquarterService } from "@/services/mongodb/location/headquarter.service";
import { accessFactory } from "@/services/mongodb/auth/access.service";
import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { Headquarter } from "@/types/location/headquarter.type";
import { handlerResponse } from "@/errors/handler";
import ErrorAPI, { Forbidden } from "@/errors";
import { User } from "@/types/user/user.type";

import { Request, Response } from "express"

/**
 * Obtiene una sede específico por su ID.
 * Utiliza un patrón Strategy para aplicar la lógica de acceso según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación.
 * @param {Response} res - Objeto de respuesta Express, envía la sede encontrada o un mensaje de error.
 * @returns {Promise<void>} - Envía la sede encontrada o un mensaje de error.
 */
export const getHeadquarter = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Headquarter>(headquarterService, 'headquarter').create(user);
    const headquarter = await accessService.getOne(user, params.id);
    if (!headquarter.success) throw new ErrorAPI(headquarter.error);
    send(res, 200, headquarter.data);
  } catch (e) { handlerResponse(res, e, "obtener la sede") }
}

/**
 * Obtiene las sedes basado en el contexto del usuario.
 * Utiliza un patrón Strategy para aplicar la lógica de filtrado según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía las sedes filtradas o un mensaje de error.
 * @returns {Promise<void>} - Envía un objeto con las sedes filtradas
 */
export const getHeadquarters = async ({ body, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Headquarter>(headquarterService, 'headquarter').create(user);
    const headquarters = await accessService.getAll(user, body.query);
    if (!headquarters.success) throw new ErrorAPI(headquarters.error);
    send(res, 200, headquarters.data);
  } catch (e) { handlerResponse(res, e, "obtener las sedes") }
}

/**
 * Crea una nueva sede.
 * Todos los usuarios autenticados pueden crear sedes.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía la sede creada o un mensaje de error
 */
export const createHeadquarter = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const headquarter = await headquarterService.create(body);
    if (!headquarter.success) throw new ErrorAPI(headquarter.error);
    send(res, 201, headquarter.data);
  } catch (e) { handlerResponse(res, e, "crear la sede") }
}

/**
 * Actualiza una sede existente.
 * Verifica los permisos del usuario antes de realizar la actualización.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía la sede actualizada o un mensaje de error
 * @returns {Promise<void>} - Envía la sede actualizada o un mensaje de error
 */
export const updateHeadquarter = async ({ params, body, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Headquarter>(headquarterService, 'headquarter').create(user);
    const canUpdate = await accessService.canUpdate(user, params.id);
    if (!canUpdate) throw new Forbidden({ message: "No tienes permisos para actualizar esta sede" });
    const headquarter = await headquarterService.update(params.id, body);
    if (!headquarter.success) throw new ErrorAPI(headquarter.error);
    send(res, 200, headquarter.data);
  } catch (e) { handlerResponse(res, e, "actualizar la sede") }
}

/**
 * Elimina una sede existente.
 * Verifica los permisos del usuario antes de realizar la eliminación.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error
 */
export const deleteHeadquarter = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Headquarter>(headquarterService, 'headquarter').create(user);
    const canDelete = await accessService.canDelete(user, params.id);
    if (!canDelete) throw new Forbidden({ message: "No tienes permisos para eliminar esta sede" });
    const result = await headquarterService.delete(params.id);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, result.data);
  } catch (e) { handlerResponse(res, e, "eliminar la sede") }
}