import { countrySchema, stateSchema, citySchema } from "../schemas/location.schema"
import userReferences from "../middlewares/references.middleware"
import validateSchema from "../middlewares/validator.middleware"
import authRequired from "../middlewares/auth.middleware"
import { Router } from "express"

import {
  //city
  createCity,

  //state
  createState,

  //country
  getCountry,
  getCountries,
  createCountry,
  deleteCountry,
  updateCountry
} from "../controllers/location.controller"

const router = Router()

//city
router.post('/city', authRequired, userReferences, validateSchema(citySchema), createCity)

//state
router.post('/state', authRequired, userReferences, validateSchema(stateSchema), createState)//working here...

//country
router.post('/country', authRequired, validateSchema(countrySchema), createCountry)
router.get('/country/:id', authRequired, getCountry)
router.get('/countries', authRequired, getCountries)
router.put('/country/:id', authRequired, updateCountry)
router.delete('/country/:id', authRequired, deleteCountry)

export default router