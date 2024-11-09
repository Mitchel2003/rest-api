import { presetInspectionSchema, typeInspectionSchema, inspectionSchema } from "@/schemas/form/curriculum/inspection.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createInspection, getInspections, getInspection, updateInspection, deleteInspection } from "@/controllers/form/curriculum/inspection/inspection.controller";
import { createTypeInspection, getTypeInspections, getTypeInspection, updateTypeInspection, deleteTypeInspection } from "@/controllers/form/curriculum/inspection/typeInspection.controller";
import { createPresetInspection, getPresetInspections, getPresetInspection, updatePresetInspection, deletePresetInspection } from "@/controllers/form/curriculum/inspection/presetInspection.controller";

const router = Router();

//inspection routes (cv/inspection)
router.post('', authRequired, validateSchema(inspectionSchema), createInspection);
router.get('', authRequired, getInspections);
router.get('/:id', authRequired, getInspection);
router.put('/:id', authRequired, updateInspection);
router.delete('/:id', authRequired, deleteInspection);

//type inspection routes (cv/inspection/type)
router.post('/type', authRequired, validateSchema(typeInspectionSchema), createTypeInspection);
router.get('/types', authRequired, getTypeInspections);
router.get('/type/:id', authRequired, getTypeInspection);
router.put('/type/:id', authRequired, updateTypeInspection);
router.delete('/type/:id', authRequired, deleteTypeInspection);

//preset inspection routes (cv/inspection/preset)
router.post('/preset', authRequired, validateSchema(presetInspectionSchema), createPresetInspection);
router.get('/presets', authRequired, getPresetInspections);
router.get('/preset/:id', authRequired, getPresetInspection);
router.put('/preset/:id', authRequired, updatePresetInspection);
router.delete('/preset/:id', authRequired, deletePresetInspection);

export default router;