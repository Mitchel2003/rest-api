import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import areaSchema from "@/schemas/location/area.schema"
import { Router } from "express"

import { createArea, getArea, getAreas, updateArea, deleteArea } from "@/controllers/location/area.controller"

const router = Router()

router.post('/area', authRequired, validateSchema(areaSchema), createArea)
router.get('/area/:id', authRequired, getArea)
router.get('/areas', authRequired, getAreas)
router.put('/area/:id', authRequired, updateArea)
router.delete('/area/:id', authRequired, deleteArea)

export default router