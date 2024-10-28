import { verifyAuth, verifyEmail } from "@/controllers/auth/verify.controller"
import { verifyEmailSchema } from "@/schemas/auth/verify.schema"
import validateSchema from "@/middlewares/validator.middleware"
import tokenRequired from "@/middlewares/token.middleware"
import { Router } from "express"

const router = Router()

router.get('/verify-auth', tokenRequired, verifyAuth)
router.post('/verify-email', validateSchema(verifyEmailSchema), verifyEmail)

export default router