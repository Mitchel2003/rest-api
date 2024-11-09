import Repository from "@/repositories/mongodb.repository";
import MongoDBService from "@/services/mongodb/mongodb.service";
import accessoryModel from "@/models/form/curriculum/accessory.model";
import { Accessory } from "@/types/form/curriculum/accessory.type";

class AccessoryService extends MongoDBService<Accessory> {
  private static instance: AccessoryService;

  private constructor() {
    super(Repository.create(accessoryModel));
  }

  public static getInstance(): AccessoryService {
    if (!AccessoryService.instance) AccessoryService.instance = new AccessoryService();
    return AccessoryService.instance;
  }
}

export const accessoryService = AccessoryService.getInstance(); 