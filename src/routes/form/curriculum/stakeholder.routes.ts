import { representativeSchema, manufacturerSchema, supplierSchema } from "@/schemas/form/curriculum/stakeholder.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createRepresentative, getRepresentatives, getRepresentative, updateRepresentative, deleteRepresentative } from "@/controllers/form/curriculum/stakeholder/representative.controller";
import { createManufacturer, getManufacturers, getManufacturer, updateManufacturer, deleteManufacturer } from "@/controllers/form/curriculum/stakeholder/manufacturer.controller";
import { createSupplier, getSuppliers, getSupplier, updateSupplier, deleteSupplier } from "@/controllers/form/curriculum/stakeholder/supplier.controller";

const router = Router();

//representative routes (form/cv/stakeholder/representative)
router.post('/stakeholder/representative', authRequired, validateSchema(representativeSchema), createRepresentative);
router.get('/stakeholder/representatives', authRequired, getRepresentatives);
router.get('/stakeholder/representative/:id', authRequired, getRepresentative);
router.put('/stakeholder/representative/:id', authRequired, updateRepresentative);
router.delete('/stakeholder/representative/:id', authRequired, deleteRepresentative);

//supplier routes (form/cv/stakeholder/supplier)
router.post('/stakeholder/supplier', authRequired, validateSchema(supplierSchema), createSupplier);
router.get('/stakeholder/suppliers', authRequired, getSuppliers);
router.get('/stakeholder/supplier/:id', authRequired, getSupplier);
router.put('/stakeholder/supplier/:id', authRequired, updateSupplier);
router.delete('/stakeholder/supplier/:id', authRequired, deleteSupplier);

//manufacturer routes (form/cv/stakeholder/manufacturer)
router.post('/stakeholder/manufacturer', authRequired, validateSchema(manufacturerSchema), createManufacturer);
router.get('/stakeholder/manufacturers', authRequired, getManufacturers);
router.get('/stakeholder/manufacturer/:id', authRequired, getManufacturer);
router.put('/stakeholder/manufacturer/:id', authRequired, updateManufacturer);
router.delete('/stakeholder/manufacturer/:id', authRequired, deleteManufacturer);

export default router; 