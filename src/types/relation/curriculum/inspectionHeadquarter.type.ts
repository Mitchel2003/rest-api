import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface InspectionHeadquarter extends Document {//relationship between inspection, headquarter and curriculum
  inspection: Schema.Types.ObjectId,
  headquarter: Schema.Types.ObjectId,
  curriculum: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface InspectionHeadquarterService {
  createInspectionHeadquarter(inspectionHeadquarter: InspectionHeadquarter): Promise<InspectionHeadquarter>
  findInspectionHeadquarters(query?: Query): Promise<InspectionHeadquarter[]>
  findOneInspectionHeadquarter(query: Query): Promise<InspectionHeadquarter | null>
  findInspectionHeadquarterById(id: string): Promise<InspectionHeadquarter | null>
  updateInspectionHeadquarter(id: string, inspectionHeadquarter: Partial<InspectionHeadquarter>): Promise<InspectionHeadquarter | null>
  deleteInspectionHeadquarter(id: string): Promise<boolean>
}