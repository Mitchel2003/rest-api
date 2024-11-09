import checkModel from "@/models/form/maintenance/check.model";
import { Check } from "@/types/form/maintenance/check.type";
import MongoDBService from "@/services/mongodb/mongodb.service";
import Repository from "@/repositories/mongodb.repository";

class CheckService extends MongoDBService<Check> {
  private static instance: CheckService;

  private constructor() {
    super(Repository.create(checkModel));
  }

  public static getInstance(): CheckService {
    if (!CheckService.instance) {
      CheckService.instance = new CheckService();
    }
    return CheckService.instance;
  }
}

export const checkService = CheckService.getInstance(); 