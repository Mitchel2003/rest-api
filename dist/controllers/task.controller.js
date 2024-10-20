"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = exports.getTask = void 0;
/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar tareas */
const api_interface_1 = require("../interfaces/api.interface");
const task_model_1 = __importDefault(require("../models/task.model"));
/**
 * Obtiene una tarea específica por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la tarea en params.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía la tarea encontrada o un mensaje de error.
 */
const getTask = async ({ params }, res) => {
    try {
        const task = await task_model_1.default.findById(params.id).populate('user');
        if (!task)
            return (0, api_interface_1.send)(res, 404, 'Tarea no encontrada');
        (0, api_interface_1.send)(res, 200, task);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al obtener la tarea: ${e}`);
    }
};
exports.getTask = getTask;
/**
 * Obtiene todas las tareas del usuario actual con paginación.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del usuario en user.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía un objeto con las tareas, información de paginación y total de tareas.
 */
const getTasks = async (req, res) => {
    try {
        const tasks = await task_model_1.default.find({ user: req.user?.id }).populate('user');
        (0, api_interface_1.send)(res, 200, tasks);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al obtener las tareas: ${e}`);
    }
};
exports.getTasks = getTasks;
/**
 * Crea una nueva tarea para el usuario actual.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos de la tarea en el body y el ID del usuario en user.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía la tarea creada o un mensaje de error.
 */
const createTask = async (req, res) => {
    try {
        const taskForm = new task_model_1.default({ ...req.body, user: req.user?.id });
        const task = await taskForm.save();
        (0, api_interface_1.send)(res, 201, task);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al crear la tarea: ${e}`);
    }
};
exports.createTask = createTask;
/**
 * Actualiza una tarea existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la tarea en params.id y los datos actualizados en el body.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía la tarea actualizada o un mensaje de error.
 */
const updateTask = async ({ params, body }, res) => {
    try {
        const task = await task_model_1.default.findByIdAndUpdate(params.id, body, { new: true });
        if (!task)
            return (0, api_interface_1.send)(res, 404, 'La tarea no ha sido actualizada');
        (0, api_interface_1.send)(res, 200, task);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al actualizar la tarea: ${e}`);
    }
};
exports.updateTask = updateTask;
/**
 * Elimina una tarea existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la tarea a eliminar en params.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
const deleteTask = async ({ params }, res) => {
    try {
        const task = await task_model_1.default.findByIdAndDelete(params.id);
        if (!task)
            return (0, api_interface_1.send)(res, 404, 'Tarea no encontrada');
        (0, api_interface_1.send)(res, 200, task);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al eliminar la tarea: ${e}`);
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.controller.js.map