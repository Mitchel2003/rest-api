import { Document, Schema } from "mongoose"

export interface ManufacturerHeadquarter extends Document {//relationship between manufacturer and headquarter
  manufacturer: Schema.Types.ObjectId,
  headquarter: string,
  createdAt?: Date,
  updatedAt?: Date
}