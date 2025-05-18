import validateSchema from "@/middlewares/validator.middleware"
import signatureSchema from "@/schemas/location/signature.schema"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { createSignature, getSignature, getSignatures, updateSignature, deleteSignature } from "@/controllers/location/signature.controller"

const router = Router()

router.post('/signature', authRequired, validateSchema(signatureSchema), createSignature)
router.get('/signature/:id', authRequired, getSignature)
router.get('/signatures', authRequired, getSignatures)
router.put('/signature/:id', authRequired, updateSignature)
router.delete('/signature/:id', authRequired, deleteSignature)

export default router