import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface TechnicalCharacteristic extends Document {
  speed: string;
  power: string;
  weight: string;
  voltage: string;
  amperage: string;
  capacity: string;
  pressure: string;
  humidity: string;
  frequency: string;
  temperature: string;
  curriculum: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface TechnicalCharacteristicService {
  createTechnicalCharacteristic(technicalCharacteristic: TechnicalCharacteristic): Promise<TechnicalCharacteristic>
  findTechnicalCharacteristics(query?: Query): Promise<TechnicalCharacteristic[]>
  findOneTechnicalCharacteristic(query: Query): Promise<TechnicalCharacteristic | null>
  findTechnicalCharacteristicById(id: string): Promise<TechnicalCharacteristic | null>
  updateTechnicalCharacteristic(id: string, technicalCharacteristic: Partial<TechnicalCharacteristic>): Promise<TechnicalCharacteristic | null>
  deleteTechnicalCharacteristic(id: string): Promise<boolean>
}