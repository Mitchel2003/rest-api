import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface Inspection extends Document {
  presetInspection: Schema.Types.ObjectId,
  typeInspection: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface InspectionService {
  createInspection(inspection: Inspection): Promise<Inspection>
  findInspections(query?: Query): Promise<Inspection[]>
  findOneInspection(query: Query): Promise<Inspection | null>
  findInspectionById(id: string): Promise<Inspection | null>
  updateInspection(id: string, inspection: Partial<Inspection>): Promise<Inspection | null>
  deleteInspection(id: string): Promise<boolean>
}