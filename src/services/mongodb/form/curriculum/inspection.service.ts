import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";

import inspectionModel from "@/models/form/curriculum/inspection.model";
import { Inspection } from "@/types/form/curriculum/inspection.type";

class InspectionService extends MongoDB<Inspection> {
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