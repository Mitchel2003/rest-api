import { Query } from "@/types/repository.type"
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

export interface MaintenanceService {
  createMaintenance(maintenance: Maintenance): Promise<Maintenance>
  findMaintenances(query?: Query): Promise<Maintenance[]>
  findOneMaintenance(query: Query): Promise<Maintenance | null>
  findMaintenanceById(id: string): Promise<Maintenance | null>
  updateMaintenance(id: string, maintenance: Partial<Maintenance>): Promise<Maintenance | null>
  deleteMaintenance(id: string): Promise<boolean>
}