import curriculumSchema from "../../schemas/form/curriculum.schema"
import validateSchema from "../../middlewares/validator.middleware"
import authRequired from "../../middlewares/auth.middleware"
import { Router } from "express"

import { getCurriculum, getCurriculums, createCurriculum, updateCurriculum, deleteCurriculum } from "../../controllers/form/curriculum.controller"

const router = Router()

router.post('/cv', authRequired, validateSchema(curriculumSchema), createCurriculum)
router.get('/cvs', authRequired, getCurriculums)
router.get('/cv/:id', authRequired, getCurriculum)
router.put('/cv/:id', authRequired, updateCurriculum)
router.delete('/cv/:id', authRequired, deleteCurriculum)

export default router