"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCountry = exports.updateCountry = exports.createCountry = exports.getCountries = exports.getCountry = exports.deleteState = exports.updateState = exports.createState = exports.getStates = exports.getState = exports.deleteCity = exports.updateCity = exports.createCity = exports.getCities = exports.getCity = void 0;
/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar ubicaciones */
const api_interface_1 = require("../interfaces/api.interface");
const location_model_1 = require("../models/location.model");
/*--------------------------------------------------city--------------------------------------------------*/
/**
 * Obtiene una ciudad específica por su ID.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la ciudad en params.id.
 * @returns {Promise<void>} - Envía la ciudad encontrada o un mensaje de error.
 */
const getCity = async ({ params }, res) => {
    try {
        const city = await location_model_1.City.findById(params.id).populate('state');
        if (!city)
            return (0, api_interface_1.send)(res, 404, 'Ciudad no encontrada');
        (0, api_interface_1.send)(res, 200, city);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al obtener la ciudad: ${e}`);
    }
};
exports.getCity = getCity;
/**
 * Obtiene todas las ciudades.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del departamento en state.id.
 * @returns {Promise<void>} - Envía todas las ciudades encontradas o un mensaje de error.
 */
const getCities = async (req, res) => {
    try {
        if (!req.userReferences?.state)
            return (0, api_interface_1.send)(res, 400, "Referencia de usuario no encontrada");
        const cities = await location_model_1.City.find({ state: req.userReferences.state }).populate('state');
        (0, api_interface_1.send)(res, 200, cities);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al obtener las ciudades: ${e}`);
    }
};
exports.getCities = getCities;
/**
 * Crea una nueva ciudad.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos de la ciudad en el body y el ID del departamento en state.id.
 * @returns {Promise<void>} - Envía la ciudad creada o un mensaje de error.
 */
const createCity = async (req, res) => {
    try {
        if (!req.userReferences?.state)
            return (0, api_interface_1.send)(res, 400, "Referencia de usuario no encontrada");
        const cityForm = new location_model_1.City({ ...req.body, state: req.userReferences.state });
        const city = await cityForm.save();
        (0, api_interface_1.send)(res, 201, city);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al crear la ciudad: ${e}`);
    }
};
exports.createCity = createCity;
/**
 * Actualiza una ciudad existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la ciudad en params.id y los datos actualizados en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía la ciudad actualizada o un mensaje de error.
 */
const updateCity = async ({ params, body }, res) => {
    try {
        const city = await location_model_1.City.findByIdAndUpdate(params.id, body, { new: true });
        if (!city)
            return (0, api_interface_1.send)(res, 404, 'Ciudad no encontrada');
        (0, api_interface_1.send)(res, 200, city);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al actualizar la ciudad: ${e}`);
    }
};
exports.updateCity = updateCity;
/**
 * Elimina una ciudad existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la ciudad en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o un mensaje de error.
 */
const deleteCity = async ({ params }, res) => {
    try {
        const city = await location_model_1.City.findByIdAndDelete(params.id);
        if (!city)
            return (0, api_interface_1.send)(res, 404, 'Ciudad no encontrada');
        (0, api_interface_1.send)(res, 200, 'Eliminado correctamente');
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al eliminar la ciudad: ${e}`);
    }
};
exports.deleteCity = deleteCity;
/*---------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------state--------------------------------------------------*/
/**
 * Obtiene un departamento específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del departamento en params.id.
 * @returns {Promise<void>} - Envía el departamento encontrado o un mensaje de error.
 */
const getState = async ({ params }, res) => {
    try {
        const state = await location_model_1.State.findById(params.id).populate('country');
        if (!state)
            return (0, api_interface_1.send)(res, 404, 'Departamento no encontrado');
        (0, api_interface_1.send)(res, 200, state);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al obtener el departamento: ${e}`);
    }
};
exports.getState = getState;
/**
 * Obtiene todos los departamentos.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del usuario en user.id.
 * @returns {Promise<void>} - Envía todos los departamentos encontrados o un mensaje de error.
 */
