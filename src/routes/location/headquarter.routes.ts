import validateSchema from "@/middlewares/validator.middleware"
import headquarterSchema from "@/schemas/location/headquarter.schema"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { createHeadquarter, getHeadquarter, getHeadquarters, updateHeadquarter, deleteHeadquarter } from "@/controllers/location/headquarter.controller"

const router = Router()

router.post('/headquarter', authRequired, validateSchema(headquarterSchema), createHeadquarter)
router.get('/headquarter/:id', authRequired, getHeadquarter)
router.get('/headquarters', authRequired, getHeadquarters)
router.put('/headquarter/:id', authRequired, updateHeadquarter)
router.delete('/headquarter/:id', authRequired, deleteHeadquarter)

export default router