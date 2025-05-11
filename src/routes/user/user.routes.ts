import { getUser, getUsers, createUser, updateUser, deleteUser } from "@/controllers/user/user.controller"
import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { userSchema } from "@/schemas/user/user.schema"
import { Router } from "express"

const router = Router()

router.post('/user', authRequired, validateSchema(userSchema), createUser)
router.get('/users', getUsers) //authRequired temporally disabled
router.get('/user/:id', authRequired, getUser)
router.put('/user/:id', authRequired, updateUser)
router.delete('/user/:id', authRequired, deleteUser)

export default router