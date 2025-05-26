import MongoDB, { IResourceService } from "@/services/mongodb/mongodb.service";
import { Types, PipelineStage, PopulateOptions } from "mongoose";
import { Doc, Query, Options } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import { Result, success } from "@/interfaces/api.interface";
import ErrorAPI from "@/errors";

import signatureModel from "@/models/location/signature.model";
import { Signature } from "@/types/location/signature.type";

class SignatureService extends MongoDB<Signature> implements IResourceService<Signature> {
  private static instance: SignatureService;
  private readonly defaultPopulate: PopulateOptions = {
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

  private constructor() { super(Repository.create(signatureModel)) }

  public static getInstance(): SignatureService {
    if (!SignatureService.instance) SignatureService.instance = new SignatureService();
    return SignatureService.instance;
  }
  /**
   * Verifica si un usuario tiene acceso a una firma basado en su rol y contexto
   * @param contextIds Representa los IDs de acceso (permissions) segun el usuario
   * @param signatureId ID del recurso a verificar, representa el id de la firma
   * @returns {Promise<Result<boolean>>} Resultado con true si tiene acceso, false en caso contrario
   */
  async isOwnership(contextIds: string[], signatureId: string): Promise<Result<boolean>> {
    return super.verifyOwnership(contextIds, ownershipPipeline(new Types.ObjectId(signatureId)))
  }
  /**
   * Encuentra firmas asociadas a los usuarios suministrados
   * @param options Opciones de búsqueda con array de IDs de usuarios
   * @returns {Promise<Result<Signature[]>>} Resultado con las firmas encontradas
   */
  async findByUsers(options: Options & { userIds: string[] }): Promise<Result<Signature[]>> {
    const { query, ...rest } = options //destructuring options to separate query from rest options
    let buildQuery = { ...query } //clone query to avoid inmutability issues and modify the original
    query?.headquarter && (buildQuery.headquarter = new Types.ObjectId(query.headquarter as string))
    const res = await super.findByUsers({ ...rest, query: buildQuery, populate: this.defaultPopulate }, byUsersPipeline)
    if (!res.success) throw new ErrorAPI(res.error)
    return success(res.data.filter((s) => s.active))
  }
  /** Busca una firma por su id en la base de datos */
  async findById(id: string): Promise<Result<Signature | null>> {
    return super.findById(id, this.defaultPopulate)
  }
  /** Busca firmas en la base de datos */
  async find(query: Query = {}): Promise<Result<Signature[]>> {
    return super.find(query, this.defaultPopulate)
  }
  /** Crea una nueva firma en la base de datos */
  async create(data: Signature): Promise<Result<Signature>> {
    return super.create(data, this.defaultPopulate)
  }
  /** Actualiza una firma por su id en la base de datos */
  async update(id: string, data: Partial<Doc<Signature>>): Promise<Result<Signature | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
  /** Elimina una firma por su id en la base de datos */
  async delete(id: string): Promise<Result<Signature | null>> {
    return super.delete(id, this.defaultPopulate)
  }
  /*---------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------helpers--------------------------------------------------*/
  /**
   * Método para desactivar firmas antiguas de un headquarter al crear una nueva activa
   * @param headquarterId ID de la sede, cada sede tiene una firma activa
   * @param exceptId ID de firma a exceptuar de la desactivación
   */
  async disableByHeadquarter(headquarterId: string, exceptId?: string): Promise<Result<boolean>> {
    const filter: Query = { headquarter: new Types.ObjectId(headquarterId), active: true }
    if (exceptId) { filter._id = { $ne: new Types.ObjectId(exceptId) } }
    return super.updateMany(filter, { $set: { active: false } })
  }
}

export const signatureService = SignatureService.getInstance()
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
 * Crea un pipeline para obtener la relación entre una firma y su cliente/proveedor
 * @param signatureId ID de la firma a verificar
 * @returns Pipeline de agregación de MongoDB
 */
const ownershipPipeline = (signatureId: Types.ObjectId): PipelineStage[] => [
  { $match: { _id: signatureId } } as PipelineStage,
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