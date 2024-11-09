import presetInspectionModel from "@/models/form/curriculum/inspection/presetInspection.model";
import { PresetInspection } from "@/types/form/curriculum/inspection/presetInspection.type";
import MongoDBService from "@/services/mongodb/mongodb.service";
import Repository from "@/repositories/mongodb.repository";

class PresetInspectionService extends MongoDBService<PresetInspection> {
  private static instance: PresetInspectionService;

  private constructor() {
    super(Repository.create(presetInspectionModel));
  }

  public static getInstance(): PresetInspectionService {
    if (!PresetInspectionService.instance) PresetInspectionService.instance = new PresetInspectionService();
    return PresetInspectionService.instance;
  }
}

export const presetInspectionService = PresetInspectionService.getInstance(); 