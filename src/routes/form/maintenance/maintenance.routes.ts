import maintenanceSchema from "@/schemas/form/maintenance/maintenance.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createMaintenance, getMaintenances, getMaintenance, updateMaintenance, deleteMaintenance } from "@/controllers/form/maintenance/maintenance.controller";

const router = Router();

//maintenance routes (maintenance)
router.post('', authRequired, validateSchema(maintenanceSchema), createMaintenance);
router.get('', authRequired, getMaintenances);
router.get('/:id', authRequired, getMaintenance);
router.put('/:id', authRequired, updateMaintenance);
router.delete('/:id', authRequired, deleteMaintenance);

export default router; 