import { Document } from "mongoose"

export interface PresetInspection extends Document {
  namePreset: string,
  inactive: Boolean,
  createdAt?: Date,
  updatedAt?: Date
}