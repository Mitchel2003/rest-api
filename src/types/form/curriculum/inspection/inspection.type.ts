import { Document } from "mongoose"

export interface Inspection extends Document {
  name: string,
  inactive: Boolean,
  typeInspection: string[],
  createdAt?: Date,
  updatedAt?: Date
}