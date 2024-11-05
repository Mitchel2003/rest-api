import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface CheckMaintenance extends Document {//relationship between check and maintenance
  value: string,
  check: Schema.Types.ObjectId,
  maintenance: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface CheckMaintenanceService {
  createCheckMaintenance(CheckMaintenance: CheckMaintenance): Promise<CheckMaintenance>
  findCheckMaintenances(query?: Query): Promise<CheckMaintenance[]>
  findOneCheckMaintenance(query: Query): Promise<CheckMaintenance | null>
  findCheckMaintenanceById(id: string): Promise<CheckMaintenance | null>
  updateCheckMaintenance(id: string, CheckMaintenance: Partial<CheckMaintenance>): Promise<CheckMaintenance | null>
  deleteCheckMaintenance(id: string): Promise<boolean>
}