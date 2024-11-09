import checkSchema from "@/schemas/form/maintenance/check.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createCheck, getChecks, getCheck, updateCheck, deleteCheck } from "@/controllers/form/maintenance/check.controller";

const router = Router();

//check routes (maintenance/check)
router.post('/check', authRequired, validateSchema(checkSchema), createCheck);
router.get('/checks', authRequired, getChecks);
router.get('/check/:id', authRequired, getCheck);
router.put('/check/:id', authRequired, updateCheck);
router.delete('/check/:id', authRequired, deleteCheck);

export default router;