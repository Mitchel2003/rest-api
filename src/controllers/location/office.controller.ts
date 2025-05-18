/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar offices */
import { officeService } from "@/services/mongodb/location/office.service";
import { accessFactory } from "@/services/mongodb/auth/access.service";
import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { Office } from "@/types/location/office.type";
import { handlerResponse } from "@/errors/handler";
import ErrorAPI, { Forbidden } from "@/errors";
import { User } from "@/types/user/user.type";

import { Request, Response } from "express"

/**
 * Obtiene un consultorio específico por su ID.
 * Utiliza un patrón Strategy para aplicar la lógica de acceso según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación.
 * @param {Response} res - Objeto de respuesta Express, envía el consultorio encontrado o un mensaje de error.
 * @returns {Promise<void>} - Envía el consultorio encontrado o un mensaje de error.
 */
export const getOffice = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Office>(officeService, 'office').create(user);
    const office = await accessService.getOne(user, params.id);
    if (!office.success) throw new ErrorAPI(office.error);
    send(res, 200, office.data);
  } catch (e) { handlerResponse(res, e, "obtener el consultorio") }
}

/**
 * Obtiene los consultorios basado en el contexto del usuario.
 * Utiliza un patrón Strategy para aplicar la lógica de filtrado según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía los consultorios filtrados o un mensaje de error.
 * @returns {Promise<void>} - Envía un objeto con los consultorios filtrados
 */
export const getOffices = async ({ query, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Office>(officeService, 'office').create(user);
    const offices = await accessService.getAll(user, query);
    if (!offices.success) throw new ErrorAPI(offices.error);
    send(res, 200, offices.data);
  } catch (e) { handlerResponse(res, e, "obtener los consultorios") }
}

/**
 * Crea un nuevo consultorio.
 * Todos los usuarios autenticados pueden crear consultorios.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía el consultorio creado o un mensaje de error
 */
export const createOffice = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const office = await officeService.create(body);
    if (!office.success) throw new ErrorAPI(office.error);
    send(res, 201, office.data);
  } catch (e) { handlerResponse(res, e, "crear el consultorio") }
}

/**
 * Actualiza un consultorio existente.
 * Verifica los permisos del usuario antes de realizar la actualización.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía el consultorio actualizado o un mensaje de error
 * @returns {Promise<void>} - Envía el consultorio actualizado o un mensaje de error
 */
export const updateOffice = async ({ params, body, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Office>(officeService, 'office').create(user);
    const canUpdate = await accessService.canUpdate(user, params.id);
    if (!canUpdate) throw new Forbidden({ message: "No tienes permisos para actualizar este consultorio" });
    const office = await officeService.update(params.id, body);
    if (!office.success) throw new ErrorAPI(office.error);
    send(res, 200, office.data);
  } catch (e) { handlerResponse(res, e, "actualizar el consultorio") }
}

/**
 * Elimina un consultorio existente.
 * Verifica los permisos del usuario antes de realizar la eliminación.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error
 */
export const deleteOffice = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Office>(officeService, 'office').create(user);
    const canDelete = await accessService.canDelete(user, params.id);
    if (!canDelete) throw new Forbidden({ message: "No tienes permisos para eliminar este consultorio" });
    const result = await officeService.delete(params.id);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, result.data);
  } catch (e) { handlerResponse(res, e, "eliminar el consultorio") }
}