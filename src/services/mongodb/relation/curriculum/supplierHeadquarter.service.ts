import Repository from "@/repositories/mongodb.repository";
import MongoDBService from "@/services/mongodb/mongodb.service";
import supplierHeadquarterModel from "@/models/relation/curriculum/supplierHeadquarter.model";
import { SupplierHeadquarter } from "@/types/relation/curriculum/supplierHeadquarter.type";

class SupplierHeadquarterService extends MongoDBService<SupplierHeadquarter> {
  private static instance: SupplierHeadquarterService;

  private constructor() {
    super(Repository.create(supplierHeadquarterModel));
  }

  public static getInstance(): SupplierHeadquarterService {
    if (!SupplierHeadquarterService.instance) SupplierHeadquarterService.instance = new SupplierHeadquarterService();
    return SupplierHeadquarterService.instance;
  }
}

export const supplierHeadquarterService = SupplierHeadquarterService.getInstance(); 