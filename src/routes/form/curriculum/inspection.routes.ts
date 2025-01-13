import { typeInspectionSchema, inspectionSchema } from "@/schemas/form/curriculum/inspection.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createInspection, getInspections, getInspection, updateInspection, deleteInspection } from "@/controllers/form/curriculum/inspection/inspection.controller";
import { createTypeInspection, getTypeInspections, getTypeInspection, updateTypeInspection, deleteTypeInspection } from "@/controllers/form/curriculum/inspection/typeInspection.controller";

const router = Router();

//inspection routes (form/cv/inspection)
router.post('/inspection', authRequired, validateSchema(inspectionSchema), createInspection);
router.get('/inspections', authRequired, getInspections);
router.get('/inspection/:id', authRequired, getInspection);
router.put('/inspection/:id', authRequired, updateInspection);
router.delete('/inspection/:id', authRequired, deleteInspection);

//type inspection routes (form/cv/inspection/type)
router.post('/typeInspection', authRequired, validateSchema(typeInspectionSchema), createTypeInspection);
router.get('/typeInspections', authRequired, getTypeInspections);
router.get('/typeInspection/:id', authRequired, getTypeInspection);
router.put('/typeInspection/:id', authRequired, updateTypeInspection);
router.delete('/typeInspection/:id', authRequired, deleteTypeInspection);

export default router;