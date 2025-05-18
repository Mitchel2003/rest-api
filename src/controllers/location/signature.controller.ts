/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar firmas */
import { signatureService } from "@/services/mongodb/location/signature.service";
import { accessFactory } from "@/services/mongodb/auth/access.service";
import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { Signature } from "@/types/location/signature.type";
import { handlerResponse } from "@/errors/handler";
import ErrorAPI, { Forbidden } from "@/errors";
import { User } from "@/types/user/user.type";
import { Types } from "mongoose";

import { Request, Response } from "express"

/**
 * Obtiene una firma específica por su ID.
 * Utiliza un patrón Strategy para aplicar la lógica de acceso según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación.
 * @param {Response} res - Objeto de respuesta Express, envía la firma encontrada o un mensaje de error.
 * @returns {Promise<void>} - Envía la firma encontrada o un mensaje de error.
 */
export const getSignature = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Signature>(signatureService, 'signature').create(user);
    const signature = await accessService.getOne(user, params.id);
    if (!signature.success) throw new ErrorAPI(signature.error);
    send(res, 200, signature.data);
  } catch (e) { handlerResponse(res, e, "obtener la firma") }
}

/**
 * Obtiene las firmas basado en el contexto del usuario.
 * Utiliza un patrón Strategy para aplicar la lógica de filtrado según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía las firmas filtradas o un mensaje de error.
 * @returns {Promise<void>} - Envía un objeto con las firmas filtradas
 */
export const getSignatures = async ({ query, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Signature>(signatureService, 'signature').create(user);
    const signatures = await accessService.getAll(user, query);
    if (!signatures.success) throw new ErrorAPI(signatures.error);
    send(res, 200, signatures.data);
  } catch (e) { handlerResponse(res, e, "obtener las firmas") }
}

/**
 * Crea una nueva firma.
 * Todos los usuarios autenticados pueden crear firmas.
 * @param {Request} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía la firma creada o un mensaje de error
 */
export const createSignature = async ({ body: { url, headquarter } }: Request, res: Response): Promise<void> => {
  try {
    if (!headquarter) throw new ErrorAPI({ message: "Sin headquarter" });
    const disable = await signatureService.disableByHeadquarter(headquarter);
    if (!disable.success) throw new ErrorAPI(disable.error); //Disable others
    const newSignature: any = { url, headquarter: new Types.ObjectId(headquarter) };
    const response = await signatureService.create(newSignature);
    if (!response.success) throw new ErrorAPI(response.error);
    send(res, 201, response.data);
  } catch (e) { handlerResponse(res, e, "crear la firma") }
}

/**
 * Actualiza una firma existente.
 * Verifica los permisos del usuario antes de realizar la actualización.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía la firma actualizada o un mensaje de error
 * @returns {Promise<void>} - Envía la firma actualizada o un mensaje de error
 */
export const updateSignature = async ({ params, body, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Signature>(signatureService, 'signature').create(user);
    const canUpdate = await accessService.canUpdate(user, params.id);
    if (!canUpdate) throw new Forbidden({ message: "No tienes permisos para actualizar esta firma" });
    const signature = await signatureService.update(params.id, body);
    if (!signature.success) throw new ErrorAPI(signature.error);
    send(res, 200, signature.data);
  } catch (e) { handlerResponse(res, e, "actualizar la firma") }
}

/**
 * Elimina una firma existente.
 * Verifica los permisos del usuario antes de realizar la eliminación.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error
 */
export const deleteSignature = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<Signature>(signatureService, 'signature').create(user);
    const canDelete = await accessService.canDelete(user, params.id);
    if (!canDelete) throw new Forbidden({ message: "No tienes permisos para eliminar esta firma" });
    const result = await signatureService.delete(params.id);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, result.data);
  } catch (e) { handlerResponse(res, e, "eliminar la firma") }
}