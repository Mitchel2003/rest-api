import MongoDB, { IResourceService } from "@/services/mongodb/mongodb.service";
import { Types, PipelineStage, PopulateOptions } from "mongoose";
import { Doc, Query, Options } from "@/types/repository.type";
import Repository from "@/repositories/mongodb.repository";
import { Result } from "@/interfaces/api.interface";

import userModel from '@/models/user/user.model';
import { User } from '@/types/user/user.type';

class UserService extends MongoDB<User> implements IResourceService<User> {
  private static instance: UserService
  private readonly defaultPopulate: PopulateOptions = {
    path: 'user',
    select: `
      _id uid email phone username role
      nit invima profesionalLicense permissions`,
  }

  private constructor() { super(Repository.create(userModel)) }

  public static getInstance(): UserService {
    if (!UserService.instance) UserService.instance = new UserService()
    return UserService.instance
  }
  /**
   * Encuentra usuarios asociados a los usuarios suministrados
   * @param options Opciones de búsqueda con array de IDs de usuarios
   * @returns {Promise<Result<User[]>>} Resultado con los usuarios encontrados
   */
  async findByUsers(options: Options & { userIds: string[] }): Promise<Result<User[]>> {
    return super.findByUsers(options, byUsersPipeline)
  }
  /** Busca un usuario por su id en la base de datos */
  async findById(id: string): Promise<Result<User | null>> {
    return super.findById(id, this.defaultPopulate)
  }
  /** Busca usuarios por query en la base de datos */
  async find(query?: Query, populate?: PopulateOptions | (string | PopulateOptions)[]): Promise<Result<User[]>> {
    return super.find(query, populate || this.defaultPopulate)
  }
  /** Actualiza un usuario por su id en la base de datos */
  async update(id: string, data: Partial<Doc<User>>): Promise<Result<User | null>> {
    return super.update(id, data, this.defaultPopulate)
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
const byUsersPipeline = (userObjectIds: Types.ObjectId[], query: object = {}): PipelineStage[] => [{
  $match: {
    _id: { $in: userObjectIds },
    ...query
  }
} as PipelineStage]