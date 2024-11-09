import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import serviceModel from "@/models/location/service.model";
import { Service } from "@/types/location/service.type";

class ServService extends MongoDB<Service> {
  private static instance: ServService;

  private constructor() {
    super(Repository.create(serviceModel))
  }

  public static getInstance(): ServService {
    if (!ServService.instance) ServService.instance = new ServService()
    return ServService.instance;
  }
}

export const servService = ServService.getInstance();