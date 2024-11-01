import userRepository from "@/repositories/user/user.repository";
import { handlerService as handler } from "@/errors/handler";
import { User as UserMongo } from "@/types/user/user.type";
import { IDatabase } from "@/interfaces/db.interface";
import { Result } from "@/interfaces/api.interface";
import { Query } from "@/types/repository.type";

class DatabaseService implements IDatabase {
  private static instance: DatabaseService;
  private constructor() { }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) DatabaseService.instance = new DatabaseService()
    return DatabaseService.instance;
  }
  /**
   * Crea un nuevo usuario.
   * @param {UserMongo} user - Contiene los datos del nuevo usuario a crear.
   * @returns {Promise<UserMongo>} - Retorna el documento del usuario creado.
   */
  async createUser(user: UserMongo): Promise<Result<UserMongo>> {
    return handler(async () => await userRepository.create(user), "crear usuario")
  }
  /**
   * Busca usuarios por consulta.
   * @param {Query} query - Consulta para buscar usuarios.
   * @returns {Promise<UserMongo[]>} - Retorna un array de usuarios encontrados.
   */
  async findUsers(query?: Query): Promise<Result<UserMongo[]>> {
    return handler(async () => await userRepository.find(query), "buscar usuarios")
  }
  /**
   * Busca un usuario por consulta.
   * @param {Query} query - Consulta para buscar un usuario.
   * @returns {Promise<UserMongo | null>} - Retorna el usuario encontrado o null si no se encuentra.
   */
  async findOneUser(query: Query): Promise<Result<UserMongo | null>> {
    return handler(async () => await userRepository.findOne(query), "buscar usuario por consulta")
  }
  /**
   * Busca un usuario por su id.
   * @param {string} id - El id del usuario a buscar.
   * @returns {Promise<UserMongo | null>} - Retorna el usuario encontrado o null si no se encuentra.
   */
  async findUserById(id: string): Promise<Result<UserMongo | null>> {
    return handler(async () => await userRepository.findById(id), "buscar usuario por id")
  }
  /**
   * Actualiza un usuario.
   * @param {string} id - El id del usuario a actualizar.
   * @param {Partial<UserMongo>} data - Los datos parciales del usuario a actualizar.
   * @example así funciona: { username: 'nuevoNombre' }, entonces solo se actualizará el nombre.
   * @returns {Promise<boolean>} - Retorna true si la actualización fue exitosa, false si no.
   */
  async updateUser(id: string, data: Partial<UserMongo>): Promise<Result<boolean>> {
    return handler(async () => (await userRepository.update(id, data)) !== null, "actualizar usuario")
  }
  /**
   * Elimina un usuario.
   * @param {string} id - El id del usuario a eliminar.
   * @returns {Promise<boolean>} - Retorna true si la eliminación fue exitosa, false si no.
   */
  async deleteUser(id: string): Promise<Result<boolean>> {
    return handler(async () => await userRepository.delete(id), "eliminar usuario")
  }
}

export const db = DatabaseService.getInstance();