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