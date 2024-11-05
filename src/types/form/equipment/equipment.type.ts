import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface Equipment extends Document {
  status: string;
  curriculum: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface EquipmentService {
  createEquipment(equipment: Equipment): Promise<Equipment>
  findEquipments(query?: Query): Promise<Equipment[]>
  findOneEquipment(query: Query): Promise<Equipment | null>
  findEquipmentById(id: string): Promise<Equipment | null>
  updateEquipment(id: string, equipment: Partial<Equipment>): Promise<Equipment | null>
  deleteEquipment(id: string): Promise<boolean>
}