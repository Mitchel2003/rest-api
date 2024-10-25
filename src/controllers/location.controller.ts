/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar ubicaciones */
import { ExtendsRequest, send } from "../interfaces/api.interface";
import { Country, State, City } from "../models/location.model";
import { handlerErrorResponse } from "../utils/handler";
import { Request, Response } from "express";

/*--------------------------------------------------city--------------------------------------------------*/
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
  } catch (e) { handlerErrorResponse(res, e, "obtener la ciudad") }
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
  } catch (e) { handlerErrorResponse(res, e, "obtener las ciudades") }
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
  } catch (e) { handlerErrorResponse(res, e, "crear la ciudad") }
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
  } catch (e) { handlerErrorResponse(res, e, "actualizar la ciudad") }
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
  } catch (e) { handlerErrorResponse(res, e, "eliminar la ciudad") }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------state--------------------------------------------------*/
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
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------country--------------------------------------------------*/
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
/*---------------------------------------------------------------------------------------------------------*/