import { IAccessService, IResourceService, BaseAccess, AccessStrategyFactory } from '@/services/mongodb/mongodb.service';
import { Result, success } from '@/interfaces/api.interface';
import ErrorAPI, { Forbidden, NotFound } from '@/errors';
import { User } from '@/types/user/user.type';

/**
 * Fábrica de estrategias de acceso genérica
 * Implementación del patrón Singleton para crear estrategias de acceso basadas en roles
 */
class AccessFactory<T, IdType = string> extends AccessStrategyFactory<T, IAccessService<T, string>> {
  private resourceService: IResourceService<T, IdType>
  /**
   * Constructor de la fábrica genérica
   * @param resourceService Servicio de recursos
   * @param resourceName Nombre del recurso (para mensajes de error)
   */
  constructor(
    resourceService: IResourceService<T, IdType>,
    private defaultResourceName: string
  ) {
    super()
    this.resourceService = resourceService
  }

  /**
   * Crea una estrategia de acceso basada en el rol del usuario
   * @param user Usuario autenticado
   * @returns Estrategia de acceso correspondiente al rol del usuario
   */
  create(user: User): IAccessService<T, string> {
    let access: IAccessService<T, string>
    switch (user.role) {
      case 'admin':
        access = new AdminAccess<T, string>(
          this.resourceService as unknown as IResourceService<T, string>,
          this.defaultResourceName
        )
        break;
      case 'company':
        access = new CompanyAccess<T, string>(
          this.resourceService as unknown as IResourceService<T, string>,
          this.defaultResourceName,
          'permissions'
        )
        break;
      case 'engineer':
        access = new EngineerAccess<T, string>(
          this.resourceService as unknown as IResourceService<T, string>,
          this.defaultResourceName,
          'permissions'
        )
        break;
      case 'client':
        access = new ClientAccess<T, string>(
          this.resourceService as unknown as IResourceService<T, string>,
          this.defaultResourceName,
          '_id'
        )
        break;
      default:
        throw new Error(`Rol de usuario no soportado: ${user.role}`);
    }
    return access;
  }
}

export const accessFactory = <T>(service: IResourceService<T, string>, type: string) => new AccessFactory<T>(service, type)
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Admin access--------------------------------------------------*/
/**
 * Estrategia de acceso para administradores
 * Implementación genérica que puede ser utilizada con cualquier recurso
 */
