import { login, logout, forgotPassword, getOnAuth } from "@/controllers/auth/auth.controller"
import { loginSchema, forgotPasswordSchema } from "@/schemas/auth/auth.schema"
import validateSchema from "@/middlewares/validator.middleware"
import { Router } from "express"

const router = Router()

router.post('/logout', logout)// authentication
router.post('/login', validateSchema(loginSchema), login)
router.get('/on-auth', getOnAuth)// verification
router.post('/forgot-password', validateSchema(forgotPasswordSchema), forgotPassword)

export default router