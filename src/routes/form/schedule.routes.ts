import scheduleSchema from "@/schemas/form/schedule.schema"
import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { createSchedule, getSchedules, getSchedule, updateSchedule, deleteSchedule } from "@/controllers/form/schedule.controller"

const router = Router()

//schedule routes (form/schedule)
router.post('/schedule', authRequired, validateSchema(scheduleSchema), createSchedule)
router.get('/schedules', authRequired, getSchedules)
router.get('/schedule/:id', authRequired, getSchedule)
router.put('/schedule/:id', authRequired, updateSchedule)
router.delete('/schedule/:id', authRequired, deleteSchedule)

export default router