import { Result } from "@/interfaces/api.interface";
import { Query } from "@/types/repository.type";
import { Document } from "mongoose";

export interface Client extends Document {
  name: string,
  email: string,
  phone: number,
  nit: string,
  createdAt?: Date,
  updatedAt?: Date
}

export interface ClientService {
  createClient(Client: Client): Promise<Result<Client>>
  findClients(query?: Query): Promise<Result<Client[]>>
  findOneClient(query: Query): Promise<Result<Client | null>>
  findClientById(id: string): Promise<Result<Client | null>>
  updateClient(id: string, Client: Partial<Client>): Promise<Result<Client | null>>
  deleteClient(id: string): Promise<Result<boolean>>
}