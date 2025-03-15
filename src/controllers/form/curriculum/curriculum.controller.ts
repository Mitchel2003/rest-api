/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar curriculums */
import { curriculumService } from "@/services/mongodb/form/curriculum/curriculum.service";
import { ExtendsRequest } from "@/interfaces/api.interface";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import { User } from "user/user.type";
import { Response } from "express";
import ErrorAPI from "@/errors";

/**
 * Obtiene un curriculum específico por su ID.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación. Se espera que contenga el ID del curriculum en params.id.
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía el curriculum encontrado o un mensaje de error.
 */
export const getCurriculum = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const { id } = params;
    const curriculum = await curriculumService.findById(id);
    if (!curriculum.success) throw new ErrorAPI(curriculum.error);
    // Si el usuario es admin, puede ver cualquier curriculum
    if (user.role === 'admin') return send(res, 200, curriculum.data);

    // Verificar si el curriculum pertenece a una IPS del proveedor
    const belongsToProvider = await curriculumService.verifyProviderOwnership(id, user.company);
    if (!belongsToProvider.success) throw new ErrorAPI(belongsToProvider.error);
    if (!belongsToProvider.data) throw new ErrorAPI({ message: "No tienes permisos para ver este curriculum" });
    send(res, 200, curriculum.data);
  } catch (e) { handlerResponse(res, e, "obtener el curriculum") }
}

/**
 * Obtiene los curriculums basado en el contexto del usuario.
 * Si el usuario es admin, obtiene todos los curriculums sin excepción.
 * Si el usuario es un proveedor, obtiene solo los curriculums asociados.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía un objeto con los curriculums filtrados
 */
export const getCurriculums = async ({ query, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    if (user.role === 'admin') {// return all curriculums
      const curriculums = await curriculumService.find(query || {});
      if (!curriculums.success) throw new ErrorAPI(curriculums.error);
      return send(res, 200, curriculums.data);
    }

    // If the user is a provider, only see their curriculums
    const curriculums = await curriculumService.findByProvider({ company: user.company, query: query || {}, populate: [] });
    if (!curriculums.success) throw new ErrorAPI(curriculums.error);
    send(res, 200, curriculums.data);
  } catch (e) { handlerResponse(res, e, "obtener los curriculums") }
}

/**
 * Crear un nuevo curriculum
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación. Se espera que contenga los datos del curriculum en el body. 
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía el curriculum creado o un mensaje de error.
 */
export const createCurriculum = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const curriculum = await curriculumService.create(req.body);
    if (!curriculum.success) throw new ErrorAPI(curriculum.error);
    send(res, 201, curriculum.data);
  } catch (e) { handlerResponse(res, e, "crear el curriculum") }
}

/**
 * Actualiza un curriculum existente.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación. Debe contener el ID del curriculum en params.id y los datos actualizados en el body.
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía el curriculum actualizado o un mensaje de error.
 */
export const updateCurriculum = async ({ params, body }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const { id } = params;
    // Verify if the curriculum belongs to provider context
    // const belongsToProvider = await curriculumService.verifyProviderOwnership(id, user.company);
    // if (!belongsToProvider.success) throw new ErrorAPI(belongsToProvider.error);
    // if (!belongsToProvider.data) throw new ErrorAPI({ message: "No tienes permisos para actualizar este curriculum" });
    // Update curriculum
    const curriculum = await curriculumService.update(id, body);
    if (!curriculum.success) throw new ErrorAPI(curriculum.error);
    send(res, 200, curriculum.data);
  } catch (e) { handlerResponse(res, e, "actualizar el curriculum") }
}

/**
 * Elimina un curriculum existente.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación. Debe contener el ID del curriculum a eliminar en params.id.
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteCurriculum = async ({ params }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const { id } = params;
    // Verify if the curriculum belongs to provider context
    // const belongsToProvider = await curriculumService.verifyProviderOwnership(id, user.company);
    // if (!belongsToProvider.success) throw new ErrorAPI(belongsToProvider.error);
    // if (!belongsToProvider.data) throw new ErrorAPI({ message: "No tienes permisos para eliminar este curriculum" });
    // Delete curriculum
    const curriculum = await curriculumService.delete(id);
    if (!curriculum.success) throw new ErrorAPI(curriculum.error);
    send(res, 200, curriculum.data);
  } catch (e) { handlerResponse(res, e, "eliminar el curriculum") }
}