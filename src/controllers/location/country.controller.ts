/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar paises */
import { countryService } from "@/services/mongodb/location/country.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene un país específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del país en params.id.
 * @returns {Promise<void>} - Envía el país encontrado o un mensaje de error.
 */
export const getCountry = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const country = await countryService.findById(params.id);
    if (!country.success) throw new ErrorAPI(country.error);
    send(res, 200, country.data);
  } catch (e) { handlerResponse(res, e, "obtener el país") }
}

/**
 * Obtiene todos los países.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía todos los países encontrados o un mensaje de error.
 */
export const getCountries = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const country = await countryService.find(body.query);
    if (!country.success) throw new ErrorAPI(country.error);
    send(res, 200, country.data);
  } catch (e) { handlerResponse(res, e, "obtener los países") }
}

/**
 * Crea un nuevo país.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del país en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el país creado o un mensaje de error.
 */
export const createCountry = async (req: Request, res: Response): Promise<void> => {
  try {
    const country = await countryService.create(req.body);
    if (!country.success) throw new ErrorAPI(country.error);
    send(res, 201, country.data);
  } catch (e) { handlerResponse(res, e, "crear el país") }
}

/**
 * Actualiza un país existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del país en params.id y los datos actualizados en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el país actualizado o un mensaje de error.
 */
export const updateCountry = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const country = await countryService.update(params.id, body);
    if (!country.success) throw new ErrorAPI(country.error);
    send(res, 200, country.data);
  } catch (e) { handlerResponse(res, e, "actualizar el país") }
}

/**
 * Elimina un país existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del país en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o un mensaje de error.
 */
export const deleteCountry = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const country = await countryService.delete(params.id);
    if (!country.success) throw new ErrorAPI(country.error);
    send(res, 200, country.data);
  } catch (e) { handlerResponse(res, e, "eliminar el país") }
}