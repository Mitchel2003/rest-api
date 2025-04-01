import { Document, Schema } from "mongoose"

export interface Solicit extends Document {
  message: string,
  priority: boolean,
  status: string,

  curriculum: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}