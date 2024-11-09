import inspectionModel from "@/models/form/curriculum/inspection/inspection.model";
import { Inspection } from "@/types/form/curriculum/inspection/inspection.type";
import MongoDBService from "@/services/mongodb/mongodb.service";
import Repository from "@/repositories/mongodb.repository";

class InspectionService extends MongoDBService<Inspection> {
  private static instance: InspectionService;

  private constructor() {
    super(Repository.create(inspectionModel));
  }

  public static getInstance(): InspectionService {
    if (!InspectionService.instance) InspectionService.instance = new InspectionService();
    return InspectionService.instance;
  }
}

export const inspectionService = InspectionService.getInstance(); 