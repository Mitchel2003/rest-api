import validateSchema from "@/middlewares/validator.middleware"
import stateSchema from "@/schemas/location/state.schema"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { createState, getState, getStates, updateState, deleteState } from "@/controllers/location/state.controller"

const router = Router()

router.post('/state', authRequired, validateSchema(stateSchema), createState)
router.get('/state/:id', authRequired, getState)
router.get('/states', authRequired, getStates)
router.put('/state/:id', authRequired, updateState)
router.delete('/state/:id', authRequired, deleteState)

export default router