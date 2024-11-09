import Repository from "@/repositories/mongodb.repository";
import MongoDBService from "@/services/mongodb/mongodb.service";
import technicalCharacteristicModel from "@/models/form/curriculum/technicalCharacteristic.model";
import { TechnicalCharacteristic } from "@/types/form/curriculum/technicalCharacteristic.type";

class TechnicalCharacteristicService extends MongoDBService<TechnicalCharacteristic> {
  private static instance: TechnicalCharacteristicService;

  private constructor() {
    super(Repository.create(technicalCharacteristicModel));
  }

  public static getInstance(): TechnicalCharacteristicService {
    if (!TechnicalCharacteristicService.instance) TechnicalCharacteristicService.instance = new TechnicalCharacteristicService();
    return TechnicalCharacteristicService.instance;
  }
}

export const technicalCharacteristicService = TechnicalCharacteristicService.getInstance(); 