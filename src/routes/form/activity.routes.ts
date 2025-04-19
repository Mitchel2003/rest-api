import activitySchema from "@/schemas/form/activity.schema"
import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { createActivity, getActivities, getActivity, updateActivity, deleteActivity } from "@/controllers/form/activity.controller"

const router = Router()

//activity routes (form/activity)
router.post('/activity', authRequired, validateSchema(activitySchema), createActivity)
router.get('/activities', authRequired, getActivities)
router.get('/activity/:id', authRequired, getActivity)
router.put('/activity/:id', authRequired, updateActivity)
router.delete('/activity/:id', authRequired, deleteActivity)

export default router