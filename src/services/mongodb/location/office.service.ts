import MongoDB, { IResourceService } from "@/services/mongodb/mongodb.service";
import { Types, PipelineStage, PopulateOptions } from "mongoose";
import { Doc, Query, Options } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import { Result } from "@/interfaces/api.interface";

import officeModel from "@/models/location/office.model";
import { Office } from "@/types/location/office.type";

class OfficeService extends MongoDB<Office> implements IResourceService<Office> {
  private static instance: OfficeService;
  private readonly defaultPopulate: PopulateOptions = {
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
      path: 'user',
      select: `
        _id uid email phone username role
        nit invima profesionalLicense permissions`,
    }]
  }

  private constructor() { super(Repository.create(officeModel)) }

  public static getInstance(): OfficeService {
    if (!OfficeService.instance) OfficeService.instance = new OfficeService()
    return OfficeService.instance;
  }
  /**
   * Verifica si un usuario tiene acceso a un consultorio basado en su rol y contexto
   * @param contextIds Representa los IDs de acceso (permissions) segun el usuario
   * @param officeId ID del recurso a verificar, representa el id del consultorio
   * @returns {Promise<Result<boolean>>} Resultado con true si tiene acceso, false en caso contrario
   */
  async isOwnership(contextIds: string[], officeId: string): Promise<Result<boolean>> {
    return super.verifyOwnership(contextIds, ownershipPipeline(new Types.ObjectId(officeId)))
  }
  /**
   * Encuentra consultorios asociados a los usuarios suministrados
   * @param options Opciones de búsqueda con array de IDs de usuarios
   * @returns {Promise<Result<Office[]>>} Resultado con los consultorios encontrados
   */
  async findByUsers(options: Options & { userIds: string[] }): Promise<Result<Office[]>> {
    return super.findByUsers({ ...options, populate: this.defaultPopulate }, byUsersPipeline)
  }
  /** Busca un consultorio por su id en la base de datos */
  async findById(id: string): Promise<Result<Office | null>> {
    return super.findById(id, this.defaultPopulate)
  }
  /** Busca consultorios por query en la base de datos */
  async find(query?: Query, populate?: PopulateOptions | (string | PopulateOptions)[]): Promise<Result<Office[]>> {
    return super.find(query, populate || this.defaultPopulate)
  }
  /** Actualiza un consultorio por su id en la base de datos */
  async update(id: string, data: Partial<Doc<Office>>): Promise<Result<Office | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
}

export const officeService = OfficeService.getInstance()
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Pipeline by users
 * Filters users by multiple users
 * @param {Types.ObjectId[]} userObjectIds - Array of user IDs
 * @param {object} query - Additional query
 * @returns {PipelineStage[]} MongoDB aggregation pipeline
 */
const byUsersPipeline = (userObjectIds: Types.ObjectId[], query: object = {}): PipelineStage[] => [
  { $match: { ...query } } as PipelineStage,
  {
    $lookup: {
      from: 'headquarters',
      localField: 'headquarter',
      foreignField: '_id',
      as: 'headquarterData'
    }
  } as PipelineStage,
  { $unwind: '$headquarterData' } as PipelineStage,
  {
    $lookup: {
      from: 'users',
      localField: 'headquarterData.user',
      foreignField: '_id',
      as: 'userData'
    }
  } as PipelineStage,
  { $unwind: '$userData' } as PipelineStage,
  { $match: { 'userData._id': { $in: userObjectIds } } } as PipelineStage,
  { $project: { _id: 1 } } as PipelineStage//Allow specify the fields to include on the result
]
/**
 * Crea un pipeline para obtener la relación entre un consultorio y su cliente/proveedor
 * @param officeId ID del consultorio a verificar
 * @returns Pipeline de agregación de MongoDB
 */
const ownershipPipeline = (officeId: Types.ObjectId): PipelineStage[] => [
  { $match: { _id: officeId } } as PipelineStage,
  {
    $lookup: {
      from: 'headquarters',
      localField: 'headquarter',
      foreignField: '_id',
      as: 'headquarterData'
    }
  } as PipelineStage,
  { $unwind: '$headquarterData' } as PipelineStage,
  {
    $lookup: {
      from: 'users',
      localField: 'headquarterData.user',
      foreignField: '_id',
      as: 'userData'
    }
  } as PipelineStage,
  { $unwind: '$userData' } as PipelineStage,
  { //like as select
    $project: { _id: 1, id: '$userData._id' }
  } as PipelineStage
]
