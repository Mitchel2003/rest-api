import { representativeHeadquarterSchema, supplierHeadquarterSchema, manufacturerHeadquarterSchema } from "@/schemas/relation/curriculum.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createSupplierHeadquarter, getSupplierHeadquarters, getSupplierHeadquarter, updateSupplierHeadquarter, deleteSupplierHeadquarter } from "@/controllers/relation/supplierHeadquarter.controller";
import { createManufacturerHeadquarter, getManufacturerHeadquarters, getManufacturerHeadquarter, updateManufacturerHeadquarter, deleteManufacturerHeadquarter } from "@/controllers/relation/manufacturerHeadquarter.controller";
import { createRepresentativeHeadquarter, getRepresentativeHeadquarters, getRepresentativeHeadquarter, updateRepresentativeHeadquarter, deleteRepresentativeHeadquarter } from "@/controllers/relation/representativeHeadquarter.controller";

const router = Router();

//representative headquarter routes (form/cv/stakeholder/representativeHeadquarter)
router.post('/stakeholder/representativeHeadquarter', authRequired, validateSchema(representativeHeadquarterSchema), createRepresentativeHeadquarter);
router.get('/stakeholder/representativeHeadquarters', authRequired, getRepresentativeHeadquarters);
router.get('/stakeholder/representativeHeadquarter/:id', authRequired, getRepresentativeHeadquarter);
router.put('/stakeholder/representativeHeadquarter/:id', authRequired, updateRepresentativeHeadquarter);
router.delete('/stakeholder/representativeHeadquarter/:id', authRequired, deleteRepresentativeHeadquarter);

//supplier headquarter routes (form/cv/stakeholder/supplierHeadquarter)
router.post('/stakeholder/supplierHeadquarter', authRequired, validateSchema(supplierHeadquarterSchema), createSupplierHeadquarter);
router.get('/stakeholder/supplierHeadquarters', authRequired, getSupplierHeadquarters);
router.get('/stakeholder/supplierHeadquarter/:id', authRequired, getSupplierHeadquarter);
router.put('/stakeholder/supplierHeadquarter/:id', authRequired, updateSupplierHeadquarter);
router.delete('/stakeholder/supplierHeadquarter/:id', authRequired, deleteSupplierHeadquarter);

//manufacturer headquarter routes (form/cv/stakeholder/manufacturerHeadquarter)
router.post('/stakeholder/manufacturerHeadquarter', authRequired, validateSchema(manufacturerHeadquarterSchema), createManufacturerHeadquarter);
router.get('/stakeholder/manufacturerHeadquarters', authRequired, getManufacturerHeadquarters);
router.get('/stakeholder/manufacturerHeadquarter/:id', authRequired, getManufacturerHeadquarter);
router.put('/stakeholder/manufacturerHeadquarter/:id', authRequired, updateManufacturerHeadquarter);
router.delete('/stakeholder/manufacturerHeadquarter/:id', authRequired, deleteManufacturerHeadquarter);

export default router; 