const getStates = async (req, res) => {
    try {
        if (!req.userReferences?.country)
            return (0, api_interface_1.send)(res, 400, "Referencia 'país' no encontrada");
        const states = await location_model_1.State.find({ country: req.userReferences.country }).populate('country');
        (0, api_interface_1.send)(res, 200, states);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al obtener los departamentos: ${e}`);
    }
};
exports.getStates = getStates;
/**
 * Crea un nuevo departamento.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos del departamento en el body y el ID del país en country.id.
 * @returns {Promise<void>} - Envía el departamento creado o un mensaje de error.
 */
const createState = async (req, res) => {
    try {
        if (!req.userReferences?.country)
            return (0, api_interface_1.send)(res, 400, "Referencia 'país' no encontrada");
        const stateForm = new location_model_1.State({ ...req.body, country: req.userReferences.country });
        const state = await stateForm.save();
        (0, api_interface_1.send)(res, 201, state);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al crear el estado: ${e}`);
    }
};
exports.createState = createState;
/**
 * Actualiza un departamento existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del departamento en params.id y los datos actualizados en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el departamento actualizado o un mensaje de error.
 */
const updateState = async ({ params, body }, res) => {
    try {
        const state = await location_model_1.State.findByIdAndUpdate(params.id, body, { new: true });
        if (!state)
            return (0, api_interface_1.send)(res, 404, 'Departamento no encontrado');
        (0, api_interface_1.send)(res, 200, state);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al actualizar el departamento: ${e}`);
    }
};
exports.updateState = updateState;
/**
 * Elimina un departamento existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del departamento en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o un mensaje de error.
 */
const deleteState = async ({ params }, res) => {
    try {
        const state = await location_model_1.State.findByIdAndDelete(params.id);
        if (!state)
            return (0, api_interface_1.send)(res, 404, 'Departamento no encontrado');
        (0, api_interface_1.send)(res, 200, 'Eliminado correctamente');
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al eliminar el departamento: ${e}`);
    }
};
exports.deleteState = deleteState;
/*---------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------country--------------------------------------------------*/
/**
 * Obtiene un país específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del país en params.id.
 * @returns {Promise<void>} - Envía el país encontrado o un mensaje de error.
 */
const getCountry = async ({ params }, res) => {
    try {
        const country = await location_model_1.Country.findById(params.id);
        if (!country)
            return (0, api_interface_1.send)(res, 404, 'País no encontrado');
        (0, api_interface_1.send)(res, 200, country);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al obtener el país: ${e}`);
    }
};
exports.getCountry = getCountry;
/**
 * Obtiene todos los países.
 * @param {Request} req - Objeto de solicitud Express.
 * @returns {Promise<void>} - Envía todos los países encontrados o un mensaje de error.
 */
const getCountries = async (req, res) => {
    try {
        const countries = await location_model_1.Country.find();
        (0, api_interface_1.send)(res, 200, countries);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al obtener los países: ${e}`);
    }
};
exports.getCountries = getCountries;
/**
 * Crea un nuevo país.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del país en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el país creado o un mensaje de error.
 */
const createCountry = async ({ body }, res) => {
    try {
        const countryForm = new location_model_1.Country({ ...body });
        const country = await countryForm.save();
        (0, api_interface_1.send)(res, 201, country);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al crear el país: ${e}`);
    }
};
exports.createCountry = createCountry;
/**
 * Actualiza un país existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del país en params.id y los datos actualizados en el cuerpo de la solicitud.
 * @returns {Promise<void>} - Envía el país actualizado o un mensaje de error.
 */
const updateCountry = async ({ params, body }, res) => {
    try {
        const country = await location_model_1.Country.findByIdAndUpdate(params.id, body, { new: true });
        if (!country)
            return (0, api_interface_1.send)(res, 404, 'País no encontrado');
        (0, api_interface_1.send)(res, 200, country);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al actualizar el país: ${e}`);
    }
};
exports.updateCountry = updateCountry;
/**
 * Elimina un país existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del país en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o un mensaje de error.
 */
const deleteCountry = async ({ params }, res) => {
    try {
        const country = await location_model_1.Country.findByIdAndDelete(params.id);
        if (!country)
            return (0, api_interface_1.send)(res, 404, 'País no encontrado');
        (0, api_interface_1.send)(res, 200, 'Eliminado correctamente');
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error interno del servidor al eliminar el país: ${e}`);
    }
};
exports.deleteCountry = deleteCountry;
/*---------------------------------------------------------------------------------------------------------*/ 
//# sourceMappingURL=location.controller.js.map