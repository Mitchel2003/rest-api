/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar ubicaciones */
import { ExtendsRequest } from "../interfaces/api.interface";
import { Request, Response } from "express";
/**
 * Obtiene una ciudad específica por su ID.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la ciudad en params.id.
 * @returns {Promise<void>} - Envía la ciudad encontrada o un mensaje de error.
 */
export declare const getCity: ({ params }: Request, res: Response) => Promise<void>;
/**
 * Obtiene todas las ciudades.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del departamento en state.id.
 * @returns {Promise<void>} - Envía todas las ciudades encontradas o un mensaje de error.
 */
export declare const getCities: (req: ExtendsRequest, res: Response) => Promise<void>;
/**
 * Crea una nueva ciudad.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos de la ciudad en el body y el ID del departamento en state.id.
 * @returns {Promise<void>} - Envía la ciudad creada o un mensaje de error.
 */
export declare const createCity: (req: ExtendsRequest, res: Response) => Promise<void>;
/**
 * Actualiza una ciudad existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la ciudad en params.id y los datos actualizados en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía la ciudad actualizada o un mensaje de error.
 */
export declare const updateCity: ({ params, body }: Request, res: Response) => Promise<void>;
/**
 * Elimina una ciudad existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la ciudad en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o un mensaje de error.
 */
export declare const deleteCity: ({ params }: Request, res: Response) => Promise<void>;
/**
 * Obtiene un departamento específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del departamento en params.id.
 * @returns {Promise<void>} - Envía el departamento encontrado o un mensaje de error.
 */
export declare const getState: ({ params }: Request, res: Response) => Promise<void>;
/**
 * Obtiene todos los departamentos.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del usuario en user.id.
 * @returns {Promise<void>} - Envía todos los departamentos encontrados o un mensaje de error.
 */
export declare const getStates: (req: ExtendsRequest, res: Response) => Promise<void>;
/**
 * Crea un nuevo departamento.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos del departamento en el body y el ID del país en country.id.
 * @returns {Promise<void>} - Envía el departamento creado o un mensaje de error.
 */
export declare const createState: (req: ExtendsRequest, res: Response) => Promise<void>;
/**
 * Actualiza un departamento existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del departamento en params.id y los datos actualizados en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el departamento actualizado o un mensaje de error.
 */
export declare const updateState: ({ params, body }: Request, res: Response) => Promise<void>;
/**
 * Elimina un departamento existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del departamento en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o un mensaje de error.
 */
export declare const deleteState: ({ params }: Request, res: Response) => Promise<void>;
/**
 * Obtiene un país específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del país en params.id.
 * @returns {Promise<void>} - Envía el país encontrado o un mensaje de error.
 */
export declare const getCountry: ({ params }: Request, res: Response) => Promise<void>;
/**
 * Obtiene todos los países.
 * @param {Request} req - Objeto de solicitud Express.
 * @returns {Promise<void>} - Envía todos los países encontrados o un mensaje de error.
 */
export declare const getCountries: (req: Request, res: Response) => Promise<void>;
/**
 * Crea un nuevo país.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del país en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el país creado o un mensaje de error.
 */
export declare const createCountry: ({ body }: Request, res: Response) => Promise<void>;
/**
 * Actualiza un país existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del país en params.id y los datos actualizados en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el país actualizado o un mensaje de error.
 */
export declare const updateCountry: ({ params, body }: Request, res: Response) => Promise<void>;
/**
 * Elimina un país existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del país en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o un mensaje de error.
 */
export declare const deleteCountry: ({ params }: Request, res: Response) => Promise<void>;
