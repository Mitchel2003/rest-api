/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar servicios */
import { servService } from "@/services/mongodb/location/serv.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface"
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene un servicio específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del servicio en params.id.
 * @returns {Promise<void>} - Envía el servicio encontrado o un mensaje de error.
 */
export const getService = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const service = await servService.findById(params.id);
    if (!service.success) throw new ErrorAPI(service.error);
    send(res, 200, service.data);
  } catch (e) { handlerResponse(res, e, "obtener el servicio") }
}

/**
 * Obtiene todos los servicios.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los servicios.
 */
export const getServices = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const services = await servService.find(body.query);
    if (!services.success) throw new ErrorAPI(services.error);
    send(res, 200, services.data);
  } catch (e) { handlerResponse(res, e, "obtener los servicios") }
}

/**
 * Crear un nuevo servicio
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del servicio en el body. 
 * @returns {Promise<void>} - Envía el servicio creado o un mensaje de error.
 */
export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await servService.create(req.body);
    if (!service.success) throw new ErrorAPI(service.error);
    send(res, 201, service.data);
  } catch (e) { handlerResponse(res, e, "crear el servicio") }
}

/**
 * Actualiza un servicio existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del servicio en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el servicio actualizado o un mensaje de error.
 */
export const updateService = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const service = await servService.update(params.id, body);
    if (!service.success) throw new ErrorAPI(service.error);
    send(res, 200, service.data);
  } catch (e) { handlerResponse(res, e, "actualizar el servicio") }
}

/**
 * Elimina un servicio existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del servicio a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteService = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const service = await servService.delete(params.id);
    if (!service.success) throw new ErrorAPI(service.error);
    send(res, 200, service.data);
  } catch (e) { handlerResponse(res, e, "eliminar el servicio") }
}