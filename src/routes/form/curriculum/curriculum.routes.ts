import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import technicalCharacteristicSchema from "@/schemas/form/curriculum/technicalCharacteristic.schema"
import curriculumSchema from "@/schemas/form/curriculum/curriculum.schema"
import accessorySchema from "@/schemas/form/curriculum/accessory.schema"

import { getTechnicalCharacteristic, getTechnicalCharacteristics, createTechnicalCharacteristic, updateTechnicalCharacteristic, deleteTechnicalCharacteristic } from "@/controllers/form/curriculum/technicalCharacteristic.controller"
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
router.get('/cv/accessories', authRequired, getAccessories)
router.get('/cv/accessory/:id', authRequired, getAccessory)
router.put('/cv/accessory/:id', authRequired, updateAccessory)
router.delete('/cv/accessory/:id', authRequired, deleteAccessory)

//technical characteristic routes (form/cv/technical-characteristic)
router.post('/cv/technical-characteristic', authRequired, validateSchema(technicalCharacteristicSchema), createTechnicalCharacteristic)
router.get('/cv/technical-characteristics', authRequired, getTechnicalCharacteristics)
router.get('/cv/technical-characteristic/:id', authRequired, getTechnicalCharacteristic)
router.put('/cv/technical-characteristic/:id', authRequired, updateTechnicalCharacteristic)
router.delete('/cv/technical-characteristic/:id', authRequired, deleteTechnicalCharacteristic)

export default router