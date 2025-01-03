/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar departamentos */
import { stateService } from "@/services/mongodb/location/state.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene un departamento específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del departamento en params.id.
 * @returns {Promise<void>} - Envía el departamento encontrado o un mensaje de error.
 */
export const getState = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const state = await stateService.findById(params.id);
    if (!state.success) throw new ErrorAPI(state.error);
    send(res, 200, state.data);
  } catch (e) { handlerResponse(res, e, "obtener el departamento") }
}

/**
 * Obtiene todos los departamentos.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía todos los departamentos encontrados o un mensaje de error.
 */
export const getStates = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const states = await stateService.find(body.query, body.populate);
    if (!states.success) throw new ErrorAPI(states.error);
    send(res, 200, states.data);
  } catch (e) { handlerResponse(res, e, "obtener los departamentos") }
}

/**
 * Crea un nuevo departamento.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del departamento en el body.
 * @returns {Promise<void>} - Envía el departamento creado o un mensaje de error.
 */
export const createState = async (req: Request, res: Response): Promise<void> => {
  try {
    const state = await stateService.create(req.body);
    if (!state.success) throw new ErrorAPI(state.error);
    send(res, 201, state.data);
  } catch (e) { handlerResponse(res, e, "crear departamento") }
}

/**
 * Actualiza un departamento existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del departamento en params.id y los datos actualizados en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el departamento actualizado o un mensaje de error.
 */
export const updateState = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const state = await stateService.update(params.id, body);
    if (!state.success) throw new ErrorAPI(state.error);
    send(res, 200, state.data);
  } catch (e) { handlerResponse(res, e, "actualizar el departamento") }
}

/**
 * Elimina un departamento existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del departamento en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o un mensaje de error.
 */
export const deleteState = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const state = await stateService.delete(params.id);
    if (!state.success) throw new ErrorAPI(state.error);
    send(res, 200, state.data);
  } catch (e) { handlerResponse(res, e, "eliminar el departamento") }
}