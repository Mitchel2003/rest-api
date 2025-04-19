import { supplierHeadquarterService } from "@/services/mongodb/relation/supplierHeadquarter.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene una relación específica proveedor-sede por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID de la relación en params.id.
 * @returns {Promise<void>} - Envía la relación encontrada o un mensaje de error.
 */
export const getSupplierHeadquarter = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const relation = await supplierHeadquarterService.findById(params.id);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "obtener el proveedor-sede") }
}

/**
 * Obtiene todas las relaciones proveedor-sede.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con las relaciones.
 */
export const getSupplierHeadquarters = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const relations = await supplierHeadquarterService.find(body.query, body.populate);
    if (!relations.success) throw new ErrorAPI(relations.error);
    send(res, 200, relations.data);
  } catch (e) { handlerResponse(res, e, "obtener los proveedor-sede") }
}

/**
 * Crea una nueva relación proveedor-sede.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los IDs de proveedor y sede en el body.
 * @returns {Promise<void>} - Envía la relación creada o un mensaje de error.
 */
export const createSupplierHeadquarter = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const relation = await supplierHeadquarterService.create(body);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 201, relation.data);
  } catch (e) { handlerResponse(res, e, "crear el proveedor-sede") }
}

/**
 * Actualiza una relación proveedor-sede existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la relación en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía la relación actualizada o un mensaje de error.
 */
export const updateSupplierHeadquarter = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const relation = await supplierHeadquarterService.update(params.id, body);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "actualizar el proveedor-sede") }
}

/**
 * Elimina una relación proveedor-sede existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID de la relación a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteSupplierHeadquarter = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const relation = await supplierHeadquarterService.delete(params.id);
    if (!relation.success) throw new ErrorAPI(relation.error);
    send(res, 200, relation.data);
  } catch (e) { handlerResponse(res, e, "eliminar el proveedor-sede") }
} 