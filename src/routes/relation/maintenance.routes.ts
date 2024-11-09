import { checkMaintenanceSchema } from "@/schemas/relation/maintenance.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createCheckMaintenance, getCheckMaintenances, getCheckMaintenance, updateCheckMaintenance, deleteCheckMaintenance } from "@/controllers/relation/maintenance/checkMaintenance.controller";

const router = Router();

//check maintenance routes (relation/maintenance)
router.post('/check-maintenance', authRequired, validateSchema(checkMaintenanceSchema), createCheckMaintenance);
router.get('/check-maintenances', authRequired, getCheckMaintenances);
router.get('/check-maintenance/:id', authRequired, getCheckMaintenance);
router.put('/check-maintenance/:id', authRequired, updateCheckMaintenance);
router.delete('/check-maintenance/:id', authRequired, deleteCheckMaintenance);

export default router;