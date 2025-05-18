import { Repository, Doc, Query, Populate, Options } from "@/types/repository.type"
import { handlerService as handler } from "@/errors/handler"
import { Result } from "@/interfaces/api.interface"
import { PipelineStage, Types } from "mongoose"
import { User } from "@/types/user/user.type"

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
  async find(query?: Query, populate?: Populate): Promise<Result<T[]>> {
    return handler(async () => await this.repository.find(query, populate), "buscar todos");
  }
  /** Busca un documento por su id en la base de datos */
  async findById(id: string, populate?: Populate): Promise<Result<T | null>> {
    return handler(async () => await this.repository.findById(id, populate), "buscar por id");
  }
  /** Busca un documento por su query en la base de datos */
  async findOne(query: Query, populate?: Populate): Promise<Result<T | null>> {
    return handler(async () => await this.repository.findOne(query, populate), "buscar por query");
  }
  /** Busca documentos por múltiples clientes (asociados) */
  async findByUsers(options: Options & { userIds: string[] }, customPipeline: (objectIds: Types.ObjectId[], query: Query) => PipelineStage[]): Promise<Result<T[]>> {
    return handler(async () => await this.repository.findByUsers(options, customPipeline), "buscar por múltiples clientes")
  }
  /** Verifica si un usuario tiene propiedad de un recurso */
  async verifyOwnership(contextIds: string[], pipeline: PipelineStage[]): Promise<Result<boolean>> {
    return handler(async () => await this.repository.verifyOwnership(contextIds, pipeline), "verificar propiedad");
  }
  /** Actualiza un documento por su id en la base de datos */
  async update(id: string, data: Partial<Doc<T>>, populate?: Populate): Promise<Result<T | null>> {
    return handler(async () => await this.repository.update(id, data, populate), "actualizar");
  }
  /** Actualiza documentos por su query en la base de datos */
  async updateMany(query: Query, update: any): Promise<Result<boolean>> {
    return handler(async () => await this.repository.updateMany(query, update), "actualizar varios");
  }
  /** Elimina un documento por su id en la base de datos */
  async delete(id: string): Promise<Result<boolean>> {
    return handler(async () => await this.repository.delete(id), "eliminar");
  }
}

export default MongoDB
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Interfaz genérica para servicios de recursos
 * Define las operaciones básicas que cualquier servicio de recurso debe implementar
 */
export interface IResourceService<T, IdType = string> {
  find(query?: Query, options?: any): Promise<Result<T[]>>;
  findById(id: IdType, options?: any): Promise<Result<T | null>>;
  findByUsers(options: Options & { userIds: string[] }): Promise<Result<T[]>>;
  isOwnership(contextIds: string[], resourceId: string): Promise<Result<boolean>>;
}

/**
 * Interfaz para servicios de control de acceso
 * Define las operaciones básicas de control de acceso para cualquier recurso
 */
export interface IAccessService<T, IdType = string> {
  getAll(user: User, query?: any): Promise<Result<T[]>>;
  getOne(user: User, resourceId: IdType): Promise<Result<T>>;
  canUpdate(user: User, resourceId: IdType): Promise<boolean>;
  canDelete(user: User, resourceId: IdType): Promise<boolean>;
}

/**
 * Clase base abstracta para estrategias de acceso
 * Proporciona funcionalidad común para todas las estrategias de acceso
 */
export abstract class BaseAccess<T, IdType = string> implements IAccessService<T, IdType> {
  protected resourceService: IResourceService<T, IdType>
  protected resourceName: string
  constructor(resourceService: IResourceService<T, IdType>, resourceName: string) {
    this.resourceService = resourceService
    this.resourceName = resourceName
  }
  abstract getAll(user: User, query?: any): Promise<Result<T[]>>;
  abstract getOne(user: User, resourceId: IdType): Promise<Result<T>>;
  abstract canUpdate(user: User, resourceId: IdType): Promise<boolean>;
  abstract canDelete(user: User, resourceId: IdType): Promise<boolean>;
  /** Verifica si un ID es válido según el formato de MongoDB */
  protected isValidId(id: string): boolean { return Types.ObjectId.isValid(id) }
  /** Obtiene el valor de permissions del usuario */
  protected getUserPermissions(user: User): string[] { return user.permissions || [] }
}

/**
 * Clase base para fábricas de estrategias de acceso
 * Implementa el patrón Singleton para reutilizar instancias
 */
export abstract class AccessStrategyFactory<T, S extends IAccessService<T>> {
  private static instances = new Map<string, any>()
  /**
   * Crea una estrategia de acceso basada en el rol del usuario
   * @param user Usuario autenticado
   * @param context Contexto para el que se crea la estrategia (nombre del recurso)
   * @returns Estrategia de acceso apropiada para el rol del usuario
   */
  abstract create(user: User, context: string): S;
  /**
   * Obtiene la instancia singleton para una clave específica
   * @param key Clave única para identificar la instancia
   * @returns Instancia existente o null si no existe
   */
  protected static getInstance<V>(key: string): V | null {
    return (this.instances.get(key) as V) || null
  }
  /**
   * Registra una nueva instancia en el mapa de singletons
   * @param key Clave única para identificar la instancia
   * @param instance Instancia a registrar
   */
  protected static registerInstance(key: string, instance: any): void {
    this.instances.set(key, instance)
  }
  /** Limpia todas las instancias almacenadas */
  public static clearInstances(): void { this.instances.clear() }
}