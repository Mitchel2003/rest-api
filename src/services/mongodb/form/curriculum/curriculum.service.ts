import MongoDB, { IResourceService } from "@/services/mongodb/mongodb.service";
import { Types, PipelineStage, PopulateOptions } from "mongoose";
import { Doc, Query, Options } from "@/types/repository.type";
import { handlerService as handler } from "@/errors/handler";
import Repository from "@/repositories/mongodb.repository";
import { Result } from "@/interfaces/api.interface";

import curriculumModel from "@/models/form/curriculum/curriculum.model";
import { Curriculum } from "@/types/form/curriculum/curriculum.type";

class CurriculumService extends MongoDB<Curriculum> implements IResourceService<Curriculum> {
  private static instance: CurriculumService;
  private readonly defaultPopulate: PopulateOptions[] = [{// Populate with all the details
    path: 'office',
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
        path: 'user',
        select: `
          _id uid email phone username role
          nit invima profesionalLicense permissions`,
      }]
    }
  }, {
    path: 'inspection',
    select: 'name typeInspection inactive',
  }, {
    path: 'representative',
    select: 'name phone city',
  }, {
    path: 'supplier',
    select: 'name phone city',
  }, {
    path: 'manufacturer',
    select: 'name phone country',
  }]

  private constructor() { super(Repository.create(curriculumModel)) }

  public static getInstance(): CurriculumService {
    if (!CurriculumService.instance) CurriculumService.instance = new CurriculumService()
    return CurriculumService.instance;
  }
  /**
   * Verifica si un usuario tiene acceso a un currículum basado en su rol y contexto
   * @param role Rol del usuario ('admin', 'engineer', 'client')
   * @param curriculumId ID del currículum a verificar
   * @param contextIds IDs relevantes según el rol (clientIds para admin, companyIds para engineer, clientId para client)
   * @returns Resultado con true si tiene acceso, false en caso contrario
   */
  async verifyOwnership(role: string, curriculumId: string, contextIds: string[]): Promise<Result<boolean>> {
    return handler(async () => {
      if (!contextIds.length) { return role === 'admin' }//admin without clients
      const pipeline = ownershipPipeline(curriculumId)
      const result = await curriculumModel.aggregate(pipeline)
      if (!result.length) return false
      const data = result[0]
      switch (role) {
        case 'engineer':
          return contextIds.some(id => data.userId && data.userId.equals(new Types.ObjectId(id)))
        case 'company':
          return contextIds.some(id => data.userId && data.userId.equals(new Types.ObjectId(id)))
        case 'client': //verify if the curriculum belongs to the client
          return data.userId && data.userId.equals(new Types.ObjectId(contextIds[0]))
        default: return false
      }
    }, "verificar propiedad del currículum")
  }
  /**
   * Encuentra currículums asociados a los usuarios suministrados
   * @param options Opciones de búsqueda con array de IDs de usuarios
   * @returns {Promise<Result<Curriculum[]>>} Resultado con los currículums encontrados
   */
  async findByUsers(options: Options & { userIds: string[] }): Promise<Result<Curriculum[]>> {
    return super.findByUsers(options, byUsersPipeline)
  }
  /** Busca un currículum por su id en la base de datos */
  async findById(id: string): Promise<Result<Curriculum | null>> {
    return super.findById(id, this.defaultPopulate)
  }
  /** Busca currículums por query en la base de datos */
  async find(query?: Query, populate?: PopulateOptions | (string | PopulateOptions)[]): Promise<Result<Curriculum[]>> {
    return super.find(query, populate || this.defaultPopulate)
  }
  /** Actualiza un currículum por su id en la base de datos */
  async update(id: string, data: Partial<Doc<Curriculum>>): Promise<Result<Curriculum | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
}

export const curriculumService = CurriculumService.getInstance()
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
  {
    $match: { 'userData._id': { $in: userObjectIds }, ...query }
  } as PipelineStage,
  {
    $lookup: {
      from: 'offices',
      localField: 'office',
      foreignField: '_id',
      as: 'officeData'
    }
  } as PipelineStage,
  { $unwind: '$officeData' } as PipelineStage,
  {
    $lookup: {
      from: 'headquarters',
      localField: 'officeData.headquarter',
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
  { $unwind: '$userData' } as PipelineStage
]
/**
 * Crea un pipeline para obtener la relación entre un currículum y su cliente/proveedor
 * @param curriculumId ID del currículum a verificar
 * @returns Pipeline de agregación de MongoDB
 */
const ownershipPipeline = (curriculumId: string): PipelineStage[] => [
  { $match: { _id: new Types.ObjectId(curriculumId) } } as PipelineStage,
  {
    $lookup: {
      from: 'offices',
      localField: 'office',
      foreignField: '_id',
      as: 'officeData'
    }
  } as PipelineStage,
  { $unwind: '$officeData' } as PipelineStage,
  {
    $lookup: {
      from: 'headquarters',
      localField: 'officeData.headquarter',
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
    $project: {
      _id: 1,
      userId: '$userData._id',
    }
  } as PipelineStage
]