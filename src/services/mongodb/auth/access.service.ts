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
      case 'collaborator':
        access = new CollaboratorAccess<T, string>(
          this.resourceService as unknown as IResourceService<T, string>,
          this.defaultResourceName,
          'belongsTo'
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
        access = new PublicAccess<T, string>(
          this.resourceService as unknown as IResourceService<T, string>,
          this.defaultResourceName
        )
        break;
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
   * @param user Usuario con acceso de administrador
   * @param query Consulta para filtrar los recursos
   * @returns Resultado con los recursos o un error
   */
  async getAll(_user: User, query?: any): Promise<Result<T[]>> {
    const result = await this.resourceService.find(query || {})
    if (!result.success) throw new ErrorAPI(result.error)
    return success(result.data)
  }
  /**
   * Obtiene un recurso específico
   * @param user Usuario con acceso de administrador
   * @param resourceId ID del recurso a solicitar
   * @returns Resultado con el recurso o un error
   */
  async getOne(user: User, resourceId: IdType): Promise<Result<T>> {
    if (this.resourceName === 'user' && user.uid === resourceId) return success(user as T) //in case that user try with his own uid (get_by_uid)
    if (typeof resourceId !== 'string' || !this.isValidId(resourceId)) throw new NotFound({ message: `ID de ${this.resourceName} inválido` })
    const result = await this.resourceService.findById(resourceId) //the access is allowed
    if (!result.success || !result.data) throw new NotFound({ message: this.resourceName })
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
   * @param user Usuario con acceso de empresa
   * @param query Consulta para filtrar los recursos
   * @returns Resultado con los recursos o un error
   */
  async getAll(user: User, query?: any): Promise<Result<T[]>> {
    //associated company and collaborators, remember self-references
    if (this.resourceName === 'user' && query?.role !== 'client') {
      const result = await this.resourceService.find(query)
      if (!result.success) throw new ErrorAPI(result.error)
      return success(result.data) //the access is allowed
    } //continue searching for any other resources, like documents etc.
    const clientIds: string[] = this.getUserPermissions(user) //get clientIds (permissions)
    if (!clientIds?.length) throw new Forbidden({ message: 'No tienes clientes asignados' })
    const result = await this.resourceService.findByUsers({ userIds: clientIds, query: query || {} })
    if (!result.success) throw new ErrorAPI(result.error)
    return success(result.data)
  }
  /**
   * Obtiene un recurso específico
   * @param user Usuario con acceso de empresa
   * @param resourceId ID del recurso
   * @returns Resultado con el recurso o un error
   */
  async getOne(user: User, resourceId: IdType): Promise<Result<T>> {
    if (this.resourceName === 'user' && user.uid === resourceId) return success(user as T) //in case that user try with his own uid (get_by_uid)
    if (typeof resourceId !== 'string' || !this.isValidId(resourceId)) throw new NotFound({ message: `ID de ${this.resourceName} inválido` })
    if (this.resourceName === 'user') { //in case that user want to get another user; remember that company can access to users associated
      const result = await this.resourceService.findById(resourceId)
      if (!result.success) throw new NotFound({ message: 'user' })
      const userFound: User = result.data as User; //user founded
      const clientIds: string[] = this.getUserPermissions(user)
      const isClient = clientIds.includes(userFound._id.toString())
      const isCompany = userFound._id.toString() === user._id.toString()
      const isCollaborator = userFound.belongsTo?._id.toString() === user._id.toString()
      if (!isClient && !isCompany && !isCollaborator) throw new Forbidden({ message: `Usuario inaccesible` })
      return success(userFound as T) //the access is allowed (userFound)
    } //continue searching for any other resources, like documents etc.
    const clientIds: string[] = this.getUserPermissions(user) //get clients ids (permissions) assigned to this user
    const isOwner = await this.resourceService.isOwnership(clientIds, resourceId) //check ownership to this resource context
    if (!isOwner.success || !isOwner.data) throw new Forbidden({ message: `No tienes permiso para acceder a este ${this.resourceName}` })
    const result = await this.resourceService.findById(resourceId) //the access is allowed
    if (!result.success || !result.data) throw new NotFound({ message: this.resourceName })
    return success(result.data)
  }
  /** Verifica si el administrador puede actualizar un recurso */
  async canUpdate(_user: User, _resourceId: IdType): Promise<boolean> { return true }
  /** Verifica si el administrador puede eliminar un recurso */
  async canDelete(_user: User, _resourceId: IdType): Promise<boolean> { return true }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Collaborator access--------------------------------------------------*/
/**
 * Estrategia de acceso para colaboradores
 * Implementación genérica que puede ser utilizada con cualquier recurso
 */
export class CollaboratorAccess<T, IdType = string> extends BaseAccess<T, IdType> {
  constructor(
    resourceService: IResourceService<T, IdType>,
    resourceName: string,
    _belongsKey: string = 'belongsTo'
  ) { super(resourceService, resourceName) }
  /**
   * Obtiene todos los recursos accesibles para el colaborador
   * @param user Usuario con acceso de colaborador
   * @param query Consulta para filtrar los recursos
   * @returns Resultado con los recursos o un error
   */
  async getAll(user: User, query?: any): Promise<Result<T[]>> {
    const clientIds: string[] = this.getUserPermissions(user) //get clients ids (permissions)
    if (!clientIds.length) throw new NotFound({ message: 'No tienes clientes asignados para supervisar' })
    const result = await this.resourceService.findByUsers({ userIds: clientIds, query: query || {} })
    if (!result.success) throw new ErrorAPI(result.error)
    return success(result.data)
  }
  /**
   * Obtiene un recurso específico accesible para el colaborador
   * @param user Usuario con acceso de colaborador
   * @param resourceId ID del recurso a obtener
   * @returns Resultado con el recurso o un error
   */
  async getOne(user: User, resourceId: IdType): Promise<Result<T>> {
    if (this.resourceName === 'user' && user.uid === resourceId) return success(user as T) //in case that user try with his own uid (get_by_uid)
    if (typeof resourceId !== 'string' || !this.isValidId(resourceId)) throw new NotFound({ message: `ID de ${this.resourceName} inválido` })
    const clientIds: string[] = this.getUserPermissions(user) //get clients ids (permissions) assigned to this user
    const isOwner = await this.resourceService.isOwnership(clientIds, resourceId) //check ownership to this resource context
    if (!isOwner.success || !isOwner.data) throw new Forbidden({ message: `No tienes permiso para acceder a este ${this.resourceName}` })
    const result = await this.resourceService.findById(resourceId) //the access is allowed
    if (!result.success || !result.data) throw new NotFound({ message: this.resourceName })
    return success(result.data)
  }
  /** Verifica si el colaborador puede actualizar un recurso */
  async canUpdate(_user: User, _resourceId: IdType): Promise<boolean> { return true }
  /** Verifica si el colaborador puede eliminar un recurso */
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
   * @param user Usuario con acceso de cliente
   * @param query Consulta para filtrar los recursos
   * @returns Resultado con los recursos o un error
   */
  async getAll(user: User, query?: any): Promise<Result<T[]>> {
    if (this.resourceName === 'user' && query?.role === 'company') { //associated
      const searchQuery = { role: 'company', permissions: { $in: [user._id] } }
      const result = await this.resourceService.find(searchQuery)
      if (!result.success) throw new ErrorAPI(result.error)
      return success(result.data) //the access is allowed
    } //continue searching for any other resources, like documents etc.
    const result = await this.resourceService.findByUsers({ userIds: [user._id], query: query || {} })
    if (!result.success) throw new ErrorAPI(result.error)
    return success(result.data)
  }
  /**
   * Obtiene un recurso específico accesible para el cliente
   * @param user Usuario con acceso de cliente
   * @param resourceId ID del recurso a obtener
   * @returns Resultado con el recurso o un error
   */
  async getOne(user: User, resourceId: IdType): Promise<Result<T>> {
    if (this.resourceName === 'user' && user.uid === resourceId) return success(user as T) //in case that user try with his own uid (get_by_uid)
    if (typeof resourceId !== 'string' || !this.isValidId(resourceId)) throw new NotFound({ message: `ID de ${this.resourceName} inválido` })
    const isOwner = await this.resourceService.isOwnership([user._id], resourceId) //check ownership to this resource context (clients)
    if (!isOwner.success || !isOwner.data) throw new Forbidden({ message: `No tienes permiso para acceder a este ${this.resourceName}` })
    const result = await this.resourceService.findById(resourceId) //the access is allowed
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
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Public access--------------------------------------------------*/
/**
 * Estrategia de acceso para recursos publicos
 * Implementación genérica que puede ser utilizada con cualquier recurso
 */
export class PublicAccess<T, IdType = string> extends BaseAccess<T, IdType> {
  constructor(
    resourceService: IResourceService<T, IdType>,
    resourceName: string,
  ) { super(resourceService, resourceName) }
  /**
   * Obtiene todos los recursos accesibles para el publico
   * @param user Usuario con acceso de cliente
   * @param query Consulta para filtrar los recursos
   * @returns Resultado con los recursos o un error
   */
  async getAll(_user: User, query?: any): Promise<Result<T[]>> {
    const result = await this.resourceService.find(query || {})
    if (!result.success) throw new ErrorAPI(result.error)
    return success(result.data)
  }
  /**
   * Obtiene un recurso específico accesible para el publico
   * @param user Usuario con acceso de cliente
   * @param resourceId ID del recurso a obtener
   * @returns Resultado con el recurso o un error
   */
  async getOne(_user: User, resourceId: IdType): Promise<Result<T>> {
    const result = await this.resourceService.findById(resourceId) //the access is allowed
    if (!result.success || !result.data) throw new NotFound({ message: this.resourceName })
    return success(result.data)
  }
  /** Verifica si el publico puede actualizar un recurso */
  async canUpdate(_user: User, _resourceId: IdType): Promise<boolean> { return false }
  /** Verifica si el publico puede eliminar un recurso */
  async canDelete(_user: User, _resourceId: IdType): Promise<boolean> { return false }
}