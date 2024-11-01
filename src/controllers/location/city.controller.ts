import { handlerResponse } from "@/errors/handler"
import { send } from "@/interfaces/api.interface"
import City from "@/models/location/city.model"

import { Request, Response } from "express"

/**
 * Obtiene una ciudad específica por su ID.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la ciudad en params.id.
 * @returns {Promise<void>} - Envía la ciudad encontrada o un mensaje de error.
 */
export const getCity = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const city = await City.findById(params.id).populate('state');
    if (!city) return send(res, 404, 'Ciudad no encontrada');
    send(res, 200, city);
  } catch (e) { handlerResponse(res, e, "obtener la ciudad") }
}

/**
 * Obtiene todas las ciudades.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del departamento en state.id.
 * @returns {Promise<void>} - Envía todas las ciudades encontradas o un mensaje de error.
 */
export const getCities = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    // if (!req.userReferences?.state) return send(res, 400, "Referencia de usuario no encontrada");
    // const cities = await City.find({ state: req.userReferences.state }).populate('state');
    const cities = await City.find({ state: body.state }).populate('state');
    send(res, 200, cities);
  } catch (e) { handlerResponse(res, e, "obtener las ciudades") }
}

/**
 * Crea una nueva ciudad.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos de la ciudad en el body y el ID del departamento en state.id.
 * @returns {Promise<void>} - Envía la ciudad creada o un mensaje de error.
 */
export const createCity = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    // if (!req.userReferences?.state) return send(res, 400, "Referencia de usuario no encontrada");
    // const cityForm = new City({ ...req.body, state: req.userReferences.state });
    const cityForm = new City({ ...body });
    const city = await cityForm.save();
    send(res, 201, city);
  } catch (e) { handlerResponse(res, e, "crear la ciudad") }
}

/**
 * Actualiza una ciudad existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la ciudad en params.id y los datos actualizados en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía la ciudad actualizada o un mensaje de error.
 */
export const updateCity = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const city = await City.findByIdAndUpdate(params.id, body, { new: true });
    if (!city) return send(res, 404, 'Ciudad no encontrada');
    send(res, 200, city);
  } catch (e) { handlerResponse(res, e, "actualizar la ciudad") }
}

/**
 * Elimina una ciudad existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la ciudad en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o un mensaje de error.
 */
export const deleteCity = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const city = await City.findByIdAndDelete(params.id);
    if (!city) return send(res, 404, 'Ciudad no encontrada');
    send(res, 200, 'Eliminado correctamente');
  } catch (e) { handlerResponse(res, e, "eliminar la ciudad") }
}