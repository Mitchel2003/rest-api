import MongoDB, { IResourceService } from "@/services/mongodb/mongodb.service";
import { Types, PipelineStage, PopulateOptions } from "mongoose";
import { Doc, Query, Options } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import { Result } from "@/interfaces/api.interface";

import scheduleModel from "@/models/form/schedule.model";
import { Schedule } from "form/schedule.type";

class ScheduleService extends MongoDB<Schedule> implements IResourceService<Schedule> {
  private static instance: ScheduleService;
  private readonly defaultPopulate: PopulateOptions[] = [{
    path: 'client',
    select: `
      _id uid email phone username role position
      nit invima profesionalLicense permissions
      belongsTo classification metadata inventory`,
  }, {
    path: 'createdBy',
    select: `
      _id uid email phone username role position
      nit invima profesionalLicense permissions
      belongsTo classification metadata`,
  }]

  private constructor() { super(Repository.create(scheduleModel)) }

  public static getInstance(): ScheduleService {
    if (!ScheduleService.instance) ScheduleService.instance = new ScheduleService()
    return ScheduleService.instance;
  }
  /**
   * Verifica si un usuario tiene acceso a un cronograma basado en su rol y contexto
   * @param contextIds Representa los IDs de acceso (permissions) segun el usuario
   * @param scheduleId ID del recurso a verificar, representa el id del cronograma
   * @returns {Promise<Result<boolean>>} Resultado con true si tiene acceso, false en caso contrario
   */
  async isOwnership(contextIds: string[], scheduleId: string): Promise<Result<boolean>> {
    return super.verifyOwnership(contextIds, ownershipPipeline(new Types.ObjectId(scheduleId)))
  }
  /**
   * Encuentra actividades asociadas a los usuarios suministrados
   * @param options Opciones de búsqueda con array de IDs de usuarios
   * @returns {Promise<Result<Schedule[]>>} Resultado con los cronogramas encontrados
   */
  async findByUsers(options: Options & { userIds: string[] }): Promise<Result<Schedule[]>> {
    return super.findByUsers({ ...options, populate: this.defaultPopulate }, byUsersPipeline)
  }
  /** Busca un cronograma por su id en la base de datos */
  async findById(id: string): Promise<Result<Schedule | null>> {
    return super.findById(id, this.defaultPopulate)
  }
  /** Busca cronogramas por query en la base de datos */
  async find(query?: Query, populate?: PopulateOptions | (string | PopulateOptions)[]): Promise<Result<Schedule[]>> {
    return super.find(query, populate || this.defaultPopulate)
  }
  /** Crea un nuevo cronograma en la base de datos */
  async create(data: Schedule): Promise<Result<Schedule>> {
    return super.create(data, this.defaultPopulate)
  }
  /** Actualiza un cronograma por su id en la base de datos */
  async update(id: string, data: Partial<Doc<Schedule>>): Promise<Result<Schedule | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
  /** Elimina un cronograma por su id en la base de datos */
  async delete(id: string): Promise<Result<Schedule | null>> {
    return super.delete(id, this.defaultPopulate)
  }
}

export const scheduleService = ScheduleService.getInstance()
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
 * Crea un pipeline para obtener la relación entre un cronograma y su cliente/proveedor
 * @param scheduleId ID del cronograma a verificar
 * @returns Pipeline de agregación de MongoDB
 */
const ownershipPipeline = (scheduleId: Types.ObjectId): PipelineStage[] => [
  { $match: { _id: scheduleId } } as PipelineStage,
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