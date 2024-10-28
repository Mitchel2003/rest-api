import { login, logout, register } from "@/controllers/auth/auth.controller"
import { registerSchema, loginSchema } from "@/schemas/auth/auth.schema"
import validateSchema from "@/middlewares/validator.middleware"
import { Router } from "express"

const router = Router()

router.post('/logout', logout)
router.post('/login', validateSchema(loginSchema), login)
router.post('/register', validateSchema(registerSchema), register)

export default router