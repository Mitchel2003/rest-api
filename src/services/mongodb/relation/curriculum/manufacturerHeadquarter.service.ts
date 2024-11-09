import Repository from "@/repositories/mongodb.repository";
import MongoDBService from "@/services/mongodb/mongodb.service";
import manufacturerHeadquarterModel from "@/models/relation/curriculum/manufacturerHeadquarter.model";
import { ManufacturerHeadquarter } from "@/types/relation/curriculum/manufacturerHeadquarter.type";

class ManufacturerHeadquarterService extends MongoDBService<ManufacturerHeadquarter> {
  private static instance: ManufacturerHeadquarterService;

  private constructor() {
    super(Repository.create(manufacturerHeadquarterModel));
  }

  public static getInstance(): ManufacturerHeadquarterService {
    if (!ManufacturerHeadquarterService.instance) ManufacturerHeadquarterService.instance = new ManufacturerHeadquarterService();
    return ManufacturerHeadquarterService.instance;
  }
}

export const manufacturerHeadquarterService = ManufacturerHeadquarterService.getInstance(); 