/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar clientes (entidades)*/
import { ExtendsRequest, send } from "../interfaces/api.interface"
import { Request, Response } from "express"
import Client from "../models/client.model"

/**
 * Obtiene un cliente específico por su ID.
 * @param {Request} req - Objeto de solicitud Express. Se espera que contenga el ID del cliente en params.id.
 * @returns {Promise<void>} - Envía el cliente encontrado o un mensaje de error.
 */
export const getClient = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findById(params.id);
    if (!client) return send(res, 404, 'Cliente no encontrado');
    send(res, 200, client);
  } catch (e) { send(res, 500, `Error interno del servidor al obtener el cliente: ${e}`) }
}

/**
 * Obtiene todos los clientes.
 * @returns {Promise<void>} - Envía un objeto con los clientes.
 */
export const getClients = async (res: Response): Promise<void> => {
  try {
    const clients = await Client.find();
    send(res, 200, clients);
  } catch (e) { send(res, 500, `Error interno del servidor al obtener los clientes: ${e}`) }
}

/**
 * Crear un nuevo cliente
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener los datos del cliente en el body. 
 * @returns {Promise<void>} - Envía el cliente creado o un mensaje de error.
 */
export const createClient = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const clientFormat = new Client({ ...req.body });
    const client = await clientFormat.save();
    send(res, 201, client);
  } catch (e) { send(res, 500, `Error interno del servidor al crear el cliente: ${e}`) }
}

/**
 * Actualiza un cliente existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del cliente en params.id y los datos actualizados en el body.
 * @returns {Promise<void>} - Envía el cliente actualizado o un mensaje de error.
 */
export const updateClient = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findByIdAndUpdate(params.id, body, { new: true });
    if (!client) return send(res, 404, 'Cliente no encontrado');
    send(res, 200, client);
  } catch (e) { send(res, 500, `Error interno del servidor al actualizar el cliente: ${e}`) }
}

/**
 * Elimina un cliente existente.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el ID del cliente a eliminar en params.id.
 * @returns {Promise<void>} - Envía un mensaje de confirmación o error.
 */
export const deleteClient = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findByIdAndDelete(params.id);
    if (!client) return send(res, 404, 'Cliente no encontrado');
    send(res, 200, client);
  } catch (e) { send(res, 500, `Error interno del servidor al eliminar el cliente: ${e}`) }
}