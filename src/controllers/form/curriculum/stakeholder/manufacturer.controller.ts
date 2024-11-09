import { manufacturerService } from "@/services/mongodb/form/curriculum/stakeholder/manufacturer.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene un fabricante específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del fabricante en params.id.
 * @returns {Promise<void>} - Envía el fabricante encontrado o un mensaje de error.
 */
export const getManufacturer = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const manufacturer = await manufacturerService.findById(params.id);
    if (!manufacturer.success) throw new ErrorAPI(manufacturer.error);
    send(res, 200, manufacturer.data);
  } catch (e) { handlerResponse(res, e, "obtener el fabricante") }
}

/**
 * Obtiene todos los fabricantes.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los fabricantes.
 */
export const getManufacturers = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const manufacturers = await manufacturerService.find(body.query);
    if (!manufacturers.success) throw new ErrorAPI(manufacturers.error);
    send(res, 200, manufacturers.data);
  } catch (e) { handlerResponse(res, e, "obtener los fabricantes") }
}

/**
 * Crear un nuevo fabricante.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del fabricante en el body.
 * @returns {Promise<void>} - Envía el fabricante creado o un mensaje de error.
 */
export const createManufacturer = async (req: Request, res: Response): Promise<void> => {
  try {
    const manufacturer = await manufacturerService.create(req.body);
    if (!manufacturer.success) throw new ErrorAPI(manufacturer.error);
    send(res, 201, manufacturer.data);
  } catch (e) { handlerResponse(res, e, "crear el fabricante") }
}

/**
 * Actualiza un fabricante existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del fabricante en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el fabricante actualizado o un mensaje de error.
 */
export const updateManufacturer = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const manufacturer = await manufacturerService.update(params.id, body);
    if (!manufacturer.success) throw new ErrorAPI(manufacturer.error);
    send(res, 200, manufacturer.data);
  } catch (e) { handlerResponse(res, e, "actualizar el fabricante") }
}

/**
 * Elimina un fabricante existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del fabricante a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteManufacturer = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const manufacturer = await manufacturerService.delete(params.id);
    if (!manufacturer.success) throw new ErrorAPI(manufacturer.error);
    send(res, 200, manufacturer.data);
  } catch (e) { handlerResponse(res, e, "eliminar el fabricante") }
} 