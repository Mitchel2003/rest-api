import calibrationSchema from "@/schemas/form/equipment/calibration.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createCalibration, getCalibrations, getCalibration, updateCalibration, deleteCalibration } from "@/controllers/form/equipment/calibration.controller";

const router = Router();

//calibration routes (form/equipment/calibration)
router.post('/equipment/calibration', authRequired, validateSchema(calibrationSchema), createCalibration);
router.get('/equipment/calibrations', authRequired, getCalibrations);
router.get('/equipment/calibration/:id', authRequired, getCalibration);
router.put('/equipment/calibration/:id', authRequired, updateCalibration);
router.delete('/equipment/calibration/:id', authRequired, deleteCalibration);

export default router;