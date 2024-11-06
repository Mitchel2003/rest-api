import { Document } from "mongoose"

export interface Service extends Document {
  name: string,
  createdAt?: Date,
  updatedAt?: Date
}