import checkMaintenanceModel from "@/models/relation/maintenance/checkMaintenance.model";
import { CheckMaintenance } from "@/types/relation/maintenance/checkMaintenance.type";
import MongoDBService from "@/services/mongodb/mongodb.service";
import Repository from "@/repositories/mongodb.repository";

class CheckMaintenanceService extends MongoDBService<CheckMaintenance> {
    private static instance: CheckMaintenanceService;

    private constructor() {
        super(Repository.create(checkMaintenanceModel));
    }

    public static getInstance(): CheckMaintenanceService {
        if (!CheckMaintenanceService.instance) {
            CheckMaintenanceService.instance = new CheckMaintenanceService();
        }
        return CheckMaintenanceService.instance;
    }
}

export const checkMaintenanceService = CheckMaintenanceService.getInstance(); 