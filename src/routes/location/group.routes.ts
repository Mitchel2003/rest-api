import validateSchema from "@/middlewares/validator.middleware"
import groupSchema from "@/schemas/location/group.schema"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { createGroup, getGroup, getGroups, updateGroup, deleteGroup } from "@/controllers/location/group.controller"

const router = Router()

router.post('/group', authRequired, validateSchema(groupSchema), createGroup)
router.get('/group/:id', authRequired, getGroup)
router.get('/groups', authRequired, getGroups)
router.put('/group/:id', authRequired, updateGroup)
router.delete('/group/:id', authRequired, deleteGroup)

export default router