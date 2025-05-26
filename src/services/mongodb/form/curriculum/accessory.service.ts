import { Doc, Query, Populate } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Result } from "@/interfaces/api.interface";

import accessoryModel from "@/models/form/curriculum/accessory.model";
import { Accessory } from "@/types/form/curriculum/accessory.type";

class AccessoryService extends MongoDB<Accessory> {
  private static instance: AccessoryService;
  private readonly defaultPopulate: Populate = {
    path: 'curriculum',
    select: `
    _id name brand serie service modelEquip healthRecord
    characteristics recommendationsManufacturer inventory
    datePurchase dateInstallation dateOperation acquisition warranty price
    equipClassification typeClassification useClassification biomedicalClassification riskClassification technologyPredominant powerSupply
    employmentMaintenance frequencyMaintenance typeMaintenance manualsMaintenance`,
    populate: {
      path: 'office',
      select: 'name headquarter inventory',
      populate: {
        path: 'headquarter',
        select: 'name address city client inventory',
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
          select: `
            _id uid email phone username role position
            nit invima profesionalLicense permissions
            belongsTo classification metadata inventory`,
        }]
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
  /** Busca un accesorio por su id en la base de datos */
  async findById(id: string): Promise<Result<Accessory | null>> {
    return super.findById(id, this.defaultPopulate);
  }
  /** Busca accesorios por query en la base de datos */
  async find(query?: Query, populate?: Populate): Promise<Result<Accessory[]>> {
    return super.find(query, populate || this.defaultPopulate);
  }
  /** Crea un nuevo accesorio en la base de datos */
  async create(data: Accessory): Promise<Result<Accessory>> {
    return super.create(data, this.defaultPopulate)
  }
  /** Actualiza un accesorio por su id en la base de datos */
  async update(id: string, data: Partial<Doc<Accessory>>): Promise<Result<Accessory | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
  /** Elimina un accesorio por su id en la base de datos */
  async delete(id: string): Promise<Result<Accessory | null>> {
    return super.delete(id, this.defaultPopulate)
  }
}

export const accessoryService = AccessoryService.getInstance();