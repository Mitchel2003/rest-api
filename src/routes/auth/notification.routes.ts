import { getNotifications, getUnreadCount, markAsRead, markAllAsRead, deleteNotification, deleteAllNotifications, createNotification } from '@/controllers/auth/notification.controller'
import { authRequired } from '@/middlewares/auth.middleware'
import { Router } from 'express'

const router = Router()

router.use(authRequired)
router.get('/', getNotifications)
router.get('/unread/count', getUnreadCount)
router.put('/read/:id', markAsRead)
router.post('/read/all', markAllAsRead)
router.post('/create', createNotification)
router.delete('/:id', deleteNotification)
router.delete('/', deleteAllNotifications)

export default router