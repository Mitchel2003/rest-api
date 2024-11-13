import { Repository, Doc, Query } from "@/types/repository.type";
import { handlerService as handler } from "@/errors/handler";
import { Result } from "@/interfaces/api.interface";

/**
 * Clase abstracta para servicios de MongoDB
 * @template {T} - El tipo de documento a manejar
 * @returns {Promise<Result<T>>} todos los metodos retornan un tipo Result<T> con la operacion (success o failure)
 */
abstract class MongoDB<T> {
  protected constructor(protected readonly repository: Repository<T>) { }
  /** Crea un nuevo documento en la base de datos */
  async create(data: T): Promise<Result<T>> {
    return handler(async () => await this.repository.create(data), "crear");
  }
  /** Busca todos los documentos en la base de datos */
  async find(query?: Query, populate?: string): Promise<Result<T[]>> {
    return handler(async () => await this.repository.find(query, populate), "buscar todos");
  }
  /** Busca un documento por su id en la base de datos */
  async findById(id: string): Promise<Result<T | null>> {
    return handler(async () => await this.repository.findById(id), "buscar por id");
  }
  /** Actualiza un documento por su id en la base de datos */
  async update(id: string, data: Partial<Doc<T>>): Promise<Result<T | null>> {
    return handler(async () => await this.repository.update(id, data), "actualizar");
  }
  /** Elimina un documento por su id en la base de datos */
  async delete(id: string): Promise<Result<boolean>> {
    return handler(async () => await this.repository.delete(id), "eliminar");
  }
}

export default MongoDB;