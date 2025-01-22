import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";

import manufacturerModel from "@/models/form/curriculum/stakeholder/manufacturer.model";
import { Manufacturer } from "@/types/form/curriculum/stakeholder/manufacturer.type";

class ManufacturerService extends MongoDB<Manufacturer> {
  private static instance: ManufacturerService;

  private constructor() {
    super(Repository.create(manufacturerModel));
  }

  public static getInstance(): ManufacturerService {
    if (!ManufacturerService.instance) ManufacturerService.instance = new ManufacturerService();
    return ManufacturerService.instance;
  }
}

export const manufacturerService = ManufacturerService.getInstance(); 