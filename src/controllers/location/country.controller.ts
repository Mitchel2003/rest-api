import { ExtendsRequest, send } from "@/interfaces/api.interface"
import { handlerErrorResponse } from "@/utils/handler"
import Country from "@/models/location/country.model"

import { Request, Response } from "express"

/**
 * Obtiene un país específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del país en params.id.
 * @returns {Promise<void>} - Envía el país encontrado o un mensaje de error.
 */
export const getCountry = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const country = await Country.findById(params.id);
    if (!country) return send(res, 404, 'País no encontrado');
    send(res, 200, country);
  } catch (e) { handlerErrorResponse(res, e, "obtener el país") }
}

/**
 * Obtiene todos los países.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del usuario en user.id.
 * @returns {Promise<void>} - Envía todos los países encontrados o un mensaje de error.
 * @example
 * { countries: [...], currentUser: {...} }
 */
export const getCountries = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    const countries = await Country.find();
    send(res, 200, { countries, user });
  } catch (e) { handlerErrorResponse(res, e, "obtener los países") }
}

/**
 * Crea un nuevo país.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del país en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el país creado o un mensaje de error.
 */
export const createCountry = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const countryForm = new Country({ ...body });
    const country = await countryForm.save();
    send(res, 201, country);
  } catch (e) { handlerErrorResponse(res, e, "crear el país") }
}

/**
 * Actualiza un país existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del país en params.id y los datos actualizados en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el país actualizado o un mensaje de error.
 */
export const updateCountry = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const country = await Country.findByIdAndUpdate(params.id, body, { new: true });
    if (!country) return send(res, 404, 'País no encontrado');
    send(res, 200, country);
  } catch (e) { handlerErrorResponse(res, e, "actualizar el país") }
}

/**
 * Elimina un país existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del país en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o un mensaje de error.
 */
export const deleteCountry = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const country = await Country.findByIdAndDelete(params.id);
    if (!country) return send(res, 404, 'País no encontrado');
    send(res, 200, 'Eliminado correctamente');
  } catch (e) { handlerErrorResponse(res, e, "eliminar el país") }
}