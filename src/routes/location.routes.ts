import { countrySchema, stateSchema, /*citySchema*/ } from "../schemas/location.schema"
import userReferences from "../middlewares/references.middleware"
import validateSchema from "../middlewares/validator.middleware"
import authRequired from "../middlewares/auth.middleware"
import { Router } from "express"

import {
  //city
  // createCity,

  //state
  getState,
  getStates,
  createState,
  updateState,
  deleteState,

  //country
  getCountry,
  getCountries,
  createCountry,
  deleteCountry,
  updateCountry
} from "../controllers/location.controller"

const router = Router()

//city
// router.post('/city', authRequired, userReferences, validateSchema(citySchema), createCity)

//state
/** @link https://github.com/Mitchel2003/rest-api/blob/main/README.md#002 */
router.post('/state', authRequired, validateSchema(stateSchema), createState)//working here...
router.get('/state/:id', authRequired, getState)
router.get('/states', authRequired, getStates)
router.put('/state/:id', authRequired, updateState)
router.delete('/state/:id', authRequired, deleteState)

//country
router.post('/country', authRequired, validateSchema(countrySchema), createCountry)
router.get('/country/:id', authRequired, getCountry)
router.get('/countries', authRequired, getCountries)
router.put('/country/:id', authRequired, updateCountry)
router.delete('/country/:id', authRequired, deleteCountry)

export default router