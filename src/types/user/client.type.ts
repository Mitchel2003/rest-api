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
  createClient(Client: Client): Promise<Client>
  findClients(query?: Query): Promise<Client[]>
  findOneClient(query: Query): Promise<Client>
  findClientById(id: string): Promise<Client | null>
  updateClient(id: string, Client: Partial<Client>): Promise<Client | null>
  DeleteClient(id: string): Promise<boolean>
}