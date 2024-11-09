import equipmentSchema from "@/schemas/form/equipment/equipment.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createEquipment, getEquipments, getEquipment, updateEquipment, deleteEquipment } from "@/controllers/form/equipment/equipment.controller";

const router = Router();

//equipment routes (equipment)
router.post('', authRequired, validateSchema(equipmentSchema), createEquipment);
router.get('', authRequired, getEquipments);
router.get('/:id', authRequired, getEquipment);
router.put('/:id', authRequired, updateEquipment);
router.delete('/:id', authRequired, deleteEquipment);

export default router; 