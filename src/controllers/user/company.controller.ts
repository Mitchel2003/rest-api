/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar compañías */
import { companyService } from "@/services/mongodb/user/company.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene una compañía específica por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la compañía en params.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía la compañía encontrada o un mensaje de error.
 */
export const getCompany = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const company = await companyService.findById(params.id);
    if (!company.success) throw new ErrorAPI(company.error);
    send(res, 200, company.data);
  } catch (e) { handlerResponse(res, e, "obtener la compañía") }
}

/**
 * Obtiene todas las compañías con filtros opcionales.
 * @param {Request} req - Objeto de solicitud Express. Se espera un query opcional para filtrar.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía un objeto con las compañías encontradas.
 */
export const getCompanies = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const company = await companyService.find(body.query);
    if (!company.success) throw new ErrorAPI(company.error);
    send(res, 200, company.data);
  } catch (e) { handlerResponse(res, e, "obtener las compañías") }
}

/**
 * Crea una nueva compañía.
 * @param {Request} req - Objeto de solicitud Express con los datos de la compañía en el body.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía la compañía creada o un mensaje de error.
 */
export const createCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const company = await companyService.create(req.body);
    if (!company.success) throw new ErrorAPI(company.error);
    send(res, 201, company.data);
  } catch (e) { handlerResponse(res, e, "crear la compañía") }
}

/**
 * Actualiza una compañía existente.
 * @param {Request} req - Objeto de solicitud Express con el ID en params y datos actualizados en body.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía la compañía actualizada o un mensaje de error.
 */
export const updateCompany = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const company = await companyService.update(params.id, body);
    if (!company.success) throw new ErrorAPI(company.error);
    send(res, 200, company.data);
  } catch (e) { handlerResponse(res, e, "actualizar la compañía") }
}

/**
 * Elimina una compañía existente.
 * @param {Request} req - Objeto de solicitud Express con el ID de la compañía en params.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteCompany = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const company = await companyService.delete(params.id);
    if (!company.success) throw new ErrorAPI(company.error);
    send(res, 200, company.data);
  } catch (e) { handlerResponse(res, e, "eliminar la compañía") }
}