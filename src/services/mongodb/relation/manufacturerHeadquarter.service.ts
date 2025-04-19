import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import manufacturerHeadquarterModel from "@/models/relation/manufacturerHeadquarter.model";
import { ManufacturerHeadquarter } from "relation/manufacturerHeadquarter.type";

class ManufacturerHeadquarterService extends MongoDB<ManufacturerHeadquarter> {
  private static instance: ManufacturerHeadquarterService;
  private readonly defaultPopulate: Populate = {
    path: 'manufacturer',
    select: 'name phone country'
  }

  private constructor() {
    super(Repository.create(manufacturerHeadquarterModel));
  }

  public static getInstance(): ManufacturerHeadquarterService {
    if (!ManufacturerHeadquarterService.instance) ManufacturerHeadquarterService.instance = new ManufacturerHeadquarterService();
    return ManufacturerHeadquarterService.instance;
  }

  // Overwrite the methods to apply the populate that corresponds to this service "manufacturerHeadquarter"
  async find(query?: Query, populate?: Populate): Promise<Result<ManufacturerHeadquarter[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  async findById(id: string): Promise<Result<ManufacturerHeadquarter | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  async update(id: string, data: Partial<Doc<ManufacturerHeadquarter>>): Promise<Result<ManufacturerHeadquarter | null>> {
    return super.update(id, data, this.defaultPopulate);
  }
}

export const manufacturerHeadquarterService = ManufacturerHeadquarterService.getInstance(); 