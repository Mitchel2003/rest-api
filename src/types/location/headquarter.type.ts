import { Document, Schema } from "mongoose"

export interface Headquarter extends Document {
  name: string,
  address: string,
  city: Schema.Types.ObjectId,
  client: Schema.Types.ObjectId,
  inventory?: string,
  createdAt?: Date,
  updatedAt?: Date
}