import { checkService } from "@/services/mongodb/form/maintenance/check.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene un check específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del check en params.id.
 * @returns {Promise<void>} - Envía el check encontrado o un mensaje de error.
 */
export const getCheck = async ({ params }: Request, res: Response): Promise<void> => {
    try {
        const check = await checkService.findById(params.id);
        if (!check.success) throw new ErrorAPI(check.error);
        send(res, 200, check.data);
    } catch (e) { handlerResponse(res, e, "obtener el check") }
}

/**
 * Obtiene todos los checks.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los checks.
 */
export const getChecks = async ({ body }: Request, res: Response): Promise<void> => {
    try {
        const checks = await checkService.find(body.query);
        if (!checks.success) throw new ErrorAPI(checks.error);
        send(res, 200, checks.data);
    } catch (e) { handlerResponse(res, e, "obtener los checks") }
}

/**
 * Crear un nuevo check
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del check en el body. 
 * @returns {Promise<void>} - Envía el check creado o un mensaje de error.
 */
export const createCheck = async (req: Request, res: Response): Promise<void> => {
    try {
        const check = await checkService.create(req.body);
        if (!check.success) throw new ErrorAPI(check.error);
        send(res, 201, check.data);
    } catch (e) { handlerResponse(res, e, "crear el check") }
}

/**
 * Actualiza un check existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del check en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el check actualizado o un mensaje de error.
 */
export const updateCheck = async ({ params, body }: Request, res: Response): Promise<void> => {
    try {
        const check = await checkService.update(params.id, body);
        if (!check.success) throw new ErrorAPI(check.error);
        send(res, 200, check.data);
    } catch (e) { handlerResponse(res, e, "actualizar el check") }
}

/**
 * Elimina un check existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del check a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteCheck = async ({ params }: Request, res: Response): Promise<void> => {
    try {
        const check = await checkService.delete(params.id);
        if (!check.success) throw new ErrorAPI(check.error);
        send(res, 200, check.data);
    } catch (e) { handlerResponse(res, e, "eliminar el check") }
} 