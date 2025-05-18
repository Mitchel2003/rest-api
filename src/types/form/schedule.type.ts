import { Document, Schema } from "mongoose"

export interface Schedule extends Document {
  typeClassification: string,
  type: string,
  name: string,
  url: string,

  client: Schema.Types.ObjectId,
  createdBy: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}