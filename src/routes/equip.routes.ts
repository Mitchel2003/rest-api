import { createEquipmentSchema } from "../schemas/equip.schema";
import validateSchema from "../middlewares/validator.middleware";
import authRequired from "../middlewares/auth.middleware";
import { Router } from "express";

import { getEquipment, getEquipments, createEquipment, updateEquipment, deleteEquipment } from "../controllers/equip.controller";

const router = Router();

router.post('/equipment', authRequired, validateSchema(createEquipmentSchema), createEquipment);
router.get('/equipment/:id', authRequired, getEquipment);
router.get('/equipments', authRequired, getEquipments);
router.put('/equipment/:id', authRequired, updateEquipment);
router.delete('/equipment/:id', authRequired, deleteEquipment);

export default router;