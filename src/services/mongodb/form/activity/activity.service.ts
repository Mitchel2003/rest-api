import MongoDB, { IResourceService } from "@/services/mongodb/mongodb.service";
import { Types, PipelineStage, PopulateOptions } from "mongoose";
import { Doc, Query, Options } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import { Result } from "@/interfaces/api.interface";

import activityModel from "@/models/form/activity/activity.model";
import { Activity } from "@/types/form/activity/activity.type";

class ActivityService extends MongoDB<Activity> implements IResourceService<Activity> {
  private static instance: ActivityService;
  private readonly defaultPopulate: PopulateOptions[] = [{
    path: 'solicit',
    select: 'message status priority photoUrl',
    populate: [{
      path: 'curriculum',
      select: `
      name brand serie service modelEquip healthRecord
      characteristics recommendationsManufacturer
      datePurchase dateInstallation dateOperation acquisition warranty price
      equipClassification typeClassification useClassification biomedicalClassification riskClassification technologyPredominant powerSupply
      employmentMaintenance frequencyMaintenance typeMaintenance manualsMaintenance`,
      populate: [{
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
      }, {
        path: 'technicalCharacteristics',
        select: 'voltage amperage power frequency capacity pressure speed humidity temperature weight'
      }]
    }]
  }, {
    path: 'engineer',
    select: 'username phone'
  }]

  private constructor() { super(Repository.create(activityModel)) }

  public static getInstance(): ActivityService {
    if (!ActivityService.instance) ActivityService.instance = new ActivityService()
    return ActivityService.instance;
  }
  /**
   * Verifica si un usuario tiene acceso a una actividad basado en su rol y contexto
   * @param contextIds Representa los IDs de acceso (permissions) segun el usuario
   * @param activityId ID del recurso a verificar, representa el id de la actividad
   * @returns {Promise<Result<boolean>>} Resultado con true si tiene acceso, false en caso contrario
   */
  async isOwnership(contextIds: string[], activityId: string): Promise<Result<boolean>> {
    return super.verifyOwnership(contextIds, ownershipPipeline(new Types.ObjectId(activityId)))
  }
  /**
   * Encuentra actividades asociadas a los usuarios suministrados
   * @param options Opciones de búsqueda con array de IDs de usuarios
   * @returns {Promise<Result<Activity[]>>} Resultado con las actividades encontradas
   */
  async findByUsers(options: Options & { userIds: string[] }): Promise<Result<Activity[]>> {
    return super.findByUsers({ ...options, populate: this.defaultPopulate }, byUsersPipeline)
  }
  /** Busca una actividad por su id en la base de datos */
  async findById(id: string): Promise<Result<Activity | null>> {
    return super.findById(id, this.defaultPopulate)
  }
  /** Busca actividades por query en la base de datos */
  async find(query?: Query, populate?: PopulateOptions | (string | PopulateOptions)[]): Promise<Result<Activity[]>> {
    return super.find(query, populate || this.defaultPopulate)
  }
  /** Actualiza una actividad por su id en la base de datos */
  async update(id: string, data: Partial<Doc<Activity>>): Promise<Result<Activity | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
}

export const activityService = ActivityService.getInstance()
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
      from: 'solicits',
      localField: 'solicit',
      foreignField: '_id',
      as: 'solicitData'
    }
  } as PipelineStage,
  { $unwind: '$solicitData' } as PipelineStage,
  {
    $lookup: {
      from: 'curriculums',
      localField: 'solicitData.curriculum',
      foreignField: '_id',
      as: 'curriculumData'
    }
  } as PipelineStage,
  { $unwind: '$curriculumData' } as PipelineStage,
  {
    $lookup: {
      from: 'offices',
      localField: 'curriculumData.office',
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
  { $match: { 'userData._id': { $in: userObjectIds } } } as PipelineStage,
  { $project: { _id: 1 } } as PipelineStage//Allow specify the fields to include on the result
]
/**
 * Crea un pipeline para obtener la relación entre un currículum y su cliente/proveedor
 * @param activityId ID de la solicitud a verificar
 * @returns Pipeline de agregación de MongoDB
 */
const ownershipPipeline = (activityId: Types.ObjectId): PipelineStage[] => [
  { $match: { _id: activityId } } as PipelineStage,
  {
    $lookup: {
      from: 'solicits',
      localField: 'solicit',
      foreignField: '_id',
      as: 'solicitData'
    }
  } as PipelineStage,
  { $unwind: '$solicitData' } as PipelineStage,
  {
    $lookup: {
      from: 'curriculums',
      localField: 'solicitData.curriculum',
      foreignField: '_id',
      as: 'curriculumData'
    }
  } as PipelineStage,
  { $unwind: '$curriculumData' } as PipelineStage,
  {
    $lookup: {
      from: 'offices',
      localField: 'curriculumData.office',
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
      id: '$userData._id',
    }
  } as PipelineStage
]