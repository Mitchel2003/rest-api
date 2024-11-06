import { Document, Schema } from "mongoose"

export interface Area extends Document {
  name: string,
  headquarter: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}