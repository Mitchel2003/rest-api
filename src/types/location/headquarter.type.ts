import { Document, Schema } from "mongoose"

export interface Headquarter extends Document {
  name: string,
  address: string,
  city: Schema.Types.ObjectId,
  client: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}