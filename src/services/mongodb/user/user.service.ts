import { User, UserService as IUser } from "@/types/user/user.type";
import { handlerService as handler } from "@/errors/handler";
import { Result } from "@/interfaces/api.interface";
import { Query } from "@/types/repository.type";

import userRepository from "@/repositories/user/user.repository";

class UserService implements IUser {
  private static instance: UserService;
  private constructor() { }

  public static getInstance(): UserService {
    if (!UserService.instance) UserService.instance = new UserService()
    return UserService.instance;
  }
  /**
   * Crea un nuevo usuario.
   * @param {User} user - Contiene los datos del nuevo usuario a crear.
   * @returns {Promise<User>} - Retorna el documento del usuario creado.
   */
  async createUser(user: User): Promise<Result<User>> {
    return handler(async () => await userRepository.create(user), "crear usuario")
  }
  /**
   * Busca usuarios por consulta.
   * @param {Query} query - Consulta para buscar usuarios.
   * @returns {Promise<User[]>} - Retorna un array de usuarios encontrados.
   */
  async findUsers(query?: Query): Promise<Result<User[]>> {
    return handler(async () => await userRepository.find(query), "buscar usuarios")
  }
  /**
   * Busca un usuario por consulta.
   * @param {Query} query - Consulta para buscar un usuario.
   * @returns {Promise<User | null>} - Retorna el usuario encontrado o null si no se encuentra.
   */
  async findOneUser(query: Query): Promise<Result<User | null>> {
    return handler(async () => await userRepository.findOne(query), "buscar usuario por consulta")
  }
  /**
   * Busca un usuario por su id.
   * @param {string} id - El id del usuario a buscar.
   * @returns {Promise<User | null>} - Retorna el usuario encontrado o null si no se encuentra.
   */
  async findUserById(id: string): Promise<Result<User | null>> {
    return handler(async () => await userRepository.findById(id), "buscar usuario por id")
  }
  /**
   * Actualiza un usuario.
   * @param {string} id - El id del usuario a actualizar.
   * @param {Partial<User>} data - Los datos parciales del usuario a actualizar.
   * @example así funciona: { username: 'nuevoNombre' }, entonces solo se actualizará el nombre.
   * @returns {Promise<User | null>} - Retorna el usuario actualizado o null si no se encuentra.
   */
  async updateUser(id: string, data: Partial<User>): Promise<Result<User | null>> {
    return handler(async () => await userRepository.update(id, data), "actualizar usuario")
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

export const userService = UserService.getInstance();