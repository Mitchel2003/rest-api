import serviceOfficeModel from "@/models/relation/curriculum/serviceOffice.model";
import { ServiceOffice } from "@/types/relation/curriculum/serviceOffice.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";

class ServiceOfficeService extends MongoDB<ServiceOffice> {
  private static instance: ServiceOfficeService;

  private constructor() {
    super(Repository.create(serviceOfficeModel))
  }

  public static getInstance(): ServiceOfficeService {
    if (!ServiceOfficeService.instance) ServiceOfficeService.instance = new ServiceOfficeService()
    return ServiceOfficeService.instance;
  }
}

export const serviceOfficeService = ServiceOfficeService.getInstance();