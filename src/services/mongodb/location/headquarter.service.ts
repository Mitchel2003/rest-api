import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import headquarterModel from "@/models/location/headquarter.model";
import { Headquarter } from "@/types/location/headquarter.type";

class HeadquarterService extends MongoDB<Headquarter> {
  private static instance: HeadquarterService;
  private readonly defaultPopulate: Populate = [
    {
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
    },
    {
      path: 'client',
      select: 'name email'
    }
  ]

  private constructor() {
    super(Repository.create(headquarterModel))
  }

  public static getInstance(): HeadquarterService {
    if (!HeadquarterService.instance) HeadquarterService.instance = new HeadquarterService()
    return HeadquarterService.instance;
  }

  // Overwrite the methods to apply the populate that corresponds to this service "headquarter"
  async find(query?: Query, populate?: Populate): Promise<Result<Headquarter[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  async findById(id: string): Promise<Result<Headquarter | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  async update(id: string, data: Partial<Doc<Headquarter>>): Promise<Result<Headquarter | null>> {
    return super.update(id, data, this.defaultPopulate);
  }
}

export const headquarterService = HeadquarterService.getInstance();