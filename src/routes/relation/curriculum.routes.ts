import { inspectionHeadquarterSchema, representativeHeadquarterSchema, supplierHeadquarterSchema, manufacturerHeadquarterSchema } from "@/schemas/relation/curriculum.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createInspectionHeadquarter, getInspectionHeadquarters, getInspectionHeadquarter, updateInspectionHeadquarter, deleteInspectionHeadquarter } from "@/controllers/relation/curriculum/inspectionHeadquarter.controller";
import { createRepresentativeHeadquarter, getRepresentativeHeadquarters, getRepresentativeHeadquarter, updateRepresentativeHeadquarter, deleteRepresentativeHeadquarter } from "@/controllers/relation/curriculum/representativeHeadquarter.controller";
import { createSupplierHeadquarter, getSupplierHeadquarters, getSupplierHeadquarter, updateSupplierHeadquarter, deleteSupplierHeadquarter } from "@/controllers/relation/curriculum/supplierHeadquarter.controller";
import { createManufacturerHeadquarter, getManufacturerHeadquarters, getManufacturerHeadquarter, updateManufacturerHeadquarter, deleteManufacturerHeadquarter } from "@/controllers/relation/curriculum/manufacturerHeadquarter.controller";

const router = Router();

//inspection headquarter routes (relation/cv/inspection-headquarter)
router.post('/inspection-headquarter', authRequired, validateSchema(inspectionHeadquarterSchema), createInspectionHeadquarter);
router.get('/inspection-headquarters', authRequired, getInspectionHeadquarters);
router.get('/inspection-headquarter/:id', authRequired, getInspectionHeadquarter);
router.put('/inspection-headquarter/:id', authRequired, updateInspectionHeadquarter);
router.delete('/inspection-headquarter/:id', authRequired, deleteInspectionHeadquarter);

//representative headquarter routes (relation/cv/representative-headquarter)
router.post('/representative-headquarter', authRequired, validateSchema(representativeHeadquarterSchema), createRepresentativeHeadquarter);
router.get('/representative-headquarters', authRequired, getRepresentativeHeadquarters);
router.get('/representative-headquarter/:id', authRequired, getRepresentativeHeadquarter);
router.put('/representative-headquarter/:id', authRequired, updateRepresentativeHeadquarter);
router.delete('/representative-headquarter/:id', authRequired, deleteRepresentativeHeadquarter);

//supplier headquarter routes (relation/cv/supplier-headquarter)
router.post('/supplier-headquarter', authRequired, validateSchema(supplierHeadquarterSchema), createSupplierHeadquarter);
router.get('/supplier-headquarters', authRequired, getSupplierHeadquarters);
router.get('/supplier-headquarter/:id', authRequired, getSupplierHeadquarter);
router.put('/supplier-headquarter/:id', authRequired, updateSupplierHeadquarter);
router.delete('/supplier-headquarter/:id', authRequired, deleteSupplierHeadquarter);

//manufacturer headquarter routes (relation/cv/manufacturer-headquarter)
router.post('/manufacturer-headquarter', authRequired, validateSchema(manufacturerHeadquarterSchema), createManufacturerHeadquarter);
router.get('/manufacturer-headquarters', authRequired, getManufacturerHeadquarters);
router.get('/manufacturer-headquarter/:id', authRequired, getManufacturerHeadquarter);
router.put('/manufacturer-headquarter/:id', authRequired, updateManufacturerHeadquarter);
router.delete('/manufacturer-headquarter/:id', authRequired, deleteManufacturerHeadquarter);

export default router; 