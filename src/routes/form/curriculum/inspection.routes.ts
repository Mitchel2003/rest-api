import { presetInspectionSchema, typeInspectionSchema, inspectionSchema } from "@/schemas/form/curriculum/inspection.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createInspection, getInspections, getInspection, updateInspection, deleteInspection } from "@/controllers/form/curriculum/inspection/inspection.controller";
import { createTypeInspection, getTypeInspections, getTypeInspection, updateTypeInspection, deleteTypeInspection } from "@/controllers/form/curriculum/inspection/typeInspection.controller";
import { createPresetInspection, getPresetInspections, getPresetInspection, updatePresetInspection, deletePresetInspection } from "@/controllers/form/curriculum/inspection/presetInspection.controller";

const router = Router();

//inspection routes (form/cv/inspection)
router.post('/inspection', authRequired, validateSchema(inspectionSchema), createInspection);
router.get('/inspections', authRequired, getInspections);
router.get('/inspection/:id', authRequired, getInspection);
router.put('/inspection/:id', authRequired, updateInspection);
router.delete('/inspection/:id', authRequired, deleteInspection);

//type inspection routes (form/cv/inspection/type)
router.post('/inspection/type', authRequired, validateSchema(typeInspectionSchema), createTypeInspection);
router.get('/inspection/types', authRequired, getTypeInspections);
router.get('/inspection/type/:id', authRequired, getTypeInspection);
router.put('/inspection/type/:id', authRequired, updateTypeInspection);
router.delete('/inspection/type/:id', authRequired, deleteTypeInspection);

//preset inspection routes (form/cv/inspection/preset)
router.post('/inspection/preset', authRequired, validateSchema(presetInspectionSchema), createPresetInspection);
router.get('/inspection/presets', authRequired, getPresetInspections);
router.get('/inspection/preset/:id', authRequired, getPresetInspection);
router.put('/inspection/preset/:id', authRequired, updatePresetInspection);
router.delete('/inspection/preset/:id', authRequired, deletePresetInspection);

export default router;