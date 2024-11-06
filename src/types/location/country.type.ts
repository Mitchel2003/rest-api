import { Document } from "mongoose"

export interface Country extends Document {
  name: string,
  createdAt?: Date,
  updatedAt?: Date
}