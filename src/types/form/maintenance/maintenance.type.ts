import { Document, Schema } from "mongoose"

export interface Maintenance extends Document {
  //timestandard
  dateNextMaintenance: string;
  dateMaintenance: string;

  //maintenance
  statusEquipment: string;
  observations: string;

  //references
  receivedBy: string;
  nameEngineer: string;
  invimaEngineer: string;
  curriculum: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}