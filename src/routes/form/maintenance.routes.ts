import { maintenanceSchema } from "@/schemas/form/maintenance.schema"
import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { createMaintenance, getMaintenances, getMaintenance, updateMaintenance, deleteMaintenance } from "@/controllers/form/maintenance.controller"

const router = Router()

//maintenance routes (form/maintenance)
router.post('/maintenance', authRequired, validateSchema(maintenanceSchema), createMaintenance)
router.get('/maintenances', authRequired, getMaintenances)
router.get('/maintenance/:id', authRequired, getMaintenance)
router.put('/maintenance/:id', authRequired, updateMaintenance)
router.delete('/maintenance/:id', authRequired, deleteMaintenance)

export default router