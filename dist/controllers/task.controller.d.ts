/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar tareas */
import { ExtendsRequest } from "../interfaces/api.interface";
import { Request, Response } from "express";
/**
 * Obtiene una tarea específica por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la tarea en params.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía la tarea encontrada o un mensaje de error.
 */
export declare const getTask: ({ params }: Request, res: Response) => Promise<void>;
/**
 * Obtiene todas las tareas del usuario actual con paginación.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del usuario en user.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía un objeto con las tareas, información de paginación y total de tareas.
 */
export declare const getTasks: (req: ExtendsRequest, res: Response) => Promise<void>;
/**
 * Crea una nueva tarea para el usuario actual.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos de la tarea en el body y el ID del usuario en user.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía la tarea creada o un mensaje de error.
 */
export declare const createTask: (req: ExtendsRequest, res: Response) => Promise<void>;
/**
 * Actualiza una tarea existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la tarea en params.id y los datos actualizados en el body.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía la tarea actualizada o un mensaje de error.
 */
export declare const updateTask: ({ params, body }: Request, res: Response) => Promise<void>;
/**
 * Elimina una tarea existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la tarea a eliminar en params.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export declare const deleteTask: ({ params }: Request, res: Response) => Promise<void>;
