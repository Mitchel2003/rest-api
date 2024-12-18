import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import citySchema from "@/schemas/location/city.schema"
import { Router } from "express"

import { createCity, getCity, getCities, updateCity, deleteCity } from "@/controllers/location/city.controller"

const router = Router()

router.post('/city', authRequired, validateSchema(citySchema), createCity)
router.get('/city/:id', authRequired, getCity)
router.get('/cities', authRequired, getCities)
router.put('/city/:id', authRequired, updateCity)
router.delete('/city/:id', authRequired, deleteCity)

export default router