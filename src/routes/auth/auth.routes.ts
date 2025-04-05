import { sendNotification } from "@/controllers/auth/messaging.controller"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

const router = Router()

// messaging routes through Firebase Cloud Messaging (Admin)
router.post('/fcm', authRequired, sendNotification)

export default router