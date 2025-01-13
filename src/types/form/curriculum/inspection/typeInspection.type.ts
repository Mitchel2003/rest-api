import { Document } from "mongoose"

export interface TypeInspection extends Document {
  name: string,
  inactive: Boolean,
  createdAt?: Date,
  updatedAt?: Date
}