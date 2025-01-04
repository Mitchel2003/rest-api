import { Document, Schema } from "mongoose"

export interface Office extends Document {
  name: string,
  services: string[],
  area: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}