/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar clientes */
import { clientService } from "@/services/mongodb/user/client.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface"
import ErrorAPI from "@/errors";

import { Request, Response } from "express"

/**
 * Obtiene un cliente específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del cliente en params.id.
 * @returns {Promise<void>} - Envía el cliente encontrado o un mensaje de error.
 */
export const getClient = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const client = await clientService.findById(params.id);
    if (!client.success) throw new ErrorAPI(client.error);
    send(res, 200, client.data);
  } catch (e) { handlerResponse(res, e, "obtener el cliente") }
}

/**
 * Obtiene todos los clientes.
 * @param {Request} req - Objeto de solicitud Express. Se espera un opcional query para la consulta.
 * @returns {Promise<void>} - Envía un objeto con los clientes.
 */
export const getClients = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const clients = await clientService.find(body.query);
    if (!clients.success) throw new ErrorAPI(clients.error);
    send(res, 200, clients.data);
  } catch (e) { handlerResponse(res, e, "obtener los clientes") }
}

/**
 * Crear un nuevo cliente
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga los datos del cliente en el body. 
 * @returns {Promise<void>} - Envía el cliente creado o un mensaje de error.
 */
export const createClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await clientService.create(req.body);
    if (!client.success) throw new ErrorAPI(client.error);
    send(res, 201, client.data);
  } catch (e) { handlerResponse(res, e, "crear el cliente") }
}

/**
 * Actualiza un cliente existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del cliente en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el cliente actualizado o un mensaje de error.
 */
export const updateClient = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const client = await clientService.update(params.id, body);
    if (!client.success) throw new ErrorAPI(client.error);
    send(res, 200, client.data);
  } catch (e) { handlerResponse(res, e, "actualizar el cliente") }
}

/**
 * Elimina un cliente existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del cliente a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteClient = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const client = await clientService.delete(params.id);
    if (!client.success) throw new ErrorAPI(client.error);
    send(res, 200, client.data);
  } catch (e) { handlerResponse(res, e, "eliminar el cliente") }
}