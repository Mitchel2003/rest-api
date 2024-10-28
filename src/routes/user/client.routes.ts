import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { clientSchema } from "@/schemas/user/client.schema"
import { Router } from "express"

import { getClient, getClients, createClient, updateClient, deleteClient } from "@/controllers/user/client.controller"

const router = Router()

router.post('/client', authRequired, validateSchema(clientSchema), createClient)
router.get('/client/:id', authRequired, getClient)
router.get('/clients', authRequired, getClients)
router.put('/client/:id', authRequired, updateClient)
router.delete('/client/:id', authRequired, deleteClient)

export default router