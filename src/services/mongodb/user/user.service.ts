import MongoDB, { IResourceService } from "@/services/mongodb/mongodb.service";
import { Doc, Query, Options, Populate } from "@/types/repository.type";
import { Types, PipelineStage, PopulateOptions } from "mongoose";
import Repository from "@/repositories/mongodb.repository";
import { Result } from "@/interfaces/api.interface";

import userModel from '@/models/user/user.model';
import { User } from '@/types/user/user.type';

class UserService extends MongoDB<User> implements IResourceService<User> {
  private static instance: UserService
  private readonly defaultPopulate: PopulateOptions = {
    path: 'belongsTo',
    select: `
      _id uid email phone username role position
      nit invima profesionalLicense permissions
      belongsTo classification metadata inventory`,
  }

  private constructor() { super(Repository.create(userModel)) }

  public static getInstance(): UserService {
    if (!UserService.instance) UserService.instance = new UserService()
    return UserService.instance
  }
  /**
   * Verifica si un usuario tiene acceso a un usuario basado en su rol y contexto
   * @param contextIds Representa los IDs de acceso (permissions) segun el usuario
   * @param userId ID del usuario a verificar, representa el id del usuario
   * @returns {Promise<Result<boolean>>} Resultado con true si tiene acceso, false en caso contrario
   */
  async isOwnership(contextIds: string[], userId: string): Promise<Result<boolean>> {
    return super.verifyOwnership(contextIds, ownershipPipeline(new Types.ObjectId(userId)))
  }
  /**
   * Encuentra usuarios asociados a los usuarios suministrados
   * @param options Opciones de búsqueda con array de IDs de usuarios
   * @returns {Promise<Result<User[]>>} Resultado con los usuarios encontrados
   */
  async findByUsers(options: Options & { userIds: string[] }): Promise<Result<User[]>> {
    return super.findByUsers({ ...options, populate: this.defaultPopulate }, byUsersPipeline)
  }
  /** Busca un usuario por su id en la base de datos */
  async findById(id: string): Promise<Result<User | null>> {
    return super.findById(id, this.defaultPopulate)
  }
  /** Busca usuarios por query en la base de datos */
  async find(query?: Query, populate?: Populate): Promise<Result<User[]>> {
    return super.find(query, populate || this.defaultPopulate)
  }
  /** Crea un nuevo usuario en la base de datos */
  async create(data: User): Promise<Result<User>> {
    return super.create(data, this.defaultPopulate)
  }
  /** Actualiza un usuario por su id en la base de datos */
  async update(id: string, data: Partial<Doc<User>>): Promise<Result<User | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
  /** Elimina un usuario por su id en la base de datos */
  async delete(id: string): Promise<Result<User | null>> {
    return super.delete(id, this.defaultPopulate)
  }
}

export const userService = UserService.getInstance();
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Pipeline by users
 * Filters users by multiple users
 * @param userObjectIds Array of user IDs
 * @param query Additional query
 * @returns MongoDB aggregation pipeline
 */
const byUsersPipeline = (userObjectIds: Types.ObjectId[], query: object = {}): PipelineStage[] => [
  { $match: { _id: { $in: userObjectIds }, ...query } } as PipelineStage
]
/**
 * Pipeline para verificar propiedad de un usuario
 * @param userId ID del usuario a verificar
 * @returns Pipeline de agregación de MongoDB
 */
const ownershipPipeline = (userId: Types.ObjectId): PipelineStage[] => [
  { $match: { _id: userId } } as PipelineStage,
  { //like as select
    $project: { _id: 1, id: '$userData._id' }
  } as PipelineStage
]