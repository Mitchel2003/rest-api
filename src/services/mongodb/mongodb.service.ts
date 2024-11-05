import { Repository, Doc, Query } from "@/types/repository.type";
import { handlerService as handler } from "@/errors/handler";
import { Result } from "@/interfaces/api.interface";

/**
 * Clase abstracta para servicios de MongoDB
 * @template {T} - El tipo de documento a manejar
 */
export abstract class MongoDBService<T> {
  protected constructor(protected readonly repository: Repository<T>) { }
  /**
   * Crea un nuevo documento en la base de datos
   * @param {T} data - Representa el documento a crear, suele ser un objeto de tipo T (modelo de mongoose)
   * @returns {Promise<Result<T>>} retorna un tipo Result<T> con la operacion (success o failure)
   */
  async create(data: T): Promise<Result<T>> {
    return handler(async () => await this.repository.create(data), "crear");
  }
  /**
   * Busca todos los documentos en la base de datos
   * @param {Query} query - La consulta a aplicar, suele ser un objeto de tipo Query
   * @returns {Promise<Result<T[]>>} retorna un tipo Result<T[]> con la operacion (success o failure)
   */
  async find(query?: Query): Promise<Result<T[]>> {
    return handler(async () => await this.repository.find(query), "buscar todos");
  }
  /**
   * Busca un documento por su id en la base de datos
   * @param {string} id - El id del documento a buscar
   * @returns {Promise<Result<T | null>>} retorna un tipo Result<T | null> con la operacion (success o failure)
   */
  async findById(id: string): Promise<Result<T | null>> {
    return handler(async () => await this.repository.findById(id), "buscar por id");
  }
  /**
   * Actualiza un documento por su id en la base de datos
   * @param {string} id - El id del documento a actualizar
   * @param {Partial<Doc<T>>} data - El documento con los datos a actualizar, suele ser un objeto de tipo Partial<Doc<T>>
   * @returns {Promise<Result<T | null>>} retorna un tipo Result<T | null> con la operacion (success o failure)
   */
  async update(id: string, data: Partial<Doc<T>>): Promise<Result<T | null>> {
    return handler(async () => await this.repository.update(id, data), "actualizar");
  }
  /**
   * Elimina un documento por su id en la base de datos
   * @param {string} id - El id del documento a eliminar
   * @returns {Promise<Result<boolean>>} retorna un tipo Result<boolean> con la operacion (success o failure)
   */
  async delete(id: string): Promise<Result<boolean>> {
    return handler(async () => await this.repository.delete(id), "eliminar");
  }
} 