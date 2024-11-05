import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface ServiceOffice extends Document {//relationship between service and office
  service: Schema.Types.ObjectId,
  office: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface ServOfficeService {
  createServiceOffice(servOffice: ServiceOffice): Promise<ServiceOffice>
  findServiceOffices(query?: Query): Promise<ServiceOffice[]>
  findOneServiceOffice(query: Query): Promise<ServiceOffice | null>
  findServiceOfficeById(id: string): Promise<ServiceOffice | null>
  updateServiceOffice(id: string, servOffice: Partial<ServiceOffice>): Promise<ServiceOffice | null>
  deleteServiceOffice(id: string): Promise<boolean>
}