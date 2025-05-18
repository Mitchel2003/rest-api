/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar curriculums */
import { curriculumService as cvService } from "@/services/mongodb/form/curriculum/curriculum.service";
import { accessFactory } from "@/services/mongodb/auth/access.service";
import { Curriculum } from "@/types/form/curriculum/curriculum.type";
import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { handlerResponse } from "@/errors/handler";
import ErrorAPI, { Forbidden } from "@/errors";
import { User } from "@/types/user/user.type";

import { Response, Request } from "express";

/**
 * Obtiene un curriculum específico por su ID.
 * Utiliza un patrón Strategy para aplicar la lógica de acceso según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación.
 * @param {Response} res - Objeto de respuesta Express, envía el curriculum encontrado o un mensaje de error.
 * @returns {Promise<void>} - Envía el curriculum encontrado o un mensaje de error.
 */
export const getCurriculum = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Curriculum>(cvService, 'curriculum').create(user);
    const curriculum = await accessService.getOne(user, params.id);
    if (!curriculum.success) throw new ErrorAPI(curriculum.error);
    send(res, 200, curriculum.data);
  } catch (e) { handlerResponse(res, e, "obtener el curriculum") }
}

/**
 * Obtiene los curriculums basado en el contexto del usuario.
 * Utiliza un patrón Strategy para aplicar la lógica de filtrado según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía los curriculums filtrados o un mensaje de error.
 * @returns {Promise<void>} - Envía un objeto con los curriculums filtrados
 */
export const getCurriculums = async ({ query, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Curriculum>(cvService, 'curriculum').create(user);
    const curriculums = await accessService.getAll(user, query);
    if (!curriculums.success) throw new ErrorAPI(curriculums.error);
    send(res, 200, curriculums.data);
  } catch (e) { handlerResponse(res, e, "obtener los curriculums") }
}

/**
 * Crea un nuevo curriculum.
 * Todos los usuarios autenticados pueden crear curriculums.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía el curriculum creado o un mensaje de error
 */
export const createCurriculum = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const curriculum = await cvService.create(body);
    if (!curriculum.success) throw new ErrorAPI(curriculum.error);
    send(res, 201, curriculum.data);
  } catch (e) { handlerResponse(res, e, "crear el curriculum") }
}

/**
 * Actualiza un curriculum existente.
 * Verifica los permisos del usuario antes de realizar la actualización.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía el curriculum actualizado o un mensaje de error
 * @returns {Promise<void>} - Envía el curriculum actualizado o un mensaje de error
 */
export const updateCurriculum = async ({ params, body, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Curriculum>(cvService, 'curriculum').create(user);
    const canUpdate = await accessService.canUpdate(user, params.id);
    if (!canUpdate) throw new Forbidden({ message: "No tienes permisos para actualizar este curriculum" });
    const curriculum = await cvService.update(params.id, body);
    if (!curriculum.success) throw new ErrorAPI(curriculum.error);
    send(res, 200, curriculum.data);
  } catch (e) { handlerResponse(res, e, "actualizar el curriculum") }
}

/**
 * Elimina un curriculum existente.
 * Verifica los permisos del usuario antes de realizar la eliminación.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error
 */
export const deleteCurriculum = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Curriculum>(cvService, 'curriculum').create(user);
    const canDelete = await accessService.canDelete(user, params.id);
    if (!canDelete) throw new Forbidden({ message: "No tienes permisos para eliminar este curriculum" });
    const result = await cvService.delete(params.id);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, result.data);
  } catch (e) { handlerResponse(res, e, "eliminar el curriculum") }
}