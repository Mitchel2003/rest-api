import calibrationModel from "@/models/form/equipment/calibration.model";
import { Calibration } from "@/types/form/equipment/calibration.type";
import MongoDBService from "@/services/mongodb/mongodb.service";
import Repository from "@/repositories/mongodb.repository";

class CalibrationService extends MongoDBService<Calibration> {
  private static instance: CalibrationService;

  private constructor() {
    super(Repository.create(calibrationModel));
  }

  public static getInstance(): CalibrationService {
    if (!CalibrationService.instance) {
      CalibrationService.instance = new CalibrationService();
    }
    return CalibrationService.instance;
  }
}

export const calibrationService = CalibrationService.getInstance(); 