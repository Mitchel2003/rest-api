import equipmentModel from "@/models/form/equipment/equipment.model";
import { Equipment } from "@/types/form/equipment/equipment.type";
import MongoDBService from "@/services/mongodb/mongodb.service";
import Repository from "@/repositories/mongodb.repository";

class EquipmentService extends MongoDBService<Equipment> {
  private static instance: EquipmentService;

  private constructor() {
    super(Repository.create(equipmentModel));
  }

  public static getInstance(): EquipmentService {
    if (!EquipmentService.instance) {
      EquipmentService.instance = new EquipmentService();
    }
    return EquipmentService.instance;
  }
}

export const equipmentService = EquipmentService.getInstance(); 