import { supplierService } from "@/services/mongodb/form/curriculum/stakeholder/supplier.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import { Request, Response } from "express";

/**
 * Obtiene un proveedor específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del proveedor en params.id.
 * @returns {Promise<void>} - Envía el proveedor encontrado o un mensaje de error.
 */
export const getSupplier = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const supplier = await supplierService.findById(params.id);
    if (!supplier.success) throw new ErrorAPI(supplier.error);
    send(res, 200, supplier.data);
  } catch (e) { handlerResponse(res, e, "obtener el proveedor") }
}

/**
 * Obtiene todos los proveedores.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los proveedores.
 */
export const getSuppliers = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const suppliers = await supplierService.find(body.query);
    if (!suppliers.success) throw new ErrorAPI(suppliers.error);
    send(res, 200, suppliers.data);
  } catch (e) { handlerResponse(res, e, "obtener los proveedores") }
}

/**
 * Crear un nuevo proveedor.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del proveedor en el body.
 * @returns {Promise<void>} - Envía el proveedor creado o un mensaje de error.
 */
export const createSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const supplier = await supplierService.create(req.body);
    if (!supplier.success) throw new ErrorAPI(supplier.error);
    send(res, 201, supplier.data);
  } catch (e) { handlerResponse(res, e, "crear el proveedor") }
}

/**
 * Actualiza un proveedor existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del proveedor en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el proveedor actualizado o un mensaje de error.
 */
export const updateSupplier = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const supplier = await supplierService.update(params.id, body);
    if (!supplier.success) throw new ErrorAPI(supplier.error);
    send(res, 200, supplier.data);
  } catch (e) { handlerResponse(res, e, "actualizar el proveedor") }
}

/**
 * Elimina un proveedor existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del proveedor a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteSupplier = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const supplier = await supplierService.delete(params.id);
    if (!supplier.success) throw new ErrorAPI(supplier.error);
    send(res, 200, supplier.data);
  } catch (e) { handlerResponse(res, e, "eliminar el proveedor") }
} 