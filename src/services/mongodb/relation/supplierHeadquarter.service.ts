import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import supplierHeadquarterModel from "@/models/relation/supplierHeadquarter.model";
import { SupplierHeadquarter } from "relation/supplierHeadquarter.type";

class SupplierHeadquarterService extends MongoDB<SupplierHeadquarter> {
  private static instance: SupplierHeadquarterService;
  private readonly defaultPopulate: Populate = {
    path: 'supplier',
    select: 'name phone city'
  }

  private constructor() {
    super(Repository.create(supplierHeadquarterModel));
  }

  public static getInstance(): SupplierHeadquarterService {
    if (!SupplierHeadquarterService.instance) SupplierHeadquarterService.instance = new SupplierHeadquarterService();
    return SupplierHeadquarterService.instance;
  }

  // Overwrite the methods to apply the populate that corresponds to this service "supplierHeadquarter"
  async find(query?: Query, populate?: Populate): Promise<Result<SupplierHeadquarter[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  async findById(id: string): Promise<Result<SupplierHeadquarter | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  async update(id: string, data: Partial<Doc<SupplierHeadquarter>>): Promise<Result<SupplierHeadquarter | null>> {
    return super.update(id, data, this.defaultPopulate);
  }
}

export const supplierHeadquarterService = SupplierHeadquarterService.getInstance(); 