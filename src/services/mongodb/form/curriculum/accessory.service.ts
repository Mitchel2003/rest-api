import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";
import { Types } from "mongoose";

import accessoryModel from "@/models/form/curriculum/accessory.model";
import { Accessory } from "@/types/form/curriculum/accessory.type";

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
    if (query?.curriculum && typeof query.curriculum === 'string') query.curriculum = new Types.ObjectId(query.curriculum)
    return super.find(query, populate || this.defaultPopulate);
  }
  async findById(id: string): Promise<Result<Accessory | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  async update(id: string, data: Partial<Doc<Accessory>>): Promise<Result<Accessory | null>> {
    return super.update(id, data, this.defaultPopulate);
  }
}

export const accessoryService = AccessoryService.getInstance();