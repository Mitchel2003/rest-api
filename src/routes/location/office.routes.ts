import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import officeSchema from "@/schemas/location/office.schema"
import { Router } from "express"

import { createOffice, getOffice, getOffices, updateOffice, deleteOffice } from "@/controllers/location/office.controller"

const router = Router()

router.post('/office', authRequired, validateSchema(officeSchema), createOffice)
router.get('/office/:id', authRequired, getOffice)
router.get('/offices', authRequired, getOffices)
router.put('/office/:id', authRequired, updateOffice)
router.delete('/office/:id', authRequired, deleteOffice)

export default router