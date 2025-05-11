import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import curriculumSchema from "@/schemas/form/curriculum/curriculum.schema"
import accessorySchema from "@/schemas/form/curriculum/accessory.schema"
import inspectionSchema from "@/schemas/form/curriculum/inspection.schema"

import { createInspection, getInspections, getInspection, updateInspection, deleteInspection } from "@/controllers/form/curriculum/inspection.controller"
import { getCurriculum, getCurriculums, createCurriculum, updateCurriculum, deleteCurriculum } from "@/controllers/form/curriculum/curriculum.controller"
import { createAccessory, getAccessories, getAccessory, updateAccessory, deleteAccessory } from "@/controllers/form/curriculum/accessory.controller"

const router = Router()

//curriculum routes (form/cv)
router.post('/cv', authRequired, validateSchema(curriculumSchema), createCurriculum)
router.get('/cvs', authRequired, getCurriculums)
router.get('/cv/:id', getCurriculum) //allow public
router.put('/cv/:id', authRequired, updateCurriculum)
router.delete('/cv/:id', authRequired, deleteCurriculum)

//accessory routes (form/cv/sub/accessory)
router.post('/cv/sub/accessory', authRequired, validateSchema(accessorySchema), createAccessory)
router.get('/cv/sub/accessories', authRequired, getAccessories)
router.get('/cv/sub/accessory/:id', authRequired, getAccessory)
router.put('/cv/sub/accessory/:id', authRequired, updateAccessory)
router.delete('/cv/sub/accessory/:id', authRequired, deleteAccessory)

//inspection routes (form/cv/sub/inspection)
router.post('/cv/sub/inspection', authRequired, validateSchema(inspectionSchema), createInspection);
router.get('/cv/sub/inspections', authRequired, getInspections);
router.get('/cv/sub/inspection/:id', authRequired, getInspection);
router.put('/cv/sub/inspection/:id', authRequired, updateInspection);
router.delete('/cv/sub/inspection/:id', authRequired, deleteInspection);

export default router