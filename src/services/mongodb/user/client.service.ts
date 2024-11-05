import { Client, ClientService as IClient } from "@/types/user/client.type";
import { handlerService as handler } from "@/errors/handler";
import { Result } from "@/interfaces/api.interface";
import { Query } from "@/types/repository.type";

import clientRepository from "@/repositories/user/client.repository";

class ClientService implements IClient {
  private static instance: ClientService;
  private constructor() { }

  public static getInstance(): ClientService {
    if (!ClientService.instance) ClientService.instance = new ClientService()
    return ClientService.instance;
  }
  /**
   * Crea un nuevo cliente.
   * @param {User} client - Contiene los datos del nuevo cliente a crear.
   * @returns {Promise<User>} - Retorna el documento del cliente creado.
   */
  async createClient(client: Client): Promise<Result<Client>> {
    return handler(async () => await clientRepository.create(client), "crear cliente")
  }
  /**
   * Busca clientes por consulta.
   * @param {Query} query - Consulta para buscar clientes.
   * @returns {Promise<User[]>} - Retorna un array de clientes encontrados.
   */
  async findClients(query?: Query): Promise<Result<Client[]>> {
    return handler(async () => await clientRepository.find(query), "buscar clientes")
  }
  /**
   * Busca un cliente por consulta.
   * @param {Query} query - Consulta para buscar un cliente.
   * @returns {Promise<User | null>} - Retorna el cliente encontrado o null si no se encuentra.
   */
  async findOneClient(query: Query): Promise<Result<Client | null>> {
    return handler(async () => await clientRepository.findOne(query), "buscar cliente por consulta")
  }
  /**
   * Busca un cliente por su id.
   * @param {string} id - El id del cliente a buscar.
   * @returns {Promise<User | null>} - Retorna el cliente encontrado o null si no se encuentra.
   */
  async findClientById(id: string): Promise<Result<Client | null>> {
    return handler(async () => await clientRepository.findById(id), "buscar cliente por id")
  }
  /**
   * Actualiza un cliente.
   * @param {string} id - El id del cliente a actualizar.
   * @param {Partial<User>} data - Los datos parciales del cliente a actualizar.
   * @example así funciona: { username: 'nuevoNombre' }, entonces solo se actualizará el nombre.
   * @returns {Promise<User | null>} - Retorna el cliente actualizado o null si no se encuentra.
   */
  async updateClient(id: string, data: Partial<Client>): Promise<Result<Client | null>> {
    return handler(async () => await clientRepository.update(id, data), "actualizar cliente")
  }
  /**
   * Elimina un cliente.
   * @param {string} id - El id del cliente a eliminar.
   * @returns {Promise<boolean>} - Retorna true si la eliminación fue exitosa, false si no.
   */
  async deleteClient(id: string): Promise<Result<boolean>> {
    return handler(async () => await clientRepository.delete(id), "eliminar cliente")
  }
}

export const clientService = ClientService.getInstance();