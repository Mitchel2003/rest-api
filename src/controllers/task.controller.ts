/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar tareas */
import { Request, Response } from "express";

import ExtendsRequest from "../interfaces/request.interface";
import { send } from "../interfaces/response.interface"
import Task from "../models/task.model";

/**
 * Obtiene una tarea específica por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la tarea en params.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía la tarea encontrada o un mensaje de error.
 */
export const getTask = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(params.id).populate('user');
    if (!task) return send(res, 404, 'Tarea no encontrada');
    send(res, 200, task);
  } catch (e) { send(res, 500, `Error interno del servidor al obtener la tarea: ${e}`) }
}

/**
 * Obtiene todas las tareas del usuario actual con paginación.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del usuario en user.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía un objeto con las tareas, información de paginación y total de tareas.
 */
export const getTasks = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({ user: req.user?.id }).populate('user');
    send(res, 200, tasks);
  } catch (e) { send(res, 500, `Error interno del servidor al obtener las tareas: ${e}`) }
}

/**
 * Crea una nueva tarea para el usuario actual.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos de la tarea en el body y el ID del usuario en user.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía la tarea creada o un mensaje de error.
 */
export const createTask = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const taskForm = new Task({ ...req.body, user: req.user?.id });
    const task = await taskForm.save();
    send(res, 201, task);
  } catch (e) { send(res, 500, `Error interno del servidor al crear la tarea: ${e}`) }
}

/**
 * Actualiza una tarea existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la tarea en params.id y los datos actualizados en el body.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía la tarea actualizada o un mensaje de error.
 */
export const updateTask = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByIdAndUpdate(params.id, body, { new: true });
    if (!task) return send(res, 404, 'La tarea no ha sido actualizada');
    send(res, 200, task);
  } catch (e) { send(res, 500, `Error interno del servidor al actualizar la tarea: ${e}`) }
}

/**
 * Elimina una tarea existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la tarea a eliminar en params.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteTask = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByIdAndDelete(params.id);
    if (!task) return send(res, 404, 'Tarea no encontrada');
    send(res, 200, task);
  } catch (e) { send(res, 500, `Error interno del servidor al eliminar la tarea: ${e}`) }
}