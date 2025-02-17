import validateSchema from "@/middlewares/validator.middleware"
import authRequired from "@/middlewares/auth.middleware"
import { companySchema } from "@/schemas/user/company.schema"
import { Router } from "express"

import { getCompany, getCompanies, createCompany, updateCompany, deleteCompany } from "@/controllers/user/company.controller"

const router = Router()

router.post('/company', authRequired, validateSchema(companySchema), createCompany)
router.get('/company/:id', authRequired, getCompany)
router.get('/companies', authRequired, getCompanies)
router.put('/company/:id', authRequired, updateCompany)
router.delete('/company/:id', authRequired, deleteCompany)

export default router