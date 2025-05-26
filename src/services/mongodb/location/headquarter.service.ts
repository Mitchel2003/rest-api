import MongoDB, { IResourceService } from "@/services/mongodb/mongodb.service";
import { Types, PipelineStage, PopulateOptions } from "mongoose";
import { Doc, Query, Options } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import { Result } from "@/interfaces/api.interface";

import headquarterModel from "@/models/location/headquarter.model";
import { Headquarter } from "@/types/location/headquarter.type";

class HeadquarterService extends MongoDB<Headquarter> implements IResourceService<Headquarter> {
  private static instance: HeadquarterService;
  private readonly defaultPopulate: PopulateOptions[] = [{
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

  private constructor() { super(Repository.create(headquarterModel)) }

  public static getInstance(): HeadquarterService {
    if (!HeadquarterService.instance) HeadquarterService.instance = new HeadquarterService()
    return HeadquarterService.instance;
  }
  /**
   * Verifica si un usuario tiene acceso a una sede basado en su rol y contexto
   * @param contextIds Representa los IDs de acceso (permissions) segun el usuario
   * @param headquarterId ID del recurso a verificar, representa el id de la sede
   * @returns {Promise<Result<boolean>>} Resultado con true si tiene acceso, false en caso contrario
   */
  async isOwnership(contextIds: string[], headquarterId: string): Promise<Result<boolean>> {
    return super.verifyOwnership(contextIds, ownershipPipeline(new Types.ObjectId(headquarterId)))
  }
  /**
   * Encuentra sedes asociadas a los usuarios suministrados
   * @param options Opciones de búsqueda con array de IDs de usuarios
   * @returns {Promise<Result<Headquarter[]>>} Resultado con las sedes encontradas
   */
  async findByUsers(options: Options & { userIds: string[] }): Promise<Result<Headquarter[]>> {
    return super.findByUsers({ ...options, populate: this.defaultPopulate }, byUsersPipeline)
  }
  /** Busca una sede por su id en la base de datos */
  async findById(id: string): Promise<Result<Headquarter | null>> {
    return super.findById(id, this.defaultPopulate)
  }
  /** Busca sedes por query en la base de datos */
  async find(query?: Query, populate?: PopulateOptions | (string | PopulateOptions)[]): Promise<Result<Headquarter[]>> {
    return super.find(query, populate || this.defaultPopulate)
  }
  /** Crea una nueva sede en la base de datos */
  async create(data: Headquarter): Promise<Result<Headquarter>> {
    return super.create(data, this.defaultPopulate)
  }
  /** Actualiza una sede por su id en la base de datos */
  async update(id: string, data: Partial<Doc<Headquarter>>): Promise<Result<Headquarter | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
  /** Elimina una sede por su id en la base de datos */
  async delete(id: string): Promise<Result<Headquarter | null>> {
    return super.delete(id, this.defaultPopulate)
  }
}

export const headquarterService = HeadquarterService.getInstance()
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
      from: 'users',
      localField: 'client',
      foreignField: '_id',
      as: 'clientData'
    }
  } as PipelineStage,
  { $unwind: '$clientData' } as PipelineStage,
  { $match: { 'clientData._id': { $in: userObjectIds } } } as PipelineStage,
  { $project: { _id: 1 } } as PipelineStage//Allow specify the fields to include on the result
]
/**
 * Crea un pipeline para obtener la relación entre una sede y su cliente/proveedor
 * @param headquarterId ID de la sede a verificar
 * @returns Pipeline de agregación de MongoDB
 */
const ownershipPipeline = (headquarterId: Types.ObjectId): PipelineStage[] => [
  { $match: { _id: headquarterId } } as PipelineStage,
  {
    $lookup: {
      from: 'users',
      localField: 'client',
      foreignField: '_id',
      as: 'clientData'
    }
  } as PipelineStage,
  { $unwind: '$clientData' } as PipelineStage,
  { //like as select
    $project: { _id: 1, id: '$clientData._id' }
  } as PipelineStage
]