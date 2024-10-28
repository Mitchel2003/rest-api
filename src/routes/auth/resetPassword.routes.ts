import resetPasswordSchema, { forgotPasswordSchema } from "../../schemas/auth/resetPassword.schema"
import { forgotPassword, resetPassword } from "../../controllers/auth/resetPassword.controller"
import validateSchema from "../../middlewares/validator.middleware"
import { Router } from "express"

const router = Router()

router.post('/forgot-password', validateSchema(forgotPasswordSchema), forgotPassword)
router.post('/reset-password/:token', validateSchema(resetPasswordSchema), resetPassword)

export default router