import { Notification, NotificationProps } from '@/types/auth/notification.type'
import notificationModel from '@/models/auth/notification.model'
import { handlerService as handler } from '@/errors/handler'
import { Result } from '@/interfaces/api.interface'
import { NotFound } from '@/errors'
import { Types } from 'mongoose'

/** Servicio para gestionar las notificaciones */
class NotificationService {
  /**
   * Crea una nueva notificación
   * @param {Object} data - Datos de la notificación
   * @returns {Promise<Result<Notification>>} - Resultado con la notificación creada
   */
  async create(data: Partial<Notification>): Promise<Result<Notification>> {
    return handler(async () => {
      const notification = new notificationModel(data)
      return await notification.save()
    }, 'crear notificación')
  }
  /*---------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------getters--------------------------------------------------*/
  /**
   * Obtiene el conteo de notificaciones no leídas de un usuario
   * @param {string} userId - ID del usuario, representa al destinatario de las notificaciones
   * @returns {Promise<Result<number>>} - Resultado con el conteo
   */
  async countUnread(userId: string): Promise<Result<number>> {
    return handler(async () => await notificationModel.countDocuments({ recipient: new Types.ObjectId(userId), isRead: false }), 'contar notificaciones no leídas')
  }
  /**
   * Obtiene todas las notificaciones de un usuario
   * @param {string} userId - ID del usuario
   * @param {Object} options - Opciones de paginación
   * @returns {Promise<Result<Notification[]>>} - Resultado con la lista de notificaciones
   */
  async findByUser(userId: string, options: { page?: number, limit?: number, onlyUnread?: boolean } = {}): Promise<Result<{ notifications: Notification[], total: number }>> {
    return handler(async () => {
      const { page = 1, limit = 10, onlyUnread = false } = options
      const filter: any = { recipient: new Types.ObjectId(userId) }
      if (onlyUnread) { filter.isRead = false } //to filter unread
      const total = await notificationModel.countDocuments(filter)
      const notifications = await notificationModel.find(filter)
        .sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit)
        .populate('sender', 'username email role')
        .lean()
      return { notifications, total }
    }, 'obtener notificaciones del usuario')
  }
  /**
   * Crea una notificación
   * @param {Object} data - Datos de la notificación
   * @returns {Promise<Result<Notification>>} - Resultado con la notificación creada
   */
  async createNotification(data: NotificationProps): Promise<Result<Notification>> {
    return handler(async () => {
      const { recipient, sender, title, message, type, url } = data
      const notificationData: Partial<Notification> = {
        sender: sender ? new Types.ObjectId(sender) : undefined,
        recipient: new Types.ObjectId(recipient),
        title, message, isRead: false, url, type
      } //save notification data on database
      const notification = new notificationModel(notificationData)
      return await notification.save()
    }, 'crear notificación')
  }
  /*---------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------mutations--------------------------------------------------*/
  /**
   * Marca una notificación como leída
   * @param {string} id - ID de la notificación
   * @param {string} userId - ID del usuario, representa al destinatario de las notificaciones
   * @returns {Promise<Result<Notification>>} - Resultado con la notificación actualizada
   */
  async markAsRead(id: string, userId: string): Promise<Result<Notification>> {
    return handler(async () => {
      const notification = await notificationModel.findOne({ _id: new Types.ObjectId(id), recipient: new Types.ObjectId(userId) })
      if (!notification) throw new NotFound({ message: 'notificación' })
      notification.isRead = true
      return await notification.save()
    }, 'marcar notificación como leída')
  }
  /**
   * Marca todas las notificaciones de un usuario como leídas
   * @param {string} userId - ID del usuario, representa al destinatario de las notificaciones
   * @returns {Promise<Result<{ modifiedCount: number }>>} - Resultado con el número de notificaciones actualizadas
   */
  async markAllAsRead(userId: string): Promise<Result<{ modifiedCount: number }>> {
    return handler(async () => {
      const result = await notificationModel.updateMany({ recipient: new Types.ObjectId(userId), isRead: false }, { $set: { isRead: true } })
      return { modifiedCount: result.modifiedCount }
    }, 'marcar todas las notificaciones como leídas')
  }
  /**
   * Elimina una notificación
   * @param {string} id - ID de la notificación
   * @param {string} userId - ID del usuario, representa al destinatario de las notificaciones
   * @returns {Promise<Result<{ deleted: boolean }>>} - Resultado indicando si se eliminó correctamente
   */
  async delete(id: string, userId: string): Promise<Result<{ deleted: boolean }>> {
    return handler(async () => {
      const result = await notificationModel.deleteOne({ _id: new Types.ObjectId(id), recipient: new Types.ObjectId(userId) })
      if (result.deletedCount === 0) throw new NotFound({ message: 'notificación' })
      return { deleted: true }
    }, 'eliminar notificación')
  }
  /**
   * Elimina todas las notificaciones de un usuario
   * @param {string} userId - ID del usuario, representa al destinatario de las notificaciones
   * @returns {Promise<Result<{ deletedCount: number }>>} - Resultado con el número de notificaciones eliminadas
   */
  async deleteAll(userId: string): Promise<Result<{ deletedCount: number }>> {
    return handler(async () => {
      const result = await notificationModel.deleteMany({ recipient: new Types.ObjectId(userId) })
      return { deletedCount: result.deletedCount }
    }, 'eliminar todas las notificaciones')
  }
}

export const notificationService = new NotificationService()