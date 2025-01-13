import { maintenanceSchema, checkSchema } from "@/schemas/form/maintenance/maintenance.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createMaintenance, getMaintenances, getMaintenance, updateMaintenance, deleteMaintenance } from "@/controllers/form/maintenance/maintenance.controller";
import { createCheck, getChecks, getCheck, updateCheck, deleteCheck } from "@/controllers/form/maintenance/check.controller";

const router = Router();

//maintenance routes (form/maintenance)
router.post('/maintenance', authRequired, validateSchema(maintenanceSchema), createMaintenance);
router.get('/maintenances', authRequired, getMaintenances);
router.get('/maintenance/:id', authRequired, getMaintenance);
router.put('/maintenance/:id', authRequired, updateMaintenance);
router.delete('/maintenance/:id', authRequired, deleteMaintenance);

//check routes (form/maintenance/check)
router.post('/maintenance/check', authRequired, validateSchema(checkSchema), createCheck);
router.get('/maintenance/checks', authRequired, getChecks);
router.get('/maintenance/check/:id', authRequired, getCheck);
router.put('/maintenance/check/:id', authRequired, updateCheck);
router.delete('/maintenance/check/:id', authRequired, deleteCheck);

export default router; 