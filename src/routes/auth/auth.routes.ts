import { login, logout, register, forgotPassword, getOnAuth } from "@/controllers/auth/auth.controller"
import { registerSchema, loginSchema, forgotPasswordSchema } from "@/schemas/auth/auth.schema"
import validateSchema from "@/middlewares/validator.middleware"
import { Router } from "express"

const router = Router()

// authentication
router.post('/logout', logout)
router.post('/login', validateSchema(loginSchema), login)
router.post('/register', validateSchema(registerSchema), register)

// verification
router.post('/forgot-password', validateSchema(forgotPasswordSchema), forgotPassword)
router.get('/on-auth', getOnAuth)

export default router