import { registerSchema, loginSchema, forgotPasswordSchema } from "@/schemas/auth/auth.schema"
import { login, logout, register, forgotPassword } from "@/controllers/auth/auth.controller"
import validateSchema from "@/middlewares/validator.middleware"
import { Router } from "express"

const router = Router()

router.post('/logout', logout)
router.post('/login', validateSchema(loginSchema), login)
router.post('/register', validateSchema(registerSchema), register)
router.post('/forgot-password', validateSchema(forgotPasswordSchema), forgotPassword)

export default router