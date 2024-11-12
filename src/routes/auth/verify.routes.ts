import { resetPasswordSchema, forgotPasswordSchema } from "@/schemas/auth/verify.schema"
import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { verifyAuth, verifyAction, forgotPassword, resetPassword } from "@/controllers/auth/verify.controller"

const router = Router()

//verify auth and action
router.get('/verify-auth', authRequired, verifyAuth)
router.post('/verify-action/:mode', verifyAction)

//reset password
router.post('/forgot-password', validateSchema(forgotPasswordSchema), forgotPassword)
router.post('/reset-password/:oobCode', validateSchema(resetPasswordSchema), resetPassword)

export default router