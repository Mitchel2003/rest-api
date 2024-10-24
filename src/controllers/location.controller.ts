/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar ubicaciones */
import { ExtendsRequest, send } from "../interfaces/api.interface"
import { Country, State, City } from "../models/location.model"
import { Request, Response } from "express"

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
  } catch (e) { send(res, 500, `Error interno del servidor al obtener la ciudad: ${e}`) }
}

/**
 * Obtiene todas las ciudades.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del departamento en state.id.
 * @returns {Promise<void>} - Envía todas las ciudades encontradas o un mensaje de error.
 */
export const getCities = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    if (!req.userReferences?.state) return send(res, 400, "Referencia de usuario no encontrada");
    const cities = await City.find({ state: req.userReferences.state }).populate('state');
    send(res, 200, cities);
  } catch (e) { send(res, 500, `Error interno del servidor al obtener las ciudades: ${e}`) }
}

/**
 * Crea una nueva ciudad.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos de la ciudad en el body y el ID del departamento en state.id.
 * @returns {Promise<void>} - Envía la ciudad creada o un mensaje de error.
 */
export const createCity = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    if (!req.userReferences?.state) return send(res, 400, "Referencia de usuario no encontrada");
    const cityForm = new City({ ...req.body, state: req.userReferences.state });
    const city = await cityForm.save();
    send(res, 201, city);
  } catch (e) { send(res, 500, `Error interno del servidor al crear la ciudad: ${e}`) }
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
  } catch (e) { send(res, 500, `Error interno del servidor al actualizar la ciudad: ${e}`) }
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
  } catch (e) { send(res, 500, `Error interno del servidor al eliminar la ciudad: ${e}`) }
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
    const state = await State.findById(params.id).populate('country');
    if (!state) return send(res, 404, 'Departamento no encontrado');
    send(res, 200, state);
  } catch (e) { send(res, 500, `Error interno del servidor al obtener el departamento: ${e}`) }
}

/**
 * Obtiene todos los departamentos.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del usuario en user.id.
 * @returns {Promise<void>} - Envía todos los departamentos encontrados o un mensaje de error.
 */
export const getStates = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    if (!req.userReferences?.country) return send(res, 400, "Referencia 'país' no encontrada");
    const states = await State.find({ country: req.userReferences.country }).populate('country');
    send(res, 200, states);
  } catch (e) { send(res, 500, `Error interno del servidor al obtener los departamentos: ${e}`) }
}

/**
 * Crea un nuevo departamento.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos del departamento en el body y el ID del país en country.id.
 * @returns {Promise<void>} - Envía el departamento creado o un mensaje de error.
 */
export const createState = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    if (!req.userReferences?.country) return send(res, 400, "Referencia 'país' no encontrada")
    const stateForm = new State({ ...req.body, country: req.userReferences.country });
    const state = await stateForm.save();
    send(res, 201, state);
  } catch (e) { send(res, 500, `Error interno del servidor al crear el estado: ${e}`) }
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
  } catch (e) { send(res, 500, `Error interno del servidor al actualizar el departamento: ${e}`) }
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
  } catch (e) { send(res, 500, `Error interno del servidor al eliminar el departamento: ${e}`) }
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
  } catch (e) { send(res, 500, `Error interno del servidor al obtener el país: ${e}`) }
}

/**
 * Obtiene todos los países.
 * @returns {Promise<void>} - Envía todos los países encontrados o un mensaje de error.
 */
export const getCountries = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const currentUser = req.userReferences;
    const countries = await Country.find();
    send(res, 200, { countries, currentUser });
  } catch (e) { send(res, 500, `Error interno del servidor al obtener los países: ${e}`) }
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
  } catch (e) { send(res, 500, `Error interno del servidor al crear el país: ${e}`) }
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
  } catch (e) { send(res, 500, `Error interno del servidor al actualizar el país: ${e}`) }
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
  } catch (e) { send(res, 500, `Error interno del servidor al eliminar el país: ${e}`) }
}
/*---------------------------------------------------------------------------------------------------------*/