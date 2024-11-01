import { handlerService as handler } from "@/errors/handler";
import { IDatabase } from "@/interfaces/db.interface";
import { Result } from "@/interfaces/api.interface";

import userRepository from "@/repositories/user/user.repository";
import { User as UserMongo } from "@/types/user/user.type";

class DatabaseService implements IDatabase {
  private static instance: DatabaseService;
  private constructor() { }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) DatabaseService.instance = new DatabaseService()
    return DatabaseService.instance;
  }
  /**
   * Crea un nuevo usuario con la contraseña encriptada y un token de verificación email definido.
   * @param {UserMongo} user - Contiene los datos del nuevo usuario a crear.
   * @returns {Promise<UserMongo>} - Retorna el documento del usuario creado.
   */
  async createUser(user: UserMongo): Promise<Result<UserMongo>> {
    return handler(async () => await userRepository.create(user), "crear usuario")
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