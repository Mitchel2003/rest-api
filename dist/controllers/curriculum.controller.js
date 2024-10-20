"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCurriculum = exports.updateCurriculum = exports.createCurriculum = exports.getCurriculums = exports.getCurriculum = void 0;
/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar curriculums (equipos) */
const api_interface_1 = require("../interfaces/api.interface");
const curriculum_model_1 = __importDefault(require("../models/curriculum.model"));
/**
 * Obtiene un curriculum específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del curriculum en params.id.
 * @returns {Promise<void>} - Envía el curriculum encontrado o un mensaje de error.
 */
const getCurriculum = async ({ params }, res) => {
    try {
        const curriculum = await curriculum_model_1.default.findById(params.id).populate('user');
        if (!curriculum)
            return (0, api_interface_1.send)(res, 404, 'Curriculum no encontrado');
        (0, api_interface_1.send)(res, 200, curriculum);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al obtener el curriculum: ${e}`);
    }
};
exports.getCurriculum = getCurriculum;
/**
 * Obtiene todos los curriculums.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido.
 * @returns {Promise<void>} - Envía un objeto con los curriculums.
 */
const getCurriculums = async (req, res) => {
    try {
        const curriculums = await curriculum_model_1.default.find({ user: req.user?.id }).populate('user');
        (0, api_interface_1.send)(res, 200, curriculums);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al obtener los curriculums: ${e}`);
    }
};
exports.getCurriculums = getCurriculums;
/**
 * Crear un nuevo curriculum
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos del curriculum en el body y el ID del usuario en user.id.
 * @returns {Promise<void>} - Envía el curriculum creado o un mensaje de error.
 */
const createCurriculum = async (req, res) => {
    try {
        const curriculumFormat = new curriculum_model_1.default({ ...req.body, user: req.user?.id });
        const curriculum = await curriculumFormat.save();
        (0, api_interface_1.send)(res, 201, curriculum);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al crear el curriculum: ${e}`);
    }
};
exports.createCurriculum = createCurriculum;
/**
 * Actualiza un curriculum existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del curriculum en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el curriculum actualizado o un mensaje de error.
 */
const updateCurriculum = async ({ params, body }, res) => {
    try {
        const curriculum = await curriculum_model_1.default.findByIdAndUpdate(params.id, body, { new: true });
        if (!curriculum)
            return (0, api_interface_1.send)(res, 404, 'Curriculum no encontrado');
        (0, api_interface_1.send)(res, 200, curriculum);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al actualizar el curriculum: ${e}`);
    }
};
exports.updateCurriculum = updateCurriculum;
/**
 * Elimina un curriculum existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del curriculum a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
const deleteCurriculum = async ({ params }, res) => {
    try {
        const curriculum = await curriculum_model_1.default.findByIdAndDelete(params.id);
        if (!curriculum)
            return (0, api_interface_1.send)(res, 404, 'Curriculum no encontrado');
        (0, api_interface_1.send)(res, 200, curriculum);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al eliminar el curriculum: ${e}`);
    }
};
exports.deleteCurriculum = deleteCurriculum;
//# sourceMappingURL=curriculum.controller.js.map