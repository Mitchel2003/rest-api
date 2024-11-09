import calibrationEquipmentModel from "@/models/relation/equipment/calibrationEquipment.model";
import { CalibrationEquipment } from "@/types/relation/equipment/calibrationEquipment.type";
import MongoDBService from "@/services/mongodb/mongodb.service";
import Repository from "@/repositories/mongodb.repository";

class CalibrationEquipmentService extends MongoDBService<CalibrationEquipment> {
  private static instance: CalibrationEquipmentService;

  private constructor() {
    super(Repository.create(calibrationEquipmentModel));
  }

  public static getInstance(): CalibrationEquipmentService {
    if (!CalibrationEquipmentService.instance) {
      CalibrationEquipmentService.instance = new CalibrationEquipmentService();
    }
    return CalibrationEquipmentService.instance;
  }
}

export const calibrationEquipmentService = CalibrationEquipmentService.getInstance(); 