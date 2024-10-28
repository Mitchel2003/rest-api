import { handlerErrorResponse } from "@/utils/handler"
import { send } from "@/interfaces/api.interface"
import State from "@/models/location/state.model"

import { Request, Response } from "express"

/**
 * Obtiene un departamento específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del departamento en params.id.
 * @returns {Promise<void>} - Envía el departamento encontrado o un mensaje de error.
 */
export const getState = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const state = await State.findById(params.id);
    if (!state) return send(res, 404, 'Departamento no encontrado');
    send(res, 200, state);
  } catch (e) { handlerErrorResponse(res, e, "obtener el departamento") }
}

/**
 * Obtiene todos los departamentos.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del país en country.id.
 * @argument usePopulate - Respecto al body obtenido, podemos mimificar el rango de busqueda de departamentos mediante country.id.
 * @example
 * if req.body.country => usePopulate = { country }
 * default usePopulate = {} => search all states
 * @returns {Promise<void>} - Envía todos los departamentos encontrados o un mensaje de error.
 */
export const getStates = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const usePopulate = body.country ? { country: body.country } : {};
    const states = await State.find(usePopulate).populate('country');
    send(res, 200, states);
  } catch (e) { handlerErrorResponse(res, e, "obtener los departamentos") }
}

/**
 * Crea un nuevo departamento.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del departamento en el body y el ID del país en country.id.
 * @returns {Promise<void>} - Envía el departamento creado o un mensaje de error.
 */
export const createState = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const stateForm = new State({ ...body });
    const state = await stateForm.save();
    send(res, 201, state);
  } catch (e) { handlerErrorResponse(res, e, "crear departamento") }
}

/**
 * Actualiza un departamento existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del departamento en params.id y los datos actualizados en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el departamento actualizado o un mensaje de error.
 */
export const updateState = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const state = await State.findByIdAndUpdate(params.id, body, { new: true });
    if (!state) return send(res, 404, 'Departamento no encontrado');
    send(res, 200, state);
  } catch (e) { handlerErrorResponse(res, e, "actualizar el departamento") }
}

/**
 * Elimina un departamento existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del departamento en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o un mensaje de error.
 */
export const deleteState = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const state = await State.findByIdAndDelete(params.id);
    if (!state) return send(res, 404, 'Departamento no encontrado');
    send(res, 200, 'Eliminado correctamente');
  } catch (e) { handlerErrorResponse(res, e, "eliminar el departamento") }
}