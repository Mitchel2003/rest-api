import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";
import debug from 'debug';

import accessoryModel from "@/models/form/curriculum/accessory.model";
import { Accessory } from "@/types/form/curriculum/accessory.type";

// Configurar el logger
const log = debug('app:accessory');

class AccessoryService extends MongoDB<Accessory> {
  private static instance: AccessoryService;
  private readonly defaultPopulate: Populate = {
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
  }

  private constructor() {
    super(Repository.create(accessoryModel));
  }

  public static getInstance(): AccessoryService {
    if (!AccessoryService.instance) AccessoryService.instance = new AccessoryService();
    return AccessoryService.instance;
  }

  // Overwrite the methods to apply the populate that corresponds to this service "accessory"
  async find(query?: Query, populate?: Populate): Promise<Result<Accessory[]>> {
    log('AccessoryService.find called with:', { query, populate });
    const result = await super.find(query, populate || this.defaultPopulate);
    log('AccessoryService.find result:', result);
    return result;
  }
  async findById(id: string): Promise<Result<Accessory | null>> {
    log('AccessoryService.findById called with:', { id });
    const result = await super.findById(id, this.defaultPopulate);
    log('AccessoryService.findById result:', result);
    return result;
  }
  async update(id: string, data: Partial<Doc<Accessory>>): Promise<Result<Accessory | null>> {
    log('AccessoryService.update called with:', { id, data });
    const result = await super.update(id, data, this.defaultPopulate);
    log('AccessoryService.update result:', result);
    return result;
  }
}

export const accessoryService = AccessoryService.getInstance();