import { Document, Schema } from "mongoose"

export interface Maintenance extends Document {
  dateNextMaintenance: string,
  dateMaintenance: string,

  typeMaintenance: string,
  observations: string,
  statusEquipment: string,
  curriculum: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}