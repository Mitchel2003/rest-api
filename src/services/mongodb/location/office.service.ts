import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import officeModel from "@/models/location/office.model";
import { Office } from "@/types/location/office.type";

class OfficeService extends MongoDB<Office> {
  private static instance: OfficeService;

  private constructor() {
    super(Repository.create(officeModel))
  }

  public static getInstance(): OfficeService {
    if (!OfficeService.instance) OfficeService.instance = new OfficeService()
    return OfficeService.instance;
  }
}

export const officeService = OfficeService.getInstance();