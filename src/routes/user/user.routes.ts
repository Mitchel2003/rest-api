import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { userSchema } from "@/schemas/user/user.schema"
import { Router } from "express"

import { getUser, getUsers, createUser, updateUser, deleteUser } from "@/controllers/user/user.controller"

const router = Router()

router.post('/user', authRequired, validateSchema(userSchema), createUser)
router.get('/user/:id', authRequired, getUser)
router.get('/users', authRequired, getUsers)
router.put('/user/:id', authRequired, updateUser)
router.delete('/user/:id', authRequired, deleteUser)

export default router