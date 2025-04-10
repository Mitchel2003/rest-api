import { getNotifications, getUnreadCount, markAsRead, markAllAsRead, deleteNotification, deleteAllNotifications, createNotification } from '@/controllers/auth/notification.controller'
import notificationSchema from "@/schemas/auth/notification.schema"
import validateSchema from "@/middlewares/validator.middleware"
import { authRequired } from '@/middlewares/auth.middleware'
import { Router } from 'express'

const router = Router()

/*--------------------------------------------------getters--------------------------------------------------*/
router.get('/', authRequired, getNotifications)
router.get('/unread/count', authRequired, getUnreadCount)
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------mutations--------------------------------------------------*/
router.put('/read/:id', authRequired, markAsRead)
router.post('/read/all', authRequired, markAllAsRead)
router.delete('/:id', authRequired, deleteNotification)
router.delete('/', authRequired, deleteAllNotifications)
router.post('/create', authRequired, validateSchema(notificationSchema), createNotification)
/*---------------------------------------------------------------------------------------------------------*/

export default router