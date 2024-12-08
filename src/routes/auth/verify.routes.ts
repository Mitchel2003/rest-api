import { forgotPasswordSchema } from "@/schemas/auth/verify.schema"
import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { verifyAuth, forgotPassword } from "@/controllers/auth/verify.controller"

const router = Router()

//verify auth resetPassword
router.get('/verify-auth', authRequired, verifyAuth)
router.post('/forgot-password', validateSchema(forgotPasswordSchema), forgotPassword)

export default router