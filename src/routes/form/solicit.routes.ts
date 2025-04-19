import solicitSchema from "@/schemas/form/solicit.schema"
import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { createSolicit, getSolicits, getSolicit, updateSolicit, deleteSolicit } from "@/controllers/form/solicit.controller"

const router = Router()

//solicit routes (form/solicit)
router.post('/solicit', authRequired, validateSchema(solicitSchema), createSolicit)
router.get('/solicits', authRequired, getSolicits)
router.get('/solicit/:id', authRequired, getSolicit)
router.put('/solicit/:id', authRequired, updateSolicit)
router.delete('/solicit/:id', authRequired, deleteSolicit)

export default router