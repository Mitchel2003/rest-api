import equipmentSchema from "@/schemas/form/equipment/equipment.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createEquipment, getEquipments, getEquipment, updateEquipment, deleteEquipment } from "@/controllers/form/equipment/equipment.controller";

const router = Router();

//equipment routes (form/equipment)
router.post('/equipment', authRequired, validateSchema(equipmentSchema), createEquipment);
router.get('/equipments', authRequired, getEquipments);
router.get('/equipment/:id', authRequired, getEquipment);
router.put('/equipment/:id', authRequired, updateEquipment);
router.delete('/equipment/:id', authRequired, deleteEquipment);

export default router; 