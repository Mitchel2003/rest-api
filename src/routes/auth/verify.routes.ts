import { verifyAuth, verifyAction } from "@/controllers/auth/verify.controller"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

const router = Router()

router.get('/verify-auth', authRequired, verifyAuth)
router.post('/verify-action/:mode', verifyAction)

export default router