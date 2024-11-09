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

//curriculum routes (cv)
router.post('', authRequired, validateSchema(curriculumSchema), createCurriculum)
router.get('', authRequired, getCurriculums)
router.get('/:id', authRequired, getCurriculum)
router.put('/:id', authRequired, updateCurriculum)
router.delete('/:id', authRequired, deleteCurriculum)

//accessory routes (cv/accessory)
router.post('/accessory', authRequired, validateSchema(accessorySchema), createAccessory)
router.get('/accessories', authRequired, getAccessories)
router.get('/accessory/:id', authRequired, getAccessory)
router.put('/accessory/:id', authRequired, updateAccessory)
router.delete('/accessory/:id', authRequired, deleteAccessory)

//technical characteristic routes (cv/technical-characteristic)
router.post('/technical-characteristic', authRequired, validateSchema(technicalCharacteristicSchema), createTechnicalCharacteristic)
router.get('/technical-characteristics', authRequired, getTechnicalCharacteristics)
router.get('/technical-characteristic/:id', authRequired, getTechnicalCharacteristic)
router.put('/technical-characteristic/:id', authRequired, updateTechnicalCharacteristic)
router.delete('/technical-characteristic/:id', authRequired, deleteTechnicalCharacteristic)

export default router