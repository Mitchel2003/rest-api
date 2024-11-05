import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface Office extends Document {
  name: string,
  area: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface OfficeService {
  createOffice(office: Office): Promise<Office>
  findOffices(query?: Query): Promise<Office[]>
  findOneOffice(query: Query): Promise<Office | null>
  findOfficeById(id: string): Promise<Office | null>
  updateOffice(id: string, cv: Partial<Office>): Promise<Office | null>
  deleteOffice(id: string): Promise<boolean>
}