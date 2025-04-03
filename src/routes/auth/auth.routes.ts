import { sendNotification } from "@/controllers/auth/messaging.controller"
import authRequired from "@/middlewares/auth.middleware"
import { Router, Request, Response } from "express"

const router = Router()

// messaging routes through Firebase Cloud Messaging (Admin)
router.post('/fcm', authRequired, sendNotification)

// health route (to compensate delay "deployment")
router.get('/health', (req: Request, res: Response) => {
  if (req.params.id) console.log('params inecesaries')
  res.status(200).send('ok')
})

export default router