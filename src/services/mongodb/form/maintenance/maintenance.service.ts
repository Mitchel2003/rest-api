import maintenanceModel from "@/models/form/maintenance/maintenance.model";
import { Maintenance } from "@/types/form/maintenance/maintenance.type";
import MongoDBService from "@/services/mongodb/mongodb.service";
import Repository from "@/repositories/mongodb.repository";

class MaintenanceService extends MongoDBService<Maintenance> {
  private static instance: MaintenanceService;

  private constructor() {
    super(Repository.create(maintenanceModel));
  }

  public static getInstance(): MaintenanceService {
    if (!MaintenanceService.instance) {
      MaintenanceService.instance = new MaintenanceService();
    }
    return MaintenanceService.instance;
  }
}

export const maintenanceService = MaintenanceService.getInstance(); 