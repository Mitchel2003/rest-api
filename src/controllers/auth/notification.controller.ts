import { notificationService } from '@/services/mongodb/auth/notification.service'
import { send, ExtendsRequest } from '@/interfaces/api.interface'
import ErrorAPI, { Unauthorized, Validation } from '@/errors'
import { handlerResponse } from '@/errors/handler'
import { Response } from 'express'

/**
 * Obtiene todas las notificaciones de un usuario
 * @param {ExtendsRequest} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 */
export const getNotifications = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id
    const { page, limit, onlyUnread } = req.query
    if (!userId) throw new Unauthorized({ message: 'Usuario no autenticado' })
    const options = {
      limit: limit ? parseInt(limit as string) : 10,
      page: page ? parseInt(page as string) : 1,
      onlyUnread: onlyUnread === 'true'
    } //options to build pagination
    const result = await notificationService.findByUser(userId, options)
    if (!result.success) throw new ErrorAPI(result.error) //catch error
    send(res, 200, result.data) //returns the notifications and count
  } catch (e: unknown) { handlerResponse(res, e, 'obtener notificaciones') }
}
/**
 * Obtiene el conteo de notificaciones no leídas de un usuario
 * @param {ExtendsRequest} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 */
export const getUnreadCount = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id
    if (!userId) throw new Unauthorized({ message: 'Usuario no autenticado' })
    const result = await notificationService.countUnread(userId) //count unread
    if (!result.success) throw new ErrorAPI(result.error) //catch error of service
    send(res, 200, { count: result.data }) //returns the count of unread notifications
  } catch (e: unknown) { handlerResponse(res, e, 'obtener conteo de notificaciones no leídas') }
}
/**
 * Crea una notificación con su respectivo destinatario y emisor
 * @param {ExtendsRequest} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 */
export const createNotification = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const { recipient, title, message } = req.body
    if (!recipient || !title || !message) throw new Validation({ message: 'Datos incompletos' })
    const result = await notificationService.createNotification(req.body)
    if (!result.success) throw new ErrorAPI(result.error) //catch error
    send(res, 201, result.data) //returns the notification created
  } catch (e: unknown) { handlerResponse(res, e, 'crear notificación') }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------mutations--------------------------------------------------*/
/**
 * Marca una notificación como leída
 * @param {ExtendsRequest} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 */
export const markAsRead = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?._id
    if (!userId) throw new Unauthorized({ message: 'Usuario no autenticado' })
    if (!id) throw new Validation({ message: 'ID de notificación requerido' })
    const result = await notificationService.markAsRead(id, userId) //mark as read
    if (!result.success) throw new ErrorAPI(result.error) //catch error of service
    send(res, 200, result.data) //returns the notification marked as read
  } catch (e: unknown) { handlerResponse(res, e, 'marcar notificación como leída') }
}
/**
 * Marca todas las notificaciones de un usuario como leídas
 * @param {ExtendsRequest} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 */
export const markAllAsRead = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id
    if (!userId) throw new Unauthorized({ message: 'Usuario no autenticado' })
    const result = await notificationService.markAllAsRead(userId) //mark all as read
    if (!result.success) throw new ErrorAPI(result.error) //catch error of service
    send(res, 200, result.data) //returns the number of notifications marked as read
  } catch (e: unknown) { handlerResponse(res, e, 'marcar todas las notificaciones como leídas') }
}
/**
 * Elimina una notificación
 * @param {ExtendsRequest} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 */
export const deleteNotification = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user?._id
    if (!userId) throw new Unauthorized({ message: 'Usuario no autenticado' })
    if (!id) throw new Validation({ message: 'ID de notificación requerido' })
    const result = await notificationService.delete(id, userId) //delete notification
    if (!result.success) throw new ErrorAPI(result.error) //catch error of service
    send(res, 200, result.data) //returns a boolean confirming the deletion
  } catch (e: unknown) { handlerResponse(res, e, 'eliminar notificación') }
}
/**
 * Elimina todas las notificaciones de un usuario
 * @param {ExtendsRequest} req - Objeto de solicitud Express
 * @param {Response} res - Objeto de respuesta Express
 */
export const deleteAllNotifications = async (req: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id
    if (!userId) throw new Unauthorized({ message: 'Usuario no autenticado' })
    const result = await notificationService.deleteAll(userId) //delete all notifications
    if (!result.success) throw new ErrorAPI(result.error) //catch error of service
    send(res, 200, result.data) //returns the number of notifications deleted
  } catch (e: unknown) { handlerResponse(res, e, 'eliminar todas las notificaciones') }
}