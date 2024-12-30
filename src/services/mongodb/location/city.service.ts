import { Doc, Populate, Query } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import cityModel from "@/models/location/city.model";
import { City } from "@/types/location/city.type";
import { Result } from "@/interfaces/api.interface";

class CityService extends MongoDB<City> {
  private static instance: CityService;
  private readonly defaultPopulate: Populate = {
    select: 'name', //For more fields => select: 'name code currency'
    path: 'state',
  }

  private constructor() {
    super(Repository.create(cityModel))
  }

  public static getInstance(): CityService {
    if (!CityService.instance) CityService.instance = new CityService()
    return CityService.instance;
  }

  // Overwrite the methods to apply the populate that corresponds to this service "city"
  async find(query?: Query, populate?: Populate): Promise<Result<City[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  async findById(id: string): Promise<Result<City | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  async update(id: string, data: Partial<Doc<City>>): Promise<Result<City | null>> {
    return super.update(id, data, this.defaultPopulate);
  }
}

export const cityService = CityService.getInstance();