import { Document } from "mongoose"

export interface Calibration extends Document {
  name: string;
  typeMeasurement: string;
  createdAt?: Date,
  updatedAt?: Date
}