import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import cityModel from "@/models/location/city.model";
import { City } from "@/types/location/city.type";

class CityService extends MongoDB<City> {
  private static instance: CityService;
  private readonly defaultPopulate: Populate = {
    path: 'state',
    select: 'name country',
    populate: {
      path: 'country',
      select: 'name'
    }
  }

  private constructor() {
    super(Repository.create(cityModel))
  }

  public static getInstance(): CityService {
    if (!CityService.instance) CityService.instance = new CityService()
    return CityService.instance;
  }
  /** Busca una ciudad por su id en la base de datos */
  async findById(id: string): Promise<Result<City | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  /** Busca ciudades por query en la base de datos */
  async find(query?: Query, populate?: Populate): Promise<Result<City[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  /** Crea una nueva ciudad en la base de datos */
  async create(data: City): Promise<Result<City>> {
    return super.create(data, this.defaultPopulate)
  }
  /** Actualiza una ciudad por su id en la base de datos */
  async update(id: string, data: Partial<Doc<City>>): Promise<Result<City | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
  /** Elimina una ciudad por su id en la base de datos */
  async delete(id: string): Promise<Result<City | null>> {
    return super.delete(id, this.defaultPopulate)
  }
}

export const cityService = CityService.getInstance();