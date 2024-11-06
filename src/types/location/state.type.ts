import { Document, Schema } from "mongoose"

export interface State extends Document {
  name: string,
  country: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}