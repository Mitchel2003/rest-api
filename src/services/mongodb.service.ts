import { IDatabase, UserCredentialsFB } from "@/interfaces/db.interface";
import { handlerService as handler } from "@/utils/handler";
import { Result } from "@/interfaces/api.interface";

import userRepository from "@/repositories/user/user.repository";
import { User as UserMongo } from "@/types/user/user.type";

class DatabaseService implements IDatabase {//working here...
  private static instance: DatabaseService;
  private constructor() { }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) DatabaseService.instance = new DatabaseService()
    return DatabaseService.instance;
  }

  /**
   * Crea un nuevo usuario con la contraseña encriptada y un token de verificación email definido.
   * @param {UserCredentialsFB} user - Contiene los datos del nuevo usuario a crear.
   * @returns {Promise<UserMongo>} - Retorna el documento del usuario creado.
   */
  async createUser(user: UserCredentialsFB): Promise<Result<UserMongo>> {
    return handler(async () => {
      const userSaved = await userRepository.create(user as UserMongo)
      return userSaved
    }, "crear usuario")
  }

  /**
   * Verifica si el email existe en la base de datos (usuario registrado).
   * @param {string} email - El email del usuario a verificar.
   * @returns {Promise<boolean>} - Retorna true o false.
   */
  async isUserFound(email: string): Promise<Result<boolean>> {
    return handler(async () => {
      const user = await userRepository.findOne({ email });
      return user !== null
    }, "verificar si el usuario existe")
  }
}

export const db = DatabaseService.getInstance();