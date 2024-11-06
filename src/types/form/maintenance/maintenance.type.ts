import { Document, Schema } from "mongoose"

export interface Maintenance extends Document {
  //timestandard
  dateNextMaintenance: Date;
  dateMaintenance: Date;

  //maintenance
  typeMaintenance: string;
  statusEquipment: string;
  faultEquipment: boolean;
  faultDescription: string;
  inspections: string[];
  observations: string;

  //references
  receivedBy: string;
  nameEngineer: string;
  invimaEngineer: string;
  equipment: Schema.Types.ObjectId,
  headquarter: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}