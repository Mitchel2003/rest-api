import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import areaModel from "@/models/location/area.model";
import { Area } from "@/types/location/area.type";

class AreaService extends MongoDB<Area> {
  private static instance: AreaService;
  private readonly defaultPopulate: Populate = {
    path: 'headquarter',
    select: 'name city client',
    populate: {
      path: 'city',
      select: 'name state',
      populate: {
        path: 'state',
        select: 'name country',
        populate: {
          path: 'country',
          select: 'name'
        }
      }
    }
  }

  private constructor() {
    super(Repository.create(areaModel))
  }

  public static getInstance(): AreaService {
    if (!AreaService.instance) AreaService.instance = new AreaService()
    return AreaService.instance;
  }

  // Overwrite the methods to apply the populate that corresponds to this service "area"
  async find(query?: Query, populate?: Populate): Promise<Result<Area[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  async findById(id: string): Promise<Result<Area | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  async update(id: string, data: Partial<Doc<Area>>): Promise<Result<Area | null>> {
    return super.update(id, data, this.defaultPopulate);
  }
}

export const areaService = AreaService.getInstance();