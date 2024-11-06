import { Document, Schema } from "mongoose"

export interface CalibrationEquipment extends Document {//relationship between calibration and equipment
  date: Date,
  value: string,
  provider: string,
  equipment: Schema.Types.ObjectId,
  calibration: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}