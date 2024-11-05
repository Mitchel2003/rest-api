import { Query, Repository } from "@/types/repository.type";
import ClientModel from "@/models/user/client.model";
import { Client } from "@/types/user/client.type";

class ClientRepository implements Repository<Client> {
  private static instance: ClientRepository;
  private constructor() { }

  public static getInstance(): ClientRepository {
    if (!ClientRepository.instance) ClientRepository.instance = new ClientRepository()
    return ClientRepository.instance;
  }

  /** Crea un nuevo cliente */
  async create(data: Client): Promise<Client> {
    const client = new ClientModel(data)
    return await client.save()
  }
  /** Busca clientes por consulta */
  async find(query?: Query): Promise<Client[]> {
    return await ClientModel.find(query || {}).exec()
  }
  /** Busca un cliente por consulta */
  async findOne(query: Query): Promise<Client | null> {
    return await ClientModel.findOne(query).exec()
  }
  /** Busca un cliente por su ID */
  async findById(id: string): Promise<Client | null> {
    return await ClientModel.findById(id).exec()
  }
  /** Actualiza un cliente por su ID */
  async update(id: string, data: Partial<Client>): Promise<Client | null> {
    return await ClientModel.findByIdAndUpdate(id, data, { new: true }).exec()
  }
  /** Elimina un cliente por su ID */
  async delete(id: string): Promise<boolean> {
    const res = await ClientModel.findByIdAndDelete(id).exec()
    return res !== null
  }
}

export default ClientRepository.getInstance()