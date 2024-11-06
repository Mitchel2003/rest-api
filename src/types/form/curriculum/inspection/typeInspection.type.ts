import { Document } from "mongoose"

export interface TypeInspection extends Document {
  nameType: string,
  inactive: Boolean,
  createdAt?: Date,
  updatedAt?: Date
}