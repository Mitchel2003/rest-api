import MongoDB, { IResourceService } from "@/services/mongodb/mongodb.service";
import { Types, PipelineStage, PopulateOptions } from "mongoose";
import { Doc, Query, Options } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import { Result } from "@/interfaces/api.interface";

import solicitModel from "@/models/form/solicit.model";
import { Solicit } from "form/solicit.type";

class SolicitService extends MongoDB<Solicit> implements IResourceService<Solicit> {
  private static instance: SolicitService;
  private readonly defaultPopulate: PopulateOptions = {
    path: 'curriculum',
    select: `
    _id name brand serie service modelEquip healthRecord
    characteristics recommendationsManufacturer inventory
    datePurchase dateInstallation dateOperation acquisition warranty price
    equipClassification typeClassification useClassification biomedicalClassification riskClassification technologyPredominant powerSupply
    employmentMaintenance frequencyMaintenance typeMaintenance manualsMaintenance`,
    populate: [{
      path: 'office',
      select: 'name group services headquarter inventory',
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
    }, {
      path: 'createdBy',
      select: `
        _id uid email phone username role position
        nit invima profesionalLicense permissions
        belongsTo classification metadata`,
    }]
  }

  private constructor() { super(Repository.create(solicitModel)) }

  public static getInstance(): SolicitService {
    if (!SolicitService.instance) SolicitService.instance = new SolicitService()
    return SolicitService.instance;
  }
  /**
   * Verifica si un usuario tiene acceso a una solicitud basado en su rol y contexto
   * @param contextIds Representa los IDs de acceso (permissions) segun el usuario
   * @param solicitId ID del recurso a verificar, representa el id de la solicitud
   * @returns {Promise<Result<boolean>>} Resultado con true si tiene acceso, false en caso contrario
   */
  async isOwnership(contextIds: string[], solicitId: string): Promise<Result<boolean>> {
    return super.verifyOwnership(contextIds, ownershipPipeline(new Types.ObjectId(solicitId)))
  }
  /**
   * Encuentra solicitudes asociadas a los usuarios suministrados
   * @param options Opciones de búsqueda con array de IDs de usuarios
   * @returns {Promise<Result<Solicit[]>>} Resultado con las solicitudes encontradas
   */
  async findByUsers(options: Options & { userIds: string[] }): Promise<Result<Solicit[]>> {
    return super.findByUsers({ ...options, populate: this.defaultPopulate }, byUsersPipeline)
  }
  /** Busca una solicitud por su id en la base de datos */
  async findById(id: string): Promise<Result<Solicit | null>> {
    return super.findById(id, this.defaultPopulate)
  }
  /** Busca solicitudes por query en la base de datos */
  async find(query?: Query, populate?: PopulateOptions | (string | PopulateOptions)[]): Promise<Result<Solicit[]>> {
    return super.find(query, populate || this.defaultPopulate)
  }
  /** Crea una nueva solicitud en la base de datos */
  async create(data: Solicit): Promise<Result<Solicit>> {
    return super.create(data, this.defaultPopulate)
  }
  /** Actualiza una solicitud por su id en la base de datos */
  async update(id: string, data: Partial<Doc<Solicit>>): Promise<Result<Solicit | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
  /** Elimina una solicitud por su id en la base de datos */
  async delete(id: string): Promise<Result<Solicit | null>> {
    return super.delete(id, this.defaultPopulate)
  }
}

export const solicitService = SolicitService.getInstance()
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
      from: 'curriculums',
      localField: 'curriculum',
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
      localField: 'headquarterData.client',
      foreignField: '_id',
      as: 'clientData'
    }
  } as PipelineStage,
  { $unwind: '$clientData' } as PipelineStage,
  { $match: { 'clientData._id': { $in: userObjectIds } } } as PipelineStage,
  { $project: { _id: 1 } } as PipelineStage//Allow specify the fields to include on the result
]
/**
 * Crea un pipeline para obtener la relación entre una solicitud y su cliente/proveedor
 * @param solicitId ID de la solicitud a verificar
 * @returns Pipeline de agregación de MongoDB
 */
const ownershipPipeline = (solicitId: Types.ObjectId): PipelineStage[] => [
  { $match: { _id: solicitId } } as PipelineStage,
  {
    $lookup: {
      from: 'curriculums',
      localField: 'curriculum',
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
      localField: 'headquarterData.client',
      foreignField: '_id',
      as: 'clientData'
    }
  } as PipelineStage,
  { $unwind: '$clientData' } as PipelineStage,
  { //like as select
    $project: { _id: 1, id: '$clientData._id' }
  } as PipelineStage
]