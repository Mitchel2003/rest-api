import calibrationSchema from "@/schemas/form/equipment/calibration.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createCalibration, getCalibrations, getCalibration, updateCalibration, deleteCalibration } from "@/controllers/form/equipment/calibration.controller";

const router = Router();

//calibration routes (equipment/calibration)
router.post('/calibration', authRequired, validateSchema(calibrationSchema), createCalibration);
router.get('/calibrations', authRequired, getCalibrations);
router.get('/calibration/:id', authRequired, getCalibration);
router.put('/calibration/:id', authRequired, updateCalibration);
router.delete('/calibration/:id', authRequired, deleteCalibration);

export default router;