import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import officeModel from "@/models/location/office.model";
import { Office } from "@/types/location/office.type";

class OfficeService extends MongoDB<Office> {
  private static instance: OfficeService;
  private readonly defaultPopulate: Populate = {
    path: 'area',
    select: 'name headquarter',
    populate: {
      path: 'headquarter',
      select: 'name address city client',
      populate: [{
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
      }, {
        path: 'client',
        select: 'name email phone nit'
      }]
    }
  }

  private constructor() {
    super(Repository.create(officeModel))
  }

  public static getInstance(): OfficeService {
    if (!OfficeService.instance) OfficeService.instance = new OfficeService()
    return OfficeService.instance;
  }

  // Overwrite the methods to apply the populate that corresponds to this service "office"
  async find(query?: Query, populate?: Populate): Promise<Result<Office[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  async findById(id: string): Promise<Result<Office | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  async update(id: string, data: Partial<Doc<Office>>): Promise<Result<Office | null>> {
    return super.update(id, data, this.defaultPopulate);
  }
}

export const officeService = OfficeService.getInstance();