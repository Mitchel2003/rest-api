import { Document, Schema } from "mongoose"

export interface Office extends Document {
  name: string,
  group: string,
  services: string[],
  headquarter: Schema.Types.ObjectId,
  inventory?: string,
  createdAt?: Date,
  updatedAt?: Date
}