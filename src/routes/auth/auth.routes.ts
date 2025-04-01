import { login, logout, forgotPassword, getOnAuth, sendMessage } from "@/controllers/auth/auth.controller"
import { loginSchema, forgotPasswordSchema } from "@/schemas/auth/auth.schema"
import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

const router = Router()

router.post('/logout', logout)// authentication
router.post('/login', validateSchema(loginSchema), login)
router.get('/on-auth', getOnAuth)// verification
router.post('/forgot-password', validateSchema(forgotPasswordSchema), forgotPassword)
router.post('/send-message', authRequired, sendMessage)// message whatsapp

export default router