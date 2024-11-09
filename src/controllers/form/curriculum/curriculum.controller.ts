/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar curriculums */
import { curriculumService } from "@/services/mongodb/form/curriculum/curriculum.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface"
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene un curriculum específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del curriculum en params.id.
 * @returns {Promise<void>} - Envía el curriculum encontrado o un mensaje de error.
 */
export const getCurriculum = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const curriculum = await curriculumService.findById(params.id);
    if (!curriculum.success) throw new ErrorAPI(curriculum.error);
    send(res, 200, curriculum.data);
  } catch (e) { handlerResponse(res, e, "obtener el curriculum") }
}

/**
 * Obtiene todos los curriculums.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los curriculums.
 */
export const getCurriculums = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const curriculums = await curriculumService.find(body.query);
    if (!curriculums.success) throw new ErrorAPI(curriculums.error);
    send(res, 200, curriculums.data);
  } catch (e) { handlerResponse(res, e, "obtener los curriculums") }
}

/**
 * Crear un nuevo curriculum
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del curriculum en el body. 
 * @returns {Promise<void>} - Envía el curriculum creado o un mensaje de error.
 */
export const createCurriculum = async (req: Request, res: Response): Promise<void> => {
  try {
    const curriculum = await curriculumService.create(req.body);
    if (!curriculum.success) throw new ErrorAPI(curriculum.error);
    send(res, 201, curriculum.data);
  } catch (e) { handlerResponse(res, e, "crear el curriculum") }
}

/**
 * Actualiza un curriculum existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del curriculum en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el curriculum actualizado o un mensaje de error.
 */
export const updateCurriculum = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const curriculum = await curriculumService.update(params.id, body);
    if (!curriculum.success) throw new ErrorAPI(curriculum.error);
    send(res, 200, curriculum.data);
  } catch (e) { handlerResponse(res, e, "actualizar el curriculum") }
}

/**
 * Elimina un curriculum existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del curriculum a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteCurriculum = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const curriculum = await curriculumService.delete(params.id);
    if (!curriculum.success) throw new ErrorAPI(curriculum.error);
    send(res, 200, curriculum.data);
  } catch (e) { handlerResponse(res, e, "eliminar el curriculum") }
}