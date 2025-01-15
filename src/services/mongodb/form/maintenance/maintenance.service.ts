import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import maintenanceModel from "@/models/form/maintenance/maintenance.model";
import { Maintenance } from "@/types/form/maintenance/maintenance.type";

class MaintenanceService extends MongoDB<Maintenance> {
  private static instance: MaintenanceService;
  private readonly defaultPopulate: Populate = [{
    path: 'curriculum',
    select: 'name brand serie service modelEquip healthRecord',
    populate: {
      path: 'office',
      select: 'name area',
      populate: {
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
    }
  }]

  private constructor() {
    super(Repository.create(maintenanceModel));
  }

  public static getInstance(): MaintenanceService {
    if (!MaintenanceService.instance) {
      MaintenanceService.instance = new MaintenanceService();
    }
    return MaintenanceService.instance;
  }

  // Overwrite the methods to apply the populate that corresponds to this service "maintenance"
  async find(query?: Query, populate?: Populate): Promise<Result<Maintenance[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  async findById(id: string): Promise<Result<Maintenance | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  async update(id: string, data: Partial<Doc<Maintenance>>): Promise<Result<Maintenance | null>> {
    return super.update(id, data, this.defaultPopulate);
  }
}

export const maintenanceService = MaintenanceService.getInstance(); 