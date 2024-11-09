import inspectionHeadquarterModel from "@/models/relation/curriculum/inspectionHeadquarter.model";
import { InspectionHeadquarter } from "@/types/relation/curriculum/inspectionHeadquarter.type";
import MongoDBService from "@/services/mongodb/mongodb.service";
import Repository from "@/repositories/mongodb.repository";

class InspectionHeadquarterService extends MongoDBService<InspectionHeadquarter> {
  private static instance: InspectionHeadquarterService;

  private constructor() {
    super(Repository.create(inspectionHeadquarterModel));
  }

  public static getInstance(): InspectionHeadquarterService {
    if (!InspectionHeadquarterService.instance) InspectionHeadquarterService.instance = new InspectionHeadquarterService();
    return InspectionHeadquarterService.instance;
  }
}

export const inspectionHeadquarterService = InspectionHeadquarterService.getInstance(); 