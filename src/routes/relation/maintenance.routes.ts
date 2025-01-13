import { checkMaintenanceSchema } from "@/schemas/relation/maintenance.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createCheckMaintenance, getCheckMaintenances, getCheckMaintenance, updateCheckMaintenance, deleteCheckMaintenance } from "@/controllers/relation/maintenance/checkMaintenance.controller";

const router = Router();

//check maintenance routes (form/maintenance/checkMaintenance)
router.post('/checkMaintenance', authRequired, validateSchema(checkMaintenanceSchema), createCheckMaintenance);
router.get('/checkMaintenances', authRequired, getCheckMaintenances);
router.get('/checkMaintenance/:id', authRequired, getCheckMaintenance);
router.put('/checkMaintenance/:id', authRequired, updateCheckMaintenance);
router.delete('/checkMaintenance/:id', authRequired, deleteCheckMaintenance);

export default router;