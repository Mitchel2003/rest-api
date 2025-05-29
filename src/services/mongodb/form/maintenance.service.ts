import MongoDB, { IResourceService, PipelineFactory } from "@/services/mongodb/mongodb.service";
import { Types, PipelineStage, PopulateOptions } from "mongoose";
import { Doc, Query, Options } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import { Result } from "@/interfaces/api.interface";

import maintenanceModel from "@/models/form/maintenance.model";
import { Maintenance } from "form/maintenance.type";

class MaintenanceService extends MongoDB<Maintenance> implements IResourceService<Maintenance> {
  private static instance: MaintenanceService;
  private readonly defaultPopulate: PopulateOptions[] = [{
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
    }]
  }, {
    path: 'createdBy',
    select: `
      _id uid email phone username role position
      nit invima profesionalLicense permissions
      belongsTo classification metadata`,
  }, {
    path: 'signature',
    select: 'url active headquarter',
  }]

  private constructor() { super(Repository.create(maintenanceModel)) }

  public static getInstance(): MaintenanceService {
    if (!MaintenanceService.instance) MaintenanceService.instance = new MaintenanceService()
    return MaintenanceService.instance;
  }
  /**
   * Verifica si un usuario tiene acceso a un mantenimiento basado en su rol y contexto
   * @param contextIds Representa los IDs de acceso (permissions) segun el usuario
   * @param maintenanceId ID del recurso a verificar, representa el id del mantenimiento
   * @returns {Promise<Result<boolean>>} Resultado con true si tiene acceso, false en caso contrario
   */
  async isOwnership(contextIds: string[], maintenanceId: string): Promise<Result<boolean>> {
    return super.verifyOwnership(contextIds, ownershipPipeline(new Types.ObjectId(maintenanceId)))
  }
  /**
   * Encuentra mantenimientos asociados a los usuarios suministrados
   * @param options Opciones de búsqueda con array de IDs de usuarios
   * @returns {Promise<Result<Maintenance[]>>} Resultado con los mantenimientos encontrados
   */
  async findByUsers({ query = {}, ...rest }: Options & { userIds: string[] }): Promise<Result<Maintenance[]>> {
    let buildQuery = { ...query } //clone query to avoid inmutability issues and modify
    let clientId: Types.ObjectId //if has client on query, means we need a specific information
    const type = query?.client ? 'one' : 'many' //determine type query, helps to build the pipeline
    if (query?.curriculum) { buildQuery.curriculum = new Types.ObjectId(query.curriculum as string) }
    if (query?.client) { delete buildQuery.client; clientId = new Types.ObjectId(query.client as string) }
    return super.findByUsers(
      { ...rest, query: buildQuery, populate: this.defaultPopulate },
      (objectIds, queryObj) => PipelineFactory.create({ type, query: queryObj, userIds: type === 'many' ? objectIds : [clientId], base: basePipeline })
    )
  }
  /** Busca un mantenimiento por su id en la base de datos */
  async findById(id: string): Promise<Result<Maintenance | null>> {
    return super.findById(id, this.defaultPopulate)
  }
  /** Busca mantenimientos por query en la base de datos */
  async find(query?: Query, populate?: PopulateOptions | (string | PopulateOptions)[]): Promise<Result<Maintenance[]>> {
    return super.find(query, populate || this.defaultPopulate)
  }
  /** Crea un nuevo mantenimiento en la base de datos */
  async create(data: Maintenance): Promise<Result<Maintenance>> {
    return super.create(data, this.defaultPopulate)
  }
  /** Actualiza un mantenimiento por su id en la base de datos */
  async update(id: string, data: Partial<Doc<Maintenance>>): Promise<Result<Maintenance | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
  /** Elimina un mantenimiento por su id en la base de datos */
  async delete(id: string): Promise<Result<Maintenance | null>> {
    return super.delete(id, this.defaultPopulate)
  }
}

export const maintenanceService = MaintenanceService.getInstance()
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Pipeline base to get all data associated
 * @param {object} query - Additional query
 * @returns {PipelineStage[]} MongoDB aggregation pipeline
 */
const basePipeline = (query: object = {}): PipelineStage[] => [
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
  { $unwind: '$clientData' } as PipelineStage
]
/**
 * Crea un pipeline para obtener la relación entre un mantenimiento y su cliente/proveedor
 * @param maintenanceId ID del mantenimiento a verificar
 * @returns Pipeline de agregación de MongoDB
 */
const ownershipPipeline = (maintenanceId: Types.ObjectId): PipelineStage[] => [
  { $match: { _id: maintenanceId } } as PipelineStage,
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