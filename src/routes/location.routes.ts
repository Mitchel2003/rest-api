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
/* la razon por la cual elimino el userReferences es porque no necesito obtener las referencias de ubicacion del usuario;
esto debido a que como podras intuir, un usuario puede pertenecer a multiples sedes (headquarter), entonces solo piensalo,
si se supone que sobreescribimos estas variables en req.userReferences {city, state, country}, entonces, como se supone que
haremos si tenemos varias ciudades u departamentos en donde opera el usuario */

/* necesito reevaluar esta logica, ya que si el usuario tiene varias sedes, entonces no es necesario usar el userReferences */

/* por lo pronto trabajemos con un select de countries, de este modo podemos crear un estado y una ciudad sin necesidad de userReferences */

/* aunque pensandolo mejor, si intuimos que al traer una de las sedes, ya se trae toda la info de localizacion, y si intuimos que la persona opera
en un pais, entonces si tendria sentido usar el userReferences, pero de modo que solo usamos el id del pais */

/* antes siquiera de intentar crear un estado, debemos arreglar una logica un poco obsoleta; resulta que en userReference estamos
intentando obtener el headquarte para empezar e ir escalando hasta llegar a pais, pero el detalle esta en que no hay ningun Headquarter
en la base de datos, error mio; ahora bien, como se supone que vamos a obtener el pais si no tenemos el headquarter?
porque se supone que mediante esta busqueda diferida logramos ir obteniendo datos respecto a la sede (headquarter) al que pertenece el usuario */

/* ahora, si se supone que el usuario pertenece a una sede, y esta a su vez pertenece a una ciudad y un departamento, y este a su vez
pertenece a un pais, entonces si tendriamos sentido usar el userReferences, pero de este modo solo obtendriamos el id del pais */

router.post('/state', authRequired, userReferences, validateSchema(stateSchema), createState)//working here...
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