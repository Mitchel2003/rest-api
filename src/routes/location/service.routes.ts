import validateSchema from "@/middlewares/validator.middleware"
import serviceSchema from "@/schemas/location/service.schema"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { createService, getService, getServices, updateService, deleteService } from "@/controllers/location/service.controller"

const router = Router()

router.post('/service', authRequired, validateSchema(serviceSchema), createService)
router.get('/service/:id', authRequired, getService)
router.get('/services', authRequired, getServices)
router.put('/service/:id', authRequired, updateService)
router.delete('/service/:id', authRequired, deleteService)

export default router