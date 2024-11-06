import { Document, Schema } from "mongoose"

export interface Office extends Document {
  name: string,
  area: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}