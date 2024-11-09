import { calibrationEquipmentSchema } from "@/schemas/relation/equipment.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createCalibrationEquipment, getCalibrationEquipments, getCalibrationEquipment, updateCalibrationEquipment, deleteCalibrationEquipment } from "@/controllers/relation/equipment/calibrationEquipment.controller";

const router = Router();

//calibration equipment routes (relation/equipment)
router.post('/calibration-equipment', authRequired, validateSchema(calibrationEquipmentSchema), createCalibrationEquipment);
router.get('/calibration-equipments', authRequired, getCalibrationEquipments);
router.get('/calibration-equipment/:id', authRequired, getCalibrationEquipment);
router.put('/calibration-equipment/:id', authRequired, updateCalibrationEquipment);
router.delete('/calibration-equipment/:id', authRequired, deleteCalibrationEquipment);

export default router;