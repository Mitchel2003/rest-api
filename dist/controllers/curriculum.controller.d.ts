/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar curriculums (equipos) */
import { ExtendsRequest } from "../interfaces/api.interface";
import { Request, Response } from "express";
/**
 * Obtiene un curriculum específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del curriculum en params.id.
 * @returns {Promise<void>} - Envía el curriculum encontrado o un mensaje de error.
 */
export declare const getCurriculum: ({ params }: Request, res: Response) => Promise<void>;
/**
 * Obtiene todos los curriculums.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido.
 * @returns {Promise<void>} - Envía un objeto con los curriculums.
 */
export declare const getCurriculums: (req: ExtendsRequest, res: Response) => Promise<void>;
/**
 * Crear un nuevo curriculum
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos del curriculum en el body y el ID del usuario en user.id.
 * @returns {Promise<void>} - Envía el curriculum creado o un mensaje de error.
 */
export declare const createCurriculum: (req: ExtendsRequest, res: Response) => Promise<void>;
/**
 * Actualiza un curriculum existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del curriculum en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el curriculum actualizado o un mensaje de error.
 */
export declare const updateCurriculum: ({ params, body }: Request, res: Response) => Promise<void>;
/**
 * Elimina un curriculum existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del curriculum a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export declare const deleteCurriculum: ({ params }: Request, res: Response) => Promise<void>;
