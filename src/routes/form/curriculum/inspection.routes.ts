import { inspectionSchema } from "@/schemas/form/curriculum/inspection.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createInspection, getInspections, getInspection, updateInspection, deleteInspection } from "@/controllers/form/curriculum/inspection.controller";

const router = Router();

//inspection routes (form/cv/inspection)
router.post('/inspection', authRequired, validateSchema(inspectionSchema), createInspection);
router.get('/inspections/:id', authRequired, getInspections);
router.get('/inspection/:id', authRequired, getInspection);
router.put('/inspection/:id', authRequired, updateInspection);
router.delete('/inspection/:id', authRequired, deleteInspection);

export default router;