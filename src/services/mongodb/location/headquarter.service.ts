import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import headquarterModel from "@/models/location/headquarter.model";
import { Headquarter } from "@/types/location/headquarter.type";

class HeadquarterService extends MongoDB<Headquarter> {
  private static instance: HeadquarterService;

  private constructor() {
    super(Repository.create(headquarterModel))
  }

  public static getInstance(): HeadquarterService {
    if (!HeadquarterService.instance) HeadquarterService.instance = new HeadquarterService()
    return HeadquarterService.instance;
  }
}

export const headquarterService = HeadquarterService.getInstance();