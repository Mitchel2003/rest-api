import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import countryModel from "@/models/location/country.model";
import { Country } from "@/types/location/country.type";

class CountryService extends MongoDB<Country> {
  private static instance: CountryService;

  private constructor() {
    super(Repository.create(countryModel))
  }

  public static getInstance(): CountryService {
    if (!CountryService.instance) CountryService.instance = new CountryService()
    return CountryService.instance;
  }
}

export const countryService = CountryService.getInstance();