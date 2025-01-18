import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import curriculumSchema from "@/schemas/form/curriculum/curriculum.schema"
import accessorySchema from "@/schemas/form/curriculum/accessory.schema"

import { getCurriculum, getCurriculums, createCurriculum, updateCurriculum, deleteCurriculum } from "@/controllers/form/curriculum/curriculum.controller"
import { createAccessory, getAccessories, getAccessory, updateAccessory, deleteAccessory } from "@/controllers/form/curriculum/accessory.controller"

const router = Router()

//curriculum routes (form/cv)
router.post('/cv', authRequired, validateSchema(curriculumSchema), createCurriculum)
router.get('/cvs', authRequired, getCurriculums)
router.get('/cv/:id', authRequired, getCurriculum)
router.put('/cv/:id', authRequired, updateCurriculum)
router.delete('/cv/:id', authRequired, deleteCurriculum)

//accessory routes (form/cv/accessory)
router.post('/cv/accessory', authRequired, validateSchema(accessorySchema), createAccessory)
router.get('/cv/accessories/:id', authRequired, getAccessories)
router.get('/cv/accessory/:id', authRequired, getAccessory)
router.put('/cv/accessory/:id', authRequired, updateAccessory)
router.delete('/cv/accessory/:id', authRequired, deleteAccessory)

export default router