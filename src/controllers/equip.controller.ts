/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar equipos */
import { Request, Response } from "express"

import ExtendsRequest from "../interfaces/request.interface"
import { send } from "../interfaces/response.interface"
import Equipment from "../models/equip.model"

/**
 * Obtiene un equipo específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del equipo en params.id.
 * @returns {Promise<void>} - Envía el equipo encontrado o un mensaje de error.
 */
export const getEquipment = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const equipment = await Equipment.findById(params.id).populate('user');
    if (!equipment) return send(res, 404, 'Equipo no encontrado');
    send(res, 200, equipment);
  } catch (e) { send(res, 500, `Error interno del servidor al obtener el equipo: ${e}`) }
}

/**
 * Obtiene todos los equipos.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido.
 * @returns {Promise<void>} - Envía un objeto con los equipos.
 */
export const getEquipments = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const equipments = await Equipment.find({ user: req.user?.id }).populate('user');
    send(res, 200, equipments);
  } catch (e) { send(res, 500, `Error interno del servidor al obtener los equipos: ${e}`) }
}

/**
 * Crear un nuevo equipo
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos del equipo en el body y el ID del usuario en user.id. 
 * @returns {Promise<void>} - Envía el equipo creado o un mensaje de error.
 */
export const createEquipment = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const equipmentForm = new Equipment({ ...req.body, user: req.user?.id });
    const equipment = await equipmentForm.save();
    send(res, 201, equipment);
  } catch (e) { send(res, 500, `Error interno del servidor al crear el equipo: ${e}`) }
}

/**
 * Actualiza un equipo existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del equipo en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el equipo actualizado o un mensaje de error.
 */
export const updateEquipment = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(params.id, body, { new: true });
    if (!equipment) return send(res, 404, 'Equipo no encontrado');
    send(res, 200, equipment);
  } catch (e) { send(res, 500, `Error interno del servidor al actualizar el equipo: ${e}`) }
}

/**
 * Elimina un equipo existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del equipo a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteEquipment = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const equipment = await Equipment.findByIdAndDelete(params.id);
    if (!equipment) return send(res, 404, 'Equipo no encontrado');
    send(res, 200, equipment);
  } catch (e) { send(res, 500, `Error interno del servidor al eliminar el equipo: ${e}`) }
}