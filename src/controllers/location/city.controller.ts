/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar ciudades */
import { cityService } from "@/services/mongodb/location/city.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene una ciudad específica por su ID.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la ciudad en params.id.
 * @returns {Promise<void>} - Envía la ciudad encontrada o un mensaje de error.
 */
export const getCity = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const city = await cityService.findById(params.id);
    if (!city.success) throw new ErrorAPI(city.error);
    send(res, 200, city.data);
  } catch (e) { handlerResponse(res, e, "obtener la ciudad") }
}

/**
 * Obtiene todas las ciudades.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía todas las ciudades encontradas o un mensaje de error.
 */
export const getCities = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const cities = await cityService.find(body.query, body.populate)
    if (!cities.success) throw new ErrorAPI(cities.error);
    send(res, 200, cities.data);
  } catch (e) { handlerResponse(res, e, "obtener las ciudades") }
}

/**
 * Crea una nueva ciudad.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos de la ciudad en el body.
 * @returns {Promise<void>} - Envía la ciudad creada o un mensaje de error.
 */
export const createCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const city = await cityService.create(req.body);
    if (!city.success) throw new ErrorAPI(city.error);
    send(res, 201, city.data);
  } catch (e) { handlerResponse(res, e, "crear la ciudad") }
}

/**
 * Actualiza una ciudad existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la ciudad en params.id y los datos actualizados en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía la ciudad actualizada o un mensaje de error.
 */
export const updateCity = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const city = await cityService.update(params.id, body);
    if (!city.success) throw new ErrorAPI(city.error);
    send(res, 200, city.data);
  } catch (e) { handlerResponse(res, e, "actualizar la ciudad") }
}

/**
 * Elimina una ciudad existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la ciudad en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o un mensaje de error.
 */
export const deleteCity = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const city = await cityService.delete(params.id);
    if (!city.success) throw new ErrorAPI(city.error);
    send(res, 200, city.data);
  } catch (e) { handlerResponse(res, e, "eliminar la ciudad") }
}