/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar offices */
import { officeService } from "@/services/mongodb/location/office.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface"
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene un consultorio específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del consultorio en params.id.
 * @returns {Promise<void>} - Envía el consultorio encontrado o un mensaje de error.
 */
export const getOffice = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const office = await officeService.findById(params.id);
    if (!office.success) throw new ErrorAPI(office.error);
    send(res, 200, office.data);
  } catch (e) { handlerResponse(res, e, "obtener el consultorio") }
}

/**
 * Obtiene todos las consultorios.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los consultorios.
 */
export const getOffices = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const offices = await officeService.find(body.query, body.populate);
    if (!offices.success) throw new ErrorAPI(offices.error);
    send(res, 200, offices.data);
  } catch (e) { handlerResponse(res, e, "obtener los consultorios") }
}

/**
 * Crear un nuevo consultorio
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del consultorio en el body. 
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const createOffice = async (req: Request, res: Response): Promise<void> => {
  try {
    const office = await officeService.create(req.body);
    if (!office.success) throw new ErrorAPI(office.error);
    send(res, 201, office.data);
  } catch (e) { handlerResponse(res, e, "crear el consultorio") }
}

/**
 * Actualiza un consultorio existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del consultorio en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el consultorio actualizado o un mensaje de error.
 */
export const updateOffice = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const office = await officeService.update(params.id, body);
    if (!office.success) throw new ErrorAPI(office.error);
    send(res, 200, office.data);
  } catch (e) { handlerResponse(res, e, "actualizar el consultorio") }
}

/**
 * Elimina un consultorio existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del consultorio a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteOffice = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const office = await officeService.delete(params.id);
    if (!office.success) throw new ErrorAPI(office.error);
    send(res, 200, office.data);
  } catch (e) { handlerResponse(res, e, "eliminar el consultorio") }
}