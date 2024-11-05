import { Query } from "@/types/repository.type"
import { Document } from "mongoose"

export interface Service extends Document {
  name: string,
  createdAt?: Date,
  updatedAt?: Date
}

export interface servService {
  createService(service: Service): Promise<Service>
  findServices(query?: Query): Promise<Service[]>
  findOneService(query: Query): Promise<Service | null>
  findServiceById(id: string): Promise<Service | null>
  updateService(id: string, cv: Partial<Service>): Promise<Service | null>
  deleteService(id: string): Promise<boolean>
}