export class AdminAccess<T, IdType = string> extends BaseAccess<T, IdType> {
  constructor(
    resourceService: IResourceService<T, IdType>,
    resourceName: string
  ) { super(resourceService, resourceName) }
  /**
   * Obtiene todos los recursos accesibles para el administrador
   * @param user Usuario administrador, (not used)
   * @param query Consulta para filtrar los recursos
   * @returns Resultado con los recursos o un error
   */
  async getAll(_user: User, query?: any): Promise<Result<T[]>> {
    const result: Result<T[]> = await this.resourceService.find(query || {})
    if (!result.success) throw new ErrorAPI(result.error)
    return success(result.data)
  }
  /**
   * Obtiene un recurso específico
   * @param user Usuario administrador, (not used)
   * @param resourceId ID del recurso a solicitar
   * @returns Resultado con el recurso o un error
   */
  async getOne(_user: User, resourceId: IdType): Promise<Result<T>> {
    if (typeof resourceId !== 'string' || !this.isValidId(resourceId)) throw new NotFound({ message: `ID de ${this.resourceName} inválido` })
    const result: Result<T | null> = await this.resourceService.findById(resourceId)
    if (!result.success) throw new ErrorAPI(result.error)//if not found or error
    if (!result.data) throw new NotFound({ message: this.resourceName })
    return success(result.data)
  }
  /** Verifica si el administrador puede actualizar un recurso */
  async canUpdate(_user: User, _resourceId: IdType): Promise<boolean> { return true }
  /** Verifica si el administrador puede eliminar un recurso */
  async canDelete(_user: User, _resourceId: IdType): Promise<boolean> { return true }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Company access--------------------------------------------------*/
/**
 * Estrategia de acceso para empresas
 * Implementación genérica que puede ser utilizada con cualquier recurso
 */
export class CompanyAccess<T, IdType = string> extends BaseAccess<T, IdType> {
  constructor(
    resourceService: IResourceService<T, IdType>,
    resourceName: string,
    _permissionsKey: string = 'permissions'
  ) { super(resourceService, resourceName) }
  /**
   * Obtiene todos los recursos accesibles para la empresa
   * @param user Usuario empresa
   * @param query Consulta para filtrar los recursos
   * @returns Resultado con los recursos o un error
   */
  async getAll(user: User, query?: any): Promise<Result<T[]>> {
    const clientIds: string[] = this.getUserPermissions(user)
    if (!clientIds?.length) throw new Forbidden({ message: 'No tienes clientes asignados' })//if no clients, not is allowed
    const result: Result<T[]> = await this.resourceService.findByUsers({ userIds: clientIds, query: query || {} })
    if (!result.success) throw new ErrorAPI(result.error)
    return success(result.data)
  }
  /**
   * Obtiene un recurso específico
   * @param user Usuario empresa
   * @param resourceId ID del recurso
   * @returns Resultado con el recurso o un error
   */
  async getOne(user: User, resourceId: IdType): Promise<Result<T>> {
    if (typeof resourceId !== 'string' || !this.isValidId(resourceId)) throw new NotFound({ message: `ID de ${this.resourceName} inválido` })
    const clientIds: string[] = this.getUserPermissions(user)//get clients ids (permissions)
    const isOwner = await this.resourceService.isOwnership(clientIds, resourceId)//check ownership to this resource context
    if (!isOwner.success || !isOwner.data) throw new Forbidden({ message: `No tienes permiso para acceder a este ${this.resourceName}` })
    const result = await this.resourceService.findById(resourceId)//the access is allowed
    if (!result.success || !result.data) throw new NotFound({ message: this.resourceName })
    return success(result.data)
  }
  /** Verifica si el administrador puede actualizar un recurso */
  async canUpdate(_user: User, _resourceId: IdType): Promise<boolean> { return true }
  /** Verifica si el administrador puede eliminar un recurso */
  async canDelete(_user: User, _resourceId: IdType): Promise<boolean> { return true }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Engineer access--------------------------------------------------*/
/**
 * Estrategia de acceso para ingenieros
 * Implementación genérica que puede ser utilizada con cualquier recurso
 */
export class EngineerAccess<T, IdType = string> extends BaseAccess<T, IdType> {
  constructor(
    resourceService: IResourceService<T, IdType>,
    resourceName: string,
    _permissionsKey: string = 'permissions'
  ) { super(resourceService, resourceName) }
  /**
   * Obtiene todos los recursos accesibles para el ingeniero
   * @param user Usuario ingeniero
   * @param query Consulta para filtrar los recursos
   * @returns Resultado con los recursos o un error
   */
  async getAll(user: User, query?: any): Promise<Result<T[]>> {
    const companyIds: string[] = this.getUserPermissions(user)
    if (!companyIds.length) throw new NotFound({ message: 'No tienes compañías asignadas para supervisar' })
    const result: Result<T[]> = await (this.resourceService as any).findByUsers({ userIds: companyIds, query: query || {} }) //I need check this!!
    if (!result.success) throw new ErrorAPI(result.error)
    return success(result.data)
  }
  /**
   * Obtiene un recurso específico accesible para el ingeniero
   * @param user Usuario ingeniero
   * @param resourceId ID del recurso a obtener
   * @returns Resultado con el recurso o un error
   */
  async getOne(user: User, resourceId: IdType): Promise<Result<T>> {
    if (typeof resourceId !== 'string' || !this.isValidId(resourceId)) throw new NotFound({ message: `ID de ${this.resourceName} inválido` })
    const companyIds: string[] = this.getUserPermissions(user)//get companies ids (permissions)
    const isOwner = await this.resourceService.isOwnership(companyIds, resourceId)//check ownership to this resource context
    if (!isOwner.success || !isOwner.data) throw new Forbidden({ message: `No tienes permiso para acceder a este ${this.resourceName}` })
    const result = await this.resourceService.findById(resourceId)//the access is allowed
    if (!result.success || !result.data) throw new NotFound({ message: this.resourceName })
    return success(result.data)
  }
  /** Verifica si el ingeniero puede actualizar un recurso */
  async canUpdate(_user: User, _resourceId: IdType): Promise<boolean> { return true }
  /** Verifica si el ingeniero puede eliminar un recurso */
  async canDelete(_user: User, _resourceId: IdType): Promise<boolean> { return true }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Client access--------------------------------------------------*/
/**
 * Estrategia de acceso para clientes
 * Implementación genérica que puede ser utilizada con cualquier recurso
 */
export class ClientAccess<T, IdType = string> extends BaseAccess<T, IdType> {
  constructor(
    resourceService: IResourceService<T, IdType>,
    resourceName: string,
    _idKey: string = '_id'
  ) { super(resourceService, resourceName) }
  /**
   * Obtiene todos los recursos accesibles para el cliente
   * @param user Usuario cliente
   * @param query Consulta para filtrar los recursos
   * @returns Resultado con los recursos o un error
   */
  async getAll(user: User, query?: any): Promise<Result<T[]>> {
    if (this.resourceName === 'user' && query && query.role === 'company') {//special case
      const result: Result<T[]> = await this.resourceService.find({ role: 'company', permissions: { $in: [user._id] } })
      if (!result.success) throw new ErrorAPI(result.error)
      return success(result.data)
    }
    const result: Result<T[]> = await this.resourceService.findByUsers({ userIds: [user._id], query: query || {} })
    if (!result.success) throw new ErrorAPI(result.error)
    return success(result.data)
  }
  /**
   * Obtiene un recurso específico accesible para el cliente
   * @param user Usuario cliente
   * @param resourceId ID del recurso a obtener
   * @returns Resultado con el recurso o un error
   */
  async getOne(user: User, resourceId: IdType): Promise<Result<T>> {
    if (typeof resourceId !== 'string' || !this.isValidId(resourceId)) throw new NotFound({ message: `ID de ${this.resourceName} inválido` })
    const isOwner = await this.resourceService.isOwnership([user._id], resourceId)//check ownership to this resource context
    if (!isOwner.success || !isOwner.data) throw new Forbidden({ message: `No tienes permiso para acceder a este ${this.resourceName}` })
    const result = await this.resourceService.findById(resourceId)//the access is allowed
    if (!result.success || !result.data) throw new NotFound({ message: this.resourceName })
    return success(result.data)
  }
  /** Verifica si el cliente puede actualizar un recurso */
  async canUpdate(user: User, resourceId: IdType): Promise<boolean> {
    if (typeof resourceId !== 'string' || !this.isValidId(resourceId)) throw new NotFound({ message: `ID de ${this.resourceName} inválido` })
    if (this.resourceName === 'user') return resourceId === user._id.toString()
    return false
  }
  /** Verifica si el cliente puede eliminar un recurso */
  async canDelete(_user: User, _resourceId: IdType): Promise<boolean> { return false }
}