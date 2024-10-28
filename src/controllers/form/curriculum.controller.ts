/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar curriculums (equipos) */
import { ExtendsRequest, send } from "../../interfaces/api.interface"
import Curriculum from "../../models/form/curriculum.model"
import { handlerErrorResponse } from "../../utils/handler"
import { Request, Response } from "express"

/**
 * Obtiene un curriculum específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del curriculum en params.id.
 * @returns {Promise<void>} - Envía el curriculum encontrado o un mensaje de error.
 */
export const getCurriculum = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const curriculum = await Curriculum.findById(params.id).populate('user');
    if (!curriculum) return send(res, 404, 'Curriculum no encontrado');
    send(res, 200, curriculum);
  } catch (e) { handlerErrorResponse(res, e, "obtener el curriculum") }
}

/**
 * Obtiene todos los curriculums.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido.
 * @returns {Promise<void>} - Envía un objeto con los curriculums.
 */
export const getCurriculums = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const curriculums = await Curriculum.find({ user: req.user?.id }).populate('user');
    send(res, 200, curriculums);
  } catch (e) { handlerErrorResponse(res, e, "obtener los curriculums") }
}

/**
 * Crear un nuevo curriculum
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos del curriculum en el body y el ID del usuario en user.id. 
 * @returns {Promise<void>} - Envía el curriculum creado o un mensaje de error.
 */
export const createCurriculum = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const curriculumFormat = new Curriculum({ ...req.body, user: req.user?.id });
    const curriculum = await curriculumFormat.save();
    send(res, 201, curriculum);
  } catch (e) { handlerErrorResponse(res, e, "crear el curriculum") }
}

/**
 * Actualiza un curriculum existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del curriculum en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el curriculum actualizado o un mensaje de error.
 */
export const updateCurriculum = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const curriculum = await Curriculum.findByIdAndUpdate(params.id, body, { new: true });
    if (!curriculum) return send(res, 404, 'Curriculum no encontrado');
    send(res, 200, curriculum);
  } catch (e) { handlerErrorResponse(res, e, "actualizar el curriculum") }
}

/**
 * Elimina un curriculum existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del curriculum a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteCurriculum = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const curriculum = await Curriculum.findByIdAndDelete(params.id);
    if (!curriculum) return send(res, 404, 'Curriculum no encontrado');
    send(res, 200, curriculum);
  } catch (e) { handlerErrorResponse(res, e, "eliminar el curriculum") }
}
