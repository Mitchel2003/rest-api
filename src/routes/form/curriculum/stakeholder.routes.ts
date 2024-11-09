import { representativeSchema, manufacturerSchema, supplierSchema } from "@/schemas/form/curriculum/stakeholder.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createRepresentative, getRepresentatives, getRepresentative, updateRepresentative, deleteRepresentative } from "@/controllers/form/curriculum/stakeholder/representative.controller";
import { createManufacturer, getManufacturers, getManufacturer, updateManufacturer, deleteManufacturer } from "@/controllers/form/curriculum/stakeholder/manufacturer.controller";
import { createSupplier, getSuppliers, getSupplier, updateSupplier, deleteSupplier } from "@/controllers/form/curriculum/stakeholder/supplier.controller";

const router = Router();

//representative routes
router.post('/representative', authRequired, validateSchema(representativeSchema), createRepresentative);
router.get('/representatives', authRequired, getRepresentatives);
router.get('/representative/:id', authRequired, getRepresentative);
router.put('/representative/:id', authRequired, updateRepresentative);
router.delete('/representative/:id', authRequired, deleteRepresentative);

//supplier routes
router.post('/supplier', authRequired, validateSchema(supplierSchema), createSupplier);
router.get('/suppliers', authRequired, getSuppliers);
router.get('/supplier/:id', authRequired, getSupplier);
router.put('/supplier/:id', authRequired, updateSupplier);
router.delete('/supplier/:id', authRequired, deleteSupplier);

//manufacturer routes
router.post('/manufacturer', authRequired, validateSchema(manufacturerSchema), createManufacturer);
router.get('/manufacturers', authRequired, getManufacturers);
router.get('/manufacturer/:id', authRequired, getManufacturer);
router.put('/manufacturer/:id', authRequired, updateManufacturer);
router.delete('/manufacturer/:id', authRequired, deleteManufacturer);

export default router; 