import { Document, Schema } from "mongoose"

export interface Solicit extends Document {
  photoUrl?: string,
  priority: boolean,
  message: string,
  status: string,

  curriculum: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}