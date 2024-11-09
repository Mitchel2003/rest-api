import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import cityModel from "@/models/location/city.model";
import { City } from "@/types/location/city.type";

class CityService extends MongoDB<City> {
  private static instance: CityService;

  private constructor() {
    super(Repository.create(cityModel))
  }

  public static getInstance(): CityService {
    if (!CityService.instance) CityService.instance = new CityService()
    return CityService.instance;
  }
}

export const cityService = CityService.getInstance();