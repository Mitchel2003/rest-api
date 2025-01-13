import { calibrationEquipmentSchema } from "@/schemas/relation/equipment.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createCalibrationEquipment, getCalibrationEquipments, getCalibrationEquipment, updateCalibrationEquipment, deleteCalibrationEquipment } from "@/controllers/relation/equipment/calibrationEquipment.controller";

const router = Router();

//calibration equipment routes (form/equipment/calibrationEquipment)
router.post('/calibrationEquipment', authRequired, validateSchema(calibrationEquipmentSchema), createCalibrationEquipment);
router.get('/calibrationEquipments', authRequired, getCalibrationEquipments);
router.get('/calibrationEquipment/:id', authRequired, getCalibrationEquipment);
router.put('/calibrationEquipment/:id', authRequired, updateCalibrationEquipment);
router.delete('/calibrationEquipment/:id', authRequired, deleteCalibrationEquipment);

export default router;