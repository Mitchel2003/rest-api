import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";

import supplierModel from "@/models/form/curriculum/stakeholder/supplier.model";
import { Supplier } from "@/types/form/curriculum/stakeholder/supplier.type";

class SupplierService extends MongoDB<Supplier> {
  private static instance: SupplierService;

  private constructor() {
    super(Repository.create(supplierModel));
  }

  public static getInstance(): SupplierService {
    if (!SupplierService.instance) SupplierService.instance = new SupplierService();
    return SupplierService.instance;
  }
}

export const supplierService = SupplierService.getInstance(); 