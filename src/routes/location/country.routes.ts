import validateSchema from "@/middlewares/validator.middleware"
import countrySchema from "@/schemas/location/country.schema"
import authRequired from "@/middlewares/auth.middleware"
import { Router } from "express"

import { createCountry, getCountry, getCountries, updateCountry, deleteCountry } from "@/controllers/location/country.controller"

const router = Router()

router.post('/country', authRequired, validateSchema(countrySchema), createCountry)
router.get('/country/:id', authRequired, getCountry)
router.get('/countries', authRequired, getCountries)
router.put('/country/:id', authRequired, updateCountry)
router.delete('/country/:id', authRequired, deleteCountry)

export default router